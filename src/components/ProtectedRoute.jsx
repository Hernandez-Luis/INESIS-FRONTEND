// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const getDefaultRouteByRole = (rol) => {
  switch (rol) {
    case 1: return "/MenuAlumno";
    case 2: return "/MenuAdministrador";
    case 3: return "/MenuRevisor";
    default: return "/";
  }
};

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userString = localStorage.getItem('usuario');

  // No hay sesión → al login
  if (!userString) {
    return <Navigate to="/" replace />;
  }

  let user;
  try {
    user = JSON.parse(userString);
  } catch {
    return <Navigate to="/" replace />;
  }

  // Tiene sesión pero no está autorizado para esta ruta → redirigir a su menú
  if (!allowedRoles.includes(user.rol)) {
    const redirectTo = getDefaultRouteByRole(user.rol);
    return <Navigate to={redirectTo} replace />;
  }

  // Autorizado → accede al contenido
  return children;
};

export default ProtectedRoute;
