import {
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog"
import CreateBooking from "@/features/booking/create/create-booking-form";

export default async function Page({
    params
}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return (
        <DialogContent className="rounded-none mt-10 max-w-[300rem]" primitiveClassname="hidden">
            <DialogTitle className="!sr-only">
                Create a booking
            </DialogTitle>
            <CreateBooking
                slug={slug}
                wrapperStyles="h-fit my-1 max-w-full px-2"
            />
        </DialogContent>
    );
}