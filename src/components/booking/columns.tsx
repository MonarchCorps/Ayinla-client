"use client";

import type { BookingType } from "@/types/Booking";
import type { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { useMemo } from "react";
import { PiQuestion } from "react-icons/pi";

export default function useColumns() {
    return useMemo(() => {
        const columns: ColumnDef<BookingType>[] = [
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
                    ` ${row.user.first_name}  ${row.user.last_name} ${row.user.email}`,
                id: "customer",
                header: "Customer",
                filterFn: "includesString",
                cell: ({ row }) => {
                    const { user } = row.original;
                    const customerName = `${user.first_name} ${user.last_name}`;

                    return (
                        <div className="grid grid-cols-[auto_1fr] items-center space-x-2">
                            <div className="size-10">
                                <div className="w-7 h-7 shrink-0">
                                    <button className="size-full flex items-center justify-center rounded-full" style={{ color: "#fff", background: "#000" }}>
                                        <span className="font-semibold text-base">{customerName?.substring(0, 1)}</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#101828] font-medium mb-1">{customerName}</span>
                                <span className="text-[#475467] text-sm tracking-wide">{user.email}</span>
                            </div>
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
                cell: ({ row }) => <div className="font-normal">{format(new Date(row.original.created_at), "MMM dd, yyyy")}</div>,
            },
            {
                accessorKey: "crew",
                accessorFn: row => row.crew_member_count,
                header: "Crew",
                cell: ({ row }) => row.original.crew_member_count,
            },
            {
                accessorKey: "dayCount",
                accessorFn: row => row.setup_day_count,
                header: "Day Count",
                cell: ({ row }) => {
                    const { setup_day_count } = row.original;
                    return (
                        <span className="border border-solid border-[#B2DDFF] bg-[#EFF4FF] text-[#175CD3] px-2 py-1 rounded-md">
                            {setup_day_count}
                        </span>
                    );
                },
            },
            {
                accessorKey: "cleanup",
                accessorFn: row => row.requires_cleanup,
                header: "Cleanup",
                cell: ({ row }) => String(row.original.requires_cleanup),
            },
            {
                accessorKey: "inspection",
                accessorFn: row => row.requires_inspection,
                header: "Inspection",
                cell: ({ row }) => String(row.original.requires_inspection),
            },
        ];
        return columns;
    }, []);
}
