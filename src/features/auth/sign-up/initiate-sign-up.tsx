"use client";

import { useInitiateSignUp } from "@/app/api/v1";
import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { initiateSignUpSchema } from "@/schema/auth";
import { initiateSignUpSchemaType } from "@/types/Auth";
import { toastActionPromise } from "@/utils/toast-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";

function Logo() {
    return (
        <Link href="/" className="flex items-center justify-center">
            <img
                src="/images/logo2.webp"
                alt="Logo"
                className="w-64 max-[400px]:w-40 object-cover mb-9 shrink-0"
            />
        </Link>
    );
}

function SignUpForm({
    form,
    onSubmit,
    isExecuting,
    shouldReplace
}: {
    form: ReturnType<typeof useForm<initiateSignUpSchemaType>>;
    onSubmit: (values: initiateSignUpSchemaType) => void;
    isExecuting: boolean;
    shouldReplace: boolean;
}) {
    return (
        <>
            <h1 className="font-medium text-3xl/relaxed">Create an account</h1>
            <div className="mt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormInputField
                            label="Email"
                            name="email"
                            inputType="email"
                            placeholder="Enter your email"
                        />

                        <Button
                            type="submit"
                            className="cursor-pointer w-full bg-[#23396A] py-6 mt-3 hover:bg-[#1d3568] text-base/relaxed"
                            disabled={isExecuting}
                        >
                            Get Started
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full py-6 text-base/relaxed"
                            disabled={isExecuting}
                        >
                            {true ? (
                                <>
                                    <img src="/images/google.png" alt="Google login" className="size-6" />
                                    Sign Up with Google
                                </>
                            ) : (
                                <Spinner size="medium" className="text-[#000]" />
                            )}
                        </Button>

                        <p className="text-[#475467] text-center mt-2">
                            Already have an account{" "}
                            {shouldReplace ? (
                                <Link
                                    className="font-semibold text-[#175CD3]"
                                    href={"/sign-in"}
                                    replace={shouldReplace}
                                >
                                    Sign In
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    className="cursor-pointer font-semibold text-[#175CD3]"
                                    onClick={(e) => {
                                        e.preventDefault(); window.location.href = "/sign-in"
                                    }}>Sign In</button>
                            )}
                        </p>
                    </form>
                </Form>
            </div>
        </>
    );
}

function ConfirmationScreen({
    email,
    onResend,
    isMobile,
    shouldReplace
}: {
    email: string;
    onResend: () => void;
    isMobile: boolean;
    shouldReplace: boolean;
}) {
    return (
        <>
            <h1 className="font-medium text-3xl/relaxed">Check your email</h1>
            <p className="text-[#475467] text-base/relaxed">
                We sent a registration link to {email}
            </p>

            {isMobile ? (
                <Button asChild className="cursor-pointer w-full bg-[#23396A] py-6 mt-7 hover:bg-[#1d3568] text-base/relaxed">
                    <a href="mailto:">Open Email App</a>
                </Button>
            ) : (
                <Button
                    onClick={() => window.open("https://mail.google.com/mail/u/0/#inbox", "_blank")}
                    className="cursor-pointer w-full bg-[#23396A] py-6 mt-7 hover:bg-[#1d3568] text-base/relaxed"
                >
                    Open Gmail
                </Button>
            )}

            <p className="text-[#475467] text-center mt-5">
                Didn't receive the email?{" "}
                <button
                    type="button"
                    className="cursor-pointer font-semibold text-[#175CD3]"
                    onClick={onResend}
                >
                    Click to resend
                </button>
            </p>

            <p className="text-[#475467] text-center mt-5">
                Already have an account{" "}
                {shouldReplace ? (
                    <Link
                        className="font-semibold text-[#175CD3]"
                        href={"/sign-in"}
                        replace={shouldReplace}
                    >
                        Sign In
                    </Link>
                ) : (
                    <button
                        type="button"
                        className="cursor-pointer font-semibold text-[#175CD3]"
                        onClick={(e) => {
                            e.preventDefault(); window.location.href = "/sign-in"
                        }}>Sign In</button>
                )}
            </p>
        </>
    );
}

export default function InitiateSignUpForm({
    wrapperStyle,
    showImage = true,
    shouldAnimate = true,
    shouldReplace = false,
}: {
    wrapperStyle?: string;
    showImage?: boolean;
    shouldAnimate?: boolean;
    shouldReplace?: boolean;
}) {
    const { executeAsync, isExecuting } = useAction(useInitiateSignUp);
    const [initiatedSignup, setInitiatedSignup] = useState(false);

    const form = useForm<initiateSignUpSchemaType>({
        resolver: zodResolver(initiateSignUpSchema),
        defaultValues: { email: "" },
    });

    const isMobile =
        typeof window !== "undefined" &&
        /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

    const handleSubmit = async (values: initiateSignUpSchemaType) => {
        const result = await toastActionPromise(
            executeAsync,
            values,
            {
                pending: "Initiating Signup...",
                success: "Signup Initiated",
                error: {
                    render({ data }) {
                        return typeof data === "string" ? data : "Failed to initiate signup";
                    }
                }
            }
        );

        if (result?.message) {
            setInitiatedSignup(true);
        }
    };

    const content = initiatedSignup ? (
        <>
            {showImage && <Logo />}
            <ConfirmationScreen
                email={form.getValues("email")}
                onResend={() => handleSubmit(form.getValues())}
                isMobile={isMobile}
                shouldReplace={shouldReplace}
            />
        </>
    ) : (
        <>
            {showImage && <Logo />}
            <SignUpForm
                form={form}
                onSubmit={handleSubmit}
                isExecuting={isExecuting}
                shouldReplace={shouldReplace}
            />
        </>
    );

    return (
        <div className={clsx("flex flex-col", wrapperStyle)}>
            {shouldAnimate ? (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={initiatedSignup ? "confirmation" : "form"}
                        initial={{ opacity: 0, y: initiatedSignup ? -40 : 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: initiatedSignup ? 40 : -40 }}
                        transition={{ duration: 0.5 }}
                    >
                        {content}
                    </motion.div>
                </AnimatePresence>
            ) : (
                content
            )}
        </div>
    );
}
