import { fetchListingDetails } from "@/app/api/v1";
import Overview from "./overview";
import Details from "./details";
import Gallery from "./gallery";

export default async function SingleListing({ slug }: { slug: string }) {
    const data = await fetchListingDetails(slug)

    return (
        <>
            <Overview data={{
                slug: data.listing.slug,
                thumbnail_url: data.listing.thumbnail_url,
                image_urls: data.listing.image_urls,
                price_kobo: data.listing.price_kobo,
                state: data.listing.state,
                lga: data.listing.lga,
                name: data.listing.name,
                tags: data.listing.tags,
                amenities: data.listing.amenities,
            }} />
            <Details
                data={{
                    description: data.listing.description,
                    amenities: data.listing.amenities
                }}
            />
            <Gallery data={{ image_urls: data.listing.image_urls }} />
        </>
    );
}