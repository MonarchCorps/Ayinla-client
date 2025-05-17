import AllListing from "@/features/listing/all-listing";
import Pag from "@/features/listing/all-listing/pag";
import InterimState from "@/components/loader/interim-state";
import { ListingParams } from "@/types/Listing";
import { Suspense } from "react";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<ListingParams>;
}) {
    const params = await searchParams;
    const query = params.allListing || "mountain";
    const page = Number(params.page || 1);

    if (query.length <= 2) {
        return (
            <InterimState
                text="Enter more than 2 search keywords..."
                textStyle="animate-pulse"
            />
        );
    }

    return (
        <div className="mt-6">
            <Suspense fallback={(
                <InterimState text="Loading Listings..." autoplay loop />
            )}>
                <AllListing query={query} page={page} />
            </Suspense>
            <Pag currentPage={page} />
        </div>
    );
}
