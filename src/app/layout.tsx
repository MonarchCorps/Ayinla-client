import ToastifyContainer from "@/components/toast-container";
import { AuthProvider } from "@/context/AuthContext";
import { inter } from "@/lib/fonts";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "./globals.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} antialiased`}
            >
                <AppRouterCacheProvider>
                    <AuthProvider>
                        <main>
                            {children}
                            <ToastifyContainer />
                        </main>
                    </AuthProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}