import {ADD_ALBUM, CLEAR, FETCH_INITIAL} from "../constants/action.types";

export function addAlbumToCart(album) {
    return {type: ADD_ALBUM, album};
}

export function fetchCart(cart) {
    return {type: FETCH_INITIAL, cart}
}

export function clearCart() {
    return {type: CLEAR};
}