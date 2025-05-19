import AllListing from "@/features/listing/all-listing";
import Pag from "@/features/listing/all-listing/pag";
import InterimState from "@/components/loader/interim-state";
import { ListingParams } from "@/types/Listing";
import { getDefaultMetadata } from "@/lib/metadata";
import { CONFIGS } from "@/config";
import { Metadata } from "next";
import { Suspense } from "react";

type SearchParams = {
    allListing?: string;
    page?: string;
};

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
    const params = await searchParams;

    const query = params.allListing?.trim() || "mountain";
    const page = Number(params.page || 1);

    const capitalized =
        query.charAt(0).toUpperCase() + query.slice(1).toLowerCase();
    const isFirstPage = page === 1;

    return getDefaultMetadata({
        title: isFirstPage
            ? `Search results for “${capitalized}”`
            : `“${capitalized}” — Page ${page}`,
        description: isFirstPage
            ? `Browse all premium filming locations matching “${capitalized}” in Nigeria. Find, compare, and book your ideal set today.`
            : `Page ${page} of filming locations for “${capitalized}”. Continue exploring and booking with Ayinla Films.`,
        keywords: [
            capitalized,
            "filming locations Nigeria",
            "film set search",
            "Ayinla Films listings",
            "movie set booking",
        ],
        openGraphTitle: isFirstPage
            ? `Search: ${capitalized} | Ayinla Films`
            : `Search: ${capitalized} (Page ${page}) | Ayinla Films`,
        openGraphDescription: isFirstPage
            ? `Discover “${capitalized}” filming spots—homes, studios & outdoor sets—across Nigeria.`
            : `More “${capitalized}” filming locations—page ${page}—on Ayinla Films.`,
        twitterTitle: isFirstPage
            ? `Results for “${capitalized}” | Ayinla Films`
            : `Results for “${capitalized}” (Page ${page})`,
        twitterDesc: isFirstPage
            ? `Finding the best filming locations for “${capitalized}” in Nigeria.`
            : `Page ${page} of “${capitalized}” filming location results.`,
        url: `${CONFIGS.URL.CLIENT_BASE_URL}/listing/all?allListing=${encodeURIComponent(
            query
        )}${!isFirstPage ? `&page=${page}` : ""}`,
    });
}

export default async function Page({
    searchParams: promiseParams,
}: {
    searchParams: Promise<ListingParams>;
}) {
    const params = await promiseParams;
    const query = params.allListing?.trim() || "mountain";
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
            <Suspense
                fallback={<InterimState text="Loading Listings..." autoplay loop />}
            >
                <AllListing query={query} page={page} />
            </Suspense>
            <Pag currentPage={page} />
        </div>
    );
}
