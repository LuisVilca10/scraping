import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");

    // Si hay token y userData, redirige al usuario fuera de esta ruta
    if (token && userData) {
        return <Navigate to="/" replace />;
    }

    return children; // Renderiza el componente protegido
};

export default ProtectedRoute;
