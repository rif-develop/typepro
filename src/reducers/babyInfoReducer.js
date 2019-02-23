//아이 등록 모달창 액션
const OPEN_BABY_REGISTER_MODAL = 'OPEN_BABY_REGISTER_MODAL';

//아이 수정 모달창 액션
const OPEN_BABY_MODIFY_MODAL = 'OPEN_BABY_MODIFY_MODAL';

//모든 아이 관련 모달창 닫는 액션
const SET_BABY_INFO_ALL_MODAL_CLOSE = 'SET_BABY_INFO_ALL_MODAL_CLOSE';

//아이 리스트 토글 액션
const SET_BABY_LIST_TOGGLE = 'SET_BABY_LIST_TOGGLE';

//s3에서 받아온 src 디스패치하는 액션
const SET_S3_SRC_REGISTER = 'SET_S3_SRC_REGISTER';

// 가장 첫 번째 아기의 정보를 불러오기
const SET_FIRST_BABY_INFO = 'SET_FIRST_BABY_INFO';
//세션을 가져 올때 babies.length > 0보다 크면 액션

//디폴트 값(defaultBaby:true)의 아기 정보 가져오기
const API_DEFAULT_BABY_INFO_REQUEST = 'API_DEFAULT_BABY_INFO_REQUEST';
const API_DEFAULT_BABY_INFO_SUCCESS = 'API_DEFAULT_BABY_INFO_SUCCESS';
const API_DEFAULT_BABY_INFO_FAILURE = 'API_DEFAULT_BABY_INFO_FAILURE';

//클릭시 해당 아이의 정보 가져오기
const API_CURRENT_BABY_INFO_REQUEST = 'API_CURRENT_BABY_INFO_REQUEST';
const API_CURRENT_BABY_INFO_SUCCESS = 'API_CURRENT_BABY_INFO_SUCCESS';
const API_CURRENT_BABY_INFO_FAILURE = 'API_CURRENT_BABY_INFO_FAILURE';

//아이 등록 요청 액션
const API_REGISTER_BABY_INFO_REQUEST = 'API_REGISTER_BABY_INFO_REQUEST';
const API_REGISTER_BABY_INFO_SUCCESS = 'API_REGISTER_BABY_INFO_SUCCESS';
const API_REGISTER_BABY_INFO_FAILURE = 'API_REGISTER_BABY_INFO_FAILURE';

//아이 수정 요청 액션
const API_MODIFY_BABY_INFO_REQUEST = 'API_MODIFY_BABY_INFO_REQUEST';
const API_MODIFY_BABY_INFO_SUCCESS = 'API_MODIFY_BABY_INFO_SUCCESS';
const API_MODIFY_BABY_INFO_FAILURE = 'API_MODIFY_BABY_INFO_FAILURE';

//아이 삭제 요청 액션
const API_DELETE_BABY_INFO_REQUEST = 'API_DELETE_BABY_INFO_REQUEST';
const API_DELETE_BABY_INFO_SUCCESS = 'API_DELETE_BABY_INFO_SUCCESS';
const API_DELETE_BABY_INFO_FAILURE = 'API_DELETE_BABY_INFO_FAILURE';

//현재 수정할 아이의 정보 셋팅 액션
const SET_MODIFY_BABY_INFO = 'SET_MODIFY_BABY_INFO';


