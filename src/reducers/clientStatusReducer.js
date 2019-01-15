//윈도우 너비 state
const SET_WINDOW_WIDTH_REQUEST = 'SET_WINDOW_WIDTH_REQUEST';
const SET_WINDOW_WIDTH_SUCCESS = 'SET_WINDOW_WIDTH_SUCCESS';
const SET_WINDOW_WIDTH_FAILURE = 'SET_WINDOW_WIDTH_FAILURE';

//이메일 액션
const SET_LOGIN_EMAIL_REQUEST = 'SET_LOGIN_EMAIL_REQUEST';
//비밀번호 액션
const SET_LOGIN_PASSWORD_REQUEST = 'SET_LOGIN_PASSWORD_REQUEST';
//로그인 요청 액션
const WEB_LOGIN_REQUEST = 'WEB_LOGIN_REQUEST';
//로그]아웃 요청 액션
const WEB_LOGOUT_REQUEST = 'WEB_LOGOUT_REQUEST';

//
//session 설정
const initialState = {
    loading: false,
    width: window.innerWidth && document.documentElement.clientWidth ?
        Math.min(window.innerWidth, document.documentElement.clientWidth) :
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth,
    session: null,
    login: {
        email: null,
        password: null,
        isLogin: false //false 면 로그인 되어 있지 않은 상태, true로그인
    }

};

export function clientStatusReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WINDOW_WIDTH_REQUEST:
            return {...state, loading: true, width: state.width}
        case SET_WINDOW_WIDTH_SUCCESS:
            return {...state, loading: false, width: action.width}
        case SET_WINDOW_WIDTH_FAILURE:
            return {...state, loading: false, error: action.error};
        case SET_LOGIN_EMAIL_REQUEST: //로그인 할 떄 이메일 입력 값
            return {
                ...state,
                session: state.session,
                login: {
                    email: action.email,
                    password: state.login.password,
                    isLogin: state.login.isLogin
                }
            };
        case SET_LOGIN_PASSWORD_REQUEST: //로그인 할 때 비밀번호 값
            return {
                ...state,
                session: state.session,
                login: {
                    email: state.login.email,
                    password: action.password,
                    isLogin: state.login.isLogin
                }
            };
        case WEB_LOGIN_REQUEST: //로그인 요청 하기
            return {
                ...state,
                session: state.session,
                login: {
                    email: state.login.email,
                    password: state.login.password,
                    isLogin: true
                }
            };
        case WEB_LOGOUT_REQUEST: //로그인 요청 하기
            return {
                ...state,
                session: state.session,
                login: {
                    email: state.login.email,
                    password: state.login.password,
                    isLogin: false
                }
            };
        default:
            return state
    }
}