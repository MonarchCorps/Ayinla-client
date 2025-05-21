import InterimState from "@/components/loader/interim-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ListingRequestSentPage() {
    return (
        <div className="max-w-[60rem] px-10 pt-16 pb-14 mx-auto text-center">
            <h1 className="text-3xl text-[#101828] font-semibold">
                Listing Request Sent
            </h1>
            <div>
                <InterimState
                    text
                    className="size-60"
                    wrapperStyle="!my-2"
                />
            </div>
            <h2 className="font-medium text-xl  text-[#101828]">Your Listing Request has been sent. You will receive a notification when it has been approved.</h2>
            <Button
                type="submit"
                className="mt-12 py-6 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-3xl"
                asChild
            >
                <Link href={"/"}>
                    Go Home
                </Link>
            </Button>
        </div>
    );
}