import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import Form from "next/form";

export default function SearchForm({ query }: { query: string }) {
    return (
        <div>
            <Form action={"/listing/all"} className="flex items-center justify-end gap-x-4">
                <div className="w-96 h-11 flex items-center gap-x-3 border border-solid border-[#D0D5DD] py-2 px-3 drop-shadow-[0px_1.27px_2.54px_#1018280D]">
                    <Search color="#667085" size={22} />
                    <input
                        type="search"
                        placeholder="Search"
                        className="border-none outline-none flex-1"
                        name="allListing"
                        defaultValue={query}
                    />
                </div>
                <Button
                    type="submit"
                    className="cursor-pointer h-11 w-27 bg-[#23396A] hover:bg-[#23396A] text-[#fff] rounded-none font-medium border border-solid border-[#23396A]"
                >
                    <span className="text-base font-regular">Filter</span>
                    <Filter />
                </Button>
            </Form>
            <h1>Viewing search result for <span className="font-bold">{query}</span></h1>
        </div>
    );
}