import {put, takeLatest} from "redux-saga/effects";

export function* wathcerAlarmHeader() {
    yield takeLatest('HEADER_ALARM_ACTIVE_REQUEST', alarmActiveSaga);
}

export function* wathcerClientInfoHeader() {
    yield takeLatest('HEADER_CLIENT_ACTIVE_REQUEST', clientInfoActiveSaga);
}

function* alarmActiveSaga() {

    try {
        yield put({
            type: "HEADER_ALARM_ACTIVE_SUCCESS",
        })
    } catch (e) {
        yield put({
            type: 'HEADER_ALARM_ACTIVE_FAILURE'
        })
    }
}


function* clientInfoActiveSaga() {
    try {
        yield put({
            type: "HEADER_CLIENT_ACTIVE_SUCCESS"
        });
    } catch (e) {
        yield put({
            type: "HEADER_CLIENT_ACTIVE_FAILURE"
        });
    }
}


