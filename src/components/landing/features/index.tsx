import clsx from "clsx";
import { Bookmark, Box, Command, Layers, Sparkles } from "lucide-react";
import { BsMagic } from "react-icons/bs";

const featuresContent: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
    title: string,
    desc: string,
    iconType: "lucide" | "react"
}[] = [
        {
            icon: Command,
            title: "Personalized Search",
            desc: "At HomeQuest Reality, we understand that every client has unique needs",
            iconType: "lucide"
        }, {
            icon: BsMagic,
            title: "Premium Listings",
            desc: "At Ayinla, explore a wide range of high-quality properties.",
            iconType: "react"
        }, {
            icon: Layers,
            title: "Expert guidance",
            desc: "Get professional advice to navigate the complexities of real estate.",
            iconType: "lucide"
        }, {
            icon: Sparkles,
            title: "Seamless process",
            desc: "Enjoy a smooth property journey with our pro+ dedicated team.",
            iconType: "lucide"
        }, {
            icon: Bookmark,
            title: "Trusted expertise",
            desc: "Leverage years of experience to make confident property decisions.",
            iconType: "lucide"
        }, {
            icon: Box,
            title: "Tailored solutions",
            desc: "Experience services specifically to meet your lifestyle.",
            iconType: "lucide"
        }
    ]

export default function Features() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mt-5 mx-auto">
                <div className="text-center">
                    <h3 className="text-base/relaxed font-medium">Features</h3>
                    <h1 className="text-3xl max-w-[40rem] mx-auto mt-3 font-medium">
                        Why we stand out in finding
                        <br />
                        your perfect space
                    </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                    {featuresContent.map((features, index: number) => (
                        <div key={index} className="border border-solid h-[14rem] px-4 py-4">
                            <features.icon color="#213b6a" className={clsx(features.iconType === "react" ? "text-4xl" : "size-9")} />
                            <h1 className="mt-9 font-semibold tracking-wide text-xl">{features.title}</h1>
                            <p className="mt-3 tracking-wide text-base/relaxed">{features.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}