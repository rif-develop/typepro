//일반 회원 회원탈퇴 액션 디스패치
const API_CLIENT_WITHDRAWAL_REQUEST = 'API_CLIENT_WITHDRAWAL_REQUEST';
const API_CLIENT_WITHDRAWAL_SUCCESS = 'API_CLIENT_WITHDRAWAL_SUCCESS';
const API_CLIENT_WITHDRAWAL_FAILURE = 'API_CLIENT_WITHDRAWAL_FAILURE';

//초기화
const API_CLIENT_WITHDRAWAL_INIT = 'API_CLIENT_WITHDRAWAL_INIT';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    withdrawal: {
        success: false //회원 탈퇴
    }
};

export function settingReducer(state = initialState, action) {
    switch (action.type) {
        case API_CLIENT_WITHDRAWAL_REQUEST:
            return {
                ...state,
                loading: true,
                error: initialState.error,
                withdrawal: initialState.withdrawal
            };
        case API_CLIENT_WITHDRAWAL_SUCCESS:
            return {
                ...state,
                loading: false,
                withdrawal: {
                    success: action.success
                }
            };
        case API_CLIENT_WITHDRAWAL_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
                withdrawal: initialState.withdrawal
            };

        case API_CLIENT_WITHDRAWAL_INIT:
            return initialState;
        default :
            return state;
    }
}




