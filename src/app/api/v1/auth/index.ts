"use server";

import { CONFIGS } from "@/config";
import axios from "@/lib/axios";
import { createSafeAction } from "@/lib/safe-action";
import {
    completeForgotPasswordSchema,
    completeSignupSchema,
    initiateForgotPasswordSchema,
    initiateSignUpSchema,
    loginSchema
} from "@/schema/auth";
import { AuthResponse } from "@/types/Auth";

const client_base_url = CONFIGS.URL.CLIENT_BASE_URL

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
            base_url: `${client_base_url}/sign-up/complete`,
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
            base_url: `${client_base_url}/forgot-password/complete`
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
