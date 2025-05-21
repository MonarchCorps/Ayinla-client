"use client";

import { Form } from "@/components/ui/form";
import { createListingFormSchema } from "@/schema/listing";
import {
    AmenitiesResponseType,
    createListingFormSchemaType,
    CreateOrUpdateListingPayload,
} from "@/types/Listing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import { StateResponseType } from "@/types/State";
import { toast } from "react-toastify";
import { getPresignedUrls, uploadToPresignedUrl } from "@/app/api/v1/upload";
import { useRouter } from "next/navigation";
import { createListing } from "@/app/api/v1/listing";

export default function CreateListing({
    states,
    amenities
}: {
    states: StateResponseType;
    amenities: AmenitiesResponseType
}) {

    const router = useRouter();
    const [isExecuting, setIsExecuting] = useState<boolean>(false);
    const [step, setStep] = useState<1 | 2 | 3>(1);

    const form = useForm({
        resolver: zodResolver(createListingFormSchema),
    });

    const handleStepSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step === 1) {
            const isValid = await form.trigger([
                "name",
                "state",
                "local_government_area",
                "size_sqft",
                "price_kobo",
                "tags",
                "contact_phone_number",
                "address",
            ]);
            if (isValid) setStep(2);
        } else if (step === 2) {
            const isValid = await form.trigger(["image"]);
            if (isValid) setStep(3);
        } else {
            await form.handleSubmit(onSubmit)(e);
        }
    };

    const onSubmit = async (values: createListingFormSchemaType) => {
        setIsExecuting(true);
        const images = values.image;

        window.onbeforeunload = () => "Please wait, images are uploading.";

        try {
            /**
             * 
             * get upload links
             */
            const fileExtension = images[0].name.split(".").pop()!;
            const { upload_urls } = await toast.promise(
                getPresignedUrls({ fileExtension, count: images.length }),
                {
                    pending: "Requesting upload links...",
                    error: "Failed to get upload links",
                },
            );

            /**
             * 
             * upload presigned urls
             */
            const uploadedResults = await toast.promise(
                Promise.all(
                    images.map((file, i) =>
                        uploadToPresignedUrl(file, upload_urls[i]?.upload_url),
                    ),
                ),
                {
                    pending: "Uploading images...",
                    error: "Some images failed to upload",
                },
            );

            if (uploadedResults.some(success => !success)) {
                return toast.error("At least 4 images must upload successfully.");
            }

            // Yield to event loop to force DOM repaint so toast isn't "stuck"
            // await new Promise(r => setTimeout(r, 0));

            /**
             * 
             * upload data
             */

            const publicUrls = upload_urls.map(
                (item: {
                    public_url: string;
                }) => item.public_url,
            );

            const image_urls = publicUrls;

            const dataToSend: CreateOrUpdateListingPayload = {
                name: values.name,
                description: values.description,
                property_type: values.property_type as "apartment" | "house",
                state: values.state,
                local_government_area: values.local_government_area,
                address: values.address,
                size_sqft: values.size_sqft,
                contact_phone_number: values.contact_phone_number,
                tags: values.tags,
                thumbnail_url: image_urls[0],
                image_urls,
                amenity_slugs: values.amenity_slugs,
                price_kobo: values.price_kobo * 100,
            };

            const res = await createListing(dataToSend)

            if (!res.success) {
                toast.error(res.errorMessage);
                return;
            }

            if (res.data) {
                const ts = Date.now();
                router.push(`/listing/own/create/sent?ts=${ts}`);
            }

        } catch (err) {
            console.error("Upload or mutation error:", err);
        }
        finally {
            window.onbeforeunload = null;
            setIsExecuting(false)
        }

    }

    return (
        <Form {...form}>
            <form
                onSubmit={handleStepSubmit}
                className="max-w-[1380px] mx-auto py-10 px-10"
            >
                {step === 1 ? (
                    <Step1
                        states={states}
                    />
                ) : step === 2 ? (
                    <Step2 />
                ) : step === 3 ? (
                    <Step3
                        amenities={amenities}
                        isExecuting={isExecuting}
                    />
                ) : <></>
                }
            </form>
        </Form>
    );
}