import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import { CONFIGS } from "@/config";
import { inter } from "@/lib/fonts";
import { getDefaultMetadata } from "@/lib/metadata";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = getDefaultMetadata({
	title: "Ayinla Films Location (AFL) | Premium Filming Locations Across Nigeria",
	description: "Discover and book premium filming locations in Nigeria with Ayinla Films. From cozy homes to high-end studios and stunning outdoor sets — find the perfect spot for your film, ad, or music video.",
	keywords: [
		"Ayinla Films",
		"Film locations Nigeria",
		"Book movie sets Nigeria",
		"Filming locations Lagos",
		"Studio rental for music video",
		"Outdoor film locations Nigeria",
		"Production set rental",
		"Movie location marketplace",
		"Nigerian film industry",
		"Video shoot places in Nigeria",
	],
	url: CONFIGS.URL.CLIENT_BASE_URL,
	alt: "Browse filming locations on Ayinla Films",
	twitterTitle: "Ayinla Films | Discover & Book Filming Locations in Nigeria",
	twitterDesc:
		"Easily find film sets, homes, and studios for your next production. Ayinla Films connects you to Nigeria's best filming locations.",
})
// }

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
				<AppRouterCacheProvider>
					<div className="flex flex-col min-h-screen">
						<Header />
						<div className="flex-1">
							{children}
						</div>
						<Footer />
					</div>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
