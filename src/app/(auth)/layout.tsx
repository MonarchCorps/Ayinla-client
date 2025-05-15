import { CONFIGS } from "@/config";
import { getDefaultMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const metadata: Metadata = getDefaultMetadata({
    title: "Authentication",
    description: "Secure login, registration, and account management for Ayinla Films users.",
    keywords: [
        "Login",
        "Register",
        "Authentication",
        "Film production account",
        "Ayinla Films login",
        "Sign Up",
        "Password Reset",
        "User Authentication",
    ],
    url: `${CONFIGS.URL.CLIENT_BASE_URL}/auth`,
    alt: "Authenticate with Ayinla Films",
    twitterTitle: "Authentication",
    twitterDesc: "Access your account or create a new one on Ayinla Films for premium filming location bookings.",
});


export default function AuthLayout({
    children
}: Readonly<{ children: React.ReactNode }>) {
    return children;
}