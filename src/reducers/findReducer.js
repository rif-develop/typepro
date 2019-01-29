//핸드폰 찾기 리퀘스트,성공,실패
//이메일 찾기 리퀘스트,성공,실패
//초기화
//에러 핸들링

//이메일로 계정(이메일, 비밀번호) 찾기 리퀘스트
const API_FIND_ACCOUNT_REQUEST = 'API_FIND_ACCOUNT_REQUEST';
const API_FIND_ACCOUNT_SUCCESS = 'API_FIND_ACCOUNT_SUCCESS';
const API_FIND_ACCOUNT_FAILURE = 'API_FIND_ACCOUNT_FAILURE';

//상태 초기화 액션
const API_FIND_ACCOUNT_INIT = 'API_FIND_ACCOUNT_INIT';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null,
    },
    eventType: {
        email: false,
        phone: false,
    },
    account: {
        email: null
    },
    success: false
};

export function findAccountReducer(state = initialState, action) {
    switch (action.type) {
        case API_FIND_ACCOUNT_REQUEST:
            return {...state, loading: true, error: state.error, eventType: state.eventType, account: state.account, success: state.success};
        case API_FIND_ACCOUNT_SUCCESS:
            return {...state, loading: false, error: state.error, eventType: action.eventType, account: action.account, success: true};
        case API_FIND_ACCOUNT_FAILURE:
            return {...state, loading: false, error: action.error, eventType: {email: false, phone: false}, account: {email: null}, success: false};
        case API_FIND_ACCOUNT_INIT:
            return initialState;
        default:
            return state;

    }
}

