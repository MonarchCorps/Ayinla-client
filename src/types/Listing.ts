import { PagingType } from "./Paging";

export type AmenitiesType = {
    name: string;
    slug: string;
    type: "building" | "unit"
}

export type ListingParams = {
    allListing?: string;
    page?: number;
    limit?: string;
}

export type ListingType = {
    name: string;
    slug: string;
    state: string;
    lga: string;
    thumbnail_url: string;
    property_type: "apartment" | "house";
    price_kobo: number;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export type ListingsResponseType = {
    listings: ListingType[];
    paging: PagingType;
};

export type SingleListingResponseType =
    ListingType & {
        image_urls: string[];
        description: string;
        amenities: AmenitiesType[];
    };
