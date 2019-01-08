/*이메일 액션*/
const SET_SIGN_UP_EMAIL_REQUEST = 'SET_SIGN_UP_EMAIL_REQUEST';
const SET_SIGN_UP_EMAIL_SUCCESS = 'SET_SIGN_UP_EMAIL_SUCCESS';
const SET_SIGN_UP_EMAIL_FAILURE = 'SET_SIGN_UP_EMAIL_FAILURE';
/*비밀번호 액션*/
const SET_SIGN_UP_PASSWORD_REQUEST = 'SET_SIGN_UP_PASSWORD_REQUEST';
const SET_SIGN_UP_PASSWORD_SUCCESS = 'SET_SIGN_UP_PASSWORD_SUCCESS';
const SET_SIGN_UP_PASSWORD_FAILURE = 'SET_SIGN_UP_PASSWORD_FAILURE';
/*이용약관 동의 액션*/
const SET_SIGN_UP_TERMS_REQUEST = 'SET_SIGN_UP_TERMS_REQUEST';
const SET_SIGN_UP_TERMS_SUCCESS = 'SET_SIGN_UP_TERMS_SUCCESS';
const SET_SIGN_UP_TERMS_FAILURE = 'SET_SIGN_UP_TERMS_FAILURE';
/*회원가입 처리 액션*/
const SET_SIGN_UP_COMPLETE_REQUEST = 'SET_SIGN_UP_COMPLETE_REQUEST';
const SET_SIGN_UP_COMPLETE_SUCCESS = 'SET_SIGN_UP_COMPLETE_SUCCESS';
const SET_SIGN_UP_COMPLETE_FAILURE = 'SET_SIGN_UP_COMPLETE_FAILURE';


/*초기화*/
const SET_SIGN_UP_INIT = 'SET_SIGN_UP_INIT';


const initialState = {
    loading: false,
    error: null,
    form: {
        email: null,
        password: null,
        terms: false,
        date: new Date()
    },
    result: {
        loading: false,
        error: null,
        success: false
    }

};


export function clientSignUpReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SIGN_UP_EMAIL_REQUEST:
            return {...state, loading: true, error: null};
        case SET_SIGN_UP_EMAIL_SUCCESS:
            return {...state, loading: false, error: null, form: {email: action.email, password: state.form.password, terms: state.form.terms, date: new Date()}};
        case SET_SIGN_UP_EMAIL_FAILURE:
            return {...state, loading: false, error: action.error};
        case SET_SIGN_UP_PASSWORD_REQUEST:
            return {...state, loading: true, error: null};
        case SET_SIGN_UP_PASSWORD_SUCCESS:
            return {...state, loading: false, error: null, form: {email: state.form.email, password: action.password, terms: state.form.terms, date: new Date()}};
        case SET_SIGN_UP_PASSWORD_FAILURE:
            return {...state, loading: false, error: action.error};
        case SET_SIGN_UP_TERMS_REQUEST:
            return {...state, loading: true, error: null};
        case SET_SIGN_UP_TERMS_SUCCESS:
            return {...state, loading: false, error: null, form: {email: state.form.email, password: state.form.password, terms: !state.form.terms, date: new Date()}};
        case SET_SIGN_UP_TERMS_FAILURE:
            return {...state, loading: false, error: action.error};
        case SET_SIGN_UP_COMPLETE_REQUEST:
            return {
                ...state, result: {
                    loading: true,
                    error: null,
                }
            };
        case SET_SIGN_UP_COMPLETE_SUCCESS:
            return {
                ...state, result: {
                    loading: true,
                    error: null,
                    success: action.success
                }
            };

        case SET_SIGN_UP_COMPLETE_FAILURE:
            return {
                ...state, result: {
                    loading: false,
                    error: action.error,
                    success: false
                }
            };
        case SET_SIGN_UP_INIT:
            return {...state, initialState};
        default:
            return state;
    }
}