import { CONFIGS } from "@/config";
import { getDefaultMetadata } from "@/lib/metadata";
import { Metadata } from "next";
import { Button } from "../ui/button";

export const metadata: Metadata = getDefaultMetadata({
    title: "Property Listings",
    description: "Explore a curated list of premium locations perfect for your film, photography, or event production.",
    url: `${CONFIGS.URL.CLIENT_BASE_URL}/listing`,
    keywords: [
        "location listings",
        "film locations",
        "shooting locations",
        "rent spaces for film",
        "Ayinla film listings"
    ],
    alt: "List of film and event locations available for booking",
    twitterTitle: "Browse Film Location Listings - Ayinla Films",
    twitterDesc: "Find the perfect location for your next film or photo shoot from Ayinla’s curated list of top-rated venues.",
});

export default function Listing() {
    return (
        <section className="relative h-[98vh] clip w-full overflow-hidden">
            <div className="relative h-full w-full bg-gradient-to-b from-black/40 via-black/50 to-transparent">
                <img
                    src={"/images/listing-hero.webp"}
                    alt="Listing"
                    className="absolute"
                />

                <div className="relative z-10 h-full flex flex-col justify-end gap-y-2 pb-20 max-w-[900px] px-10 text-[#FFFFFF]">
                    <h1 className="font-bold text-5xl leading-[1.3] max-w-[40rem]">Earn Money For Listing Your space</h1>
                    <Button
                        type="submit"
                        className="mt-4 w-fit cursor-pointer py-7.5 px-10 bg-[#23396A] hover:bg-[#23396A] text-[#fff] rounded-none font-medium border border-solid border-[#23396A]"
                    >
                        <span className="text-base font-semibold tracking-wider">Get Started Now</span>
                    </Button>
                </div>
            </div>
        </section>
    );
}