import CreateBooking from "@/features/booking/create/create-booking-form";
import { getDefaultMetadata } from "@/lib/metadata";
import { fetchListingDetails } from "@/app/api/v1/listing";
import { Metadata } from "next";

type Params = { slug: string };

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug?: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const { listing } = await fetchListingDetails(slug || "");

    const priceNaira = (listing.price_kobo / 100).toLocaleString("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
    });

    const shortDesc =
        listing.description.length > 160
            ? listing.description.slice(0, 157) + "…"
            : listing.description;

    return getDefaultMetadata({
        title: `Book “${listing.name}” — ${priceNaira}`,
        description: `Lock in “${listing.name}” for ${priceNaira}. Secure this premium filming location in ${listing.state}, ${listing.lga} with Ayinla Films today.`,
        keywords: [
            listing.name,
            listing.state,
            listing.lga,
            ...(listing?.tags || []),
            "Ayinla Films booking",
            "Filming location Nigeria",
        ],
        openGraphTitle: `Reserve “${listing.name}” | Ayinla Films`,
        openGraphDescription: shortDesc,
        twitterTitle: `Book “${listing.name}” for ${priceNaira}`,
        twitterDesc: shortDesc,
        url: `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/listing/${slug}/book`,
    });
}

export default async function CreateBookingPage({
    params,
}: {
    params: Promise<Params>;
}) {
    const { slug } = await params;

    return (
        <CreateBooking
            slug={slug}
            wrapperStyles="max-w-[50rem] mx-auto px-10 my-16"
        />
    );
}
