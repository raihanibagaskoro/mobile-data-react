import axios from "axios";
import { ADD_TRANSACTION, FAIL_REQUEST, GET_PAKET_LIST, GET_TRANSACTION, GET_USER, MAKE_REQUEST } from "./ActionType";

export const makeRequest = () => {
    return {
        type: MAKE_REQUEST
    }
}
export const failRequest = (err) => {
    return {
        type: FAIL_REQUEST,
        payload: err
    }
}
export const getPaketList = (data) => {
    return {
        type: GET_PAKET_LIST,
        payload: data
    }
}
export const getUser = (data) => {
    return {
        type: GET_USER,
        payload: data
    }
}
export const getTransaction = (data) => {
    return {
        type: GET_TRANSACTION,
        payload: data
    }
}
export const addTransaction = () => {
    return {
        type: ADD_TRANSACTION
    }
}

export const FunctionAddTransaction = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:3001/transaction', data)
            .then(res => {
                dispatch(addTransaction())
            }).catch(err => {
                dispatch(failRequest(err.message))
            })
    }
}

export const FetchTransaction = (userId) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/transaction?userId=${userId}`)
            .then(res => {
                const transactions = res.data; // Array of transactions

                // Array to store promises for fetching paket data
                const paketPromises = transactions.map(transaction => {
                    const paketId = parseInt(transaction.paketId);
                    return axios.get(`http://localhost:3001/paket/${paketId}`)
                        .then(resPaket => resPaket.data)
                        .catch(err => {
                            console.error('Error fetching paket data:', err);
                            return null;
                        });
                });

                // Execute all promises concurrently
                Promise.all(paketPromises)
                    .then(paketDataArray => {
                        // Filter out any null values from paketDataArray
                        const filteredPaketData = paketDataArray.filter(paketData => paketData !== null);
                        dispatch(getTransaction(filteredPaketData)); // Dispatch action with paket data
                    })
                    .catch(err => {
                        console.error('Error fetching paket data:', err);
                        dispatch(failRequest(err.message));
                    });
            })
            .catch(err => {
                console.error('Error fetching transaction data:', err);
                dispatch(failRequest(err.message));
            });
    };
};


export const FetchUser = (id) => {
    return (dispatch) => {
        axios.get('http://localhost:3001/users/' + id).then(res => {
            const userlist = res.data
            dispatch(getUser(userlist))
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}

export const FetchPaketList = () => {
    return (dispatch) => {
        dispatch(makeRequest());
        axios.get('http://localhost:3001/paket').then(res => {
            const paketlist = res.data
            dispatch(getPaketList(paketlist))
        }).catch(err => {
            dispatch(failRequest(err.message))
        })
    }
}