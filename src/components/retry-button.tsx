"use client";

import { Button } from "./ui/button";

export default function RetryButton({
    onClick
}: { onClick: () => void }) {
    return (
        <Button onClick={() => onClick()} className="cursor-pointer">
            Refetch Data
        </Button>
    );
}
