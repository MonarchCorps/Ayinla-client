import Faq from ".";

export default function GeneralFaqs() {
    return (
        <section>
            <div className="max-w-[1380px] p-10 mx-auto grid grid-cols-2">
                <h1 className="font-semibold text-[#4D4848] text-3xl">
                    General FAQs
                </h1>
                <Faq hasColor={false} />
            </div >
        </section >
    );
}