"use client"

import { IoArrowBack, IoKeyOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import { initiateForgotPasswordSchemaType } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { initiateForgotPasswordSchema } from "@/schema/auth";
import { Form } from "@/components/ui/form";
import { toastActionPromise } from "@/utils/toast-action";
import { useAction } from "next-safe-action/hooks";
import { useInitiateForgotPassword } from "@/app/api/v1";

export default function InitiateForgotPassword() {

    const { executeAsync, isExecuting } = useAction(useInitiateForgotPassword);

    const form = useForm<initiateForgotPasswordSchemaType>({
        resolver: zodResolver(initiateForgotPasswordSchema),
        defaultValues: {
            email: ""
        }
    })

    const onSubmit = async (values: initiateForgotPasswordSchemaType) => {
        await toastActionPromise(
            executeAsync,
            values,
            {
                pending: "Initiating password recovery...",
                success: "Check your email.",
                error: {
                    render({ data }) {
                        return typeof data === "string" ? data : "Failed to initiate password recovery";
                    }
                }
            }
        )
    }

    return (
        <motion.div
            className="flex flex-col max-w-[40rem] mx-auto px-10 mt-20"
            key={"forgot-password"}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-fit self-center bg-[#121212] p-4 px-5 rounded-xl mb-2">
                <IoKeyOutline size={40} color="#fff" />
            </div>
            <h1 className="font-semibold text-[#175CD3] text-3xl/relaxed mb-1">
                Forgot Password
            </h1>
            <p className="text-[#475467]">No worries, we’ll send you reset instructions.</p>
            <div className="mt-6">
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
                            disabled={isExecuting}
                            className="cursor-pointer w-full bg-[#23396A] py-6 mt-3 hover:bg-[#1d3568] text-base/relaxed"
                        >

                            Reset Password
                        </Button>
                    </form>

                    <div className="w-full grid place-content-center mt-5">
                        <button
                            type="button"
                            className="cursor-pointer w-fit flex items-center gap-2"
                            onClick={() => window.location.href = "/sign-in"}
                            disabled={isExecuting}
                        >
                            <IoArrowBack />
                            <p>Back to Login</p>
                        </button>
                    </div>
                </Form>
            </div>
        </motion.div>
    );
}
