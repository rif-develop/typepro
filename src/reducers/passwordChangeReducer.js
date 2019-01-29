const API_LINK_PASSWORD_CHANGE_REQUEST = 'API_LINK_PASSWORD_CHANGE_REQUEST';
const API_LINK_PASSWORD_CHANGE_SUCCESS = 'API_LINK_PASSWORD_CHANGE_SUCCESS';
const API_LINK_PASSWORD_CHANGE_FAILURE = 'API_LINK_PASSWORD_CHANGE_FAILURE';
const API_LINK_PASSWORD_CHANGE_INIT = 'API_LINK_PASSWORD_CHANGE_INIT';

//전화번호 인증을 통한 핸드폰 변경 요청 액션
const API_PASSWORD_CHANGE_BY_PHONE_REQUEST = 'API_PASSWORD_CHANGE_BY_PHONE_REQUEST';
const API_PASSWORD_CHANGE_BY_PHONE_SUCCESS = 'API_PASSWORD_CHANGE_BY_PHONE_SUCCESS';
const API_PASSWORD_CHANGE_BY_PHONE_FAILURE = 'API_PASSWORD_CHANGE_BY_PHONE_FAILURE';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    success: false
};

export function passwordChangeReducer(state = initialState, action) {
    switch (action.type) {
        case API_LINK_PASSWORD_CHANGE_REQUEST:
            return {...state, loading: true, error: state.error, success: state.success};
        case API_LINK_PASSWORD_CHANGE_SUCCESS:
            return {...state, loading: false, error: {error: false, type: null}, success: true};
        case API_LINK_PASSWORD_CHANGE_FAILURE:
            return {...state, loading: false, error: action.error, success: false};
        case API_PASSWORD_CHANGE_BY_PHONE_REQUEST:
            return {...state, loading: true, error: state.error, success: state.success};
        case API_PASSWORD_CHANGE_BY_PHONE_SUCCESS:
            return {...state, loading: false, error: state.error, success: true};
        case API_PASSWORD_CHANGE_BY_PHONE_FAILURE:
            return {...state, loading: false, error: action.error, success: false};
        case API_LINK_PASSWORD_CHANGE_INIT:
            return initialState;
        default:
            return state;
    }
}
