import { CancelButton } from "@/components/admin/cancel-button";
import { SaveButton } from "@/components/admin/form";
import { cn } from "@/lib/utils";
import { Form, type FormProps } from "ra-core";
import type * as React from "react";
import { Children, type ReactNode } from "react";

export const SimpleForm = ({
    children,
    className,
    toolbar = defaultFormToolbar,
    ...rest
}: {
    children: ReactNode;
    className?: string;
    toolbar?: ReactNode;
} & FormProps) => (
    <Form className={cn("flex w-full max-w-lg flex-col gap-4", className)} {...rest}>
        {children}
        {toolbar}
    </Form>
);

export const FormToolbar = ({ children, className, ...rest }: FormToolbarProps) => (
    <div
        {...rest}
        className={cn(
            "sticky bottom-0 bg-linear-to-b from-transparent to-10% to-background pt-4 pb-4 md:block md:pt-2 md:pb-0",
            className,
        )}
        role="toolbar"
    >
        {Children.count(children) === 0 ? (
            <div className="flex flex-row justify-end gap-2">
                <CancelButton />
                <SaveButton />
            </div>
        ) : (
            children
        )}
    </div>
);

export interface FormToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
    className?: string;
}

const defaultFormToolbar = <FormToolbar />;
