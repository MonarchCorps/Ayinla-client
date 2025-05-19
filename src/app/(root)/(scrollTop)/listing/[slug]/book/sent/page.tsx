import InterimState from "@/components/loader/interim-state";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingSentPage() {
    return (
        <div className="max-w-[60rem] px-10 pt-16 pb-14 mx-auto text-center">
            <h1 className="text-3xl text-[#101828] font-semibold">
                Booking Request Sent
            </h1>
            <div>
                <InterimState
                    text
                    className="size-60"
                    wrapperStyle="!my-2"
                />
            </div>
            <h2 className="font-medium text-xl  text-[#101828]">Your Booking Request has been sent. Please check your email for more information.</h2>
            <Button
                type="submit"
                className="mt-12 py-6 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-3xl"
                asChild
            >
                <Link href={"/booking/history"}>
                    See Booking History
                </Link>
            </Button>
        </div>
    );
}