"use server";

import { CONFIGS } from "@/config";
import axios from "@/lib/axios";
import { createSafeAction } from "@/lib/safe-action"
import { completeSignupSchema, initiateSignUpSchema, loginSchema } from "@/schema/auth";
import { AuthResponse } from "@/types/Auth";

export const useLoginUser = createSafeAction(loginSchema, async ({ parsedInput }) => {
    const { email, password } = parsedInput;
    const res = await axios.post("/auth/login", {
        email,
        password,
    });

    return res.data;
});

export const useInitiateSignUp = createSafeAction(initiateSignUpSchema, async ({ parsedInput }) => {
    const { email } = parsedInput;
    await axios.post("/auth/initiate-signup", {
        email,
        base_url: `${CONFIGS.URL.CLIENT_BASE_URL}/sign-up/complete`,
    });

    return { message: "Success" };
});

export const useCompleteSignup = createSafeAction(completeSignupSchema, async ({ parsedInput }) => {
    const res = await axios.post("/auth/complete-signup", {
        ...parsedInput
    });

    return res.data;
})