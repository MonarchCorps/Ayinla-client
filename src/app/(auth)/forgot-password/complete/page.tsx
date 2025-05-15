import { Button } from "@/components/ui/button";
import CompleteForgotPassword from "@/features/auth/forgot-password/complete/complete-forgot-password";
import Link from "next/link";

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