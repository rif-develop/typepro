import {all, fork} from 'redux-saga/effects';
import {watcherCounter} from './counterSaga';
import {watcherLanguage} from './languagesaga';
import {watcherSaga} from "./axiosSaga";
export default function* rootSaga(){
    yield all([
        fork(watcherCounter),
        fork(watcherLanguage),
        fork(watcherSaga)
    ]);
}


