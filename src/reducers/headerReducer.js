/*헤더의 메시지(알람)*/
const HEADER_ALARM_ACTIVE_REQUEST = 'HEADER_ALARM_ACTIVE_REQUEST';
const HEADER_ALARM_ACTIVE_SUCCESS = 'HEADER_ALARM_ACTIVE_SUCCESS';
const HEADER_ALARM_ACTIVE_FAILURE = 'HEADER_ALARM_ACTIVE_FAILURE';
/*헤더의 유저정보*/
const HEADER_CLIENT_ACTIVE_REQUEST = 'HEADER_CLIENT_ACTIVE_REQUEST';
const HEADER_CLIENT_ACTIVE_SUCCESS = 'HEADER_CLIENT_ACTIVE_SUCCESS';
const HEADER_CLIENT_ACTIVE_FAILURE = 'HEADER_CLIENT_ACTIVE_FAILURE';
/*모바일 슬라이드 메뉴*/
const HEADER_MOBILE_MENU_REQUEST = 'HEADER_MOBILE_MENU_REQUEST';
const HEADER_MOBILE_MENU_SUCCESS = 'HEADER_MOBILE_MENU_SUCCESS';
const HEADER_MOBILE_MENU_FAILURE = 'HEADER_MOBILE_MENU_FAILURE';


const initialState = {
    loading: false,
    alarmList: false,
    clientMenu: false,
    mobileMenu: false,
    error: null
};

export function headerReducer(state = initialState, action) {
    switch (action.type) {
        /*메시지(알람)*/
        case HEADER_ALARM_ACTIVE_REQUEST:
            return {...state, loading: true, error: null};
        case HEADER_ALARM_ACTIVE_SUCCESS:
            return {...state, loading: false, error: null, alarmList: !state.alarmList, clientMenu: false};
        case HEADER_ALARM_ACTIVE_FAILURE:
            return {...state, loading: false, error: action.error};
        /*유저정보*/
        case HEADER_CLIENT_ACTIVE_REQUEST:
            return {...state, loading: true, error: null};
        case HEADER_CLIENT_ACTIVE_SUCCESS:
            return {...state, loading: false, alarmList: false, clientMenu: !state.clientMenu};
        case HEADER_CLIENT_ACTIVE_FAILURE:
            return {...state, loading: false, error: action.error};
        /*모바일 메뉴*/
        case HEADER_MOBILE_MENU_REQUEST:
            return {...state, loading: true, error: null};
        case HEADER_MOBILE_MENU_SUCCESS:
            return {...state, loading: false, error: null, mobileMenu: !state.mobileMenu, clientMenu: false, alarmList: false};
        case HEADER_MOBILE_MENU_FAILURE:
            return {...state, loading: false, error: action.error};
        default:
            return state;
    }
}




