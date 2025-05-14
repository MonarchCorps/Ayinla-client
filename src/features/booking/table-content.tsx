"use client";

import type { BookingType } from "@/types/Booking";
import type {
    ColumnDef,
    SortingState,
    VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Pagination from "@mui/material/Pagination";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

type Props = {
    data: BookingType[];
    totalCount?: number;
    pageIndex?: number;
    pageSize?: number;
    setPageIndex?: (index: number) => void;
    isLoading?: boolean;
    columns: ColumnDef<BookingType>[];
};

export default function BookingTable({
    data,
    columns,
    totalCount,
    pageSize,
    pageIndex,
    setPageIndex,
    isLoading,
}: Props) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filtering, setFiltering] = useState("");
    const [columnVisibility, setColumnVisibility]
        = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            globalFilter: filtering,
            columnVisibility,
            rowSelection,
        },
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setFiltering,
        enableGlobalFilter: true,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    return (
        <>
            <div className="flex items-center py-4 gap-y-4 max-[486px]:flex-col max-[486px]:items-start">
                <Input
                    placeholder="Filter by name, phone, email..."
                    value={filtering}
                    onChange={e => setFiltering(e.target.value)}
                    className="mr-5"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                            {" "}
                            <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table.getAllColumns()
                            .filter(col => col.getCanHide())
                            .map(col => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    className="capitalize"
                                    checked={col.getIsVisible()}
                                    onCheckedChange={v => col.toggleVisibility(!!v)}
                                >
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-2xl border overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#F9FAFB]">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="first:pl-5">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading
                            ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="text-center h-40">
                                        <Spinner size="large" className="text-[#23396A]" />
                                    </TableCell>
                                </TableRow>
                            )
                            : (
                                table.getRowModel().rows.length > 0
                                    ? (
                                        table.getRowModel().rows.map(row => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map(cell => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="py-3.5 first:pl-5 px-5 text-[#475467]"
                                                    >
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    )
                                    : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={columns.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )
                            )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-between px-5 py-3 border-t">
                    <Button
                        variant="outline"
                        onClick={() => setPageIndex?.((pageIndex ?? 0) - 1)}
                        disabled={(pageIndex ?? 0) <= 0}
                        className="select-none"
                    >
                        <IoArrowBack />
                        Previous
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => setPageIndex?.((pageIndex ?? 0) + 1)}
                        disabled={(pageIndex ?? 0) + 1 >= Math.ceil((totalCount ?? 0) / (pageSize ?? 1))}
                        className="select-none"
                    >
                        Next
                        <IoArrowForward />
                    </Button>
                </div>

                <div className="grid place-content-center pb-4">
                    <Pagination
                        count={Math.ceil((totalCount ?? 0) / (pageSize ?? 0))}
                        page={(pageIndex ?? 0) + 1}
                        onChange={(_, page) => setPageIndex?.(page - 1)}
                    />
                </div>

                <div className="my-5 mx-5 flex items-center justify-end">
                    <p>
                        Page
                        {" "}
                        {(pageIndex ?? 0) + 1}
                        {" "}
                        of
                        {" "}
                        {Math.ceil((totalCount ?? 0) / (pageSize ?? 0)) || 0}
                    </p>
                </div>
            </div>
        </>
    );
}
