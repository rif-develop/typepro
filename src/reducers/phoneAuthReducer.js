//컴포넌트 액션
const SET_PHONE_AUTH_MODAL_OPEN_TOGGLE = 'SET_PHONE_AUTH_MODAL_OPEN_TOGGLE'; //모달 토글
const SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST = 'SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST';//다음 단계 취소
const SET_COUNTRY_LIST_TOGGLE_REQUEST = 'SET_COUNTRY_LIST_TOGGLE_REQUEST';
const SET_COUNTRY_SELECTOR_REQUEST = 'SET_COUNTRY_SELECTOR_REQUEST';
const SET_PHONE_NUMBER_REQUEST = 'SET_PHONE_NUMBER_REQUEST';
const SET_PHONE_AUTH_DIGIT_CODE_REQUEST = 'SET_PHONE_AUTH_DIGIT_CODE_REQUEST';
const SET_PHONE_AUTH_EMAIL_REQUEST = 'SET_PHONE_AUTH_EMAIL_REQUEST';

//전화 인증 번호 요청 액션
const API_PHONE_AUTH_REQUEST = 'API_PHONE_AUTH_REQUEST';
const API_PHONE_AUTH_SUCCESS = 'API_PHONE_AUTH_SUCCESS';
const API_PHONE_AUTH_FAILURE = 'API_PHONE_AUTH_FAILURE';

//전화 인증 번호 입력 액션
const API_PHONE_AUTH_VERIFY_CODE_REQUEST = 'API_PHONE_AUTH_VERIFY_CODE_REQUEST';
const API_PHONE_AUTH_VERIFY_CODE_SUCCESS = 'API_PHONE_AUTH_VERIFY_CODE_SUCCESS';
const API_PHONE_AUTH_VERIFY_CODE_FAILURE = 'API_PHONE_AUTH_VERIFY_CODE_FAILURE';

//전화 인증으로 비밀번호 찾기 액션
const API_FIND_BY_PHONE_REQUEST = 'API_FIND_BY_PHONE_REQUEST';
const API_FIND_BY_PHONE_SUCCESS = 'API_FIND_BY_PHONE_SUCCESS';
const API_FIND_BY_PHONE_FAILURE = 'API_FIND_BY_PHONE_FAILURE';

//전화 인증으로 아이디 찾기 액션
const API_FIND_ID_BY_PHONE_REQUEST = 'API_FIND_ID_BY_PHONE_REQUEST';
const API_FIND_ID_BY_PHONE_SUCCESS = 'API_FIND_ID_BY_PHONE_SUCCESS';
const API_FIND_ID_BY_PHONE_FAILURE = 'API_FIND_ID_BY_PHONE_FAILURE';

//전화 인증을 통한 사용자 정보 업데이트 (전화번호와 국가를 업데이트한다);
const API_UPDATE_INFO_BY_PHONE_REQUEST = 'API_UPDATE_INFO_BY_PHONE_REQUEST';
const API_UPDATE_INFO_BY_PHONE_SUCCESS = 'API_UPDATE_INFO_BY_PHONE_SUCCESS';
const API_UPDATE_INFO_BY_PHONE_FAILURE = 'API_UPDATE_INFO_BY_PHONE_FAILURE';

//넥스모 인증 단계 초기로
const API_PHONE_AUTH_FIRST_PHASE = 'API_PHONE_AUTH_FIRST_PHASE';

//넥스모 전화 인증 초기화
const API_PHONE_AUTH_INIT = 'API_PHONE_AUTH_INIT';

//아이디 찾기 페이지 초기화 액션
const SET_FIND_ID_PAGE_INIT = 'SET_FIND_ID_PAGE_INIT';

const initialState = {
    loading: false,
    open: false,
    error: {
        error: false,
        type: null,
    },
    auth: {
        success: false, //인증 성공 여부
        email: null, // 인증받을 계정(이메일)
        countryList: false, //국가선택 모달창
        nextStep: false, //true면 다음 단계
        requestId: null, //넥스모 인증 요청시 유효 검증 아이디
        phone: null, //인증받을 전화번호
        country: 'us', //국가
        code: null, //4자리 인증번호
    },
    findResult: {
        email: null, //이메일 값 true면 찾음, false면 못 찾음 null은 디폴트값
    },
    updateResult:false
};


