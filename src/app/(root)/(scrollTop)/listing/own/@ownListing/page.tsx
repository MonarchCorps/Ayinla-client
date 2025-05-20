import InterimState from "@/components/loader/interim-state";
import Pag from "@/components/pag";
import OwnListing from "@/features/listing/own-listing";
import { ListingStatus } from "@/types/Listing";
import { Suspense } from "react";

export default async function Page({
    searchParams
}: { searchParams: Promise<{ page?: string; status?: string }> }) {
    const params = await searchParams;

    const status = (params.status || "") as ListingStatus;
    const page = Number(params.page || 1);

    return (
        <div className="mt-6">
            <Suspense
                fallback={(
                    <InterimState
                        text="Loading your Listings..."
                        autoplay
                    />
                )}>
                <OwnListing
                    page={page}
                    status={status}
                />
            </Suspense>
            <Pag currentPage={page} pagName="own-listings" />
        </div>
    );
}