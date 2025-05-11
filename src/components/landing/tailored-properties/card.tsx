import { FileImage, Proportions } from "lucide-react";
import { FaLocationDot } from "react-icons/fa6";

export default function Card() {
    return (
        <div className="shadow-md rounded-xl overflow-hidden">
            <img
                src={"/images/listing-image.webp"}
                alt="Listing Image" ////// don't forget to change the name
                className="w-full h-80 object-cover"
            />
            <div className="pt-5 px-5 pb-3 space-y-3.5">
                <p className="inline-flex items-center gap-x-1">
                    <FaLocationDot />
                    <span className="text-sm font-medium">8765 Birchwood Street, CA</span>
                </p>
                <h1 className="text-xl font-semibold">Maple Grove</h1>
                <div className="flex items-center gap-x-2 mt-2">
                    <span className="flex items-center gap-x-1 opacity-55 text-sm border-r border-solid border-gray-800 pr-3">
                        <FileImage className="size-5" />
                        <span>1</span>
                    </span>
                    <span className="flex items-center gap-x-1 opacity-55 text-sm">
                        <Proportions className="size-5" />
                        <span>2,000 sq.ft</span>
                    </span>
                </div>
                <p className="font-medium text-base">₦{" "}{(400000).toLocaleString()}</p>
            </div>
        </div>
    );
}