const SET_LANGUAGE_REQUEST = 'SET_LANGUAGE_REQUEST';
const SET_LANGUAGE_SUCCESS = 'SET_LANGUAGE_SUCCESS';
const SET_LANGUAGE_FAILURE = 'SET_LANGUAGE_FAILURE';


// 정보 : 1. 리틀원 사이트의 기본 언어는 '영어'로 셋팅됨
const initialState = {
    fetching: false,
    language: 'en',
    error: null
};

export function languageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE_REQUEST:
            return {...state, fetching: true, error: null};
        case SET_LANGUAGE_SUCCESS:
            return {...state, fetching: false, error: null, language: action.language};
        case SET_LANGUAGE_FAILURE:
            return {...state, fetching: false, error: action.error};
        default:
            return state;
    }

}