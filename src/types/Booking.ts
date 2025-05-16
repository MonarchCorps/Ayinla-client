
export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled" | "paid";

export type BookingType = {
    id: string;
    listing_slug: string;
    start_date: string;
    end_date: string;
    start_time: string;
    end_time: string;
    setup_day_count: number;
    crew_member_count: number;
    requires_cleanup: boolean;
    requires_inspection: boolean;
    payment_window_expires_at: string,
    total_price_kobo: number,
    status: string;
    created_at: string;
    updated_at: string;
    user: {
        first_name: string;
        last_name: string;
        email: string;
        profile_picture_url?: string;
    };
};