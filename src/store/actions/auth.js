import {USER_EVENTS} from "../types";

export const getToken = (...args) => ({
    type: USER_EVENTS.GET_TOKEN,
    args
})
export const saveUserData = (data) => ({
    type: USER_EVENTS.SAVE_USER_DATA,
    payload: data
})