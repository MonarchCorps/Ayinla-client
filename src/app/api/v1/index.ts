"use server";

import { CONFIGS } from "@/config";
import axios from "@/lib/axios";
import { createSafeAction } from "@/lib/safe-action"
import {
    completeForgotPasswordSchema,
    completeSignupSchema,
    initiateForgotPasswordSchema,
    initiateSignUpSchema,
    loginSchema
} from "@/schema/auth";
import { createBookingSchema } from "@/schema/booking";
import { AuthResponse } from "@/types/Auth";
import { BookingType } from "@/types/Booking";
import {
    ListingsResponseType,
    ListingType,
    SingleListingResponseType
} from "@/types/Listing";
import { shuffleArray } from "@/utils";
import { cookies } from "next/headers";

export const useLoginUser = createSafeAction(loginSchema, async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const res = await axios.post<AuthResponse>("/auth/login", {
        email,
        password,
    });

    return res.data;
});

export const useInitiateSignUp = createSafeAction(
    initiateSignUpSchema,
    async ({ parsedInput }) => {
        const { email } = parsedInput;
        await axios.post("/auth/initiate-signup", {
            email,
            base_url: `${CONFIGS.URL.CLIENT_BASE_URL}/sign-up/complete`,
        });

        return { message: "Success" };
    });

export const useCompleteSignup = createSafeAction(
    completeSignupSchema,
    async ({ parsedInput }) => {
        const res = await axios.post("/auth/complete-signup", {
            ...parsedInput
        });

        return res.data;
    });

export const useInitiateForgotPassword = createSafeAction(
    initiateForgotPasswordSchema,
    async ({ parsedInput }) => {
        await axios.post("/auth/initiate-password-recovery", {
            ...parsedInput,
            base_url: `${CONFIGS.URL.CLIENT_BASE_URL}/forgot-password/complete`
        })

        return { message: "Success" }
    });

export const useCompleteForgotPassword = createSafeAction(
    completeForgotPasswordSchema,
    async ({ parsedInput }) => {
        await axios.post("/auth/complete-password-recovery", {
            ...parsedInput
        })

        return { message: "Success" }
    });


export async function fetchListings(
    query: string,
    page: number,
    limit = 8
): Promise<ListingsResponseType> {
    const res = await fetch(`${CONFIGS.URL.API_BASE_URL}/search`, {
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
            `${CONFIGS.URL.API_BASE_URL}/listings/${slug}/public`,
            {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                next: { revalidate: 60 },
                credentials: "omit",
            }
        );

        if (!res.ok) {
            let errorMessage = `Failed to fetch listing details: ${res.status} ${res.statusText}`;
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
        // This catch handles network errors or unexpected issues
        if (error instanceof Error) {
            // You could also log the error here or send it to a monitoring service
            throw new Error(`Network or unexpected error: ${error.message}`);
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
        const res = await fetch(`${CONFIGS.URL.API_BASE_URL}/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, page: 1, limit: 10 }),
            next: { revalidate: 60 },
            credentials: "omit"
        });

        if (!res.ok) continue;

        const data: ListingsResponseType = await res.json();

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

export const useCreateBooking = createSafeAction(
    createBookingSchema,
    async ({ parsedInput }) => {
        const cookieStore = await cookies();
        const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

        const res = await axios.post<{ booking: BookingType }>(`${CONFIGS.URL.API_BASE_URL}/listings/${parsedInput.slug}/bookings`, {
            ...parsedInput,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            withCredentials: false
        })

        return res.data
    }
);
