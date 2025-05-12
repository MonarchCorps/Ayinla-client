import AnimatedInput from "@/components/form/contact/animated-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { poppins } from "@/lib/fonts";
import clsx from "clsx";
import { Mail } from "lucide-react";
import { FaPhone } from "react-icons/fa6";

type FormFieldsType = {
    label: string,
    name: string,
    id: string,
    type: string,
}

type SubjectsType = {
    label: string,
    name: string,
}

const formFields: FormFieldsType[] = [
    {
        label: "First Name",
        name: "first-name",
        id: "first-name",
        type: "text",
    },
    {
        label: "Last Name",
        name: "last-name",
        id: "last-name",
        type: "text",
    },
    {
        label: "Email",
        name: "email",
        id: "email",
        type: "email",
    },
    {
        label: "Phone Number",
        name: "phone-number",
        id: "phone-number",
        type: "tel",
    },
];

const subjects: SubjectsType[] = [
    {
        label: "General Inquiry",
        name: "general-inquiry",
    },
    {
        label: "Support",
        name: "support"
    },
    {
        label: "Partnership",
        name: "partnership"
    },
    {
        label: "Feedback",
        name: "feedback"
    }
]

export default function Contact() {
    return (
        <section>
            <div className="max-w-[1380px] p-2 mt-10 mx-auto bg-white h-[40rem] shadow rounded-xl grid grid-cols-[500px_1fr]">
                <div className={clsx(poppins.className, "relative size-full bg-[#223A6A] rounded-xl px-6 py-10 text-[#f1f1f1]")}>
                    <h1 className="text-3xl/relaxed tracking-wide font-semibold">Contact Us</h1>
                    <p className="mt-2 text-base/relaxed opacity-70">Have questions, feedback or need help with a booking?</p>
                    <p className="text-base/relaxed opacity-70">We're here for you.</p>
                    <div className="mt-14 flex flex-col space-y-10">
                        <a href="tel:+2348298727626" className="flex items-center gap-x-2">
                            <FaPhone className="text-xl" />
                            +2348298727626
                        </a>
                        <a href="mailto:ayinlafilms@gmail.com" className="flex items-center gap-x-2">
                            <Mail size={25} />
                            ayinlafilms@gmail.com
                        </a>
                    </div>
                    <img
                        src={"/images/circle-1.webp"}
                        alt="Circle 1"
                        className="absolute left-1/2 top-1/2 size-48"
                    />
                    <img
                        src={"/images/circle-2.webp"}
                        alt="Circle 2"
                        className="absolute -bottom-16 -right-16 scale-75"
                    />
                </div>
                <form className={clsx(poppins.className, "grid grid-cols-2 h-fit mt-20 gap-x-8 gap-y-20 px-4 ml-5")}>
                    {formFields.map((field) => (
                        <AnimatedInput
                            key={field.id}
                            label={field.label}
                            type={field.type}
                            name={field.name}
                            id={field.id}
                        />
                    ))}

                    <div className="col-span-full space-y-3">
                        <Label htmlFor="subject" className="font-semibold">Select Subject</Label>
                        <div className="grid grid-cols-4 mt-3">
                            {subjects.map((subject, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Checkbox
                                        name={subject.name}
                                        id={subject.name}
                                        className="rounded-full bg-[#E0E0E0]"
                                    />
                                    <Label className="text-sm opacity-65" htmlFor={subject.name}>
                                        {subject.label}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-end">
                        <Button
                            type="submit"
                            className="py-6 cursor-pointer font-bold bg-[#23396A] hover:bg-[#23396A] hover:rounded-3xl"
                        >
                            Send Message
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}