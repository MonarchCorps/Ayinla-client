export default function OwnListingLayout({
    children,
    ownListing
}: { children: React.ReactNode; ownListing: React.ReactNode }) {
    return (
        <div className="max-w-[1380px] mx-auto py-10 px-10">
            {children}
            {ownListing}
        </div>
    );
}