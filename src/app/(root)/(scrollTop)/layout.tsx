import ScrollToTop from "@/components/scroll-top";

export default function ScrollToTopLayout({
    children
}: { children: React.ReactNode }) {

    return (
        <>
            <ScrollToTop />
            {children}
        </>
    )
}