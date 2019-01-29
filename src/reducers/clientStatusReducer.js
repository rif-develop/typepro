//윈도우 너비 state
const SET_WINDOW_WIDTH_REQUEST = 'SET_WINDOW_WIDTH_REQUEST';

// 로그인 요청 액션
const API_WEB_LOGIN_REQUEST = 'API_WEB_LOGIN_REQUEST';
const API_WEB_LOGIN_SUCCESS = 'API_WEB_LOGIN_SUCCESS';
const API_WEB_LOGIN_FAILURE = 'API_WEB_LOGIN_FAILURE';

// 로그아웃 요청 액션
const API_WEB_LOGOUT_REQUEST = 'API_WEB_LOGOUT_REQUEST';

// 세션 갱신 액션 디스패치
const REFRESH_SESSION_REQUEST = 'REFRESH_SESSION_REQUEST';

// 아이디 비밀번호 검사 요청 액션

//session 설정
const initialState = {
    loading: false,
    width: window.innerWidth && document.documentElement.clientWidth ?
        Math.min(window.innerWidth, document.documentElement.clientWidth) :
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth,
    session: {
        _id: null,
        type: null,
        email: null,
        country: null,
        birth: {
            year: null,
            month: null,
            date: null,
        },
        gender: null,
        grade: null,
        point: null,
        name: {
            first: null,
            last: null
        },
        nickname: null,
        phone: null,
        status: {
            admin: null,
            visit: null,
            token: null,
            lastFindId: null,
            lastFindPw: null,
            lastModifiedPw: null,
            lastVisit: null,
            signupDate: null,
            lastModifiedThumbnail:null,
            social: []
        },
        thumbnail:null
    },
    login: {
        loading: false,
        error: {
            error: false,
            type: null
        },
        isLogin: false //false 면 로그인 되어 있지 않은 상태, true로그인
    }

};

export function clientStatusReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WINDOW_WIDTH_REQUEST:
            return {
                ...state,
                loading: state.loading,
                width: window.innerWidth && document.documentElement.clientWidth ?
                    Math.min(window.innerWidth, document.documentElement.clientWidth) :
                    window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.getElementsByTagName('body')[0].clientWidth,
                session: state.session,
                login: state.login
            };
        case REFRESH_SESSION_REQUEST: //세션 요청하기
            return {...state, loading: true, width: state.width, session: state.session, login: state.login};
        case API_WEB_LOGIN_REQUEST: //로그인 요청 하기
            return {
                ...state,
                loading: state.loading,
                width: state.width,
                session: state.session,
                login: {
                    loading: true,
                    error: {
                        error: false,
                        type: null
                    },
                    isLogin: false //false 면 로그인 되어 있지 않은 상태, true로그인
                }
            };
        case API_WEB_LOGIN_SUCCESS: //로그인 요청 성공시 서버에서 세션을 가져와서 리덕스 스토어에 저장
            return {
                ...state,
                loading: false,
                width: state.width,
                session: action.session,
                login: {
                    loading: false,
                    error: {
                        error: false,
                        type: null
                    },
                    isLogin: true
                }
            };
        case API_WEB_LOGIN_FAILURE: //로그인 요청 실패시
            return {
                ...state,
                loading: false,
                width: state.width,
                session: initialState.session,
                login: {
                    loading: false,
                    error: action.error,
                    isLogin: false
                }
            };
        case API_WEB_LOGOUT_REQUEST://로그아웃 요청하기
            return initialState;
        default:
            return state
    }
}