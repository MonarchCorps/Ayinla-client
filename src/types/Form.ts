import { FieldValues, Path } from "react-hook-form";

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
