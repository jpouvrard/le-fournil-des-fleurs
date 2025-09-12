import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "@/App.tsx";
import "@/index.css";
import Home from "@/Home.tsx";
import Login from "@/Login.tsx";
import { ProtectedRoute } from "@/components/ProtectedRoute.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";
import { AdminApp } from "@/pages/AdminApp.tsx";

const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                Component: MainLayout,
                children: [{ path: "/", Component: Home }],
            },
            {
                Component: AuthLayout,
                children: [{ path: "login", Component: Login }],
            },
            {
                path: "admin/*",
                element: (
                    <ProtectedRoute>
                        <AdminApp />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);
