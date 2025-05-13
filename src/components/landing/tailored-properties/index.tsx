import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Card from "./card";

export default function TailoredProperties() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mt-10 mx-auto">
                <div className="text-center">
                    <h3 className="text-base/relaxed font-medium">Properties</h3>
                    <h1 className="text-3xl max-w-[40rem] mx-auto mt-3 font-semo">
                        Discover sets tailored to your vision and needs
                    </h1>
                </div>
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {Array.from({ length: 6 }).map((card, index: number) => (
                        <Card key={index} index={index} />
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