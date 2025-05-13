"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../../ui/button";
import ZoomImage from "../../zoom/zoom-image";
// At the top
import { AnimatePresence, motion } from "framer-motion";

const imageVariants = [
    "/images/detail-2.jpg",
    "/images/detail-3.jpg",
    "/images/detail-4.jpg",
];


export default function Overview() {
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
                                alt="Image" //// don't forget to change the all 
                            />
                        </motion.div>
                    </AnimatePresence>

                    <div className="grid grid-cols-3 gap-x-4 mt-5">
                        {imageVariants.map((img, idx) => (
                            <button
                                key={img}
                                type="button"
                                tabIndex={0}
                                onClick={() => setActiveImage(img)}
                                className={`cursor-pointer transition-all duration-300 rounded-md overflow-hidden border-2 ${activeImage === img
                                    ? "border-[#145dff]"
                                    : "border-transparent"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${idx + 1}`} ///// dont forget to change the alt
                                    className="w-full h-36 object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Property Info */}
                <div>
                    <div className="flex items-center gap-x-2">
                        <p className="text-[#046E98] text-base">Rent</p>
                        <div className="size-2 bg-[#046E98] rounded-full shrink-0"></div>
                        <p className="text-[#046E98] text-base">Furnished</p>
                    </div>

                    <h1 className="mt-3 text-4xl font-bold leading-[1.4]">
                        Luxurious Mansion, with outdoor space.
                    </h1>

                    <p className="space-x-4 mt-2">
                        <span className="text-base text-[#8C959F]">Lagos</span>
                        <span className="text-base text-[#8C959F]">Lekki</span>
                    </p>

                    <div className="mt-5 flex items-end gap-x-3">
                        <h2 className="text-4xl text-[#223A6A] font-bold">
                            ₦{(24567).toLocaleString()}
                        </h2>
                        <h4 className="line-through text-[#8C959F]">
                            ₦{(12356).toLocaleString()}
                        </h4>
                        <div className="bg-[#ffecea] px-2">
                            <span className="text-[#FF6653] text-sm">50% Off</span>
                        </div>
                    </div>

                    <div className="flex mt-6 space-x-4">
                        <div className="border border-solid border-[#E3E3E3] py-3 px-5">
                            <span className="text-base text-[#8C959F] font-medium">
                                7 Bed
                            </span>
                        </div>
                        <div className="border border-solid border-[#E3E3E3] py-3 px-5">
                            <span className="text-base text-[#8C959F] font-medium">
                                7 Bathroom
                            </span>
                        </div>
                        <div className="border border-solid border-[#E3E3E3] py-3 px-5">
                            <span className="text-base text-[#8C959F] font-medium">
                                987 Sq feet
                            </span>
                        </div>
                    </div>

                    <Button
                        className="mt-8 w-fit py-6 px-9 rounded-none bg-[#23396A] hover:bg-[#23396A] hover:rounded-3xl"
                        asChild
                    >
                        <Link href="/booking">Book Now</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
