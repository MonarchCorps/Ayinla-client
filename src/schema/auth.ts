import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Email must be valid"),
    password: z
        .string()
        .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Email must be valid"),
});

export const resetPasswordSchema = z.object({
    new_password: z
        .string()
        .min(1, "New password is required"),
});
