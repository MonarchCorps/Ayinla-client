'use client';

import InterimState from '@/components/loader/interim-state'
import RetryButton from '@/components/retry-button'
import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

export default function Error({
    reset,
    error
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    const router = useRouter();
    const reload = () => {
        startTransition(() => {
            router.refresh();
            reset();
        })
    }

    return (
        <div>
            <div role="alert" className="mt-6">
                <InterimState
                    text='Something went wrong‼️'
                    textStyle='font-bold text-3xl text-red-600 mt-3 mb-2'
                >
                    <p className='font-semibold text-base/relaxed mb-4'>
                        {error.message || "Failed to fetch listings"}
                    </p>
                    <RetryButton onClick={() => {
                        reload();
                    }} />
                </InterimState>
            </div>
        </div>
    )
}