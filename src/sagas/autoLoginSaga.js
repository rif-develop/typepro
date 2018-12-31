import {put, takeEvery, takeLatest} from "redux-saga/effects";

export function* watcherAutoLogin(){
    yield takeEvery('AUTO_LOGIN_REQUEST', checkAutoLogin)
}

function* checkAutoLogin(){

    try{
        yield put({
            type:"AUTO_LOGIN_SUCCESS",
        })
    } catch (e) {
        yield put({
            type:'AUTO_LOGIN_FAILURE',
            e
        })
    }
}