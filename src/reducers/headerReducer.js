/*헤더의 메시지(알람)*/
const SET_HEADER_ALARM_ACTIVE_REQUEST = 'SET_HEADER_ALARM_ACTIVE_REQUEST';
/*헤더의 유저정보*/
const SET_HEADER_CLIENT_ACTIVE_REQUEST = 'SET_HEADER_CLIENT_ACTIVE_REQUEST';
/*모바일 슬라이드 메뉴*/
const SET_HEADER_MOBILE_MENU_REQUEST = 'SET_HEADER_MOBILE_MENU_REQUEST';
//초기화
const SET_HEADER_INIT = 'SET_HEADER_INIT';


const initialState = {
    loading: false,
    alarmMenu: false,
    clientMenu: false,
    mobileMenu: false,
    error: {
        error: false,
        type: null
    }
};

export function headerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_HEADER_ALARM_ACTIVE_REQUEST:
            return {
                ...state,
                alarmMenu: !state.alarmMenu,
                clientMenu:false,
                mobileMenu:false,
            };
        case SET_HEADER_CLIENT_ACTIVE_REQUEST:
            return {
                ...state,
                clientMenu: !state.clientMenu,
                alarmMenu: false,
                mobileMenu:false,
            };
        case SET_HEADER_MOBILE_MENU_REQUEST:
            return {
                ...state,
                mobileMenu: !state.mobileMenu,
                clientMenu:false,
                alarmMenu: false,
            };
        case SET_HEADER_INIT:
            return initialState;
        default:
            return state;
    }
}




