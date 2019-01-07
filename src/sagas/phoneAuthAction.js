import {takeLatest, put} from "redux-saga/effects";

export function* wathcerPhoneAuth() {
    yield takeLatest('SET_PHONE_AUTH_REQUEST', phoneHandler);
}

function* phoneHandler() {
    try {
        yield put({
            type: 'SET_PHONE_AUTH_SUCCESS'
        });
    } catch (e) {
        yield put({
            type: 'SET_PHONE_AUTH_FAILURE',
            e
        });
    }

}
