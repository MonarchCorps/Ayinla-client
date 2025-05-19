import CreateBooking from "@/features/booking/create/create-booking-form";

export default async function CreateBookingPage({
    params
}: { params: Promise<{ slug: string }> }) {
    const { slug } = await params

    return (
        <CreateBooking
            slug={slug}
            wrapperStyles="max-w-[50rem] mx-auto px-10 my-16"
        />
    )
}