import { Button } from "@/components/ui/button";
import { CONFIGS } from "@/config";
import CompleteSignUpForm from "@/features/auth/sign-up/complete/complete-sign-up";
import { getDefaultMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = getDefaultMetadata({
    title: "Account Created | Ayinla Films Location (AFL)",
    description: "Welcome to Ayinla Films! Start discovering and booking top filming locations across Nigeria.",
    keywords: [
        "Ayinla Films sign up complete",
        "Account created film platform",
        "Welcome to Ayinla Films",
        "Start booking movie sets",
        "Filming locations Nigeria",
    ],
    canonicalUrl: `${CONFIGS.URL.CLIENT_BASE_URL}/sign-up/complete`,
    twitterTitle: "You're In! | Ayinla Films",
    twitterDesc: "Account created. Begin booking unique filming spots across Nigeria.",
    openGraphTitle: "Welcome to Ayinla Films",
    openGraphDescription: "Your account is ready. Start booking premium filming locations today.",
})

export default async function CompleteSignupPage({
    searchParams
}: { searchParams: Promise<{ t?: string }> }) {
    const { t } = await searchParams

    if (!t) {
        return (
            <section className="h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">Invalid Signup Token</h2>
                <p className="text-gray-600 mb-4">
                    The signup token is missing or invalid.
                </p>
                <Button
                    className="cursor-pointer"
                    asChild
                >
                    <Link href={"/"} replace>
                        Go Home
                    </Link>
                </Button>
            </section>
        )
    }

    return <CompleteSignUpForm token={t} />
}