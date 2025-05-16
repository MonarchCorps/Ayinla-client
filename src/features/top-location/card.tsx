import { format } from "date-fns";
import Image from "next/image";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBed, FaLocationDot } from "react-icons/fa6";

export default function Card() {
    return (
        <div className="bg-white p-3 rounded-xl border border-solid border-[#E3E3E3]">
            <div className="relative w-full h-60">
                <Image
                    src={"/images/explore.webp"}
                    alt="Location" ////////// don't forget to change the name
                    className="object-cover rounded-xl select-none"
                    fill
                />
            </div>
            <div className="mt-6 px-2">
                <h1 className="font-bold text-base">Two Bedroom Studio Apartment</h1>
                <div className="flex items-center mt-3 gap-x-2">
                    <FaLocationDot className="text-xl" />
                    <span className="inline-flex gap-x-1">
                        <span className="border border-solid border-[#B2DDFF] bg-[#EFF4FF] text-[#175CD3] px-2 py-1 rounded-md text-sm">Lekki</span>
                        <span className="border border-solid border-[#B2DDFF] bg-[#EFF4FF] text-[#175CD3] px-2 py-1 rounded-md text-sm">Lagos</span>
                    </span>
                </div>
                <div className="flex items-center justify-between mt-5">
                    <p className="text-sm text-[#8E8E93]">
                        <FaBed className="text-[#0C111D] inline" />
                        <span className="align-text-top ml-1">3 Bedrooms</span>
                    </p>
                    <p className="text-sm text-[#8E8E93]">
                        <FaCalendarAlt className="text-[#0C111D] inline" />
                        <span className="align-text-top ml-1">{format(new Date(), "dd/MM/yyy")}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}