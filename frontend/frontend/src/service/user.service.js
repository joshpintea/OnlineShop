import {authHeader, handleResponse} from "../util";
import {constants} from "../constants";


export const userService = {
    login,
    getLoggedUser,
    register
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        url: constants.routes.api.loginUrl,
        headers: new Headers({
            'Authorization': 'Basic Y2xpZW50X2lkOnNlY3JldA==',
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: "grant_type=password&username=" + username + "&password=" + password
    };

    return fetch(requestOptions.url, requestOptions)
        .then(handleResponse)
        .then(
            tokenData => {
                localStorage.clear();
                localStorage.setItem(constants.savedToken, JSON
                    .stringify({
                        authData: "Bearer " + tokenData.access_token
                    }));
                return getLoggedUser();
            }
        );
}

function getLoggedUser() {

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(constants.routes.api.loggedUserUrl, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(constants.routes.api.registerUser, requestOptions).then(handleResponse);
}