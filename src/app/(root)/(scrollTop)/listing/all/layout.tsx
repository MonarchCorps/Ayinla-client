export default function ListingAllLayout({
    children,
    allListing
}: {
    children: React.ReactNode,
    allListing: React.ReactNode
}) {
    return (
        <div className="max-w-[1340px] px-10 pt-15 pb-30 mx-auto">
            {children}
            {allListing}
        </div>
    );
}