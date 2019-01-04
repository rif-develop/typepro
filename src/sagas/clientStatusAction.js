import {put, takeLatest} from "redux-saga/effects";

export function* wathcerWindowWidth() {
    yield takeLatest('SET_WINDOW_WIDTH_REQUEST', setWidthSaga);
}

function* setWidthSaga() {
    const width = window.innerWidth && document.documentElement.clientWidth ?
        Math.min(window.innerWidth, document.documentElement.clientWidth) :
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.getElementsByTagName('body')[0].clientWidth;

    try {
        yield put({
            type: "SET_WINDOW_WIDTH_SUCCESS",
            width
        })
    } catch (e) {
        yield put({
            type: 'SET_WINDOW_WIDTH_FAILURE',
            e
        })
    }
}

