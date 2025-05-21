"use server";

import { CONFIGS } from "@/config";
import axios from "@/lib/axios";
import { createSafeAction } from "@/lib/safe-action";
import { createBookingSchema } from "@/schema/booking";
import { BookingType } from "@/types/Booking";
import { cookies } from "next/headers";

export const useCreateBooking = createSafeAction(
    createBookingSchema,
    async ({ parsedInput }) => {
        const cookieStore = await cookies();
        const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

        const res = await axios.post<{ booking: BookingType }>(`/listings/${parsedInput.slug}/bookings`, {
            ...parsedInput,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            withCredentials: false
        })

        return res.data
    }
);

export const fetchBookingHistory = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get(CONFIGS.STORAGE_NAME.token)?.value;

    try {
        const res = await fetch("/bookings", {
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            }
        });

        const data: { booking: BookingType } = await res.json();
        return data;

    } catch (error) {
        console.log(error)
    }
}