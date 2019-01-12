/*이메일 액션*/
const SET_SIGN_UP_EMAIL_REQUEST = 'SET_SIGN_UP_EMAIL_REQUEST';
const SET_SIGN_UP_EMAIL_SUCCESS = 'SET_SIGN_UP_EMAIL_SUCCESS';
const SET_SIGN_UP_EMAIL_FAILURE = 'SET_SIGN_UP_EMAIL_FAILURE';
//이메일 중복 여부 처리 액션
const SET_SIGN_UP_EMAIL_DUPLICATE_TRUE = 'SET_SIGN_UP_EMAIL_DUPLICATE_TRUE';
const SET_SIGN_UP_EMAIL_DUPLICATE_FALSE = 'SET_SIGN_UP_EMAIL_DUPLICATE_FALSE';

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
const SET_SIGN_UP_INIT_SUCCESS = 'SET_SIGN_UP_INIT_SUCCESS';


const initialState = {
    loading: false,
    form: {
        email: null,
        password: null,
        terms: false,
        date: new Date()
    },
    validate: {
        email: {
            success: false,
            duplicate: false
        },
        password: {
            success: false
        },
        terms: {
            success: false,
        }
    },
    result: {
        success: false,
        redirectUrl: null
    }
};


export function clientSignUpReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SIGN_UP_EMAIL_REQUEST:
            return {...state, loading: true};
        case SET_SIGN_UP_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                form: {
                    email: action.email,
                    password: state.form.password,
                    terms: state.form.terms,
                    date: new Date()
                },
                validate: {
                    email: {
                        success: true,
                        duplicate: state.validate.email.duplicate
                    },
                    password: state.validate.password,
                    terms: state.validate.terms
                }
            };
        case SET_SIGN_UP_EMAIL_FAILURE:
            return {
                ...state,
                loading: false,
                form: {
                    email: null,
                    password: state.form.password,
                    terms: state.form.terms,
                    date: new Date()
                },
                validate: {
                    email: {
                        success: false,
                        duplicate: state.validate.email.duplicate
                    },
                    password: state.validate.password,
                    terms: state.validate.terms
                },
            };
        case SET_SIGN_UP_PASSWORD_REQUEST:
            return {...state, loading: true};
        case SET_SIGN_UP_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                form: {
                    email: state.form.email,
                    password: action.password,
                    terms: state.form.terms,
                    date: new Date()
                },
                validate: {
                    email: {
                        success: state.validate.email.success,
                        duplicate: state.validate.email.duplicate
                    },
                    password: {
                        success: true
                    },
                    terms: state.validate.terms
                },
            };
        case SET_SIGN_UP_PASSWORD_FAILURE:
            return {
                ...state,
                loading: false,
                form: {
                    email: state.form.email,
                    password: null,
                    terms: state.form.terms,
                    date: new Date()
                },
                validate: {
                    email: {
                        success: state.validate.email.success,
                        duplicate: state.validate.email.duplicate
                    },
                    password: {
                        success: false
                    },
                    terms: state.validate.terms
                },
            };
        case SET_SIGN_UP_TERMS_REQUEST:
            return {...state, loading: true, error: null};
        case SET_SIGN_UP_TERMS_SUCCESS:
            return {
                ...state, loading: false, error: null,
                form: {
                    email: state.form.email, password: state.form.password, terms: !state.form.terms, date: new Date()
                },
                validate: {
                    email: state.validate.email,
                    password: state.validate.password,
                    terms: {
                        success: !state.validate.terms.success
                    }
                }
            };
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
                ...state, result: action.response
            };

        case SET_SIGN_UP_COMPLETE_FAILURE:
            return {
                ...state, result: {
                    success: false,
                    redirectUrl: null
                }
            };
        case SET_SIGN_UP_EMAIL_DUPLICATE_TRUE:
            return {
                ...state,
                validate: {
                    email: {
                        success: state.validate.email.success,
                        duplicate: true
                    },
                    password: state.validate.password,
                    terms: state.validate.terms
                }
            };
        case SET_SIGN_UP_EMAIL_DUPLICATE_FALSE:
            return {
                ...state,
                validate: {
                    email: {
                        success: state.validate.email.success,
                        duplicate: false
                    },
                    password: state.validate.password,
                    terms: state.validate.terms
                }
            };
        case SET_SIGN_UP_INIT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}