import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import SingleListing from "@/features/listing/single-listing";
import InterimState from "@/components/loader/interim-state";
import RecommendListing from "@/features/related/recommened-listing";

export default async function ListingDetailsPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    return (
        <div className="max-w-[1340px] p-10 pt-20 mx-auto">
            <Suspense fallback={(
                <InterimState text="Loading Listing details..." autoplay loop />
            )}>
                <SingleListing slug={slug} />
            </Suspense>
            <section>
                <div className="mt-13">
                    <RecommendListing />

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
    );
}