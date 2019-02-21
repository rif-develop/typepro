const SET_CROPPER_MODAL_TOGGLE_REQUEST = 'SET_CROPPER_MODAL_TOGGLE_REQUEST';//크랍퍼 열고 닫기 요청
const SET_CROPPER_SRC_RESULT_REQUEST = 'SET_CROPPER_SRC_RESULT_REQUEST';//이미지를 읽어들이고 e.target.result를 스토어에 저장

const SET_CROPPER_MODAL_INIT = 'SET_CROPPER_MODAL_INIT'; //크랍퍼 스토어 초기화

//s3에 blob파일 전송
const API_CROPPER_THUMBNAIL_SEND_REQUEST = 'API_CROPPER_THUMBNAIL_SEND_REQUEST';
const API_CROPPER_THUMBNAIL_SEND_SUCCESS = 'API_CROPPER_THUMBNAIL_SEND_SUCCESS';
const API_CROPPER_THUMBNAIL_SEND_FAILURE = 'API_CROPPER_THUMBNAIL_SEND_FAILURE';

//s3 클라이언트 썸네일 삭제 요청 액션 디스패치
const API_THUMBNAIL_REMOVE_REQUEST = 'API_THUMBNAIL_REMOVE_REQUEST';
const API_THUMBNAIL_REMOVE_SUCCESS = 'API_THUMBNAIL_REMOVE_SUCCESS';
const API_THUMBNAIL_REMOVE_FAILURE = 'API_THUMBNAIL_REMOVE_FAILURE';

//s3 아기 임시 썸네일 삭제 요청 액션 디스패치
const API_BABY_THUMBNAIL_REMOVE_REQUEST = 'API_BABY_THUMBNAIL_REMOVE_REQUEST';
const API_BABY_THUMBNAIL_REMOVE_SUCCESS = 'API_BABY_THUMBNAIL_REMOVE_SUCCESS';
const API_BABY_THUMBNAIL_REMOVE_FAILURE = 'API_BABY_THUMBNAIL_REMOVE_FAILURE';

//잘라진 BLOB이미지를 서버에 전송 (s3에 임시저장소에 저장시킴)
const API_THUMBNAIL_TEMP_SAVE_REQUEST = 'API_THUMBNAIL_TEMP_SAVE_REQUEST';
const API_THUMBNAIL_TEMP_SAVE_SUCCESS = 'API_THUMBNAIL_TEMP_SAVE_SUCCESS';
const API_THUMBNAIL_TEMP_SAVE_FAILURE = 'API_THUMBNAIL_TEMP_SAVE_FAILURE';

//src 리셋
const SET_CROPPER_SRC_INIT = 'SET_CROPPER_SRC_INIT';

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
    },
    src: null
};

export function cropperReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CROPPER_MODAL_TOGGLE_REQUEST:
            return {...state, loading: false, open: !state.open, error: state.error, file: state.file, src: initialState.src};
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
                },
                src: initialState.src
            };
        case API_CROPPER_THUMBNAIL_SEND_REQUEST: //서버에 크랍된 이미지 전송 요청
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                file: state.file,
                src: initialState.src
            };
        case API_CROPPER_THUMBNAIL_SEND_SUCCESS: //성공
            return {
                ...state,
                loading: false,
                open: false,
                error: initialState.error,
                file: state.file,
                src: initialState.src
            };
        case API_CROPPER_THUMBNAIL_SEND_FAILURE: //서버 실패
            return {
                ...state,
                loading: false,
                open: false,
                error: action.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_THUMBNAIL_REMOVE_REQUEST:
            return {
                ...state,
                loading: true,
                open: false,
                error: initialState.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_THUMBNAIL_REMOVE_SUCCESS:
            return {
                ...state,
                loading: false,
                open: false,
                error: initialState.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_THUMBNAIL_REMOVE_FAILURE:
            return {
                ...state,
                loading: false,
                open: false,
                error: action.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_THUMBNAIL_TEMP_SAVE_REQUEST: //서버에 잘라진 이미지 전송 요청
            return {
                ...state,
                loading: initialState.loading,
                open: state.open,
                error: initialState.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_THUMBNAIL_TEMP_SAVE_SUCCESS://서버에 잘라진 이미지 전송 성공
            return {
                ...state,
                loading: initialState.loading,
                open: false,
                error: initialState.error,
                file: initialState.file,
                src: action.src
            };
        case API_THUMBNAIL_TEMP_SAVE_FAILURE://서버에 잘라진 이미지 전송 실패
            return {
                ...state,
                loading: initialState.loading,
                open: false,
                error: action.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_BABY_THUMBNAIL_REMOVE_REQUEST://아기 썸네일 삭제 요청
            return {
                ...state,
                loading: initialState.loading,
                open: state.open,
                error: initialState.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_BABY_THUMBNAIL_REMOVE_SUCCESS://아기 썸네일 삭제 성공
            return {
                ...state,
                loading: initialState.loading,
                open: false,
                error: initialState.error,
                file: initialState.file,
                src: initialState.src
            };
        case API_BABY_THUMBNAIL_REMOVE_FAILURE://서버에 잘라진 이미지 전송 실패
            return {
                ...state,
                loading: initialState.loading,
                open: false,
                error: action.error,
                file: initialState.file,
                src: initialState.src
            };
        case SET_CROPPER_MODAL_INIT:
            return {
                ...state,
                loading: initialState.loading,
                open: initialState.open,
                error: initialState.error,
                file: initialState.file,
                src: state.src
            };
        case SET_CROPPER_SRC_INIT:
            return{
                ...state,
                loading: initialState.loading,
                open: initialState.open,
                error: initialState.error,
                file: initialState.file,
                src:initialState.src
            };
        default:
            return state;
    }
}