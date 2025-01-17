import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
  const currentUser = useSelector((state) => state.users.currentUser);
  // Verifica si existe un token almacenado en el localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/" />;
  }

  // Si el token existe, renderiza la ruta protegida
  return children;
};

export default PrivateRoute;
