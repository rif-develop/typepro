//배송지 등록, 수정 모달창 열기
const TOGGLE_ADDRESS_REGISTER = 'TOGGLE_ADDRESS_REGISTER';
const TOGGLE_ADDRESS_MODIFY = 'TOGGLE_ADDRESS_MODIFY';

//배송지 등록하기 -> api -> 성공하면 data 갱신
const SET_ADDRESS_REQUEST = 'SET_ADDRESS_REQUEST';
const SET_ADDRESS_SUCCESS = 'SET_ADDRESS_SUCCESS';
const SET_ADDRESS_FAILURE = 'SET_ADDRESS_FAILURE';

//배송지 수정하기
const UPDATE_ADDRESS_REQUEST = 'UPDATE_ADDRESS_REQUEST';
const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
const UPDATE_ADDRESS_FAILURE = 'UPDATE_ADDRESS_FAILURE';

//배송지 삭제하기
const DELETE_ADDRESS_REQUEST = 'DELETE_ADDRESS_REQUEST';
const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
const DELETE_ADDRESS_FAILURE = 'DELETE_ADDRESS_FAILURE';

//배송지 목록 불러오기
const GET_ADDRESS_LIST_REQUEST = 'GET_ADDRESS_LIST_REQUEST';
const GET_ADDRESS_LIST_SUCCESS = 'GET_ADDRESS_LIST_SUCCESS';
const GET_ADDRESS_LIST_FAILURE = 'GET_ADDRESS_LIST_FAILURE';

//기본 배송지로 설정하기
const SET_DEFAULT_ADDRESS_REQUEST = 'SET_DEFAULT_ADDRESS_REQUEST';
const SET_DEFAULT_ADDRESS_SUCCESS = 'SET_DEFAULT_ADDRESS_SUCCESS';
const SET_DEFAULT_ADDRESS_FAILURE = 'SET_DEFAULT_ADDRESS_FAILURE';

//모달창 닫기
const CLOSE_ERROR_MODAL = 'CLOSE_ERROR_MODAL';

const initialState = {
    loading: false,
    error: {
        isError: false,
        type: null
    },
    registerModal: false,
    modifyModal: false,
    data: [],
};

export function addressReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ADDRESS_REGISTER:
            return {...state, loading: false, registerModal: !state.registerModal, modifyModal: false};
        case TOGGLE_ADDRESS_MODIFY:
            return {...state, loading: false, registerModal: false, modifyModal: !state.modifyModal};
        case GET_ADDRESS_LIST_REQUEST:
            return {...state, loading: true, error: state.error, data: state.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        case GET_ADDRESS_LIST_SUCCESS:
            return {...state, loading: false, error: state.error, data: action.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        case GET_ADDRESS_LIST_FAILURE:
            return {...state, loading: false, error: action.error, data: null, registerModal: state.registerModal, modifyModal: state.modifyModal};
        case SET_ADDRESS_REQUEST: {
            return {...state, loading: true, error: state.error, data: state.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case SET_ADDRESS_SUCCESS: {
            return {...state, loading: false, error: state.error, data: action.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case SET_ADDRESS_FAILURE: {
            return {...state, loading: false, error: action.error}
        }
        case DELETE_ADDRESS_REQUEST: {
            return {...state, loading: true, error: state.error, data: state.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case DELETE_ADDRESS_SUCCESS: {
            return {...state, loading: false, error: state.error, data: action.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case DELETE_ADDRESS_FAILURE: {
            return {...state, loading: false, error: action.error, data: null}
        }
        case SET_DEFAULT_ADDRESS_REQUEST: {
            return {...state, loading: true, error: state.error, data: state.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case SET_DEFAULT_ADDRESS_SUCCESS: {
            return {...state, loading: false, error: state.error, data: action.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case SET_DEFAULT_ADDRESS_FAILURE: {
            return {...state, loading: false, error: action.error, data: null}
        }
        case UPDATE_ADDRESS_REQUEST: {
            return {...state, loading: true, error: state.error, data: state.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case UPDATE_ADDRESS_SUCCESS: {
            return {...state, loading: false, error: state.error, data: action.data, registerModal: state.registerModal, modifyModal: state.modifyModal};
        }
        case UPDATE_ADDRESS_FAILURE: {
            return {...state, loading: false, error: action.error, data: state.data}
        }
        case CLOSE_ERROR_MODAL: {
            return {
                ...state, loading: false,
                error: {
                    isError: false,
                    type: null
                }
            }
        }
        default:
            return state;
    }
}