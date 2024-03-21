import { ADD_TRANSACTION, GET_TRANSACTION } from "./ActionType"

const initialState = {
    loading: true,
    translist: [],
    transobj: {},
    errmessage: ''
}

export const TransReducer = (state= initialState, action) => {
    switch (action.type){
        case GET_TRANSACTION:
            return {
                loading: false,
                errmessage: '',
                translist: action.payload,
                transobj: {}
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                loading: false
            }
        default: return state
    }
}