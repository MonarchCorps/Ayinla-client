"use client";

import type { FormTimePickerFieldProps } from "@/types/Form";
import { useFormContext, type FieldValues } from "react-hook-form";

import clsx from "clsx";
import { Clock } from "lucide-react";
import { useRef } from "react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function FormTimePickerField<T extends FieldValues>({
    name,
    label,
    placeholder = "Select time",
    formItemStyles,
    labelStyles,
    required,
    disabled,
    className,
}: FormTimePickerFieldProps<T>) {
    const form = useFormContext();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleShowPicker = () => {
        if (inputRef.current) {
            inputRef.current.showPicker();
        }
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={clsx(formItemStyles)}>
                    {label && (
                        <FormLabel className={clsx(labelStyles)}>
                            {label}
                            {required && <span className="ml-1 text-red-600">*</span>}
                        </FormLabel>
                    )}
                    <FormControl onClick={handleShowPicker}>
                        <div className="relative">
                            <Clock
                                className="absolute left-3 top-1/2 h-[15px] w-[15px] -translate-y-1/2 opacity-75 cursor-pointer"
                                onClick={handleShowPicker}
                            />
                            <Input
                                ref={inputRef}
                                type="time"
                                disabled={disabled}
                                placeholder={placeholder}
                                className={clsx(
                                    "pl-10 h-11 w-full rounded-md border bg-white text-[#323539]",
                                    "placeholder:text-[14px] placeholder:text-[#818181]",
                                    "focus:outline-none focus:ring-1 focus:ring-blue-500",
                                    form.formState.errors[name] && "border-red-500",
                                    className,
                                )}
                                value={field.value || ""}
                                onChange={field.onChange}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
