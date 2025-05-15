import { Button } from "@/components/ui/button";
import CompleteSignUpForm from "@/features/auth/sign-up/complete/complete-sign-up";
import Link from "next/link";

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