import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LocateFixedIcon, Search } from "lucide-react";
import { Button } from "../ui/button";

export default function Booking() {
    return (
        <section className="relative h-[98vh] clip w-full overflow-hidden">
            <div className="relative h-full w-full bg-gradient-to-b from-black/40 via-black/50 to-transparent">
                <img
                    src={"/images/booking-hero.webp"}
                    alt="Booking"
                    className="absolute"
                />
                <div className="relative z-10 flex flex-col gap-y-2 pt-56 max-w-[900px] px-10 text-[#FFFFFF]">
                    <h1 className="font-bold text-5xl leading-[1.5] max-w-[40rem]">Find a location that matches your vision here</h1>
                    <p className="mb-3">
                        Current trends : Open Fields, , Data Analyst
                    </p>
                    <form className="mt-6 flex items-center gap-x-4">
                        <div className="w-100 bg-white grid grid-cols-[1fr_auto] px-4 py-2">
                            <div className="text-black flex gap-x-2 border-r py-4 pr-2">
                                <Search size={20} />
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    placeholder="What are you looking for?"
                                    className="w-full flex-1 text-sm border-0 outline-0"
                                />
                            </div>
                            <div className="text-[#1f1f1f] px-3 flex items-center gap-x-3">
                                <LocateFixedIcon color="#1f1f1f" className="opacity-60" />
                                <span className="opacity-80 text-sm">Location</span>
                            </div>
                        </div>
                        <div>
                            <Button
                                type="submit"
                                className="cursor-pointer py-7.5 px-10 bg-[#23396A] hover:bg-[#23396A] text-[#fff] rounded-none font-medium border border-solid border-[#23396A]"
                            >
                                <span className="text-base font-semibold tracking-wider">Search</span>
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="absolute bottom-20 right-20 z-10 bg-white px-4 py-4">
                    <p className="max-w-[10rem] text-[#046E98] text-sm/relaxed mb-2 font-semibold">
                        1k+ People got their desired locations
                    </p>
                    <div className="flex -space-x-3 rtl:space-x-reverse">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Avatar key={index}>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-[#D9D9D9] border-2 border-solid"></AvatarFallback>
                            </Avatar>
                        ))}
                        <span className="flex items-center justify-center size-8 text-xs font-medium text-[#046E98] bg-[#00B0F033] border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">+</span>
                    </div>
                </div>
            </div>
        </section>
    );
}