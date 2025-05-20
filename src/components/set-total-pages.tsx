"use client";

import { KeyName, usePagination } from "@/context/PaginationContext";
import { useEffect } from "react";

export default function SetTotalPages({
    totalPages,
    pagName
}: {
    totalPages: number, pagName: KeyName
}) {

    const { setTotalPages, totalPages: currentTotalPages } = usePagination(pagName);

    useEffect(() => {
        if (currentTotalPages !== totalPages) {
            setTotalPages(totalPages);
        }
    }, [totalPages, currentTotalPages, setTotalPages]);

    return null;
}
