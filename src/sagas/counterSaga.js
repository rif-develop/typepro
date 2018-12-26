import {takeEvery,put,takeLatest} from "redux-saga/effects";

export function* watcherCounter(){
    yield takeEvery('INCREMENT_REQUEST', incrementSaga)
}

function* incrementSaga(count = 1){

    try{
        yield put({
            type:"INCREMENT_SUCCESS",
        })
    } catch (e) {
        yield put({
            type:'INCREMENT_FAILURE'
        })
    }
}