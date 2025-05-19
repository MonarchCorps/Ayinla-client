import SignInForm from "@/features/auth/sign-in/sign-in-form";
import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"

export default async function SignInPage({
    searchParams
}: { searchParams: Promise<{ redirectTo?: string }> }) {
    const { redirectTo } = await searchParams;

    return (
        <DialogContent className="rounded-none mt-6" primitiveClassname="hidden">
            <DialogTitle className="!sr-only">
                Sign In
            </DialogTitle>
            <SignInForm
                showImage={false}
                shouldReplace={true}
                shouldAnimate={false}
                redirectTo={redirectTo || ""}
            />
        </DialogContent>
    );
}