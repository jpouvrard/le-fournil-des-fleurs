import { Link } from "react-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useUser } from "@/lib/context/UserContext";

export default function Header() {
    const user = useUser();

    return (
        <header className="flex justify-end gap-5 p-5">
            {user?.current ? (
                <>
                    <Button onClick={() => user?.logout()} type="button" variant="outline">
                        Déconnexion
                    </Button>
                </>
            ) : (
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link to="/login">Connexion</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to="/register">Créer un compte</Link>
                    </Button>
                </div>
            )}
            <ThemeToggle />
        </header>
    );
}
