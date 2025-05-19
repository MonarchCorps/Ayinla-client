import { Button } from "@/components/ui/button";
import { CONFIGS } from "@/config";
import CompleteForgotPassword from "@/features/auth/forgot-password/complete/complete-forgot-password";
import { getDefaultMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = getDefaultMetadata({
    title: "Password Reset Successful | Ayinla Films Location (AFL)",
    description: "Your password has been reset. Log in now to continue booking premium filming locations across Nigeria.",
    keywords: [
        "Ayinla Films password reset complete",
        "Password successfully changed",
        "Login after reset",
        "Film platform reset complete",
        "Access restored Ayinla Films",
    ],
    canonicalUrl: `${CONFIGS.URL.CLIENT_BASE_URL}/forgot-password/complete`,
    twitterTitle: "You're All Set | Ayinla Films",
    twitterDesc: "Password reset complete. Get back to discovering and booking film sets.",
    openGraphTitle: "Password Changed Successfully | Ayinla Films",
    openGraphDescription: "You're all set. Log in and explore Nigeria’s best filming locations now.",
})

export default async function CompleteForgotPasswordPage({
    searchParams
}: { searchParams: Promise<{ t?: string }> }) {
    const { t } = await searchParams

    if (!t) {
        return (
            <section className="h-screen flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-semibold mb-2">Invalid password recovery Token</h2>
                <p className="text-gray-600 mb-4">
                    The password recovery token is missing or invalid.
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

    return <CompleteForgotPassword token={t} />
}