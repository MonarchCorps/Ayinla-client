import Card from "./card";
import { ListingType } from "@/types/Listing";
import { fetchListings } from "@/app/api/v1/listing";
import InterimState from "@/components/loader/interim-state";
import SetTotalPages from "@/components/set-total-pages";

export default async function AllListing({ query, page }: { query: string; page: number }) {
    const data = await fetchListings(query, page, 10)

    return (
        <>
            <SetTotalPages totalPages={data.paging.total_pages} pagName="all-listings" />
            <div className="grid grid-cols-3 gap-y-6 gap-x-8 mt-14">
                {data.listings.length ? (
                    data.listings.map((listing: ListingType, index: number) => (
                        <Card
                            key={index}
                            listing={listing}
                        />
                    ))
                ) : (
                    <InterimState
                        autoplay
                        loop
                        text={(
                            <p>No listings found for <span className="text-red-400">{query}</span>. Try a different search term.</p>
                        )}
                        wrapperStyle="col-span-full"
                    />
                )}
            </div>
        </>
    );
}
