/*회원가입 처리 액션*/
const API_SIGN_UP_COMPLETE_REQUEST = 'API_SIGN_UP_COMPLETE_REQUEST';
const API_SIGN_UP_COMPLETE_SUCCESS = 'API_SIGN_UP_COMPLETE_SUCCESS';
const API_SIGN_UP_COMPLETE_FAILURE = 'API_SIGN_UP_COMPLETE_FAILURE';

/*초기화*/
const API_SIGN_UP_INIT = 'API_SIGN_UP_INIT';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    success: false
};


export function clientSignUpReducer(state = initialState, action) {
    switch (action.type) {
        case API_SIGN_UP_COMPLETE_REQUEST:
            return {...state, loading: true, error: state.error, success: state.success};
        case API_SIGN_UP_COMPLETE_SUCCESS:
            return {...state, loading: false, error: state.error, success: true};
        case API_SIGN_UP_COMPLETE_FAILURE:
            return {...state, loading: false, error: action.error, success: false};
        case API_SIGN_UP_INIT:
            return initialState;
        default:
            return state;
    }
}