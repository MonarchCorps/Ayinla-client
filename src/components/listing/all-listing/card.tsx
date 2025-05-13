import { poppins } from "@/lib/fonts";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Card({ index }: { index: number }) {
    return (
        <div>
            <img
                src={"/images/listing.jpg"}
                alt="" //// dont forget to change the alt
                className="w-full h-70 object-cover"
            />
            <div className={clsx(poppins.className, "mt-4")}>
                <h1 className="text-[#414041] font-bold text-xl">The Queen Inside - Type 3</h1>
                <p className="font-regular text-[#8C959F] mt-2">
                    <span>Lagos</span>
                    {" "}
                    <span>Lekki</span>
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <h2 className="text-3xl text-[#223A6A] font-bold">
                        ₦{(24567).toLocaleString()}
                    </h2>
                    <Link href={`/listing/${index}`} className="flex items-center hover:underline text-base opacity-75 font-semibold" scroll={false}>
                        Details <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}