import { Breadcrumb, BreadcrumbItem, BreadcrumbPage } from "@/components/admin/breadcrumb";
import { ShowButton } from "@/components/admin/show-button";
import { cn } from "@/lib/utils";
import {
    EditBase,
    type EditBaseProps,
    Translate,
    useCreatePath,
    useEditContext,
    useGetRecordRepresentation,
    useGetResourceLabel,
    useHasDashboard,
    useResourceContext,
    useResourceDefinition,
} from "ra-core";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { DeleteButton } from "./delete-button";

export interface EditProps extends EditViewProps, EditBaseProps {}

export const Edit = ({ title, children, actions, className, ...rest }: EditProps) => (
    <EditBase {...rest}>
        <EditView title={title} actions={actions} className={className}>
            {children}
        </EditView>
    </EditBase>
);

export interface EditViewProps {
    title?: ReactNode | string | false;
    actions?: ReactNode;
    children?: ReactNode;
    className?: string;
}

export const EditView = ({ title, actions, className, children }: EditViewProps) => {
    const context = useEditContext();

    const resource = useResourceContext();
    if (!resource) {
        throw new Error("The EditView component must be used within a ResourceContextProvider");
    }
    const getResourceLabel = useGetResourceLabel();
    const listLabel = getResourceLabel(resource, 2);
    const createPath = useCreatePath();
    const listLink = createPath({
        resource,
        type: "list",
    });

    const getRecordRepresentation = useGetRecordRepresentation(resource);
    const recordRepresentation = getRecordRepresentation(context.record);

    const { hasShow } = useResourceDefinition({ resource });
    const hasDashboard = useHasDashboard();

    if (context.isLoading || !context.record) {
        return null;
    }

    return (
        <>
            <Breadcrumb>
                {hasDashboard && (
                    <BreadcrumbItem>
                        <Link to="/">
                            <Translate i18nKey="ra.page.dashboard">Home</Translate>
                        </Link>
                    </BreadcrumbItem>
                )}
                <BreadcrumbItem>
                    <Link to={listLink}>{listLabel}</Link>
                </BreadcrumbItem>
                <BreadcrumbPage>{recordRepresentation}</BreadcrumbPage>
            </Breadcrumb>
            <div className={cn("my-2 flex flex-wrap items-start justify-between gap-2", className)}>
                <h2 className="font-bold text-2xl tracking-tight">
                    {title !== undefined ? title : context.defaultTitle}
                </h2>
                {actions ?? (
                    <div className="flex items-center justify-end gap-2">
                        {hasShow ? <ShowButton /> : null}
                        <DeleteButton />
                    </div>
                )}
            </div>
            <div className="my-2">{children}</div>
        </>
    );
};
