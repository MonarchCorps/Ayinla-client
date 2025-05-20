import Card from "../listing/all-listing/card";
import { fetchAtLeast3Listings } from "@/app/api/v1/listing";

export default async function RecommendedListing() {
    const data = await fetchAtLeast3Listings(3);

    return (
        data.listings.length && (
            <div>
                <h1 className="text-3xl text-[#2C3C4D] font-medium text-center">
                    You may also like
                </h1>
                <div className="grid grid-cols-3 gap-y-6 gap-x-8 mt-14" >
                    {
                        data.listings.map((listing, index) => (
                            <Card
                                key={index}
                                listing={listing}
                            />
                        ))
                    }
                </div>
            </div >
        )
    );
}
