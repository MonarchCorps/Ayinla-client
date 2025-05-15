"use client";

import {
    Dialog,
    DialogOverlay,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation";
import React from "react";

export default function ModalLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const handleOpenChange = () => {
        router.back()
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                {children}
            </DialogOverlay>
        </Dialog >
    );
}