import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ()=> {
    // const isAuthenticated = Boolean(localStorage.getItem('token'));
    const isAuthenticated = true;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
