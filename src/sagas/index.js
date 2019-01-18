import {all, fork} from 'redux-saga/effects';
import {watcherCounter} from './counterSaga';
import {watcherLanguage} from './languageAction';
import {watcherSaga} from "./axiosSaga";
import {watcherAutoLogin} from "./autoLoginSaga";
import {wathcerAlarmHeader, wathcerClientInfoHeader, watcherMobileMenu} from './headerSaga';
import {wathcerWindowWidth} from "./clientStatusAction";
import {watcherSetting} from "./settingAction";
import {watcherAddress, watcherAddressList, watcherAddressRemove, watcherSetDefaultAddress,watcherUpdateAddress} from './addressAction';
import {wathcerPhoneAuth} from "./phoneAuthAction";
import {watcherSignup} from './clientSingUpAction'
import {watcherPasswordCheck} from "./mypageAction";

export default function* rootSaga() {
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
        fork(watcherAddress),
        fork(wathcerPhoneAuth),
        fork(watcherSignup),
        fork(watcherAddressList),
        fork(watcherAddressRemove),
        fork(watcherSetDefaultAddress),
        fork(watcherUpdateAddress),
        fork(watcherPasswordCheck)
    ]);
}


