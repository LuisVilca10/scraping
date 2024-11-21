import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold text-red-600">Acceso Denegado</h1>
            <p className="text-gray-600 mt-4">
                No tienes los permisos necesarios para acceder a esta página.
            </p>
            <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded">
                Volver al Inicio
            </Link>
        </div>
    );
};

export default AccessDenied;
