const AUTO_LOGIN_REQUEST = 'AUTO_LOGIN_REQUEST';
const AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
const AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';


const initialState = {
    fetching:false,
    autoLogin:false,
    error:null
};


export function autologinReducer(state = initialState, action){
    switch (action.type) {
        case AUTO_LOGIN_REQUEST:
            return {...state, fetching: true, error:null};
        case AUTO_LOGIN_SUCCESS:
            return {...state, fetching:false, autoLogin:!state.autoLogin, error:null};
        case AUTO_LOGIN_FAILURE:
            return {...state, fetching:false, autoLogin:false, error:action.error}
        default:
            return state;
    }
    
}