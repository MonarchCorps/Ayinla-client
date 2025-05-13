import Card from "@/components/listing/all-listing/card";
import Details from "@/components/listing/single-listing/details";
import Gallery from "@/components/listing/single-listing/gallery";
import Overview from "@/components/listing/single-listing/overview";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function Page({
    params
}: { params: Promise<{ listingId: string }> }) {

    return (
        <main>
            <div className="max-w-[1340px] p-10 pt-38 mx-auto">
                <Overview />
                <Details />
                <Gallery />
                <section>
                    <div className="mt-10">
                        <h1 className="text-3xl text-[#2C3C4D] font-medium text-center">
                            You may also like
                        </h1>
                        <div className="grid grid-cols-3 gap-y-6 gap-x-8 mt-14">
                            {Array.from({ length: 3 }).map((_, index: number) => (
                                <Card
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </div>

                        <div className="grid place-content-center">
                            <Button
                                className="mt-20 w-fit py-6 px-9 rounded-none bg-[#23396A] hover:bg-[#23396A] hover:rounded-3xl"
                                asChild
                            >
                                <Link href="/listing/all" scroll={false}>
                                    Explore All Listings
                                    <ArrowRight size={20} />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}