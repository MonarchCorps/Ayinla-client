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
import {
    ListingsResponseType,
    ListingType,
    SingleListingResponseType
} from "@/types/Listing";
import { shuffleArray } from "@/utils";

export const useLoginUser = createSafeAction(loginSchema, async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const res = await axios.post("/auth/login", {
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


export async function fetchListings(query: string, page: number, limit = 8): Promise<ListingsResponseType> {
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

export async function fetchListingDetails(slug: string): Promise<{ listing: SingleListingResponseType }> {
    const res = await fetch(`${CONFIGS.URL.API_BASE_URL}/listings/${slug}/public`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 60 },
        credentials: "omit"
    })

    if (!res.ok) {
        throw new Error("Failed to fetch listing details");
    }

    return res.json();

}

export async function fetchAtLeast3Listings(): Promise<ListingsResponseType> {
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

        if (listingsMap.size >= 3) break;
    }

    const shuffled = shuffleArray(Array.from(listingsMap.values())).slice(0, 3);

    return {
        listings: shuffled,
        paging: {
            page: 1,
            limit: 3,
            count: shuffled.length,
            total_pages: 1,
            total_count: shuffled.length
        }
    };
}
