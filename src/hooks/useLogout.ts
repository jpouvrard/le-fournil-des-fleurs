import { useUser } from "@/lib/context/UserContext";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const user = useUser();
    const navigate = useNavigate();

    const logout = useCallback(async () => {
        try {
            await user?.logout();
            // Redirect to home page after logout
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    }, [user, navigate]);

    return logout;
}
