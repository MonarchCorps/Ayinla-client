import { CONFIGS } from "@/config";
import CreateListing from "@/features/listing/own-listing/create";
import { AmenitiesResponseType } from "@/types/Listing";
import { StateResponseType } from "@/types/State";

export default async function CreateListingPage() {
    const stateResponse = await fetch(`${CONFIGS.URL.API_BASE_URL}/states`, {
        next: { revalidate: 60 * 60 * 24 * 30 * 6 }, // 6 months in seconds
    });

    const amenitiesResponse = await fetch(`${CONFIGS.URL.API_BASE_URL}/amenities`, {
        next: { revalidate: 60 * 60 * 24 * 30 * 6 }, // 6 months in seconds
    });

    const states: StateResponseType = await stateResponse.json();
    const amenities: AmenitiesResponseType = await amenitiesResponse.json();

    return (
        <CreateListing
            states={states}
            amenities={amenities}
        />
    );
}