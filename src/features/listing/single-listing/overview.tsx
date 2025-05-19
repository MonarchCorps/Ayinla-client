"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ZoomImage from "@/components/zoom/zoom-image";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { AmenitiesType } from "@/types/Listing";

type Props = {
    data: {
        thumbnail_url: string;
        image_urls: string[];
        price_kobo: number;
        slug: string;
        state: string;
        lga: string;
        name: string;
        tags: string[];
        amenities: AmenitiesType[];
    }
}

export default function Overview({ data }: Props) {
    const imageVariants = [
        ...data.image_urls,
    ];

    const [activeImage, setActiveImage] = useState(imageVariants[0]);

    return (
        <section>
            <div className="grid grid-cols-2 gap-x-14">
                <div>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={activeImage}
                            initial={{ opacity: 0.7 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.7 }}
                            transition={{ duration: 0.5 }}
                        >
                            <ZoomImage
                                src={activeImage}
                                width={800}
                                height={420}
                                alt={data.name}
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="grid grid-cols-3 gap-4 mt-5">
                        {imageVariants.map((img, idx) => (
                            <button
                                key={idx}
                                type="button"
                                tabIndex={0}
                                onClick={() => setActiveImage(img)}
                                className={`cursor-pointer transition-all duration-300 rounded-md overflow-hidden border-2 ${activeImage === img
                                    ? "border-[#145dff]"
                                    : "border-transparent"
                                    }`}
                            >
                                <div className="relative h-36">
                                    <Image
                                        src={img}
                                        alt={`Thumbnail ${idx + 1}`}
                                        className="object-cover"
                                        fill
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-x-2">
                        {data?.tags?.map((tag, index) => {
                            return (
                                <p key={index} className="text-[#046E98] text-base">
                                    {tag}
                                    {index !== data.tags.length - 1 && (
                                        <span className="ml-2 size-2 bg-[#046E98] rounded-full shrink-0 inline-block" />
                                    )}
                                </p>
                            )
                        })}
                        {/* <p className="text-[#046E98] text-base">Rent</p>
                        <div className="size-2 bg-[#046E98] rounded-full shrink-0"></div>
                        <p className="text-[#046E98] text-base">Furnished</p> */}
                    </div>

                    <h1 className="mt-3 text-4xl font-bold leading-[1.4]">
                        {data.name}
                    </h1>

                    <p className="space-x-4 mt-2">
                        <span className="text-base text-[#8C959F]">{data.state}</span>
                        <span className="text-base text-[#8C959F]">{data.lga}</span>
                    </p>

                    <div className="mt-5 flex items-end gap-x-3">
                        <h2 className="text-4xl text-[#223A6A] font-bold">
                            ₦{(data.price_kobo / 100).toLocaleString()}
                        </h2>
                        {/* <h4 className="line-through text-[#8C959F]">
                            ₦{(12356).toLocaleString()}
                        </h4>
                        <div className="bg-[#ffecea] px-2">
                            <span className="text-[#FF6653] text-sm">50% Off</span>
                        </div> */}
                    </div>

                    <div className="flex mt-6 space-x-4">
                        {data.amenities.slice(0, 4).map((amenities, index) => (
                            <div key={index} className="border border-solid border-[#E3E3E3] py-3 px-5">
                                <span className="text-base text-[#8C959F] font-medium">
                                    {amenities.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="mt-8 w-fit py-6 px-9 rounded-none bg-[#23396A] hover:bg-[#23396A] hover:rounded-3xl"
                        asChild
                    >
                        <Link href={`/listing/${data.slug}/book`}>Book Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
