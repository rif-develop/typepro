import {all, fork} from 'redux-saga/effects';
import {watcherCounter} from './counterSaga';
import {watcherLanguage} from './languagesaga';
import {watcherSaga} from "./axiosSaga";
import {watcherAutoLogin} from "./autoLoginSaga";
import {wathcerAlarmHeader, wathcerClientInfoHeader, watcherMobileMenu} from './headerSaga';

export default function* rootSaga(){
    yield all([
        fork(watcherCounter),
        fork(watcherLanguage),
        fork(watcherSaga),
        fork(watcherAutoLogin),
        fork(wathcerAlarmHeader),
        fork(wathcerClientInfoHeader),
        fork(watcherMobileMenu)
    ]);
}


