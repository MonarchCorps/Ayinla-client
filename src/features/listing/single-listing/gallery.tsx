import Image from "next/image";

export default function Gallery() {
    return (
        <section>
            <div className="mt-20 border border-solid border-[#E3E3E3] py-10 px-10">
                <h1 className="font-bold text-base">Gallery</h1>
                <div className="grid grid-cols-3 gap-5">
                    {Array.from({ length: 12 }).map((_, index: number) => (
                        <div key={index} className="relative h-70">
                            <Image
                                className="object-cover"
                                src={"/images/detail-2.jpg"}
                                alt="Gallery"
                                fill
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}