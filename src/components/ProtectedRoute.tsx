import { useUser } from "@/lib/context/UserContext";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const user = useUser();
    const location = useLocation();

    // If not authenticated, redirect to login with return path
    if (!user?.current) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // User is authenticated, render the protected content
    return <>{children}</>;
}
