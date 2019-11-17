import {constants} from "../constants";
import {authHeader, handleResponse} from "../util";


export const albumService = {
    getAll,
    addToCart,
    getById
};


function getAll(pageNumber, searchValue) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(constants.routes.api.baseAlbumUrl + "?page=" + pageNumber + "&&search=" + searchValue, requestOptions).then(handleResponse)
}

function addToCart(album) {
    const headers = Object.assign(authHeader(), {'Content-Type': 'application/json'});
    const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(album)
    };

    return fetch(constants.routes.api.addAlbumToCart, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(constants.routes.api.baseAlbumUrl + '/' + id, requestOptions).then(handleResponse);
}