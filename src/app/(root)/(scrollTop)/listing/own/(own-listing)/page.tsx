import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import Link from "next/link";

export default async function Page() {
    return (
        <div className="flex items-center justify-between max-w-[1310px] mx-auto">
            <h1 className="text-3xl mb-2 text-[#101828] font-semibold">All Listings</h1>
            <Button
                type="submit"
                className="py-6 cursor-pointer font-bold text-[#23396A] bg-white border border-solid border-[#23396A] hover:bg-white rounded-none hover:rounded-xl"
                asChild
            >
                <Link href={"/listing/own/create"}>
                    Add New Listing <CirclePlus size={300} className="!text-3xl size-6 ml-1" />
                </Link>
            </Button>
        </div>
    );
}