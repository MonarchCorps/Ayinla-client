import { Calendar, CheckSquare, DollarSign, Home } from "lucide-react";

type SectionInfoType = {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const sectionInfos: SectionInfoType[] = [
    {
        icon: <Home className="text-white" size={30} />,
        title: "Sign Up As A Host",
        description: "If you own a property, you can host it on Ayinla Films. Simply create a new listing, add some basic info like price, photos and features, and then click 'Publish'."
    },
    {
        icon: <Calendar className="text-white" size={30} />,
        title: "Receive Bookings From Renters",
        description: "If you own a property, you can host it on Ayinla Films. Simply create a new listing, add some basic info like price, photos and features, and then click 'Publish'."
    },
    {
        icon: <CheckSquare className="text-white" size={30} />,
        title: "Receive Bookings From Renters",
        description: "Accept the shoots you want to host, decline the ones you don't."
    },
    {
        icon: <DollarSign className="text-white" size={30} />,
        title: "Host A Shoot - Get Paid",
        description: "Earn extra income with complete peace of mind"
    }
];

export default function HowItWorks() {
    return (
        <section>
            <div className="max-w-[1240px] p-10 mt-10 mx-auto">
                <div className="text-center">
                    <h3 className="font-medium text-3xl/relaxed">How it works</h3>
                    <h1 className="text-sm max-w-[50rem] mx-auto mt-3 text-[#3A4252]">
                        Ayinla Films allows property owners to list their properties. Just create a listing, add details like price and photos, then click ‘Publish’ to make it live.
                    </h1>
                </div>
                <div className="grid grid-cols-2 gap-x-20 mt-12 items-center">
                    <img
                        src="/images/how-it-works.webp"
                        alt="How it works"
                        className="w-full h-[30rem] object-cover rounded-3xl"
                    />
                    <div className="space-y-8">
                        {sectionInfos.map((sectionInfo: SectionInfoType, index: number) => (
                            <div key={index} className="flex items-start gap-x-4">
                                <div className="p-2 bg-gray-800 rounded-lg">
                                    {sectionInfo.icon}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-gray-800">{sectionInfo.title}</h2>
                                    <p className="mt-2 text-gray-600 text-sm leading-[1.6]">{sectionInfo.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}