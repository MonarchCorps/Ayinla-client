import ToastifyContainer from "@/components/toast-container";
import { AuthProvider } from "@/context/AuthContext";
import { inter } from "@/lib/fonts";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";
import { Metadata } from "next";
import { getDefaultMetadata } from "@/lib/metadata";
import { CONFIGS } from "@/config";
import { PaginationProvider } from "@/context/PaginationContext";

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


export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <AppRouterCacheProvider>
                    <PaginationProvider>
                        <AuthProvider>
                            <main>
                                {children}
                                <ToastifyContainer />
                            </main>
                        </AuthProvider>
                    </PaginationProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}