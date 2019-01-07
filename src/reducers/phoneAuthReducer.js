const SET_PHONE_AUTH_REQUEST = 'SET_PHONE_AUTH_REQUEST';
const SET_PHONE_AUTH_SUCCESS = 'SET_PHONE_AUTH_SUCCESS';
const SET_PHONE_AUTO_FAILURE = 'SET_PHONE_AUTH_FAILURE';

const initialState = {
    loading: false,
    error: null,
    auth: false
};


export function phoneAuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PHONE_AUTH_REQUEST:
            return {...state, loading: true, error: null};
        case SET_PHONE_AUTH_SUCCESS:
            return {...state, auth: !state.auth};
        case SET_PHONE_AUTO_FAILURE:
            return {...state, auth: false, error: action.error};
        default:
            return state;
    }
}