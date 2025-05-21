import FormInputField from "@/components/form/FormInputField";
import FormSelectField from "@/components/form/FormSelectField";
import { Button } from "@/components/ui/button";
import { InputMode } from "@/types/Form";
import { StateResponseType } from "@/types/State";
import Image from "next/image";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

export default function Step1({
    states
}: {
    states: StateResponseType
}) {
    const form = useFormContext();
    const selectedState = form.watch("state");

    const stateOptions = useMemo(() => {
        return (
            states.states
                ?.map(state => ({
                    label: state.name,
                    value: state.name,
                }))
                .sort((a, b) => a.label.localeCompare(b.label)) ?? []
        );
    }, [states]);

    const lgaOptions = useMemo(() => {
        const selectedLgas
            = states?.states?.find(state => state.name === selectedState)?.lgas ?? [];

        return selectedLgas
            .map((lga: { name: string }) => ({
                label: lga.name,
                value: lga.name,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, [states, selectedState]);

    return (
        <div className="grid grid-cols-2 gap-x-20">
            <div>
                <div className="border-b border-solid pb-5">
                    <h1 className="font-medium text-3xl/relaxed text-[#223A6A]">
                        Detailed address
                    </h1>
                    <p className="text-[#475467] text-base/relaxed">
                        Guess will only get detailed address after booking
                    </p>
                </div>
                <div className="mt-6 space-y-5">
                    <FormInputField
                        name="name"
                        label="Name"
                    />

                    <div className="w-full grid grid-cols-2 gap-x-3">
                        <FormSelectField
                            label="State"
                            name="state"
                            options={stateOptions}
                            placeholder={"Select a State"}
                        />

                        <FormSelectField
                            label="Local Government Area"
                            name="local_government_area"
                            options={lgaOptions}
                            placeholder="Select LGA"
                        />

                    </div>

                    <div className="w-full grid grid-cols-2 gap-x-3">
                        <FormInputField
                            name="size_sqft"
                            label="Size Sqft"
                            inputType="number"
                            inputMode={InputMode.Numeric}
                        />

                        <FormInputField
                            label="Price in naira"
                            name="price_kobo"
                            inputType="number"
                            inputMode={InputMode.Numeric}
                        />
                    </div>

                    <FormSelectField
                        label="Tags"
                        name="tags"
                        isCreatableSelect
                        isMulti
                        options={[]}
                        placeholder="Select or Create Tags"
                    />

                    <FormInputField
                        label="Phone Number"
                        name="contact_phone_number"
                        inputType="text"
                    />

                    <FormInputField
                        label="Address"
                        name="address"
                        textarea
                        inputStyles="h-40 max-h-50"
                    />
                    <div className="flex items-center justify-end">
                        <Button
                            type="submit"
                            className="h-12 w-50 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-xl"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <div className="pt-20">
                <Image
                    src="/images/location.png"
                    alt="Location"
                    width={500}
                    height={500}
                    className="object-contain"
                />
            </div>
        </div>
    );
}