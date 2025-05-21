"use server";

import { CONFIGS } from "@/config";
import {
    CreateOrUpdateListingPayload,
    ListingsResponseType,
    ListingStatus,
    ListingType,
    OwnListingResponseType,
    SingleListingResponseType
} from "@/types/Listing";
import { shuffleArray } from "@/utils";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const api_base_url = CONFIGS.URL.API_BASE_URL;

export async function fetchListings(
    query: string,
    page: number,
    limit = 8
): Promise<ListingsResponseType> {
    const res = await fetch(`${api_base_url}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, page, limit }),
        next: { revalidate: 60 },
        credentials: "omit"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch listings");
    }

    return res.json();
}

export async function fetchListingDetails(
    slug: string
): Promise<{ listing: SingleListingResponseType }> {
    try {
        const res = await fetch(
            `${api_base_url}/listings/${slug}/public`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                next: { revalidate: 60 },
                credentials: "omit",
            }
        );

        if (!res.ok) {
            let errorMessage = `${res.statusText}`;
            try {
                const errorData = await res.json();
                if (errorData?.message) {
                    errorMessage += ` - ${errorData.message}`;
                } else {
                    errorMessage += ` - ${JSON.stringify(errorData)}`;
                }
            } catch {
                // Could not parse error response, ignore
            }
            throw new Error(errorMessage);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export async function fetchAtLeast3Listings(
    length: number
): Promise<ListingsResponseType> {
    const queries = ['mo', 'home', 'flat', 'room', 'villa', 'rent', 'real', 'estate'];
    const listingsMap = new Map<string, ListingType>();

    for (const query of queries) {
        const res = await fetch(`${api_base_url}/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, page: 1, limit: 10 }),
            next: { revalidate: 60 },
            credentials: "omit"
        });

        if (!res.ok) continue;

        const data = await res.json();

        for (const listing of data.listings) {
            listingsMap.set(listing.slug, listing);
        }

        if (listingsMap.size >= length) break;
    }

    const shuffled = shuffleArray(Array.from(listingsMap.values())).slice(0, length);

    return {
        listings: shuffled,
        paging: {
            page: 1,
            limit: length,
            count: shuffled.length,
            total_pages: 1,
            total_count: shuffled.length
        }
    };
}

export async function fetchUserListings(
    options: {
        page?: number;
        statuses?: ListingStatus[];
        limit?: number;
    } = {}
): Promise<OwnListingResponseType> {
    const { page = 1, statuses = [], limit = 5 } = options;
    const cookieStore = await cookies();
    const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });
    if (statuses.length) {
        statuses.forEach(status => params.append('status', status));
    }

    try {

        const res = await fetch(`${api_base_url}/listings?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            next: { revalidate: 60 },
            credentials: "omit",
        });

        if (!res.ok) {
            let errorMessage = `${res.statusText}`;
            try {
                const errorData = await res.json();
                if (errorData?.message) {
                    errorMessage += ` - ${errorData.message}`;
                } else {
                    errorMessage += ` - ${JSON.stringify(errorData)}`;
                }
            } catch {
                // Could not parse error response, ignore
            }
            throw new Error(errorMessage);
        }

        return res.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Unknown error occurred");
        }
    }
}

export async function createListing(
    dataToSend: CreateOrUpdateListingPayload
): Promise<{
    success: boolean;
    errorMessage?: string;
    data?: {
        listing: SingleListingResponseType
    }
}> {
    const cookieStore = await cookies();
    const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

    try {
        const res = await fetch(`${api_base_url}/listings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify(dataToSend),
            credentials: "omit"
        })

        if (!res.ok) {
            const errorData = await res.json();
            return {
                success: false,
                errorMessage: errorData?.message || "Failed to create listing"
            }
        }

        const data: {
            listing: SingleListingResponseType
        } = await res.json();

        revalidatePath("/listing/own")

        return {
            success: true,
            data,
        }

    } catch {
        return {
            success: false,
            errorMessage: "Unknown error occurred"
        }
    }
}