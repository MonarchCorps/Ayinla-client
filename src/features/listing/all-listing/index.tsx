import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import Card from "./card";

export default function AllListing() {
    return (
        <section>
            <div>
                <h1 className="font-semibold text-[#414041] text-2xl tracking-wide">Showing Beautiful Interior</h1>
                <form className="flex items-center justify-end gap-x-4">
                    <div className="w-96 h-11 flex items-center gap-x-3 border border-solid border-[#D0D5DD] py-2 px-3 drop-shadow-[0px_1.27px_2.54px_#1018280D]">
                        <Search color="#667085" size={22} />
                        <input
                            type="search"
                            placeholder="Search"
                            className="border-none outline-none flex-1"
                            name="search"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="cursor-pointer h-11 w-27 bg-[#23396A] hover:bg-[#23396A] text-[#fff] rounded-none font-medium border border-solid border-[#23396A]"
                    >
                        <span className="text-base font-regular">Filter</span>
                        <Filter />
                    </Button>
                </form>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-8 mt-14">
                {Array.from({ length: 18 }).map((_, index: number) => (
                    <Card
                        key={index}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}