const initialState = {
    loading: false,
    register: false, //등록 모달 열고 닫기,
    modify: false, //수정 모달창 열고 닫기
    babyList: false, //아이 리스트 열고 닫기
    error: {
        error: false,
        type: null
    },
    src: null, //s3에 썸네일 업데이트 되고난 후에 s3 링크 반환 값
    currentBaby: { //현재 선택된 아기
        _id: null,
        parent: null,
        defaultBaby: null,
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
    currentModifyBaby: {
        _id: null,
        parent: null,
        defaultBaby: null,
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
    }
};

export function babyInfoReducer(state = initialState, action) {
    switch (action.type) {
        case OPEN_BABY_REGISTER_MODAL: //모달창 열고 닫는 액션
            return {
                ...state,
                register: !state.register,
                modify: initialState.modify,
                babyList:state.babyList,
                currentBaby:state.currentBaby,
                src: null, //모달창이 닫히면 src도 사라져야 함.
            };
        case OPEN_BABY_MODIFY_MODAL: //수정 모달창 열고 닫는 액션
            return {
                ...state,
                register: initialState.register,
                modify: !state.modify,
                src: null //모달창이 닫히면 src도 사라져야 함.
            };
        case SET_BABY_INFO_ALL_MODAL_CLOSE:
            return {
                ...state,
                register: initialState.register,
                modify: initialState.modify,
                error: initialState.error,
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
                babyList:false,
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
                register: state.register, //모달창은 현저 상태 유지
                modify: initialState.modify, //수정 모달창은 닫는다.
                error: initialState.error,
                src: state.src,
                currentBaby: state.currentBaby,
                currentModifyBaby: initialState.currentModifyBaby
            };
        case API_REGISTER_BABY_INFO_SUCCESS: //아이 정보 등록 완료 액션
            return {
                ...state,
                loading: false,
                register: initialState.register, //모달창은 현저 상태 유지
                modify: initialState.modify, //수정 모달창은 닫는다.
                babyList: initialState.babyList,
                error: initialState.error,
                src: state.src,
                currentBaby: action.currentBaby,
                currentModifyBaby: initialState.currentModifyBaby
            };
        case API_REGISTER_BABY_INFO_FAILURE: // 아이 정보 등록 실패 액션
            return {
                ...state,
                loading: false,
                register: state.register, //모달창은 현저 상태 유지
                modify: initialState.modify, //수정 모달창은 닫는다.
                error: action.error,
                src: state.src,
                currentBaby: state.currentBaby,
                currentModifyBaby: initialState.currentModifyBaby
            };
        case API_DELETE_BABY_INFO_REQUEST: //아이 삭제 요청 액션
            return {
                ...state,
                loading: true,
            };
        case API_DELETE_BABY_INFO_SUCCESS: //아이 삭제 요청 성공
            return {
                ...state,
                loading: false,
                currentBaby:action.currentBaby
            };
        case API_DELETE_BABY_INFO_FAILURE: // 아이 삭제 요청 실패
            return {
                ...state,
                loading: false,
                error:action.error
            };
        case SET_MODIFY_BABY_INFO : //수정할 아이의 정보를 리덕스 스토어에 갱신
            return {
                ...state,
                loading: false,
                register: initialState.register, //모달창은 항상 닫힌 상태로
                modify: state.modify, //수정 모달창은 현재 상태를 유지
                error: initialState.error,
                src: state.src,
                currentBaby: state.currentBaby,
                currentModifyBaby: action.baby
            };
        case API_MODIFY_BABY_INFO_REQUEST: //아이 수정 요청
            return {
                ...state,
                loading: true,
                register: initialState.register, //모달창은 항상 닫힌 상태로
                modify: state.modify, //수정 모달창은 현재 상태를 유지
                babyList: state.babyList,
                error: initialState.error,
                src: state.src,
                currentBaby: state.currentBaby,
                currentModifyBaby: state.currentModifyBaby //요청 보낼 떄는 아직 수정한 아이 상태를 보존
            };
        case API_MODIFY_BABY_INFO_SUCCESS://아이 수정 성공
            return {
                ...state,
                loading: false,
                modify: initialState.modify, //수정 모달창은 닫는다.
                babyList: false, //갱신시 리스트 닫기
                src: initialState.src,
                currentBaby: action.currentBaby, //현재 선택된 아기를 클릳 후 수정하였을 경우 갱신을 위해 현재 아이 정보 변경ㄷ
                currentModifyBaby: initialState.currentModifyBaby //수정이 끝났다면 이 값을 비운다.
            };
        case API_MODIFY_BABY_INFO_FAILURE://아이 수정 실패
            return {
                ...state,
                loading: false,
                register: initialState.register, //모달창은 항상 닫힌 상태로
                modify: initialState.modify, //수정 모달창은 현재 상태를 유지
                babyList: initialState.babyList, //갱신시 리스트 닫기
                error: action.error,
                src: initialState.src,
                currentBaby: state.currentBaby, //얘를 바꾸줘야 할까..?
                currentModifyBaby: initialState.currentModifyBaby //요청 보낼 떄는 아직 수정한 아이 상태를 보존
            };
        case API_DEFAULT_BABY_INFO_REQUEST:
            return {
                ...state,
                loading: false,
                register: initialState.register, //모달창은 항상 닫힌 상태로
                modify: initialState.modify, //수정 모달창은 현재 상태를 유지
                babyList: initialState.babyList, //갱신시 리스트 닫기
                error: initialState.error,
                src: initialState.src,
                currentBaby: initialState.currentBaby, //얘를 바꾸줘야 할까..?
                currentModifyBaby: initialState.currentModifyBaby //요청 보낼 떄는 아직 수정한 아이 상태를 보존
            };
        case API_DEFAULT_BABY_INFO_SUCCESS:
            return{
                ...state,
                currentBaby: action.currentBaby,
            };
        case API_DEFAULT_BABY_INFO_FAILURE:
            return{
                ...state,
                register: initialState.register,
                modify: initialState.modify,
                babyList: initialState.babyList,
                error: action.error,
                src: initialState.src,
                currentBaby: initialState.defaultBaby,
                currentModifyBaby: initialState.currentModifyBaby
            };
        default:
            return state;
    }
}