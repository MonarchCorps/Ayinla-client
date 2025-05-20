"use client";

import { useCompleteForgotPassword } from "@/app/api/v1/auth";
import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { completeForgotPasswordSchema } from "@/schema/auth";
import { completeForgotPasswordSchemaType } from "@/types/Auth";
import { toastActionPromise } from "@/utils/toast-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion"
import { IoKeyOutline } from "react-icons/io5";

export default function CompleteForgotPassword({ token }: { token: string }) {

    const { executeAsync, isExecuting } = useAction(useCompleteForgotPassword);

    const form = useForm<completeForgotPasswordSchemaType>({
        resolver: zodResolver(completeForgotPasswordSchema),
        defaultValues: {
            token,
        } as Partial<completeForgotPasswordSchemaType>,
    });

    const onSubmit = async (values: completeForgotPasswordSchemaType) => {
        await toastActionPromise(
            executeAsync,
            values,
            {
                pending: "Resetting password...",
                success: "Password has been reset",
                error: {
                    render({ data }) {
                        return typeof data === "string" ? data : "Failed to reset password";
                    }
                }
            }
        )

        window.location.replace("/sign-in");
    }

    return (
        <motion.div
            className="flex flex-col max-w-[40rem] mx-auto px-10 mt-20"
            key={"complete-forgot-password"}
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-fit self-center bg-[#121212] p-4 px-5 rounded-xl mb-2">
                <IoKeyOutline size={40} color="#fff" />
            </div>
            <h1 className="font-600 text-[#175CD3] text-3xl/relaxed mb-1">
                Reset Password
            </h1>

            <div className="mt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormInputField
                            label="New Password"
                            name="new_password"
                            inputType="password"
                            placeholder="Enter your new password"
                        />
                        <Button
                            type="submit"
                            disabled={isExecuting}
                            className="cursor-pointer w-full bg-[#23396A] py-6 mt-3 hover:bg-[#1d3568] text-base/relaxed"
                        >
                            Reset Password
                        </Button>
                    </form>

                </Form>
            </div>
        </motion.div>
    );
}