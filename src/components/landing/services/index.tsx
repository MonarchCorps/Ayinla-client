import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

const accordionContent: {
    question: string,
    answer: string,
}[] = [
        {
            question: "How do I search for a property?",
            answer: "Simply enter your desired location in the search bar, select any filters if needed, and click the 'Search' button."
        }, {
            question: "Is there a booking fee?",
            answer: "Yes, we charge a service fee to guests which is usually a percentage of the booking subtotal."
        }, {
            question: "What fees does AFL charge for bookings?",
            answer: "AFL charges a service fee on top of the rental price, typically around 15% of the total booking amount. This fee helps us maintain our platform and provide support for both hosts and users. Additionally, hosts may incur a fee of approximately 15% on their earnings from bookings. Some listings may also include cleaning fees or charges for additional services. All fees are clearly displayed during the booking process, so you can see the total cost before finalizing your reservation."
        }, {
            question: "What payment methods do you accept?",
            answer: "We accept major credit cards, PayPal, and direct bank transfers for property bookings."
        }, {
            question: "Is customer support available 24/7?",
            answer: "Yes, our support team is available 24/7 to assist you with any inquiries or issues."
        }, {
            question: "Can I cancel or modify my booking?",
            answer: "Yes, cancellations and modifications depend on the property's policy. Please check the cancellation policy before booking."
        }, {
            question: "Can I list my property on this platform?",
            answer: "Yes, you can list your property by signing up as a host and filling out the required property details."
        }
    ]

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
                    <div>
                        <Accordion defaultValue="item-1" type="single" collapsible className="w-full space-y-4">
                            {accordionContent.map((accordion, index: number) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    style={{ borderWidth: 0 }}
                                    className="bg-[#FAFAFA] px-3"
                                >
                                    <AccordionTrigger className="cursor-pointer group" style={{ textDecoration: "none" }}>
                                        <div className="w-full flex items-center justify-between">
                                            <p className="text-base font-bold tracking-wide">{accordion.question}</p>
                                            <span className="transition-transform duration-300 group-data-[state=open]:rotate-45">
                                                <Plus />
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="leading-[1.7]">
                                        {accordion.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

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