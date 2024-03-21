import { GET_USER } from "./ActionType"

const initialState = {
    loading: true,
    userlist: {},
    userobj: {},
    errmessage: ''
}

export const UserReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_USER:
            return {
                loading: false,
                errmessage: '',
                userlist: action.payload,
                userobj: {}
            }
        default: return state
    }
}