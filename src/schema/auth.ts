import { z } from "zod";
import parsePhoneNumberFromString from "libphonenumber-js"

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Email must be valid"),
    password: z
        .string()
        .min(1, "Password is required"),
});

export const initiateSignUpSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Email must be valid"),
});


export const completeSignupSchema = z.object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    phone_number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .refine(val => val.startsWith("+"), {
            message: "Phone number must start with a '+' and country code",
        })
        .refine((val) => {
            const phone = parsePhoneNumberFromString(val);
            return phone?.isValid() ?? false;
        }, {
            message: "Phone number is not valid",
        }),
    job_title: z.string().min(1, "Job title is required"),
    password: z.string()
        .min(8, "Minimum of 8 characters")
        .refine(val => /\d/.test(val), {
            message: "Password must contain at least one number",
        })
        .refine(val => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
            message: "Password must contain at least one special character",
        }),
    confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    token: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
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
