import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { accordionContent } from "@/utils/data";
import clsx from "clsx";
import { Plus } from "lucide-react";

export default function Faq({
    hasColor = true
}: { hasColor?: boolean }) {
    return (
        <div>
            <Accordion defaultValue="item-1" type="single" collapsible className="w-full space-y-4">
                {accordionContent.map((accordion, index: number) => (
                    <AccordionItem
                        key={index}
                        value={`item-${index}`}
                        style={{ borderWidth: 0 }}
                        className={clsx("px-3", hasColor && "bg-[#FAFAFA]")}
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
    );
}