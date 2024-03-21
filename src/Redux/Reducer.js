import { FAIL_REQUEST, GET_PAKET_LIST, GET_TRANSACTION, GET_USER, MAKE_REQUEST } from "./ActionType";

const initialState = {
    loading: true,
    paketlist: [],
    paketobj: {},
    errmessage: ''
}

export const Reducer = (state = initialState, action) => {
    switch (action.type){
        case MAKE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FAIL_REQUEST:
            return {
                ...state,
                loading: false,
                errmessage: action.payload
            }
        case GET_PAKET_LIST:
            return {
                loading: false,
                errmessage: '',
                paketlist: action.payload,
                paketobj: {}
            }
        default: return state
    }
}