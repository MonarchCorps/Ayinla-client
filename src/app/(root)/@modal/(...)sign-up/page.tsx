import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import InitiateSignUpForm from "@/features/auth/sign-up/initiate-sign-up";

export default function SignUpPage() {
    return (
        <DialogContent className="rounded-none mt-6" primitiveClassname="hidden">
            <DialogTitle className="!sr-only">
                Create an account
            </DialogTitle>
            <InitiateSignUpForm
                shouldAnimate={false}
                showImage={false}
                shouldReplace={true}
            />
        </DialogContent>
    );
}