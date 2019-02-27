//데이트픽커 토글 액션
const SET_DATE_PICKER_TOGGLE = 'SET_DATE_PICKER_TOGGLE';

//1. 날짜 바꾸는 액션
const SET_CHANGE_DATE_REQUEST = 'SET_CHANGE_DATE_REQUEST';

//2. 이전 날짜로 바꾸는 액션
const SET_CHANGE_PREV_DATE_REQUEST = 'SET_CHANGE_PREV_DATE_REQUEST';

//3. 다음 날짜로 바꾸는 액션
const SET_CHANGE_NEXT_DATE_REQUEST = 'SET_CHANGE_NEXT_DATE_REQUEST';

//4. 날짜 변경 성공시
const SET_CHANGE_DATE_SUCCESS = 'SET_CHANGE_DATE_SUCCESS'

//4. 1번 실행후 사이드 이펙트로 서버에 해당 날짜의 데이터를 요청하는 액션
const API_CURRENT_DATE_DATA_REQUEST = 'API_CURRENT_DATE_DATA_REQUEST';
const API_CURRENT_DATE_DATA_SUCCESS = 'API_CURRENT_DATE_DATA_SUCCESS';
const API_CURRENT_DATE_DATA_FAILURE = 'API_CURRENT_DATE_DATA_FAILURE';

const initialState = {
    loading: false,
    dateModal: false, //true면 open, false면 닫음,
    error: {
        error: false,
        type: null
    },
    date: {
        selected: new Date()
    }
};


export function dateReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DATE_PICKER_TOGGLE:
            return {
                ...state,
                dateModal: !state.dateModal
            };
        case SET_CHANGE_DATE_REQUEST: //날짜 변경
            return {
                ...state,
                error: initialState.error,
                date: {
                    selected: action.selected
                }
            };
        case API_CURRENT_DATE_DATA_REQUEST: //해당 날짜의 데이터 요청
            return {
                ...state,
                loading: true,
                error: initialState.error,
            };
        case API_CURRENT_DATE_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case API_CURRENT_DATE_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case SET_CHANGE_PREV_DATE_REQUEST://이전 날짜로 변경 요청
            return{
                ...state,
                loading:true
            };
        case SET_CHANGE_NEXT_DATE_REQUEST: //다음 날짜로 변경
            return{
                ...state,
                loading:true
            };
        case SET_CHANGE_DATE_SUCCESS: // 버튼이동 날짜 변경 성공시
            return{
                ...state,
                loading:false,
                date:{
                    selected:action.selected
                }
            }
        default:
            return state
    }
}