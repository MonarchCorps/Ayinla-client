import Footer from "@/components/partials/footer/footer";
import Header from "@/components/partials/header/header";
import { CONFIGS } from "@/config";
import { inter } from "@/lib/fonts";
import { getDefaultMetadata } from "@/lib/metadata";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Metadata } from "next";
import "../globals.css";
import ToastifyContainer from "@/components/toast-container";
import { AuthProvider } from "@/context/AuthContext";

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

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} antialiased`}
			>
				<AppRouterCacheProvider>
					<AuthProvider>
						<div className="flex flex-col min-h-screen">
							<Header />
							<main className="flex-1 min-h-full">
								{children}
								{modal}
							</main>
							<Footer />
							<ToastifyContainer />
						</div>
					</AuthProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
