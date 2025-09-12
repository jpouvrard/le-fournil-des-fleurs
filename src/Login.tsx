import { useActionState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

import { Input } from "@/components/ui/input";
import { useUser } from "@/lib/context/UserContext";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";

export default function Login() {
    const user = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the page the user was trying to access
    const from = location.state?.from?.pathname || "/admin";

    // If already logged in, redirect to the intended page or admin
    useEffect(() => {
        if (user?.current) {
            navigate(from, { replace: true });
        }
    }, [user?.current, navigate, from]);

    const [state, submitAction, isPending] = useActionState(async (_previousState: unknown, formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        try {
            await user?.login(email, password);
            // Redirection vers la page d'origine ou le tableau de bord après connexion réussie
            navigate(from, { replace: true });
            return null;
        } catch (error) {
            return { error, data: { email, password } };
        }
    }, null);

    return (
        <>
            <form className="space-y-6" action={submitAction}>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label htmlFor="email">Adresse email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        defaultValue={state?.data?.email}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Mot de passe</Label>
                        <div className="text-sm">
                            <a href="/" className="font-semibold text-secondary hover:text-secondary/80">
                                Mot de passe oublié ?
                            </a>
                        </div>
                    </div>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        defaultValue={state?.data?.password}
                    />
                </div>
                <Button type="submit" className="w-full" disabled={isPending} variant="secondary">
                    {isPending ? "Connexion en cours..." : "Se connecter"}
                </Button>
            </form>

            <p className="mt-10 text-center text-gray-400 text-sm/6">
                Pas encore de compte ?{" "}
                <a href="/" className="font-semibold text-secondary hover:text-secondary/80">
                    Créer un compte
                </a>
            </p>
        </>
    );
}
