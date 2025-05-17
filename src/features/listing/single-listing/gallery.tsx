import Image from "next/image";

type Props = {
    data: {
        image_urls: string[];
    }
}

export default function Gallery({ data }: Props) {
    return (
        <section>
            <div className="mt-20 border border-solid border-[#E3E3E3] py-10 px-10">
                <h1 className="font-bold text-base">Gallery</h1>
                <div className="grid grid-cols-3 gap-5">
                    {data.image_urls.map((image_url, index: number) => (
                        <div key={index} className="relative h-70">
                            <Image
                                className="object-cover"
                                src={image_url}
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