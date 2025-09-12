import type { FieldProps } from "@/lib/field.type";
import { useFieldValue, useTranslate } from "ra-core";
import type { HTMLAttributes } from "react";

export const NumberField = <RecordType extends Record<string, unknown> = Record<string, unknown>>({
    defaultValue,
    source,
    record,
    empty,
    transform = defaultTransform,
    locales,
    options,
    ...rest
}: NumberFieldProps<RecordType>) => {
    let value = useFieldValue({ defaultValue, source, record });
    const translate = useTranslate();

    if (value == null) {
        if (!empty) {
            return null;
        }

        return <span {...rest}>{typeof empty === "string" ? translate(empty, { _: empty }) : empty}</span>;
    }

    if (transform) {
        value = transform(value);
    }

    return (
        <span {...rest}>
            {hasNumberFormat && typeof value === "number" ? value.toLocaleString(locales, options) : value}
        </span>
    );
};

export interface NumberFieldProps<RecordType extends Record<string, unknown> = Record<string, unknown>>
    extends FieldProps<RecordType>,
        HTMLAttributes<HTMLSpanElement> {
    locales?: string | string[];
    options?: object;
    transform?: (value: unknown) => number;
}

const defaultTransform = (value: unknown): number | unknown =>
    value && typeof value === "string" && !Number.isNaN(Number(value)) ? +value : value;

const hasNumberFormat = !!(typeof Intl === "object" && Intl && typeof Intl.NumberFormat === "function");
