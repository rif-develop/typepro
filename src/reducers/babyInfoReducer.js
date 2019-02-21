//아이 등록 모달창 액션
const OPEN_BABY_REGISTER_MODAL = 'OPEN_BABY_REGISTER_MODAL';
//아이 수정 모달창 액션
const OPEN_BABY_MODIFY_MODAL = 'OPEN_BABY_MODIFY_MODAL';

//아이 리스트 토글 액션
const SET_BABY_LIST_TOGGLE = 'SET_BABY_LIST_TOGGLE';
//s3에서 받아온 src 디스패치하는 액션
const SET_S3_SRC_REGISTER = 'SET_S3_SRC_REGISTER';

// 가장 첫 번째 아기의 정보를 불러오기
const SET_FIRST_BABY_INFO = 'SET_FIRST_BABY_INFO';
//세션을 가져 올때 babies.length > 0보다 크면 액션

//클릭시 해당 아이의 정보 가져오기
const API_CURRENT_BABY_INFO_REQUEST = 'API_CURRENT_BABY_INFO_REQUEST';
const API_CURRENT_BABY_INFO_SUCCESS = 'API_CURRENT_BABY_INFO_SUCCESS';
const API_CURRENT_BABY_INFO_FAILURE = 'API_CURRENT_BABY_INFO_FAILURE';

//아이 등록 요청 액션
const API_REGISTER_BABY_INFO_REQUEST = 'API_REGISTER_BABY_INFO_REQUEST';
const API_REGISTER_BABY_INFO_SUCCESS = 'API_REGISTER_BABY_INFO_SUCCESS';
const API_REGISTER_BABY_INFO_FAILURE = 'API_REGISTER_BABY_INFO_FAILURE';

//아이 삭제 요청 액션
const API_DELETE_BABY_INFO_REQUEST = 'API_DELETE_BABY_INFO_REQUEST';
const API_DELETE_BABY_INFO_SUCCESS = 'API_DELETE_BABY_INFO_SUCCESS';
const API_DELETE_BABY_INFO_FAILURE = 'API_DELETE_BABY_INFO_FAILURE';


//

const initialState = {
    loading: false,
    register: false, //모달 열고 닫기,
    modify: false,
    babyList: false,
    error: {
        error: false,
        type: null
    },
    src: null, //s3에 썸네일 업데이트 되고난 후에 링크
    currentBaby: { //현재 선택된 아기
        _id: null,
        parent: null,
        defaultCheck: null,
        order: null,
        name: null,
        gender: null,
        year: null,
        month: null,
        date: null,
        bloodType: null,
        height: null,
        weight: null,
        createdAt: null,
        src: null
    },
};

export function babyInfoReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_BABY_REGISTER_MODAL: //모달창 열고 닫는 액션
            return {
                ...state,
                loading: false,
                register: !state.register,
                modify: initialState.modify,
                src: null, //모달창이 닫히면 src도 사라져야 함.
            };
        case OPEN_BABY_MODIFY_MODAL: //수정 모달창 열고 닫는 액션
            return {
                ...state,
                loading: false,
                register: initialState.register,
                modify: !state.modify,
                src: null //모달창이 닫히면 src도 사라져야 함.
            };
        case SET_BABY_LIST_TOGGLE:
            return {
                ...state,
                babyList: !state.babyList

            };
        case SET_S3_SRC_REGISTER: //src셋팅
            return {
                ...state,
                loading: false,
                register: state.register,
                modify: state.modify,
                src: action.src
            };
        case SET_FIRST_BABY_INFO://현재 선택된 아이 정보
            return {
                ...state,
                loading: false,
                register: initialState.register,
                modify: initialState.modify,
                src: initialState.src,
                currentBaby: action.baby
            };
        case API_CURRENT_BABY_INFO_REQUEST://클릭시 해당 아이의 정보 가져오기
            return {
                ...state,
                loading: true,
                register: initialState.register,
                modify: initialState.modify,
                src: initialState.src,
                currentBaby: state.currentBaby //기존의 클릭되어 있떤 아이정보는 유지
            };
        case API_CURRENT_BABY_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                register: initialState.register,
                modify: initialState.modify,
                src: initialState.src,
                currentBaby: action.currentBaby
            };
        case API_CURRENT_BABY_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                register: initialState.register,
                modify: initialState.modify,
                src: initialState.src,
                currentBaby: state.currentBaby,
                error: action.error
            };
        case API_REGISTER_BABY_INFO_REQUEST: //아이 정보 등록 요청 액션
            return {
                ...state,
                loading: true,
                width: state.width,
                session: state.session,
                login: state.login,
                error: {
                    error: false,
                    type: null
                }
            };
        case API_REGISTER_BABY_INFO_SUCCESS: //아이 정보 등록 완료 액션
            return {
                ...state,
                loading: false,
                width: state.width,
                session: action.session,
                login: state.login,
                error: {
                    error: false,
                    type: null
                }
            };
        case API_REGISTER_BABY_INFO_FAILURE: // 아이 정보 등록 실패 액션
            return {
                ...state,
                loading: false,
                width: state.width,
                session: state.session,
                login: state.login,
                error: {
                    error: true,
                    type: action.error
                }
            };
        case API_DELETE_BABY_INFO_REQUEST: //아이 삭제 요청 액션
            return {
                ...state,
                loading: true,
                width: state.width,
                session: state.session,
                login: state.login,
                error: {
                    error: false,
                    type: null
                }
            };
        case API_DELETE_BABY_INFO_SUCCESS: //아이 삭제 요청 성공
            return {
                ...state,
                loading: false,
                width: state.width,
                session: action.session,
                login: state.login,
                error: {
                    error: false,
                    type: null
                }
            };
        case API_DELETE_BABY_INFO_FAILURE: // 아이 삭제 요청 실패
            return {
                ...state,
                loading: false,
                width: state.width,
                session: state.session,
                login: state.login,
                error: {
                    error: true,
                    type: action.error
                }
            };
        default:
            return state;
    }
}