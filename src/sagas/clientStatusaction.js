import {put, takeLatest} from "redux-saga/effects";

export function* wathcerWindowWidth() {
    yield takeLatest('SET_WINDOW_WIDTH_REQUEST', setWidthSaga);
}

function* setWidthSaga(width) {

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

