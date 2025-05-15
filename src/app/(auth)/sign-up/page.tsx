import { CONFIGS } from "@/config";
import SignUp from "@/features/auth/sign-up";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Account | Ayinla Films Location (AFL)",
    description: "Join Ayinla Films to discover and book top filming locations in Nigeria.",
    keywords: [
        "Sign up Ayinla Films",
        "Create filming location account",
        "Register for film location booking",
        "Join Nigerian film industry platform",
        "Production set registration Nigeria",
    ],
    alternates: {
        canonical: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/sign-up`,
    },
    openGraph: {
        title: "Create Your Ayinla Films Account",
        description: "Sign up to book filming locations and manage your film projects easily.",
        url: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/sign-up`,
        siteName: "Ayinla Films",
    },
    twitter: {
        title: "Join Ayinla Films | Sign Up",
        description: "Create your free account and start booking top film sets in Nigeria.",
        card: "summary_large_image",
    },
};

export default function SignUpPage() {
    return <SignUp />
}