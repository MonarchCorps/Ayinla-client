import { Button } from "@/components/ui/button";

type Props = {
    data: {
        description: string;
        amenities: {
            name: string;
            slug: string;
            type: "building" | "unit"
        }[];
    }
}

export default function Details({ data }: Props) {
    return (
        <section>
            <div className="mt-25 border border-solid border-[#E3E3E3] py-10 px-10">
                <div className="space-x-5">
                    <Button
                        className="cursor-pointer w-fit py-6 px-9 rounded-none bg-[#23396A] hover:bg-[#23396A] border border-solid border-[#23396A]"
                    >
                        Overview
                    </Button>
                    <Button
                        className="cursor-pointer w-fit py-6 px-9 rounded-none text-[#000] bg-transparent hover:bg-transparent border border-solid border-[#000]"
                    >
                        Gallery
                    </Button>
                    <Button
                        className="cursor-pointer w-fit py-6 px-9 rounded-none text-[#000] bg-transparent hover:bg-transparent border border-solid border-[#000]"
                    >
                        Location
                    </Button>
                    <Button
                        className="cursor-pointer w-fit py-6 px-9 rounded-none text-[#000] bg-transparent hover:bg-transparent border border-solid border-[#000]"
                    >
                        Agent
                    </Button>
                </div>
                <div className="mt-8">
                    <h1 className="font-bold text-base">About Property</h1>
                    <p className="text-sm text-[#8C959F] leading-[1.8] mt-3">
                        {data.description}
                    </p>
                </div>
                <div className="mt-10">
                    <h1 className="font-bold text-base">Property Amenities</h1>
                    <div className="mt-3">
                        <p className="font-light text-[#414041]">UNIT</p>
                        <div className="space-x-5 mt-4">
                            {data.amenities.map((amenities, index: number) => (
                                <Button
                                    key={index}
                                    className="w-fit py-6 px-9 rounded-none text-[#000] bg-transparent hover:bg-transparent border border-solid border-[#000]"
                                >
                                    {amenities.name}
                                </Button>

                            ))}
                        </div>
                    </div>

                    {/* <div className="mt-10">
                        <p className="font-light text-[#414041]">BUILDING</p>
                        <div className="space-x-5 mt-4">
                            {["Business Center", "Outdoor Space", "Gym", "Swimming Pool", "Free Wifi"].map((amenities, index: number) => (
                                <Button
                                    key={index}
                                    className="w-fit py-6 px-9 rounded-none text-[#000] bg-transparent hover:bg-transparent border border-solid border-[#000]"
                                >
                                    {amenities}
                                </Button>

                            ))}
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
}