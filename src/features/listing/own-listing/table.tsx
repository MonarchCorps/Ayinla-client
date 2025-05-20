"use client";

import { OwnListingResponseType } from "@/types/Listing";
import useColumns from "../columns";
import OwnListingTable from "../table-content";

export default function Table({
    data
}: {
    data: OwnListingResponseType
}) {
    const columns = useColumns();

    return (
        <OwnListingTable
            data={data.listings}
            columns={columns}
        />
    );
}