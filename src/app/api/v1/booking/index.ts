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

        const res = await axios.post<{ booking: BookingType }>(`${CONFIGS.URL.API_BASE_URL}/listings/${parsedInput.slug}/bookings`, {
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