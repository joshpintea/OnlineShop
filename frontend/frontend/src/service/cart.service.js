import {authHeader, handleResponse} from "../util";
import {constants} from "../constants";


export const cartService = {
  getLoggedUserCart
};

function getLoggedUserCart() {
    const requestOptions = {
        'method': 'GET',
        'headers': authHeader()
    };

    return fetch(constants.routes.api.loggedUserCart, requestOptions).then(handleResponse);
}