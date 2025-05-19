import { FieldValues, Path } from "react-hook-form";
import { Option } from "./Global";

export type FormInputFieldProps<T extends FieldValues> = {
    label?: string;
    labelStyles?: string;
    name: Path<T>;
    id?: string;
    inputStyles?: string;
    placeholder?: string;
    pattern?: string;
    sideLabel?: string;
    error?: boolean;
    value?: string | number;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    inputType?: string;
    inputWithSide?: boolean;
    textarea?: boolean;
    disabled?: boolean;
    password?: boolean;
    inputMode?: InputMode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    floatingLabel?: boolean;
    formItemStyles?: string;
    defaultValue?: number | string;
    autoComplete?: string;
};

export type FormDatePickerFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    formItemStyles?: string;
    labelStyles?: string;
    className?: string;
};

export type FormSelectFieldProps<T extends FieldValues> = {
    label: string;
    name: Path<T>;
    placeholder: string;
    height?: string;
    focuscolor?: string;
    bordercolor?: string;
    options: Option[];
    isCreatableSelect?: boolean;
    isMulti?: boolean;
};

export type FormTimePickerFieldProps<T extends FieldValues> = FormDatePickerFieldProps<T>;

export enum InputMode {
    Url = "url",
    Text = "text",
    Search = "search",
    Numeric = "numeric",
    None = "none",
    Tel = "tel",
    Email = "email",
    Decimal = "decimal",
}
