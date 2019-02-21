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

//사용자 환경설정 (session.option) 가져오기 요청 액션
const API_CLIENT_SETTING_INFO_REQUEST = 'API_CLIENT_SETTING_INFO_REQUEST';
const API_CLIENT_SETTING_INFO_SUCCESS = 'API_CLIENT_SETTING_INFO_SUCCESS';
const API_CLIENT_SETTING_INFO_FAILURE = 'API_CLIENT_SETTING_INFO_FAILURE';

//아이 썸네일 등록 요청 액션


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
                    isLogin: null //false 면 로그인 되어 있지 않은 상태, true면 로그인되어 있는 상태처리, null 기본 값
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
                    isLogin: true//false 면 로그인 되어 있지 않은 상태, true면 로그인되어 있는 상태처리, null 기본 값
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
                    isLogin: false//false 면 로그인 되어 있지 않은 상태, true면 로그인되어 있는 상태처리, null 기본 값
                }
            };
        case API_CLIENT_SETTING_INFO_REQUEST: //사용자 환경정보 가져오기 요청 액션
            return {
                ...state,
                loading: true,
                width: state.width,
                session: state.session,
                login: state.login //false 면 로그인 되어 있지 않은 상태, true로그인
            };
        case API_CLIENT_SETTING_INFO_SUCCESS: //사용자 환경정보 가져오기 요청 액션 성공
            return {
                ...state,
                loading: false,
                width: state.width,
                session: {
                    _id: state.session._id,
                    type: state.session.type,
                    email: state.session.email,
                    country: state.session.country,
                    birth: {
                        year: state.session.birth.year,
                        month: state.session.birth.month,
                        date: state.session.birth.date,
                    },
                    gender: state.session.gender,
                    grade: state.session.grade,
                    point: state.session.point,
                    name: {
                        first: state.session.name.first,
                        last: state.session.name.last
                    },
                    nickname: state.session.nickname,
                    phone: state.session.phone,
                    status: state.session.status,
                    option: action.option,
                    thumbnail: state.session.thumbnail,
                    babies: state.session.babies,
                    addresses: state.session.addresses,
                },
                login: state.login
            };
        case API_CLIENT_SETTING_INFO_FAILURE: //사용자 환경정보 가져오기 요청 액션 실패
            return {
                ...state,
                loading: false,
                width: state.width,
                session: state.session,
                login: state.login
            };
        case API_WEB_LOGOUT_REQUEST://로그아웃 요청하기
            return initialState;
        default:
            return state
    }
}