/*헤더의 메시지(알람)*/
const HEADER_ALARM_ACTIVE_REQUEST = 'HEADER_ALARM_ACTIVE_REQUEST';
const HEADER_ALARM_ACTIVE_SUCCESS = 'HEADER_ALARM_ACTIVE_SUCCESS';
const HEADER_ALARM_ACTIVE_FAILURE = 'HEADER_ALARM_ACTIVE_FAILURE';
/*헤더의 유저정보*/
const HEADER_CLIENT_ACTIVE_REQUEST = 'HEADER_CLIENT_ACTIVE_REQUEST';
const HEADER_CLIENT_ACTIVE_SUCCESS = 'HEADER_CLIENT_ACTIVE_SUCCESS';
const HEADER_CLIENT_ACTIVE_FAILURE = 'HEADER_CLIENT_ACTIVE_FAILURE';

const initialState = {
    loading: false,
    alarmList: false,
    clientMenu: false,
    error: null
};

export function headerReducer(state = initialState, action) {
    switch (action.type) {
        /*메시지(알람)*/
        case HEADER_ALARM_ACTIVE_REQUEST:
            return {...state, loading: true, error: null};
        case HEADER_ALARM_ACTIVE_SUCCESS:
            return {...state, loading: false, error: null, alarmList: true, clientMenu: false};
        case HEADER_ALARM_ACTIVE_FAILURE:
            return {...state, loading: false, error: action.error, alarmList: false, clientMenu: false};
        /*유저정보*/
        case HEADER_CLIENT_ACTIVE_REQUEST:
            return {...state, loading: true, error: null};
        case HEADER_CLIENT_ACTIVE_SUCCESS:
            return {...state, loading: false, alarmList: false, clientMenu: true};
        case HEADER_CLIENT_ACTIVE_FAILURE:
            return {...state, loading: false, error: action.error, alarmList: false, clientMenu: false};
        default:
            return state;
    }
}




