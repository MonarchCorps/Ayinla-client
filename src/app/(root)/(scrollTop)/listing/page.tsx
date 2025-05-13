import HowItWorks from "@/components/how-it-works";
import Listing from "@/components/listing";

export default function ListingPage() {
    return (
        <main className="min-h-full">
            <div className="bg-[#F1F9FF]">
                <Listing />
                <HowItWorks />
            </div>
        </main>
    );
}