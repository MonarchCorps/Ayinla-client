import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookNow() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mt-10 mx-auto grid grid-cols-2 gap-x-12 items-center">
                <div className="grid grid-cols-2 gap-x-4 w-full">

                    <div className="col-span-1">
                        <img
                            src={"/images/living-room.webp"}
                            alt="Living room"
                            className="w-full h-[29rem] object-cover"
                        />
                    </div>

                    <div className="space-y-4">
                        <img
                            src={"/images/house.webp"}
                            alt="House"
                            className="w-full h-[14rem] object-cover"
                        />
                        <img
                            src={"/images/furniture-arrangement.webp"}
                            alt="Furniture arrangement"
                            className="w-full h-[14rem] object-cover"
                        />
                    </div>

                </div>
                <div>
                    <h1 className="font-semibold text-2xl/normal mb-4">
                        Your journey to finding the perfect movie starts with Ayinla Film. We are a platform that connects you with the best movie sets from where you want.
                    </h1>
                    <p className="text-sm/relaxed opacity-50">
                        Ayinla Film helps you find and book premium movie locations across Nigeria.
                    </p>
                    <p className="text-sm/relaxed opacity-50 mt-0.5">
                        Whether you're shooting a film, music video, or commercial — we're here to support your vision.
                    </p>
                    <Button
                        className="mt-8 w-fit py-6 bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-3xl"
                        asChild
                    >
                        <Link href={"/booking"} scroll={false}>
                            Book Now
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}