import HowItWorks from "@/features/how-it-works";
import Listing from "@/features/listing";

export default function ListingPage() {
    return (
        <div className="bg-[#F1F9FF]">
            <Listing />
            <HowItWorks />
        </div>
    );
}