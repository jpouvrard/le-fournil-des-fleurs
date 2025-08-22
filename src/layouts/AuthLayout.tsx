import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center bg-primary-foreground px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        src="src/assets/logo-jpdev-small.webp"
                        alt="Starter React Appwrite logo"
                        className="mx-auto w-auto"
                        width="256"
                        height="256"
                    />
                    <h2 className="mt-10 text-center font-bold text-2xl/9 text-primary tracking-tight">
                        Connectez-vous à votre compte
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
