import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem("userData")) || null;

  // Verifica si el usuario tiene el tipo adecuado (type_user === 1)
  if (!userData || userData.type_user !== 1) {
    return <Navigate to="/access-denied" replace />; // Redirige si no cumple
  }

  // Si cumple con la condición, muestra el contenido hijo
  return children;
};

export default AdminRoute;
