"use server";

import axios from "@/lib/axios";
import { actionClient } from "@/lib/safe-action"
import { loginSchema } from "@/schema/auth";
import { AuthLoginResponse } from "@/types/Auth";
import { AxiosError } from "axios";
import { flattenValidationErrors } from "next-safe-action";

export const useLoginUser = actionClient
    .schema(loginSchema, {
        handleValidationErrorsShape: (ve) =>
            Promise.resolve(flattenValidationErrors(ve).fieldErrors),
    })
    .action(async ({ parsedInput: { email, password } }) => {
        try {
            const res = await axios.post<AuthLoginResponse>("/auth/login",
                {
                    email, password
                });

            return res.data
        } catch (err) {
            const error = err as AxiosError<{ message?: string }>;
            throw new Error(error?.response?.data?.message || "Signin failed");
        }
    });
