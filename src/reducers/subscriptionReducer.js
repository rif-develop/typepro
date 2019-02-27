//이메일 구독 신청 액션
const API_EMAIL_SUBSCRIBE_REQUEST = 'API_EMAIL_SUBSCRIBE_REQUEST';
const API_EMAIL_SUBSCRIBE_SUCCESS = 'API_EMAIL_SUBSCRIBE_SUCCESS';
const API_EMAIL_SUBSCRIBE_FAILURE = 'API_EMAIL_SUBSCRIBE_FAILURE';

//이메일 구독 리듀서 초기화
const SET_EMAIL_SUBSCRIBE_INIT = 'SET_EMAIL_SUBSCRIBE_INIT';

const initialState = {
    loading: false,
    error: { //메일 구독 에러
        error: false,
        type: null
    },
    success: false, //메일 구독 성공 여부
};

export function subscriptionReducer(state = initialState, action) {
    switch (action.type) {
        case API_EMAIL_SUBSCRIBE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case API_EMAIL_SUBSCRIBE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: initialState.error
            };
        case API_EMAIL_SUBSCRIBE_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };
        case SET_EMAIL_SUBSCRIBE_INIT:
            return initialState;
        default:
            return state

    }
}