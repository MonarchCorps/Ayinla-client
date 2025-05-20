"use client";

import { useCreateBooking } from "@/app/api/v1/booking";
import FormDatePickerField from "@/components/form/FormDatePicker";
import FormInputField from "@/components/form/FormInputField";
import FormSelectField from "@/components/form/FormSelectField";
import FormTimePickerField from "@/components/form/FormTimePicker";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { createBookingSchema } from "@/schema/booking";
import { CreateBookingSchemaType } from "@/types/Booking";
import { toastActionPromise } from "@/utils/toast-action";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CreateBooking({
    slug,
    wrapperStyles,
}: { slug: string; wrapperStyles?: string }) {

    const router = useRouter();
    const { executeAsync, isExecuting } = useAction(useCreateBooking);
    const form = useForm({
        resolver: zodResolver(createBookingSchema),
        defaultValues: {
            slug,
            crew_member_count: "",
            setup_day_count: "",
            end_date: "",
            start_date: "",
            end_time: "",
            start_time: "",
            requires_cleanup: "false",
            requires_inspection: "false",
        },
    });

    const onSubmit = async (values: CreateBookingSchemaType) => {
        const parsedValues = {
            ...values,
            crew_member_count: values.crew_member_count,
            setup_day_count: values.setup_day_count,
            requires_cleanup: values.requires_cleanup,
            requires_inspection: values.requires_inspection,
        };

        await toastActionPromise(
            executeAsync,
            parsedValues,
            {
                pending: "Creating booking...",
                success: "Booking created",
                error: {
                    render({ data }) {
                        return typeof data === "string" ? data : "Failed to book listing";
                    },
                },
            }
        );

        if (!values.slug) {
            router.push("/booking/history")
        }

        const ts = Date.now();
        router.push(`/listing/${values.slug}/book/sent?ts=${ts}`);

    };

    return (
        <div className={clsx(wrapperStyles)}>
            <h1 className="text-3xl mb-2 text-[#101828] font-semibold">Booking Details</h1>
            <p className="text-[#475467] mb-6">
                Fill in the following details to make your booking schedule
            </p>
            <div className="mt-10 mb-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-4 gap-y-5">

                        <FormDatePickerField
                            label="Start Date"
                            name="start_date"
                            placeholder="Pick a date"
                        />

                        <FormDatePickerField
                            label="End Date"
                            name="end_date"
                            placeholder="Pick a date"
                        />

                        <FormTimePickerField
                            label="Start Time"
                            name="start_time"
                        />

                        <FormTimePickerField
                            label="End Time"
                            name="end_time"
                        />

                        <FormInputField
                            label="Setup day count"
                            name="setup_day_count"
                            inputType="number"
                        />

                        <FormInputField
                            label="Number of Cast and Crew"
                            name="crew_member_count"
                            inputType="number"
                        />

                        <FormSelectField
                            label="Would you like a clean up crew?"
                            name="requires_cleanup"
                            options={[{
                                value: "true",
                                label: "True",
                            }, {
                                value: "false",
                                label: "False",
                            }]}
                            placeholder="Requires Cleanup"
                        />

                        <FormSelectField
                            label="Requires Inspection"
                            name="requires_inspection"
                            options={[{
                                value: "true",
                                label: "True",
                            }, {
                                value: "false",
                                label: "False",
                            }]}
                            placeholder="Requires Inspection"
                        />
                        <div className="col-span-full mt-5 mx-2">
                            <Button
                                type="submit"
                                className="w-full py-6 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-3xl"
                                disabled={isExecuting}
                            >
                                Proceed to book
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}