'use client';

import clsx from "clsx";
import { useState } from "react";

export default function AnimatedInput({
    label,
    type,
    name,
    id
}: {
    label: string,
    type: string,
    name: string,
    id: string,
}) {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const handleFocus = () => setIsFocused(true);

    const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsFocused(false);
        setHasValue(e.target.value !== "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasValue(e.target.value !== "");
    };

    return (
        <div className="flex flex-col relative">
            <label
                htmlFor={id}
                className={clsx(
                    "absolute transition-all duration-300 pointer-events-none",
                    (isFocused || hasValue)
                        ? "transform -translate-y-6 text-xs font-semibold text-blue-600"
                        : "transform translate-y-0 text-sm text-gray-600 opacity-50"
                )}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                autoComplete="off"
                className={clsx(
                    "border-b mt-3 outline-none transition-all duration-300 py-1",
                    isFocused ? "border-blue-500 border-b-2" : "border-gray-300"
                )}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={handleChange}
            />
        </div>
    );
};
