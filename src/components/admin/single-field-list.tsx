import { Badge } from "@/components/ui/badge";
import { RecordContextProvider, RecordRepresentation, useListContext } from "ra-core";

export const SingleFieldList = <RecordType = Record<string, unknown>>({
    children,
    render,
    className,
}: {
    children?: React.ReactNode;
    render?: (record: RecordType, index: number) => React.ReactNode;
    className?: string;
}) => {
    const { data } = useListContext();

    return (
        <div className={`flex gap-2 ${className}`}>
            {data?.map((record, index) => (
                <RecordContextProvider key={record.id || `record-${index}`} value={record}>
                    {render ? render(record, index) : children || <DefaultChildren />}
                </RecordContextProvider>
            ))}
        </div>
    );
};

const DefaultChildren = () => (
    <Badge variant="outline">
        <RecordRepresentation />
    </Badge>
);
