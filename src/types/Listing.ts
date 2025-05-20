import { PagingType } from "./Paging";

export type ListingStatus = "approved" | "rejected" | "pending";

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

export type OwnListingType = {
    name: string;
    slug: string;
    status: ListingStatus;
    state: string;
    lga: string;
    reviewed_at: string;
    created_at: string;
    author: {
        first_name: string;
        last_name: string;
        email: string;
        profile_picture_url: string;
    }
}

export type OwnListingResponseType = {
    listings: OwnListingType[];
    paging: PagingType;
}

export type SingleListingResponseType =
    ListingType & {
        image_urls: string[];
        description: string;
        amenities: AmenitiesType[];
    };
