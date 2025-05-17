import { poppins } from "@/lib/fonts";
import { ListingType } from "@/types/Listing";
import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ listing }: { listing: ListingType }) {
    return (
        <div>
            <div className="relative w-full h-70">
                <Image
                    src={listing.thumbnail_url}
                    alt={`${listing.name}`}
                    className="object-cover"
                    fill
                />
            </div>
            <div className={clsx(poppins.className, "mt-4")}>
                <h1 className="text-[#414041] font-bold text-xl">{listing.name}</h1>
                <p className="font-regular text-[#8C959F] mt-2">
                    {listing.tags.map((tag: string, index: number) => {
                        return (
                            <span key={index}>{tag}{" "}</span>
                        )
                    })}
                </p>
                <div className="mt-3 flex items-center justify-between">
                    <h2 className="text-3xl text-[#223A6A] font-bold">
                        ₦{(listing.price_kobo / 100).toLocaleString()}
                    </h2>
                    <Link href={`/listing/${listing.slug}`} className="flex items-center hover:underline text-base opacity-75 font-semibold" scroll={false}>
                        Details <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}