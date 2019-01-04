import {takeLatest, put} from "redux-saga/effects";


export function* watcherLanguage() {
    yield takeLatest('SET_LANGUAGE_REQUEST',setLanguage)
}

function* setLanguage(data) {
    const language = data.lang || 'en';
    try {
        yield put({
            type:'SET_LANGUAGE_SUCCESS',
            language
        });

    } catch (error) {
        yield put({
            type:'SET_LANGUAGE_FAILURE',
            error
        })
    }
}
