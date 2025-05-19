"use client";

import type { FormSelectFieldProps } from "@/types/Form";
import type { Option } from "@/types/Global";
import { useFormContext, type FieldValues } from "react-hook-form";
import type {
    MultiValue,
    SingleValue,
    StylesConfig,
    GroupBase,
    CSSObjectWithLabel,
} from "react-select";

import clsx from "clsx";
import { useEffect, useId, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";

const animatedComponents = makeAnimated();

export default function FormSelectField<T extends FieldValues>({
    name,
    placeholder,
    label,
    height = "2.8rem",
    bordercolor = "#D0D5DD",
    options,
    isCreatableSelect = false,
    isMulti = false,
    ...props
}: FormSelectFieldProps<T>) {
    const form = useFormContext();
    const instanceId = useId();
    const [isClient, setIsClient] = useState(false);

    const hasError = !!form.formState.errors[name];
    const [localOptions, setLocalOptions] = useState<Option[]>(options);

    useEffect(() => {
        setLocalOptions(options);
    }, [options]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const customSelectStyles: StylesConfig<Option, boolean, GroupBase<Option>> = {
        control: (
            provided: CSSObjectWithLabel,
            // state: ControlProps<Option, boolean>
        ) => ({
            ...provided,
            "&:active": { borderColor: "inherit" },
            "&:hover": { borderColor: !hasError ? "inherit" : "#e7000b" },
            borderColor: !hasError ? bordercolor : "#e7000b",
            borderRadius: "8px",
            borderWidth: "1px",
            minHeight: height,
        }),
        menu: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: "#fff",
            zIndex: 9999,
            borderRadius: "8px",
            color: "#323539",
        }),
        placeholder: (base: CSSObjectWithLabel) => ({
            ...base,
            fontWeight: 400,
            fontSize: "14px",
            color: "#858C95",
        }),
        input: (provided: CSSObjectWithLabel) => ({
            ...provided,
            caretColor: "transparent",
            border: "none",
            fontSize: "15px",
            borderWidth: "0px",
            "&:focus": {
                outline: "transparent",
                border: "black",
            },
            "&:focus-within": {
                outline: "transparent",
                border: "black",
            },
        }),
    };

    if (!isClient) {
        return (
            <FormItem className="flex flex-col">
                <FormLabel className="mb-1">{label}</FormLabel>
                <FormControl>
                    <div
                        className="border border-solid rounded-lg flex items-center px-2.5"
                        style={{
                            borderColor: bordercolor,
                            minHeight: height,
                            backgroundColor: "#fff"
                        }}
                    >
                        <div className="flex items-center justify-between w-full">
                            <span className="text-[14px] text-[#858C95] font-normal">
                                {placeholder}
                            </span>
                            <div className="flex items-center">
                                <div className="h-7 w-[0.07rem] bg-[#858C95] opacity-40 mr-2"></div>
                                <svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="text-[#858C95] opacity-20">
                                    <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        );
    }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                const SelectComponent = isCreatableSelect ? CreatableSelect : Select;

                const value = isMulti
                    ? (Array.isArray(field.value)
                        ? (field.value as string[]).map((val) => {
                            const found = localOptions.find((o) => o.value === val);
                            return found ?? { label: val, value: val };
                        })
                        : [])
                    : (() => {
                        if (!field.value) return null;
                        const val = field.value as string;
                        const found = localOptions.find((o) => o.value === val);
                        return found ?? { label: val, value: val };
                    })();

                const handleChange = (
                    selected: MultiValue<Option> | SingleValue<Option>,
                    // _actionMeta: ActionMeta<Option>
                ) => {
                    if (isMulti) {
                        field.onChange(
                            (selected as MultiValue<Option>).map((opt) => opt.value)
                        );
                    } else {
                        field.onChange(
                            (selected as SingleValue<Option>)?.value ?? null
                        );
                    }
                };

                const handleCreate = (inputValue: string) => {
                    const newOption: Option = { label: inputValue, value: inputValue };
                    setLocalOptions((prev) => [...prev, newOption]);

                    if (isMulti) {
                        const current = (field.value as string[]) || [];
                        field.onChange([...current, newOption.value]);
                    } else {
                        field.onChange(newOption.value);
                    }
                };

                return (
                    <FormItem className="flex flex-col">
                        <FormLabel className="mb-1">{label}</FormLabel>
                        <FormControl>
                            <SelectComponent
                                instanceId={instanceId}
                                options={localOptions}
                                menuPlacement="bottom"
                                value={value}
                                onChange={handleChange}
                                onCreateOption={
                                    isCreatableSelect ? handleCreate : undefined
                                }
                                styles={customSelectStyles}
                                className={clsx(
                                    "text-[14px] focus:outline-none focus:ring-2 focus:ring-red-500"
                                )}
                                placeholder={placeholder}
                                closeMenuOnSelect={!isMulti}
                                isMulti={isMulti}
                                components={animatedComponents}
                                {...props}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    );
}
