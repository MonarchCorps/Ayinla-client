"use client";

import { useCompleteSignup } from "@/app/api/v1";
import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/useAuth";
import { completeSignupSchema } from "@/schema/auth";
import { AuthResponse, completeSignUpSchemaType } from "@/types/Auth";
import { toastActionPromise } from "@/utils/toast-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CompleteSignUpForm({ token }: { token: string }) {

    const router = useRouter();
    const { setAuth } = useAuth();

    const { executeAsync, isExecuting } = useAction(useCompleteSignup);

    const form = useForm<completeSignUpSchemaType>({
        resolver: zodResolver(completeSignupSchema),
        defaultValues: {
            token,
        } as Partial<completeSignUpSchemaType>,
    });

    const onSubmit = async (values: completeSignUpSchemaType) => {
        const result: AuthResponse = await toastActionPromise(
            executeAsync,
            { ...values, token },
            {
                pending: "Creating account...",
                success: "Account created",
                error: {
                    render({ data }) {
                        return typeof data === "string" ? data : "Failed to signup";
                    },
                }
            }
        )

        if (result?.user.id) {
            const { user, access_token: token, token_expires_at } = result;
            setAuth({ user }, true /** set persist to true by default */, { token, token_expires_at })
            router.push("/");
            form.reset(form.getValues());
        }
    }

    return (
        <div className="h-screen min-h-[30rem] flex flex-col max-w-[40rem] mx-auto px-10 mt-20">
            <div className="relative w-64 h-22 self-center mb-9 shrink-0">
                <Link href={"/"}>
                    <Image
                        src="/images/logo2.webp"
                        alt="Ayinla Logo"
                        title="Ayinla Logo"
                        fill
                    />
                </Link>
            </div>
            <h1 className="font-medium text-3xl/relaxed">Personal Details</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-x-3 gap-y-4 mt-5">
                    <FormInputField
                        label="First name"
                        name="first_name"
                        placeholder="Enter your first name"
                    />

                    <FormInputField
                        label="Last name"
                        name="last_name"
                        placeholder="Enter your last name"
                    />

                    <div className="col-span-2 space-y-5">
                        <FormInputField
                            label="Job title"
                            name="job_title"
                            placeholder="Provide your job role"
                        />
                        <FormInputField
                            label="Phone number"
                            name="phone_number"
                            inputType="text"
                            inputStyles="w-full"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <FormInputField
                        label="Password"
                        name="password"
                        inputType="password"
                        placeholder="Enter your password"
                    />

                    <FormInputField
                        label="Confirm password"
                        name="confirmPassword"
                        inputType="password"
                        placeholder="Confirm your password"
                    />

                    <Button
                        type="submit"
                        disabled={isExecuting}
                        className="col-span-2 cursor-pointer w-full bg-[#23396A] py-6 mt-3 hover:bg-[#1d3568] text-base/relaxed"
                    >
                        Proceed
                    </Button>
                </form>
            </Form>
        </div>
    );
}