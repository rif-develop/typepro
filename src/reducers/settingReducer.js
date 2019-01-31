const SET_MENU_REQUEST = 'SET_MENU_REQUEST';
const SET_MENU_SUCCESS = 'SET_MENU_SUCCESS';
const SET_MENU_FAILURE = 'SET_MENU_FAILURE';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    option: {
        memberActivityAlarm: true,
        likeAlarm: true,
        replyAlarm: true,
        invitationAlarm: true,
        birthdayAlarm: true,
        scheduleAlarm: true,
        connectedDeviceAlarm: true,
        unit: 'si',
        emailSubscription: true
    },
    withdrawal: {
        success: false //회원 탈퇴
    }
};

export function settingReducer(state = initialState, action) {
    switch (action.type) {
        case SET_MENU_REQUEST:
            return {...state, loading: true, error: initialState.error, option:state.option, withdrawal: initialState.withdrawal};
        case SET_MENU_SUCCESS:
            return {...state, loading: false, error: initialState.error, option:action.option, withdrawal: initialState.withdrawal};
        case SET_MENU_FAILURE:
            return {...state, loading: false, error: action.error, option:state.option, withdrawal: initialState.withdrawal};
        default :
            return state;
    }
}




