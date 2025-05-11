import { Home, LocateIcon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="relative h-full w-full bg-gradient-to-b from-black/40 via-black/50 to-transparent">
                <video
                    className="absolute top-0 left-0 h-full w-full object-cover z-0"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="https://www.dropbox.com/scl/fi/nme7g2qoscg13rftoaebx/hero-video.mp4?rlkey=0yb5yl4mblyxgm2jidruudcg9&st=4q4wyzaj&dl=1" type="video/mp4" />
                </video>
                <div className="relative z-10 h-screen flex flex-col gap-y-2 pt-56 max-w-[1380px] px-10 mx-auto text-[#FFFFFF]">
                    <p className="mb-3 tracking-wider">Exclusive Real Estate Platform</p>
                    <h1 className="font-bold text-6xl">Find the Perfect Location <br /> Monetize Your Space</h1>
                    <p className="capitalize max-w-[40rem] leading-[1.8] mt-4">
                        Cover unique spaces that bring your creative vision to life — from cozy homes to vibrant studios and stunning outdoor scenes. Whether you’re shooting a film, ad, music video, or content project, we make finding the perfect location simple and seamless.
                    </p>
                    <div className="mt-10 flex gap-x-4">
                        <Link href={"/sign-in"} className="py-3 px-6 bg-[#23396A] transition-all duration-300 hover:bg-[#ffffffe8] hover:text-[#23396A] hover:rounded-md text-[#fff] rounded-none font-medium border border-solid border-[#23396A] flex items-center gap-x-3">
                            <span>List your property</span>
                            <Home />
                        </Link>
                        <Link href={"/sign-up"} className="py-3 px-6 bg-[#fff] transition-all duration-300 hover:bg-[#233a6ae2] hover:text-[#fff] hover:border-[#fff] hover:rounded-md text-[#23396A] rounded-none font-medium border border-solid border-[#23396A] flex items-center gap-x-3">
                            <span>Find a Location</span>
                            <LocateIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
