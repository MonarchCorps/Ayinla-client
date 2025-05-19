import { z } from "zod";

const baseSchema = z.object({
    crew_member_count: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Crew member count is required")
    ),
    setup_day_count: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Setup day count is required")
    ),
    end_date: z.string().min(1, "End date is required"),
    start_date: z.string().min(1, "Start date is required"),
    end_time: z.string().min(1, "End time is required"),
    start_time: z.string().min(1, "Start time is required"),
    requires_cleanup: z.preprocess(
        (val) => val === "true" || val === true,
        z.boolean()
    ),
    requires_inspection: z.preprocess(
        (val) => val === "true" || val === true,
        z.boolean()
    ),
});

export const editBookingSchema = baseSchema.extend({});

export const createBookingSchema = baseSchema.extend({
    slug: z.string().min(1, "Slug is required"),
});
