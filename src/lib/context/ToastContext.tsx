import {
    type ComponentProps,
    type PropsWithChildren,
    createContext,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";

import { Toast } from "@/components/Toast";

/**
 * Type for toast parameters including optional duration
 */
type Params = ComponentProps<typeof Toast> & { duration?: number };

/**
 * Type for toast items including ID and timer
 */
type ToastItem = ComponentProps<typeof Toast> & { id: number; timer: ReturnType<typeof setTimeout> };

/**
 * Default function for toast handling
 */
const defaultPush = (_toast: Params) => {};

/**
 * React Context for toast management
 */
const ToastContext = createContext({
    pushToastRef: { current: defaultPush },
});

/**
 * Provider component that supplies the toast context
 * @param children - The children components
 * @returns The provider component with context and toasts
 */
export function ToastContextProvider({ children }: PropsWithChildren) {
    const pushToastRef = useRef(defaultPush);

    return (
        <ToastContext value={{ pushToastRef }}>
            <Toasts />
            {children}
        </ToastContext>
    );
}

/**
 * Custom hook to use toast notifications
 * @returns A function to display a toast
 */
export function useToasts() {
    const { pushToastRef } = useContext(ToastContext);
    return {
        pushToast: useCallback(
            (toast: Params) => {
                pushToastRef.current(toast);
            },
            [pushToastRef],
        ),
    };
}

/**
 * Main component that manages toast notifications
 * @returns The component that displays all active toasts
 */
export function Toasts() {
    const [toasts, setToasts] = useState([] as ToastItem[]);
    const { pushToastRef } = useContext(ToastContext);

    // Function to add a new toast
    pushToastRef.current = ({ duration, ...props }) => {
        const id = Date.now(); // Generate unique ID based on timestamp

        // Create timer to automatically remove the toast
        const timer = setTimeout(
            () => {
                setToasts((v) => v.filter((t) => t.id !== id));
            },
            (duration ?? 5) * 1000, // Default duration of 5 seconds
        );

        // Add the new toast to the list
        const toast = { ...props, id, timer };
        setToasts((v) => [...v, toast]);
    };

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} />
                ))}
            </div>
        </div>
    );
}
