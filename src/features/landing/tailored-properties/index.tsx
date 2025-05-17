import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "./card";
import { fetchAtLeast3Listings } from "@/app/api/v1";

export default async function TailoredProperties() {
    const tailoredProperties = await fetchAtLeast3Listings(6);

    return (
        <section>
            <div className="max-w-[1480px] p-10 mt-10 mx-auto">
                <div className="text-center">
                    <h3 className="text-base/relaxed font-medium">Properties</h3>
                    <h1 className="text-3xl max-w-[40rem] mx-auto mt-3 font-medium">
                        Discover sets tailored to your vision and needs
                    </h1>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-x-7 gap-y-6">
                    {tailoredProperties.listings.map((properties, index: number) => (
                        <Card key={index} listing={properties} />
                    ))}
                </div>
            </div>
            <div className="grid place-content-center mb-9 mt-3">
                <Button
                    type="submit"
                    className="py-6 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] rounded-none hover:rounded-3xl"
                    asChild
                >
                    <Link href={"/listing/all"} prefetch scroll={false}>
                        All Listings <ArrowRight />
                    </Link>
                </Button>
            </div>
            <div className="size-full bg-gradient-to-b from-black/40 via-black/50 to-transparent">
                <video
                    className="h-full w-full"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="https://www.dropbox.com/scl/fi/nme7g2qoscg13rftoaebx/hero-video.mp4?rlkey=0yb5yl4mblyxgm2jidruudcg9&st=4q4wyzaj&dl=1" type="video/mp4" />
                </video>
            </div>
        </section>
    );
}