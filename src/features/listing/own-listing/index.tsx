import { fetchUserListings } from "@/app/api/v1/listing";
import Table from "./table";
import SetTotalPages from "@/components/set-total-pages";
import { ListingStatus } from "@/types/Listing";

export default async function OwnListing({
    page,
    status = "all",
}: {
    page: number;
    status?: ListingStatus | "all" | "";
}) {
    const statuses: ListingStatus[] =
        status !== "all" && status !== "" ? [status as ListingStatus] : [];

    const data = await fetchUserListings({
        page,
        statuses,
        limit: 5,
    });

    return (
        <>
            <SetTotalPages totalPages={data.paging.total_pages} pagName="own-listings" />
            <Table data={data} />
        </>
    );
}
