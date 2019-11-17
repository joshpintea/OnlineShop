
import {ADD_ALBUM, CLEAR} from "../constants/action.types";
import {FETCH_INITIAL} from "../constants/action.types";

const initialState = {
    albums: [],
};


function rootReducer(state = initialState, action) {
    if (action.type === ADD_ALBUM) {
        return Object.assign({}, state, {
            albums: state.albums.concat(action.album)
        })
    } else if (action.type === FETCH_INITIAL) {
        return Object.assign({}, state, {
            albums: action.cart.albums
        });
    } else if (action.type === CLEAR) {
        return Object.assign( {}, state, {
            albums: []
        })
    }
    return state
}

export default rootReducer;