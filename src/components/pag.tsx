"use client";

import Pagination from "@mui/material/Pagination";
import { KeyName, usePagination } from "@/context/PaginationContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

export default function Pag({
    currentPage,
    pagName
}: {
    currentPage: number, pagName: KeyName
}) {

    const { totalPages, setCurrentPage } = usePagination(pagName);
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="flex items-center justify-between mt-10 gap-4 flex-wrap">
                <Button
                    variant="outline"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="select-none"
                >
                    <IoArrowBack className="mr-2 cursor-pointer" />
                    Previous
                </Button>

                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                    sx={{ display: "flex", justifyContent: "center" }}
                />

                <Button
                    variant="outline"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="select-none"
                >
                    Next
                    <IoArrowForward className="ml-2 cursor-pointer" />
                </Button>

            </div>

            <div className="text-sm font-semibold mt-8">
                Page {currentPage} of {totalPages || 0}
            </div>
        </div>
    );
}
