import { Link } from "react-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/UserContext";

export default function Header() {
    const user = useUser();

    return (
        <header className="flex justify-end gap-5 p-5">
            {/* <h1>Starter React Appwrite</h1> */}
            {user?.current ? (
                <>
                    <Button onClick={() => user?.logout()} type="button" variant="outline">
                        Logout
                    </Button>
                </>
            ) : (
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/register">Register</Link>
                    </Button>
                </div>
            )}
            <ThemeToggle />
        </header>
    );
}
