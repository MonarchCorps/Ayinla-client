import Booking from "@/features/booking";
import GeneralFaqs from "@/features/faq/general-faqs";
import TopLocations from "@/features/top-location";
import { CONFIGS } from "@/config";
import { getDefaultMetadata } from "@/lib/metadata";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
    return getDefaultMetadata({
        title: "Booking Film Locations",
        description:
            "Search and book stunning filming locations across Nigeria. From studios to outdoor sets, Ayinla Films has it all.",
        url: `${CONFIGS.URL.CLIENT_BASE_URL}/booking`,
        image: CONFIGS.IMAGE,
        keywords: [
            "Book film location Nigeria",
            "Studio rentals Nigeria",
            "Video shoot spaces",
            "Movie set booking",
        ],
    });
}

export default function BookingPage() {
    return (
        <div className="bg-[#F1F9FF]">
            <Booking />
            <TopLocations />
            <div>
                <GeneralFaqs />
            </div>
        </div>
    );
}