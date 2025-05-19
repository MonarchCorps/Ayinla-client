"use client";

import { usePagination } from "@/context/PaginationContext";
import { useEffect } from "react";

export default function SetTotalPages({ totalPages }: { totalPages: number }) {
    const { setTotalPages, totalPages: currentTotalPages } = usePagination("all-listings");

    useEffect(() => {
        if (currentTotalPages !== totalPages) {
            setTotalPages(totalPages);
        }
    }, [totalPages, currentTotalPages, setTotalPages]);

    return null;
}
