import type { ColumnDef } from "@tanstack/react-table";
import type { ListingStatus, OwnListingType } from "@/types/Listing";

import { Checkbox } from "@/components/ui/checkbox";
import clsx from "clsx";
import { format } from "date-fns";
import { useMemo } from "react";
import { FaArrowDown } from "react-icons/fa";
import { PiQuestion } from "react-icons/pi";
import Link from "next/link";
import { FaEye } from "react-icons/fa6";

export default function useColumns() {
    return useMemo(() => {
        const columns: ColumnDef<OwnListingType>[] = [
            {
                id: "select",
                header: ({ table }) => (
                    <Checkbox
                        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
                        aria-label="Select all"
                        className="size-5"
                    />
                ),
                cell: ({ row }) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={value => row.toggleSelected(!!value)}
                        aria-label="Select row"
                        className="size-5"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },
            {
                accessorFn: row =>
                    ` ${row.author.first_name}  ${row.author.last_name} ${row.author.email}`,
                id: "customer",
                header: "Customer",
                filterFn: "includesString",
                cell: ({ row }) => {
                    const { author } = row.original;
                    const customerName = `${author.first_name} ${author.last_name}`;

                    return (
                        <div className="grid grid-cols-[auto_1fr] items-center space-x-2">
                            <div className="size-10">
                                <div className="w-7 h-7 shrink-0">
                                    <button className="size-full flex items-center justify-center rounded-full" style={{ color: "#fff", background: "#000" }}>
                                        <span className="font-600 font-mon text-base">{customerName?.substring(0, 1)}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#101828] font-500 mb-1">{customerName}</span>
                                <span className="text-[#475467] text-sm tracking-wide">{author.email}</span>
                            </div>
                        </div>
                    );
                },
            },
            {
                accessorKey: "status",
                accessorFn: row => row.status,
                header: ({ column }) => (
                    <div
                        className="flex items-center gap-x-2 cursor-pointer select-none"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Status
                        <FaArrowDown
                            className={clsx(
                                "transition-transform duration-300",
                                column.getIsSorted() === "asc" && "rotate-180",
                                !column.getIsSorted() && "opacity-50",
                            )}
                        />
                    </div>
                ),
                sortingFn: (rowA, rowB, columnId) => {
                    const hierarchy = ["approved", "pending", "rejected"];
                    const a = rowA.getValue(columnId) as ListingStatus;
                    const b = rowB.getValue(columnId) as ListingStatus;

                    return hierarchy.indexOf(a) - hierarchy.indexOf(b);
                },
                cell: ({ row }) => {
                    const status: ListingStatus = row.original.status;

                    return (
                        <div
                            className={clsx(
                                "capitalize px-2 py-1 rounded-md text-sm flex items-center gap-x-2 w-fit border border-solid",
                                status === "approved"
                                    ? "border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]"
                                    : status === "rejected"
                                        ? "border-[#FECDCA] bg-[#FEF3F2] text-[#B42318]"
                                        : status === "pending"
                                            ? "border-[#FBBF24] bg-[#fbbf243b] text-[#D97706]"
                                            : "border-[#0909095c] bg-[#0909095c] text-[#0909095c]",
                            )}
                        >
                            <div
                                className={clsx(
                                    "size-2 rounded-full",
                                    status === "approved"
                                        ? "bg-[#067647]"
                                        : status === "rejected"
                                            ? "bg-[#B42318]"
                                            : status === "pending"
                                                ? "bg-[#D97706]"
                                                : "bg-[#0909095c]",
                                )}
                            />
                            {status}
                        </div>
                    );
                },
            },
            {
                accessorKey: "date",
                header: () => (
                    <div className="flex items-center gap-x-2">
                        Date
                        <PiQuestion className="text-xl" />
                    </div>
                ),
                cell: ({ row }) => <div className="font-400">{format(new Date(row.original.created_at), "MMM dd, yyyy")}</div>,
            },
            {
                accessorKey: "propertyName",
                accessorFn: row => row.name,
                header: "Property Name",
                cell: ({ row }) => row.original.name,
            },
            {
                accessorKey: "location",
                accessorFn: row => row.lga,
                header: "Location",
                cell: ({ row }) => {
                    const { lga } = row.original;
                    return (
                        <span className="border border-solid border-[#B2DDFF] bg-[#EFF4FF] text-[#175CD3] px-2 py-1 rounded-md">
                            {lga}
                        </span>
                    );
                },
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const { slug, status } = row.original;
                    if (!slug || status === "pending" || status === "rejected")
                        return null;


                    return (
                        <Link href={`/listing/${slug}`}>
                            <FaEye className="text-xl cursor-pointer" />
                        </Link>
                    )
                }
            }
        ];
        return columns;
    }, []);
}
