//대시보드 배변 횟수, 배변 시간 액션
const SET_DASHBOARD_PEEPEE_INFO = 'SET_DASHBOARD_PEEPEE_INFO';
//대시보드 수유 횟수, 수유 시간 액션
const SET_DASHBOARD_BOTTLE_INFO = 'SET_DASHBOARD_BOTTLE_INFO';
//대시보드 데이터 초기화 액션
const SET_DASHBOARD_INFO_INIT = 'SET_DASHBOARD_INFO_INIT';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    smartBottle: {
        lastTime: null,
    },
    smartPeepee: {
        lastTime: null,
        data: null
    },
    smartTemp: {
        lastTime: null,
        data: null
    }
};

export function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DASHBOARD_BOTTLE_INFO:
            return {
                ...state,
                smartBottle: {
                    lastTime:action.data.lastCreatedAt
                }
            };
        case SET_DASHBOARD_PEEPEE_INFO:
            return {
                ...state,
                smartPeepee:{
                    lastTime:action.data.lastCreatedAt,
                    data:action.data.defecationCount
                }
            };
        case SET_DASHBOARD_INFO_INIT:
            return initialState;
        default:
            return state;
    }

}

