"use client";

import clsx from "clsx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export type LottieProps = {
    animationData?: string,
    autoplay?: boolean,
    loop?: boolean,
    className?: string;
    text: React.ReactNode,
    wrapperStyle?: string
    textStyle?: string;
    children?: React.ReactNode
}

export default function InterimState({
    animationData,
    autoplay = true,
    loop = true,
    className,
    text,
    wrapperStyle,
    textStyle,
    children
}: LottieProps) {
    return (
        <div className={clsx("flex flex-col items-center text-center mt-10", wrapperStyle)}>
            <DotLottieReact
                src={animationData || "/lottie/loading.lottie"}
                loop={loop}
                autoplay={autoplay}
                className={clsx("size-40", className)}
            />
            <div className={clsx("font-semibold", textStyle)}>{text}</div>
            {children}
        </div>
    );
}
