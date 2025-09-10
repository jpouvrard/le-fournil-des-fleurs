import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function Home() {
    return (
        <div className="m-0 flex h-full w-full flex-col items-center justify-center gap-6 text-center text-primary">
            <h1 className="p-8 font-bold text-5xl">
                Bienvenue sur votre application <br />
                TerroirDirect
            </h1>
            <Button asChild variant="secondary" size="lg" className="text-xl">
                <Link to="/login">Connexion au tableau de bord</Link>
            </Button>
        </div>
    );
}
