import {getCurrentDeviceWidth, getCurrentScrollPos} from "../lib/script";
//width 설정 액션 디스패치
const SET_WINDOW_WIDTH_REQUEST = 'SET_WINDOW_WIDTH_REQUEST';
//스크롤 위치 액션 디스패치
const SET_WINDOW_SCROLL_Y_REQUEST = 'SET_WINDOW_SCROLL_Y_REQUEST';

// 로그인 요청 액션
const API_WEB_LOGIN_REQUEST = 'API_WEB_LOGIN_REQUEST';
const API_WEB_LOGIN_SUCCESS = 'API_WEB_LOGIN_SUCCESS';
const API_WEB_LOGIN_FAILURE = 'API_WEB_LOGIN_FAILURE';

// 로그아웃 요청 액션
const API_WEB_LOGOUT_REQUEST = 'API_WEB_LOGOUT_REQUEST';

// 세션 갱신 액션 디스패치
const REFRESH_SESSION_REQUEST = 'REFRESH_SESSION_REQUEST';

//사용자 환경설정 (session.option) 가져오기 요청 액션
const API_CLIENT_SETTING_INFO_REQUEST = 'API_CLIENT_SETTING_INFO_REQUEST';
const API_CLIENT_SETTING_INFO_SUCCESS = 'API_CLIENT_SETTING_INFO_SUCCESS';
const API_CLIENT_SETTING_INFO_FAILURE = 'API_CLIENT_SETTING_INFO_FAILURE';

//OPTION 단위 변경 액션
const API_UNIT_OPTION_CHANGE_REQUEST = 'API_UNIT_OPTION_CHANGE_REQUEST';
const API_UNIT_OPTION_CHANGE_SUCCESS = 'API_UNIT_OPTION_CHANGE_SUCCESS';
const API_UNIT_OPTION_CHANGE_FAILURE = 'API_UNIT_OPTION_CHANGE_FAILURE';

//OPTION 이메일 구독 변경 액션
const API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_REQUEST = 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_REQUEST';
const API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_SUCCESS = 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_SUCCESS';
const API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_FAILURE = 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_FAILURE';

//서버에서 갱신된 세션 정보로 클라이언ㅌ의 리덕스 세션 정보를 업데이트시키는 액션
const UPDATE_CLIENT_SESSION = 'UPDATE_CLIENT_SESSION';

//session 설정
const initialState = {
    loading: false,
    width: getCurrentDeviceWidth(),
    scrollTop:true,
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
            lastModifiedThumbnail: null,
            social: []
        },
        option: {
            memberActivityAlarm: null,
            likeAlarm: null,
            replyAlarm: null,
            invitationAlarm: null,
            birthdayAlarm: null,
            scheduleAlarm: null,
            connectedDeviceAlarm: null,
            unit: 'si',
            emailSubscription: null
        },
        thumbnail: null,
        babies: [],
        addresses: [],
    },
    login: {
        loading: false,
        error: {
            error: false,
            type: null
        },
        isLogin: null //false 면 로그인 되어 있지 않은 상태, true로그인, null이면 기본값
    },
    error: {
        error: false,
        type: null
    }
};

export function clientStatusReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WINDOW_WIDTH_REQUEST: //디바이스 너비
            return {
                ...state,
                width: getCurrentDeviceWidth()
            };
        case SET_WINDOW_SCROLL_Y_REQUEST://스크롤탑 값
            return {
                ...state,
                scrollTop: action.scrollTop
            };
        case REFRESH_SESSION_REQUEST: //세션 요청하기
            return {...state, loading: true, width: state.width, session: state.session, login: state.login};
        case API_WEB_LOGIN_REQUEST: //로그인 요청 하기
            return {
                ...state,
                login: {
                    loading: true,
                    error: initialState.login.error,
                }
            };
        case API_WEB_LOGIN_SUCCESS: //로그인 요청 성공시 서버에서 세션을 가져와서 리덕스 스토어에 저장
            return {
                ...state,
                loading: false,
                session: action.session,
                login: {
                    loading: false,
                    error: {
                        error: false,
                        type: null
                    },
                    isLogin: true//false 면 로그인 되어 있지 않은 상태, true면 로그인되어 있는 상태처리, null 기본 값
                }
            };
        case API_WEB_LOGIN_FAILURE: //로그인 요청 실패시
            return {
                ...state,
                loading: false,
                session: initialState.session,
                login: {
                    loading: false,
                    error: action.error,
                    isLogin: false//false 면 로그인 되어 있지 않은 상태, true면 로그인되어 있는 상태처리, null 기본 값
                }
            };
        case API_CLIENT_SETTING_INFO_REQUEST: //사용자 환경정보 가져오기 요청 액션
            return {
                ...state,
                loading: true,
            };
        case API_CLIENT_SETTING_INFO_SUCCESS: //사용자 환경정보 가져오기 요청 액션 성공
            return {
                ...state,
                loading: false,
                session: action.session
            };
        case API_CLIENT_SETTING_INFO_FAILURE: //사용자 환경정보 가져오기 요청 액션 실패
            return {
                ...state,
                loading: false,
            };
        case API_UNIT_OPTION_CHANGE_REQUEST: //단위 변경 요청 액션
            return {
                ...state,
                loading:true,
                error: initialState.error,
            };
        case API_UNIT_OPTION_CHANGE_SUCCESS://단위 변경 요청 성공
            return {
                ...state,
                loading:false,
                session: action.session
            };
        case API_UNIT_OPTION_CHANGE_FAILURE://단위 변경 요청 실패
            return {
                ...state,
                loading:false,
                error: action.error
            };
        case API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_REQUEST://이메일 구독 변경 요청 액션
            return {
                ...state,
                loading:true
            };
        case API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_SUCCESS://이메일 구독 변경 요청 성공
            return {
                ...state,
                loading:false,
                session: action.session
            };
        case API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_FAILURE://이메일 구독 변경 요청 실패
            return {
                ...state,
                loading:false,
                error: action.error
            };
        case API_WEB_LOGOUT_REQUEST://로그아웃 요청하기
            return initialState;
        case UPDATE_CLIENT_SESSION: //세션 갱신
            return {
                ...state,
                loading: false,
                session: action.session,
                error: initialState.error,
            };
        default:
            return state
    }
}