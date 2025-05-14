import Faq from "@/features/faq";

export default function Services() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mt-10 mx-auto">
                <div className="text-center">
                    <h3 className="text-base/relaxed font-medium">Services</h3>
                    <h1 className="text-3xl max-w-[40rem] mx-auto mt-3 font-medium">
                        Explore our range of expert real estate services for film makers
                    </h1>
                </div>
                <div className="grid grid-cols-2 mt-14 gap-14 max-w-[95%] mx-auto px-10">
                    <Faq />

                    <img
                        src={"/images/explore.webp"}
                        alt="Explore"
                        className="w-full h-[34rem] object-cover rounded-3xl"
                    />
                </div>
            </div>
        </section>
    );
}
