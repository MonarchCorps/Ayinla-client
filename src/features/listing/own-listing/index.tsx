import { fetchUserListings } from "@/app/api/v1";
import Table from "./table";
import SetTotalPages from "@/components/set-total-pages";
import { ListingStatus } from "@/types/Listing";

export default async function OwnListing({
    page,
    status
}: {
    page: number; status: ListingStatus
}) {
    const data = await fetchUserListings({ page, statuses: [status], limit: 5 });

    return (
        <>
            <SetTotalPages totalPages={data.paging.total_pages} pagName="own-listings" />
            <Table data={data} />
        </>
    );
}