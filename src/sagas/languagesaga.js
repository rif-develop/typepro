import {takeLatest, put, takeEvery} from "redux-saga/effects";
import {setCookie} from "../action/cookie/Cookie";


export function* watcherLanguage() {
    yield takeEvery('SET_LANGUAGE_REQUEST',setLanguage)
}

let cookieToday = new Date();
let expiryDate = new Date(cookieToday.getTime() + (365 * 86400000)); // 1년

function* setLanguage(data) {
    const language = data.language || '기본 값';
    try {
        yield put({
            type:'SET_LANGUAGE_SUCCESS',
            language
        });
        setCookie('lang', language, expiryDate, '/', false, false);

    } catch (error) {
        yield put({
            type:'SET_LANGUAGE_FAILURE',
            error
        })
    }
}
