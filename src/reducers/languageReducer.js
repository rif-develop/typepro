const SET_LANGUAGE_REQUEST = 'SET_LANGUAGE_REQUEST';
const SET_LANGUAGE_SUCCESS = 'SET_LANGUAGE_SUCCESS';
const SET_LANGUAGE_FAILURE = 'SET_LANGUAGE_FAILURE';
import {getCookie, setCookie} from "../action/cookie/Cookie";

const initialState = {
    fetching: false,
    language: getCookie('lang') !== null && getCookie('lang') !== undefined ? getCookie('lang'):'ko',
    error: null
};

export function languageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE_REQUEST:
            return {...state, fetching: true, error: null};
        case SET_LANGUAGE_SUCCESS:
            let cookieToday = new Date();
            let expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // 1년
            setCookie('lang', action.language, expiryDate, '/', false, false);

            return {...state, fetching: false, error: null, language: action.language};
        case SET_LANGUAGE_FAILURE:
            return {...state, fetching: false, error: action.error};
        default:
            return state;
    }

}