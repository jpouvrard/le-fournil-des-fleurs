import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

import App from "@/App.tsx";
import "@/index.css";
import Home from "@/Home.tsx";
import Login from "@/Login.tsx";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

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
        ],
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);

root.render(<RouterProvider router={router} />);
