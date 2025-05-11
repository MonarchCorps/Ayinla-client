import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import { CONFIGS } from "@/config";
import { Geist } from "next/font/google";
import "../globals.css";

const inter = Geist({
	subsets: ["latin"]
})

export const metadata = {
	title: "Ayinla Films Location (AFL) | Discover & Book Filming Locations in Nigeria",
	description: "Ayinla Films Location is your go-to marketplace for finding and booking unique filming locations in Nigeria. From cozy apartments to stunning studios, AFL helps creators bring their vision to life.",
	keywords: [
		"Ayinla Films",
		"Filming locations Nigeria",
		"Movie sets Nigeria",
		"Book film locations",
		"Studios Nigeria",
		"Video shoot places"
	],
	openGraph: {
		title: "Ayinla Films Location (AFL)",
		description: "Discover and book filming locations across Nigeria with ease. Find cozy homes, studios, and outdoor sets for your next film or content project.",
		url: CONFIGS.URL.CLIENT_BASE_URL,
		siteName: "Ayinla Films",
		images: [
			{
				url: "https://ayinla.vercel.app/path-to-hero-image.jpg",
				width: 1200,
				height: 630,
				alt: "Ayinla Films Hero Image"
			}
		],
		type: "website"
	},
	twitter: {
		card: "summary_large_image",
		title: "Ayinla Films Location (AFL)",
		description: "Your go-to platform for premium filming locations in Nigeria.",
		images: ["https://ayinla.vercel.app/path-to-hero-image.jpg"]
	}
};


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
