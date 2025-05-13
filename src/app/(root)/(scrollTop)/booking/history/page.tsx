"use client"

import useColumns from "@/components/booking/columns";
import BookingTable from "@/components/booking/table-content";
import usePagination from "@/store/paginationStore";

const bookingData = {
    "bookings": [
        {
            "created_at": "2025-05-11T20:58:52.767927Z",
            "crew_member_count": 2999,
            "end_date": "2025-05-28",
            "end_time": "21:04",
            "id": "01JV0J9FF0XC0H1EB4Q57KPQFX",
            "listing_slug": "modern-studio-50r0tjd60",
            "payment_window_expires_at": "0001-01-03T00:00:00Z",
            "requires_cleanup": true,
            "requires_inspection": true,
            "setup_day_count": 222,
            "start_date": "2025-05-17",
            "start_time": "21:00",
            "status": "pending",
            "total_price_kobo": 139000000,
            "updated_at": "2025-05-11T20:58:52.767927Z",
            "user": {
                "email": "root.dev@ayinlafilms.com",
                "first_name": "Root",
                "last_name": "Dev"
            }
        },
        {
            "created_at": "2025-05-11T17:07:50.783054Z",
            "crew_member_count": 40,
            "end_date": "2025-05-30",
            "end_time": "18:13",
            "id": "01JV052EBZ9QTJAPD72G3CVFWS",
            "listing_slug": "modern-studio-50r0tjd60",
            "payment_window_expires_at": "2025-05-13T20:56:42.999471Z",
            "requires_cleanup": false,
            "requires_inspection": false,
            "setup_day_count": 40,
            "start_date": "2025-05-17",
            "start_time": "18:12",
            "status": "rejected",
            "total_price_kobo": 161000000,
            "updated_at": "2025-05-11T20:56:43.000902Z",
            "user": {
                "email": "root.dev@ayinlafilms.com",
                "first_name": "Root",
                "last_name": "Dev"
            }
        },
        {
            "created_at": "2025-05-11T16:44:15.562989Z",
            "crew_member_count": 2,
            "end_date": "2025-05-30",
            "end_time": "17:50",
            "id": "01JV03Q8ABKZ9NSPA6MZXKMRN1",
            "listing_slug": "modern-studio-50r0tjd60",
            "payment_window_expires_at": "2025-05-13T20:56:51.828242Z",
            "requires_cleanup": false,
            "requires_inspection": false,
            "setup_day_count": 3,
            "start_date": "2025-05-16",
            "start_time": "17:48",
            "status": "rejected",
            "total_price_kobo": 172500000,
            "updated_at": "2025-05-11T20:56:51.829756Z",
            "user": {
                "email": "root.dev@ayinlafilms.com",
                "first_name": "Root",
                "last_name": "Dev"
            }
        },
        {
            "created_at": "2025-05-11T16:41:39.793903Z",
            "crew_member_count": 5,
            "end_date": "2025-05-28",
            "end_time": "21:41",
            "id": "01JV03JG6JQXJAGPR0JAB0H9ZK",
            "listing_slug": "modern-studio-50r0tjd60",
            "payment_window_expires_at": "2025-05-13T20:57:00.473329Z",
            "requires_cleanup": true,
            "requires_inspection": false,
            "setup_day_count": 4,
            "start_date": "2025-05-24",
            "start_time": "17:46",
            "status": "rejected",
            "total_price_kobo": 58000000,
            "updated_at": "2025-05-11T20:57:00.47444Z",
            "user": {
                "email": "root.dev@ayinlafilms.com",
                "first_name": "Root",
                "last_name": "Dev"
            }
        },
        {
            "created_at": "2025-05-11T19:42:18.295841Z",
            "crew_member_count": 12,
            "end_date": "2025-05-22",
            "end_time": "17:42",
            "id": "01JV0DX8NRPNHRRNYY898EP8B4",
            "listing_slug": "modern-studio-6z160tl4cp",
            "payment_window_expires_at": "0001-01-03T00:00:00Z",
            "requires_cleanup": true,
            "requires_inspection": true,
            "setup_day_count": 10,
            "start_date": "2025-05-14",
            "start_time": "04:41",
            "status": "pending",
            "total_price_kobo": 104500000,
            "updated_at": "2025-05-11T19:42:18.295841Z",
            "user": {
                "email": "root.dev@ayinlafilms.com",
                "first_name": "Root",
                "last_name": "Dev"
            }
        }
    ],
    "paging": {
        "count": 5,
        "limit": 5,
        "page": 1,
        "total_count": 50,
        "total_pages": 1
    }
}

export default function BookingHistoryPage() {
    const columns = useColumns();

    const {
        pageIndex,
        pageSize,
        page,
        limit,
        setPageIndex,
    } = usePagination("booking");

    return (
        <main className="min-h-full">
            <section>
                <div className="max-w-[1280px] p-10 mt-4 mx-auto">
                    <h1 className="text-3xl text-center text-[#414041] font-medium">Booking History</h1>
                    <BookingTable
                        data={bookingData.bookings}
                        columns={columns}
                        totalCount={bookingData.paging.total_count}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageIndex={setPageIndex}
                        isLoading={false}
                    />
                </div>
            </section>
        </main>
    );
}