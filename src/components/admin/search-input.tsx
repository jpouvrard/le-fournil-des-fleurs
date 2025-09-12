import { TextInput, type TextInputProps } from "@/components/admin/text-input";
import { Search } from "lucide-react";
import { useTranslate } from "ra-core";

export const SearchInput = (inProps: SearchInputProps) => {
    const { label, ...rest } = inProps;

    const translate = useTranslate();

    if (label) {
        throw new Error(
            "<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label.",
        );
    }

    return (
        <div className="relative mt-auto flex w-fit flex-grow">
            <TextInput label={false} helperText={false} placeholder={translate("ra.action.search")} {...rest} />
            <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 h-4 w-4 transform text-muted-foreground" />
        </div>
    );
};

export type SearchInputProps = TextInputProps;
