import { ListingType } from "@/types/Listing";
import { FileImage, Proportions } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";

export default function Card({
    listing
}: {
    listing: ListingType
}) {
    return (
        <Link href={`/listing/${listing.slug}`} prefetch className="rounded-sm overflow-hidden">
            <div className="relative w-full h-70 overflow-hidden">
                <Image
                    src={listing.thumbnail_url}
                    alt={listing.name}
                    className="object-cover transition-all duration-300 hover:scale-110"
                    fill
                />
            </div>
            <div className="mt-3">
                <p className="inline-flex items-center gap-x-1">
                    <FaLocationDot />
                    <span className="text-base font-medium">{listing.state} {listing.lga}</span>
                </p>
                <h1 className="text-xl font-semibold mt-2">{listing.name}</h1>
                <div className="flex items-center gap-x-2 mt-2">
                    <span className="flex items-center gap-x-1 opacity-55 text-sm border-r border-solid border-gray-800 pr-3">
                        <FileImage className="size-5" />
                        <span>{2}</span>
                    </span>
                    <span className="flex items-center gap-x-1 opacity-55 text-sm">
                        <Proportions className="size-5" />
                        <span>2,000 sq.ft</span>
                    </span>
                </div>
                <p className="font-medium text-xl mt-3">₦{(listing.price_kobo / 100).toLocaleString()}</p>
            </div>
        </Link>
    );
}