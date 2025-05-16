"use client";

import type { FormInputFieldProps } from "@/types/Form";
import { useFormContext, type FieldValues } from "react-hook-form";

import clsx from "clsx";
import { useState } from "react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

export default function FormInputField<T extends FieldValues>({
    label,
    formItemStyles,
    placeholder,
    disabled,
    inputMode,
    inputStyles,
    textarea,
    password,
    inputType,
    inputWithSide,
    value,
    name,
    id,
    minLength,
    maxLength,
    error,
    sideLabel,
    defaultValue,
    labelStyles,
    floatingLabel,
    autoComplete,
}: FormInputFieldProps<T>) {
    const form = useFormContext();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const inputClasses = clsx(
        "w-full rounded-md border bg-white text-[#323539]",
        "placeholder:text-[14px] placeholder:text-[#818181]",
        " focus:outline-none focus:ring-1 focus:ring-blue-500",
        form.formState.errors[name] && "border-red-500",
        !error && "border-[#D0D5DD]",
        inputStyles,
    );

    const renderInput = () => {
        const commonProps = {
            ...form.register(name),
            disabled,
            minLength,
            maxLength,
            value,
            defaultValue,
            id,
            // name: name || register?.name,
            "aria-invalid": !!error,
            "aria-describedby": error ? `${id}-error` : undefined,
        };

        if (textarea) {
            return (
                <textarea
                    {...commonProps}
                    className={clsx(inputClasses, "min-h-[100px] px-3 py-2")}
                    placeholder={placeholder}
                />
            );
        }

        const inputStyles = floatingLabel
            ? "pt-6 pb-2 px-3 peer placeholder-transparent"
            : "py-2 px-3";

        return (
            <div className="relative">
                <input
                    {...commonProps}
                    type={
                        password
                            ? isPasswordVisible
                                ? "text"
                                : "password"
                            : inputType || "text"
                    }
                    className={clsx(inputClasses, inputStyles)}
                    placeholder={floatingLabel ? " " : placeholder}
                    disabled={disabled}
                    minLength={minLength}
                    maxLength={maxLength}
                    defaultValue={defaultValue}
                    id={id}
                    inputMode={inputMode || "text"}
                    autoComplete={autoComplete}
                />

                {password && (
                    <button
                        type="button"
                        onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={
                            isPasswordVisible
                                ? "Hide password"
                                : "Show password"
                        }
                    >
                        {isPasswordVisible ? "Hide" : "Show"}
                    </button>
                )}

                {inputWithSide && sideLabel && (
                    <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center space-x-2">
                        <div className="h-[18px] w-[1px] rounded-full bg-[#B7B7B7]" />
                        <span className="text-[15px] text-[#323539]">
                            {sideLabel}
                        </span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={() => (
                <FormItem className={clsx(`${formItemStyles}`)}>
                    <FormLabel className={clsx(`${labelStyles}`)}>{label}</FormLabel>
                    <FormControl>
                        {renderInput()}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    );
}
