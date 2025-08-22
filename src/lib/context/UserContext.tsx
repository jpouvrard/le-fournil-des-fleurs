import { ID, type Models } from "appwrite";
import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

import { account } from "@/lib/appwrite";
import { useToasts } from "@/lib/context/ToastContext";

interface UserContextType {
    current: Models.User<Models.Preferences> | Models.Session | null;
    login: (email: string, password: string) => Promise<Error | null>;
    logout: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

export const UserContext = createContext<UserContextType | null>(null);

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({ children }: { children: ReactNode }) {
    const { pushToast } = useToasts();
    const [user, setUser] = useState<Models.User<Models.Preferences> | Models.Session | null>(null);

    async function login(email: string, password: string) {
        if (!email || !password) {
            throw new Error("Email and password are required");
        }
        try {
            const loggedIn = await account.createEmailPasswordSession(email, password);
            setUser(loggedIn);
            window.location.replace("/");
            return null;
        } catch (error) {
            pushToast({
                title: "Erreur",
                content: error instanceof Error ? error.message : "Une erreur serveur est apparue",
                type: "danger",
            });
            throw new Error((error as Error).message);
        }
    }

    async function logout() {
        await account.deleteSession("current");
        setUser(null);
    }

    async function register(email: string, password: string) {
        await account.create(ID.unique(), email, password);
        await login(email, password);
    }

    async function init() {
        try {
            const loggedIn = await account.get();
            setUser(loggedIn);
        } catch (err) {
            setUser(null);
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        init();
    }, []);

    return <UserContext value={{ current: user, login, logout, register }}>{children}</UserContext>;
}
