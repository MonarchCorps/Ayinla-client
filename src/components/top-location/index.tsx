import Link from "next/link";
import Card from "./card";

export default function TopLocations() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mt-5 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="font-semibold text-[#4D4848] text-3xl">Top Locations</h1>
                    <Link className="hover:underline text-[0.9rem] tracking-wide opacity-75" href={"/listing"}>
                        More Listings
                    </Link>
                </div>
                <div className="grid grid-cols-4 gap-x-5 gap-y-5 mt-5">
                    {Array.from({ length: 4 }).map((location, index) => (
                        <Card key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}