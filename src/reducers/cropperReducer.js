const SET_CROPPER_MODAL_TOGGLE_REQUEST = 'SET_CROPPER_MODAL_TOGGLE_REQUEST';//크랍퍼 열고 닫기 요청
const SET_CROPPER_SRC_RESULT_REQUEST = 'SET_CROPPER_SRC_RESULT_REQUEST';//이미지를 읽어들이고 e.target.result를 스토어에 저장

const SET_CROPPER_MODAL_INIT = 'SET_CROPPER_MODAL_INIT'; //크랍퍼 스토어 초기화

//s3에 blob파일 전송
const API_CROPPER_THUMBNAIL_SEND_REQUEST = 'API_CROPPER_THUMBNAIL_SEND_REQUEST';
const API_CROPPER_THUMBNAIL_SEND_SUCCESS = 'API_CROPPER_THUMBNAIL_SEND_SUCCESS';
const API_CROPPER_THUMBNAIL_SEND_FAILURE = 'API_CROPPER_THUMBNAIL_SEND_FAILURE';

//s3 썸네일 삭제 요청 액션 디스패치
const API_THUMBNAIL_REMOVE_REQUEST = 'API_THUMBNAIL_REMOVE_REQUEST';
const API_THUMBNAIL_REMOVE_SUCCESS = 'API_THUMBNAIL_REMOVE_SUCCESS';
const API_THUMBNAIL_REMOVE_FAILURE = 'API_THUMBNAIL_REMOVE_FAILURE';

const initialState = {
    loading: false,
    open: false,
    error: {
        error: false,
        type: null
    },
    file: {
        src: null,
        name: null,
        type: null,
        size: null,
        originName: null,
    }
};

export function cropperReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CROPPER_MODAL_TOGGLE_REQUEST:
            return {...state, loading: false, open: !state.open, error: state.error, file: state.file};
        case SET_CROPPER_SRC_RESULT_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                file: {
                    src: action.src,
                    name: action.fileName,
                    type: action.fileType,
                    size: action.size,
                    originName: action.originName,
                }
            };
        case API_CROPPER_THUMBNAIL_SEND_REQUEST: //서버에 크랍된 이미지 전송 요청
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                file: state.file
            };
        case API_CROPPER_THUMBNAIL_SEND_SUCCESS: //성공
            return {
                ...state,
                loading: false,
                open: false,
                error: initialState.error,
                file: state.file
            };
        case API_CROPPER_THUMBNAIL_SEND_FAILURE: //서버 실패
            return {
                ...state,
                loading: false,
                open: false,
                error: action.error,
                file: initialState.file
            };
        case API_THUMBNAIL_REMOVE_REQUEST:
            return{
                ...state,
                loading:true,
                open:false,
                error:initialState.error,
                file:initialState.file
            };
        case API_THUMBNAIL_REMOVE_SUCCESS:
            return{
                ...state,
                loading:false,
                open:false,
                error:initialState.error,
                file:initialState.file
            };
        case API_THUMBNAIL_REMOVE_FAILURE:
            return{
                ...state,
                loading:false,
                open:false,
                error:action.error,
                file:initialState.file
            };
        case SET_CROPPER_MODAL_INIT:
            return initialState;
        default:
            return state;
    }
}