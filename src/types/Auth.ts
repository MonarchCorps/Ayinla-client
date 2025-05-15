import type {
    initiateSignUpSchema,
    completeSignupSchema,
    loginSchema,
} from "@/schema/auth";
import type { ISOStringFormat } from "date-fns";
import type { z } from "zod";

export type UserRoles =
    | "super_admin"
    | "booking_manager"
    | "listing_manager"
    | "user";

export type UserType = {
    id: string;
    google_connected: boolean;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    job_title: string;
    role: UserRoles;
    scopes: string[];
    profile_picture_url: string;
};

export type AuthContextType = {
    auth: AuthType | null;
    setAuth: (
        newAuth: AuthType,
        persist: boolean,
        authToken: {
            token: string;
            token_expires_at: string;
        }
    ) => void;
};

export type AuthType = {
    user: UserType;
};

export type AuthLoginProps = {
    email: string;
    password: string;
};

export type AuthResponse = AuthType & {
    access_token: string;
    token_expires_at: ISOStringFormat;
};

export type loginSchemaType = z.infer<typeof loginSchema>;
export type initiateSignUpSchemaType = z.infer<typeof initiateSignUpSchema>;
export type completeSignUpSchemaType = z.infer<typeof completeSignupSchema>;
