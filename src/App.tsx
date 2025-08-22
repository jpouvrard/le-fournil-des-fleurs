import { Outlet } from "react-router";

import { ThemeProvider } from "@/lib/context/ThemeContext";
import { ToastContextProvider } from "@/lib/context/ToastContext";
import { UserProvider } from "@/lib/context/UserContext";

export default function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ToastContextProvider>
                <UserProvider>
                    <Outlet />
                </UserProvider>
            </ToastContextProvider>
        </ThemeProvider>
    );
}
