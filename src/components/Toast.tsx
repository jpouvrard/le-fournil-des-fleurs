import CheckIcon from "@/components/icons/CheckIcon";
import ExclamationIcon from "@/components/icons/ExclamationIcon";

type ToastProps = {
    title?: string;
    content: string;
    type?: "success" | "danger" | "default";
};

export function Toast({ title, content, type = "default" }: ToastProps) {
    return (
        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-closed:data-enter:translate-y-2 data-enter:transform data-closed:opacity-0 data-enter:duration-300 data-leave:duration-100 data-enter:ease-out data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
            <div className="p-4">
                <div className="flex items-start">
                    <div className="shrink-0">
                        {type === "success" && <CheckIcon type={type} />}
                        {type === "danger" && <ExclamationIcon type={type} />}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        {title && (
                            <p>
                                <strong className="font-medium text-gray-900 text-sm">{title}</strong>
                            </p>
                        )}
                        <p className="mt-1 text-gray-500 text-sm">{content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