export function phoneAuthReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PHONE_AUTH_MODAL_OPEN_TOGGLE:
            return {
                ...state,
                open: !state.open,
                loading: false,
                error: state.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: 'us', //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case SET_PHONE_AUTH_CANCEL_NEXT_STEP_REQUEST:
            return {
                ...state,
                open: state.open,
                loading: false,
                error: state.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: 'us', //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case SET_COUNTRY_LIST_TOGGLE_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: !state.auth.countryList, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case SET_PHONE_AUTH_DIGIT_CODE_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: state.auth.countryList, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: action.code, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case SET_COUNTRY_SELECTOR_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: action.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult

            };
        case SET_PHONE_NUMBER_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: state.auth.countryList, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: action.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_REQUEST: //전화 인증 요청
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                auth: state.auth,
                findResult: state.findResult,
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_SUCCESS: // 넥스모 전화 인증 요청 성공시
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success, //최종 인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: state.auth.countryList, //국가선택 모달창
                    nextStep: true, //true면 다음 단계
                    requestId: action.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_FAILURE:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: action.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: null, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_VERIFY_CODE_REQUEST:
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                auth: state.auth,
                findResult: state.findResult,
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_VERIFY_CODE_SUCCESS:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    success: true, //인증 성공 여부
                    email: null, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_VERIFY_CODE_FAILURE:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: action.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: null, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_FIND_BY_PHONE_REQUEST: //휴대폰 인증으로 비밀번호 찾기 요청
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                auth: state.auth,
                findResult: state.findResult,
                updateResult:initialState.updateResult
            };
        case API_FIND_BY_PHONE_SUCCESS: //휴대폰 인증으로 비밀번호 찾기 성공
            return {
                ...state,
                loading: false,
                open: false,
                error: state.error,
                auth: {
                    success: true, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case API_FIND_BY_PHONE_FAILURE:
            return {
                ...state,
                loading: false,
                open: false,
                error: action.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //인증 실패하면 모달창 초기상태를 위해 nextStep은 false로
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: null
                },
                updateResult:initialState.updateResult
            };
        case SET_PHONE_AUTH_EMAIL_REQUEST:
            return {
                ...state,
                loading: false,
                open: state.open,
                error: state.error,
                auth: {
                    email: action.email,
                    success: state.auth.success,
                    nextStep: state.auth.nextStep,
                    countryList: state.auth.countryList,
                    requestId: state.auth.requestId,
                    phone: state.auth.phone,
                    country: state.auth.country,
                    code: state.auth.code,
                },
                findResult: initialState.findResult,
                updateResult:initialState.updateResult
            };
        case API_FIND_ID_BY_PHONE_REQUEST:            //전화번호 인증으로 아이디 찾기 요청
            return {
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                auth: {
                    success: state.auth.success,
                    email: state.auth.email,
                    nextStep: state.auth.nextStep,
                    countryList: state.auth.countryList,
                    requestId: state.auth.requestId,
                    phone: state.auth.phone,
                    country: state.auth.country,
                    code: state.auth.code,
                },
                findResult: initialState.findResult,
                updateResult:initialState.updateResult
            };
        case API_FIND_ID_BY_PHONE_SUCCESS: //전화번호 아이디 찾기 인증 성공시
            return {
                ...state,
                loading: false,
                open: false, //모달창 닫기
                error: state.error,
                auth: {
                    success: true,
                    email: null,
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: initialState.auth.country, //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: action.email
                },
                updateResult:initialState.updateResult
            };
        case API_FIND_ID_BY_PHONE_FAILURE: //전화번호로 아이디 찾기 실패시 nexmoVerify스텝 단계 유지시키기 위해
            return {
                ...state,
                loading: false,
                open: state.open,
                error: action.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: state.auth.countryList, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: initialState.findResult,
                updateResult:initialState.updateResult
            };
        case API_PHONE_AUTH_FIRST_PHASE: //이전 단계로 모든 스테이터스 초기화
            return {
                ...state,
                loading: false,
                open: state.open,
                error: initialState.error,
                auth: initialState.auth,
                findResult: initialState.findResult,
                updateResult:initialState.updateResult
            };
        case API_UPDATE_INFO_BY_PHONE_REQUEST: //#4 전화 인증을 통한 사용자 정보 업데이트 요청
            return{
                ...state,
                loading: true,
                open: state.open,
                error: state.error,
                auth: state.auth,
                findResult: initialState.findResult,
                updateResult:initialState.updateResult
            };

        case API_UPDATE_INFO_BY_PHONE_SUCCESS://#4 전화 인증을 통한 사용자 정보 업데이트 성공
            return{
                ...state,
                loading: false,
                open: false,
                error: initialState.error,
                auth: initialState.auth,
                findResult: initialState.findResult,
                updateResult:true
            };
        case API_UPDATE_INFO_BY_PHONE_FAILURE://#4 전화 인증을 통한 사용자 정보 업데이트 실패
            return{
                ...state,
                loading: false,
                open: state.open,
                error: action.error,
                auth: {
                    success: false, //인증 성공 여부
                    email: state.auth.email, // 인증받을 계정(이메일)
                    countryList: state.auth.countryList, //국가선택 모달창
                    nextStep: state.auth.nextStep, //true면 다음 단계
                    requestId: state.auth.requestId, //넥스모 인증 요청시 유효 검증 아이디
                    phone: state.auth.phone, //인증받을 전화번호
                    country: state.auth.country, //국가
                    code: state.auth.code, //4자리 인증번호
                },
                findResult: initialState.findResult,
                updateResult:false
            };
        case API_PHONE_AUTH_INIT:
            return {
                ...state,
                loading: false,
                open: false,
                error: {
                    error: false,
                    type: null,
                },
                auth: {
                    success: false, //인증 성공 여부
                    email: null, // 인증받을 계정(이메일)
                    countryList: false, //국가선택 모달창
                    nextStep: false, //true면 다음 단계
                    requestId: null, //넥스모 인증 요청시 유효 검증 아이디
                    phone: null, //인증받을 전화번호
                    country: 'us', //국가
                    code: null, //4자리 인증번호
                },
                findResult: {
                    email: state.findResult.email, //이메일 값 true면 찾음, false면 못 찾음 null은 디폴트값
                }
            };
        case SET_FIND_ID_PAGE_INIT:
            return initialState;
        default:
            return state;
    }
}