import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod"

const baseSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    state: z.string().min(1, "State is required"),
    local_government_area: z.string().min(1, "LGA is required"),
    contact_phone_number: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .refine(val => val.startsWith("+"), {
            message: "Phone number must start with a '+' and country code",
        })
        .refine((val) => {
            const phone = parsePhoneNumberFromString(val);
            return phone?.isValid() ?? false;
        }, {
            message: "Phone number is not valid",
        }),
    address: z.string().min(1, "Address is required"),
    property_type: z.string().min(1, "Property Type is required"),
    size_sqft: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Area Size is required")
    ),
    tags: z.array(z.string()).min(1, "Tags are required"),
    amenity_slugs: z.array(z.string()).min(1, "Amenities are required"),
    price_kobo: z.preprocess(
        (val) => Number(val),
        z.number().min(1, "Price is required")
    )
});


export const createListingFormSchema = baseSchema.extend({
    image: z
        .array(z.instanceof(File))
        .min(4, "At least 4 images are required")
        .refine(
            files => files.every(file => file.type.startsWith("image/")),
            { message: "All files must be images" },
        )
        .refine(
            files => files.every(file => file.size <= 5 * 1024 * 1024),
            { message: "Each image must be under 5MB" },
        ),
});