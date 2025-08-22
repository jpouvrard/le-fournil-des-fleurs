import { Outlet } from "react-router";

import Header from "@/components/Header";

export default function MainLayout() {
    return (
        <div className="relative flex h-screen w-screen flex-col bg-primary-foreground">
            <Header />
            <main className="flex-1 p-5">
                <Outlet />
            </main>
        </div>
    );
}
