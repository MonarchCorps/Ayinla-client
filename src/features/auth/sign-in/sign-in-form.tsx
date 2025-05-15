"use client";

import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema } from "@/schema/auth";
import { AuthResponse, loginSchemaType } from "@/types/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/app/api/v1";
import { toastActionPromise } from "@/utils/toast-action";
import { useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { CONFIGS } from "@/config";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignInForm({
	wrapperStyle,
	showImage = true,
	shouldReplace = false,
	shouldAnimate = true,
}: {
	wrapperStyle?: string;
	showImage?: boolean;
	shouldReplace?: boolean;
	shouldAnimate?: boolean;
}) {
	const router = useRouter();
	const { setAuth } = useAuth();

	const rememberRef = useRef<HTMLInputElement>(null);
	const [persist, setPersist] = useState<boolean>(false);

	const { executeAsync, isExecuting } = useAction(useLoginUser)

	useEffect(() => {
		rememberRef.current?.focus();
	}, []);

	const form = useForm<loginSchemaType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});

	const onSubmit = async (values: loginSchemaType) => {
		const result: AuthResponse | undefined = await toastActionPromise(
			executeAsync,
			values,
			{
				pending: "Signing in...",
				success: "Signed in successfully!",
				error: {
					render({ data }) {
						return typeof data === "string" ? data : "Failed to login";
					},
				}
			}
		);

		if (result?.user.id) {
			const { user, access_token: token, token_expires_at } = result;

			setAuth({ user }, persist, { token, token_expires_at })
			router.push("/");
			form.reset(form.getValues());
		}
	}

	return (
		<motion.div
			className={clsx(
				"flex flex-col justify-center",
				wrapperStyle
			)}
			key="login-form"
			{...(shouldAnimate
				? {
					initial: { opacity: 0, y: 60 },
					animate: { opacity: 1, y: 0 },
					transition: { duration: 0.5 },
				}
				: {})}
		>
			{showImage && (
				<div
					className="w-64 h-20 relative self-center shrink-0 mb-4">
					<Link href={"/"}>
						<Image
							src="/images/logo2.webp"
							alt="Ayinla Logo"
							title="Ayinla Logo"
							layout="fill"
						/>
					</Link>
				</div>
			)}
			<h1 className="font-medium text-3xl/relaxed">Log in</h1>
			<p className="text-[#475467] text-base/relaxed">
				Welcome back! Please enter your details.
			</p>

			<div className="mt-4">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormInputField
							label="Email"
							name="email"
							inputType="email"
							placeholder="Enter your email"
						/>

						<FormInputField
							label="Password"
							name="password"
							inputType="password"
							placeholder="********"
						/>

						<div className="flex items-center justify-between mt-5 flex-wrap gap-2">
							<div className="flex items-center gap-2">
								<input
									ref={rememberRef}
									type="checkbox"
									className="size-4"
									checked={persist}
									onChange={() => {
										setPersist(!persist);
										localStorage.setItem(CONFIGS.STORAGE_NAME.persist, JSON.stringify(!persist));
									}}
								/>
								<p>Remember me</p>
							</div>
							<button
								type="button"
								className="cursor-pointer font-semibold text-[#175CD3]"
							>
								Forgot Password
							</button>
						</div>

						<Button
							type="submit"
							className="cursor-pointer w-full bg-[#23396A] py-6 mt-3 hover:bg-[#1d3568] text-base/relaxed"
							disabled={isExecuting}
						>
							Sign In
						</Button>
						<Button
							type="button"
							variant="outline"
							className="cursor-pointer w-full py-6 text-base/relaxed"
							disabled={isExecuting}
						>
							{true ? (
								<>
									<img
										src={"/images/google.png"}
										alt="Google login"
										className="size-6"
									/>
									Sign In with Google
								</>
							) : (
								<Spinner size="medium" className="text-[#000]" />
							)}
						</Button>
						<p className="text-[#475467] text-center mt-2">
							Don't have an account{" "}
							{shouldReplace ? (
								<Link
									className="font-semibold text-[#175CD3]"
									href={"/sign-up"}
									replace={shouldReplace}
								>
									Sign Up
								</Link>
							) : (
								<button
									type="button"
									className="cursor-pointer font-semibold text-[#175CD3]"
									onClick={(e) => {
										e.preventDefault(); window.location.href = "/sign-up"
									}}>Sign Up</button>
							)}
						</p>
					</form>
				</Form>
			</div>
		</motion.div>
	);
}
