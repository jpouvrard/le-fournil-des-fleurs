import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import matches from "lodash/matches";
import pickBy from "lodash/pickBy";
import { CircleX } from "lucide-react";
import { useListContext, useTranslate } from "ra-core";
import type React from "react";

export const ToggleFilterButton = ({
    label,
    size = "sm",
    value,
    className,
}: {
    label: React.ReactElement | string;
    value: unknown;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
}) => {
    const { filterValues, setFilters } = useListContext();
    const translate = useTranslate();
    const isSelected = getIsSelected(value, filterValues);
    const handleClick = () => setFilters(toggleFilter(value, filterValues));
    return (
        <Button
            variant={isSelected ? "secondary" : "ghost"}
            onClick={handleClick}
            className={cn(
                "cursor-pointer",
                "flex w-full flex-row items-center justify-between gap-2 px-2.5",
                className,
            )}
            size={size}
        >
            {typeof label === "string" ? translate(label, { _: label }) : label}
            {isSelected && <CircleX className="opacity-50" />}
        </Button>
    );
};

const toggleFilter = (value: Record<string, unknown>, filters: Record<string, unknown>) => {
    const isSelected = matches(pickBy(value, (val) => typeof val !== "undefined"))(filters);

    if (isSelected) {
        const keysToRemove = Object.keys(value);
        const result: Record<string, unknown> = {};
        for (const key of Object.keys(filters)) {
            if (!keysToRemove.includes(key)) {
                result[key] = filters[key];
            }
        }
        return result;
    }

    return { ...filters, ...value };
};

const getIsSelected = (value: Record<string, unknown>, filters: Record<string, unknown>) =>
    matches(pickBy(value, (val) => typeof val !== "undefined"))(filters);
