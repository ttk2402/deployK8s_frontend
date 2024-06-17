
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <Routes>
            {isLoggedIn ? (
                <Route {...rest} element={element} />
            ) : (
                <Navigate to="/login" />
            )}
        </Routes>
    );
};

export default PrivateRoute;


