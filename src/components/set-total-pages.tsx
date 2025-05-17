"use client";

import { usePagination } from "@/context/PaginationContext";
import { useEffect } from "react";

export default function SetTotalPages({ totalPages }: { totalPages: number }) {
    const { setTotalPages } = usePagination("all-listings");
    useEffect(() => {
        setTotalPages(totalPages);
    }, [totalPages]);
    return null;
}