"use client";

import type { FormDatePickerFieldProps } from "@/types/Form";
import { useFormContext, type FieldValues } from "react-hook-form";

import clsx from "clsx";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function FormDatePickerField<T extends FieldValues>({
    name,
    label,
    placeholder = "Pick a date",
    formItemStyles,
    labelStyles,
    required,
    disabled,
    className,
}: FormDatePickerFieldProps<T>) {
    const form = useFormContext();
    const [isOpen, setIsOpen] = useState(false);

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
                    <FormControl>
                        <Popover open={isOpen} onOpenChange={setIsOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={clsx(
                                        "w-full rounded-md border bg-white text-[#323539]",
                                        "placeholder:text-[14px] placeholder:text-[#818181]",
                                        " focus:outline-none focus:ring-1 focus:ring-blue-500 h-11 px-3",
                                        form.formState.errors[name] && "border-red-500",
                                        className,
                                    )}
                                    disabled={disabled}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? format(new Date(field.value), "PPP") : placeholder}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            field.onChange(format(date, "yyyy-MM-dd"));
                                            setIsOpen(false);
                                        }
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
