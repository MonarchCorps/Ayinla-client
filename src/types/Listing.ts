import { PagingType } from "./Paging";

export type ListingParams = {
    query?: string;
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