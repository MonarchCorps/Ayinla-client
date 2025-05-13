import Details from "@/components/single-listing/details";
import Gallery from "@/components/single-listing/gallery";
import Overview from "@/components/single-listing/overview";

export default async function Page({
    params
}: { params: Promise<{ listingId: string }> }) {

    const { listingId } = await params

    return (
        <main>
            <div className="max-w-[1340px] p-10 pt-38 mx-auto">
                <Overview />
                <Details />
                <Gallery />
            </div>
        </main>
    );
}