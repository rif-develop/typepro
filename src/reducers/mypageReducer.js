//마이페이지 이동 전에 비밀번호 확인 액션
const API_PASSWORD_CHECK_REQUEST = 'API_PASSWORD_CHECK_REQUEST';
const API_PASSWORD_CHECK_SUCCESS = 'API_PASSWORD_CHECK_SUCCESS';
const API_PASSWORD_CHECK_FAILURE = 'API_PASSWORD_CHECK_FAILURE';
const API_PASSWORD_CHECK_INIT = 'API_PASSWORD_CHECK_INIT';

//회원정보 수정 액션
const UPDATE_CLIENT_INFO_REQUEST = 'UPDATE_CLIENT_INFO_REQUEST';
const UPDATE_CLIENT_INFO_SUCCESS = 'UPDATE_CLIENT_INFO_SUCCESS';
const UPDATE_CLIENT_INFO_FAILURE = 'UPDATE_CLIENT_INFO_FAILURE';

//페이지 초기화
const API_MYPAGE_UPDATE_INIT = 'API_MYPAGE_UPDATE_INIT';

const initialState = {
    loading: false,
    error: {
        error: false,
        type: null
    },
    isChecked: false, //false면 페이지 리턴.true면 페이지 이동,
    success: false //회원정보 수정에 성공시 success:true
};

export function mypageReducer(state = initialState, action) {
    switch (action.type) {
        case API_PASSWORD_CHECK_REQUEST:
            return {...state, loading: true, error: state.error, isChecked: state.isChecked};
        case API_PASSWORD_CHECK_SUCCESS:
            return {...state, loading: false, error: {error: false, type: null}, isChecked: true};
        case API_PASSWORD_CHECK_FAILURE:
            return {...state, loading: false, error: action.error, isChecked: false};
        case API_PASSWORD_CHECK_INIT:
            return {...state, loading:false, error:{error:false, type:null}, isChecked:state.isChecked, success:false};
        case API_MYPAGE_UPDATE_INIT:
            return initialState;
        case UPDATE_CLIENT_INFO_REQUEST:
            return {...state, loading: true, error: state.error, isChecked: state.isChecked, success: state.success}
        case UPDATE_CLIENT_INFO_SUCCESS:
            return {...state, loading: false, error: state.error, isChecked: state.isChecked, success: true}
        case UPDATE_CLIENT_INFO_FAILURE:
            return {...state, loading: false, error: action.error, isChecked: state.isChecked, success: false}
        default:
            return state;
    }
}

