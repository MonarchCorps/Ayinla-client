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
import { ListingsResponseType } from "@/types/Listing";

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