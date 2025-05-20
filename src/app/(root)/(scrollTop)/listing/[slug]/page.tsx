import { CONFIGS } from "@/config";
import { fetchListingDetails } from "@/app/api/v1/listing";
import { Metadata } from "next";
import SingleListing from "@/features/listing/single-listing";
import InterimState from "@/components/loader/interim-state";
import RecommendedListing from "@/features/related/recommended-listing";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Params = { slug: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { listing } = await fetchListingDetails(slug || "");

    const title = `${listing.name} — ₦${(listing.price_kobo / 100).toLocaleString()}`;
    const description =
        listing.description.length > 150
            ? listing.description.slice(0, 147) + "…"
            : listing.description;

    const keywords = [
        listing.name,
        listing.state,
        listing.lga,
        ...(listing.tags ?? []),
        "Filming location Nigeria",
        "Book film set",
    ];

    return {
        title,
        description,
        keywords,
        alternates: {
            canonical: `${CONFIGS.URL.CLIENT_BASE_URL}/listing/${slug}/book`,
        },
        openGraph: {
            title,
            description,
            url: `${CONFIGS.URL.CLIENT_BASE_URL}/listing/${slug}/book`,
            images: listing.image_urls.map((url) => ({ url, width: 1200, height: 630 })),
            siteName: "Ayinla Films",
        },
        twitter: {
            title,
            description,
            card: "summary_large_image",
            images: listing.image_urls[0],
        },
    };
}

export default async function ListingDetailsPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;

    return (
        <div className="max-w-[1340px] p-10 pt-20 mx-auto">
            <Suspense
                fallback={<InterimState text="Loading Listing details..." autoplay loop />}
            >
                <SingleListing slug={slug} />
            </Suspense>
            <section className="mt-13">
                <RecommendedListing />
                <div className="grid place-content-center">
                    <Button
                        className="mt-20 w-fit py-6 px-9 rounded-none bg-[#23396A] hover:bg-[#23396A] hover:rounded-3xl"
                        asChild
                    >
                        <Link href="/listing/all" scroll={false}>
                            Explore All Listings
                            <ArrowRight size={20} />
                        </Link>
                    </Button>
                </div>
            </section>
        </div>
    );
}
