import { USER_EVENTS } from "../types"

const initialState = {
    // firebaseToken: '',
    // userName: "",
}
export const auth = (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_EVENTS.SAVE_USER_DATA: {
            // console.log('Payload Save user Data', payload)
            return {
                ...state,
                ...payload
            }
        }
        default:
            return state
    }
}