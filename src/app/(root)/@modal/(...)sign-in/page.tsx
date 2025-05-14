"use client";

import SignInForm from "@/features/auth/sign-in/sign-in-form";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="rounded-none mt-6" primitiveClassname="hidden">
                    <DialogTitle className="!sr-only">
                        Sign In
                    </DialogTitle>
                    <SignInForm
                        showImage={false}
                    />
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    );
}