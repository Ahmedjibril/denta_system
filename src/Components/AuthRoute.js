// Components/AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('AccessToken');

    return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default AuthRoute;
