import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../ServerSide/Hooks/Auth/useAuth";
import { ROUTES } from "../../Libs/Routes/config";
import LoadingScreen from "../LoadingScreen";

const ProformaRoute = ({ children }) => {
    const { isAuthenticated, loading, checkAuth } = useAuth();
    const [checking, setChecking] = useState(true);
    const location = useLocation();

    useEffect(() => {
        const verifyAuth = async () => {
            await checkAuth();
            setChecking(false);
        };

        verifyAuth();
    }, [checkAuth]);

    if (checking || loading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.AUTH.LOGIN}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default ProformaRoute;
