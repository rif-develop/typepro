import {all, fork} from 'redux-saga/effects';
import {watcherCounter} from './counterSaga';
import {watcherLanguage} from './languageAction';
import {watcherSaga} from "./axiosSaga";
import {watcherAutoLogin} from "./autoLoginSaga";
import {wathcerAlarmHeader, wathcerClientInfoHeader, watcherMobileMenu} from './headerSaga';
import {wathcerWindowWidth} from "./clientStatusAction";
import {watcherSetting} from "./settingAction";
import {watcherAddress} from './addressAction';

export default function* rootSaga(){
    yield all([
        fork(watcherCounter),
        fork(watcherLanguage),
        fork(watcherSaga),
        fork(watcherAutoLogin),
        fork(wathcerAlarmHeader),
        fork(wathcerClientInfoHeader),
        fork(watcherMobileMenu),
        fork(wathcerWindowWidth),
        fork(watcherSetting),
        fork(watcherAddress)
    ]);
}


