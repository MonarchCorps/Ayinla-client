import { CONFIGS } from "@/config";
import SignIn from "@/features/auth/sign-in";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Sign In | Ayinla Films Location (AFL)",
	description: "Access your Ayinla Films account to manage bookings, view saved locations, and more.",
	keywords: [
		"Ayinla Films login",
		"Sign in filming location Nigeria",
		"Access film booking account",
		"Filming location platform Nigeria",
		"Nigerian film industry tools",
	],
	alternates: {
		canonical: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/sign-in`,
	},
	openGraph: {
		title: "Sign In to Ayinla Films",
		description: "Access premium filming locations across Nigeria by signing in to your account.",
		url: `${CONFIGS.URL.CLIENT_BASE_URL}/auth/sign-in`,
		siteName: "Ayinla Films",
	},
	twitter: {
		title: "Sign In | Ayinla Films",
		description: "Manage your bookings and explore new film locations across Nigeria.",
		card: "summary_large_image",
	},
};

export default function SignInPage() {
	return <SignIn />;
}
