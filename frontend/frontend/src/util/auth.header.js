
import {constants} from "../constants";

export function authHeader() {
    let savedToken = JSON.parse(localStorage.getItem(constants.savedToken));
    if (savedToken && savedToken.authData) {
        return {
            Authorization: savedToken.authData
        }
    }
    return {}
}