import FormInputField from "@/components/form/FormInputField";
import FormSelectField from "@/components/form/FormSelectField";
import { Button } from "@/components/ui/button";
import { AmenitiesResponseType } from "@/types/Listing";
import { useMemo } from "react";

export default function Step3({
    amenities,
    isExecuting
}: { amenities: AmenitiesResponseType; isExecuting: boolean }) {

    const amenityOptions = useMemo(() => {
        return (
            amenities?.amenities
                ?.map(amenity => ({
                    label: amenity.name,
                    value: amenity.slug,
                }))
                .sort((a, b) => a.label.localeCompare(b.label)) ?? []
        );
    }, [amenities]);

    return (
        <div>
            <h1 className="font-medium text-3xl/relaxed mb-8">
                New Listing
            </h1>
            <div className="max-w-[40rem] mx-auto">
                <div className="border-b border-solid pb-5">
                    <h2 className="font-semibold text-2xl/relaxed text-[#223A6A]">Property Listing</h2>
                    <p className="text-[#475467]">More detailed information about your property</p>
                </div>
                <div className="mt-6 space-y-5">
                    <FormSelectField
                        name="property_type"
                        label="Type of Property"
                        options={[{
                            value: "apartment",
                            label: "Apartment",
                        }, {
                            value: "house",
                            label: "House",
                        }]}
                        placeholder="Select or create property type"
                    />

                    <FormSelectField
                        name="amenity_slugs"
                        label="Amenities"
                        isMulti
                        options={amenityOptions}
                        placeholder="Select amenities"
                    />

                    <FormInputField
                        label="Description"
                        name="description"
                        textarea
                        inputStyles="h-40 max-h-50"
                    />

                    <div className="flex items-center justify-end">
                        <Button
                            type="submit"
                            className="h-12 w-50 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-xl"
                            disabled={isExecuting}
                        >
                            Create
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}