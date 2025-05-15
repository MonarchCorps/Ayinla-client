import { CONFIGS } from "@/config";
import InitiateForgotPassword from "@/features/auth/forgot-password/initiate-forgot-password";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Reset Password | Ayinla Films Location (AFL)",
    description: "Forgot your password? Reset it here to regain access to your Ayinla Films account and continue booking film locations.",
    keywords: [
        "Ayinla Films reset password",
        "Forgot password filming platform",
        "Recover film booking account",
        "Password recovery Ayinla Films",
        "Nigerian film industry login help",
    ],
    alternates: {
        canonical: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/forgot-password`,
    },
    openGraph: {
        title: "Forgot Your Password? Reset It Here | Ayinla Films",
        description: "Easily reset your password and get back to managing your film location bookings.",
        url: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/forgot-password`,
        siteName: "Ayinla Films",
    },
    twitter: {
        title: "Reset Your Password | Ayinla Films",
        description: "Recover your account and continue exploring premium filming locations across Nigeria.",
        card: "summary_large_image",
    },
};

export default function ForgotPasswordPage() {
    return (
        <InitiateForgotPassword />
    );
}