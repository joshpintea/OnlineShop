import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirect, after, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem(after)
            ? <Component {...props} />
            : <Redirect to={{ pathname: redirect, state: { from: props.location } }} />
    )} />
);