import SearchForm from "@/features/listing/all-listing/search-form";
import { ListingParams } from "@/types/Listing";

export default async function AllListingPage({
    searchParams
}: {
    searchParams: Promise<ListingParams>
}) {

    const params = await searchParams;
    const query = params.allListing || "mountain";

    return (
        <>
            <h1 className="font-semibold text-[#414041] text-2xl tracking-wide">Showing Beautiful Interior</h1>
            <SearchForm query={query} />
        </>
    );
}
