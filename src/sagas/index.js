import {all, fork} from 'redux-saga/effects';
import {watcherLanguage} from './languageAction';
import {watcherAutoLogin} from "./autoLoginSaga";
import {wathcerAlarmHeader, wathcerClientInfoHeader, watcherMobileMenu} from './headerSaga';
import {watcherWebLogin} from "./clientStatusAction";
import {watcherSetting} from "./settingAction";
import {watcherAddress, watcherAddressList, watcherAddressRemove, watcherSetDefaultAddress, watcherUpdateAddress} from './addressAction';
import {watcherPhoneAuth} from "./phoneAuthAction";
import {watcherSignup} from './clientSingUpAction'
import {watcherPasswordCheck} from "./mypageAction";
import {watcherFind} from "./findAction";
import {watcherPasswordChange} from "./passwordChangeAction";
import {watcherCropperRequest} from "./cropperAction";
import {watcherCurrentBabyInfo} from './babyInfoAction';
import {watcherSubcscription} from "./subscriptionAction";
import {watcherDate} from "./dateAction";

export default function* rootSaga() {
    yield all([
        fork(watcherLanguage),
        fork(watcherAutoLogin),
        fork(wathcerAlarmHeader),
        fork(wathcerClientInfoHeader),
        fork(watcherMobileMenu),
        fork(watcherWebLogin),
        fork(watcherSetting),
        fork(watcherAddress),
        fork(watcherPhoneAuth),
        fork(watcherSignup),
        fork(watcherAddressList),
        fork(watcherAddressRemove),
        fork(watcherSetDefaultAddress),
        fork(watcherUpdateAddress),
        fork(watcherPasswordCheck),
        fork(watcherFind),
        fork(watcherPasswordChange),
        fork(watcherCropperRequest),
        fork(watcherCurrentBabyInfo),
        fork(watcherSubcscription),
        fork(watcherDate)
    ]);
}


