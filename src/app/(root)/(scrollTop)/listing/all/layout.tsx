import { getDefaultMetadata } from "@/lib/metadata";
import { CONFIGS } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = getDefaultMetadata({
    title: "Explore All Filming Locations | Ayinla Films Location (AFL)",
    description:
        "Discover every premium filming location across Nigeria. Browse, compare, and book homes, studios, and outdoor sets tailored to your next production.",
    keywords: [
        "Ayinla Films listings",
        "All film locations Nigeria",
        "Browse filming sets",
        "Studio rental Nigeria",
        "Outdoor shoot locations",
        "Film set marketplace",
        "Production location booking",
    ],
    openGraphTitle: "All Filming Locations | Ayinla Films",
    openGraphDescription:
        "Browse our complete catalogue of homes, studios, and outdoor sets—find the perfect spot for your next movie, ad, or music video.",
    twitterTitle: "Browse All Locations | Ayinla Films",
    twitterDesc:
        "Every premium filming location in Nigeria—homes, studios, and outdoor sets—all in one place. Start exploring now!",
    url: `${CONFIGS.URL.CLIENT_BASE_URL}/listing/all`,
});

export default function ListingAllLayout({
    children,
    allListing,
}: {
    children: React.ReactNode;
    allListing: React.ReactNode;
}) {
    return (
        <div className="max-w-[1340px] px-10 pt-15 pb-30 mx-auto">
            {children}
            {allListing}
        </div>
    );
}
