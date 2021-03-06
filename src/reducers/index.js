import {combineReducers} from 'redux';
import {languageReducer} from './languageReducer';
import {headerReducer} from './headerReducer';
import {clientStatusReducer} from "./clientStatusReducer";
import {settingReducer} from "./settingReducer";
import {addressReducer} from "./addressReducer";
import {phoneAuthReducer} from './phoneAuthReducer';
import {clientSignUpReducer} from "./clientSignupReducer";
import {autologinReducer} from "./autoLoginReducer";
import {modalReducer} from "./modalReducer";
import {mypageReducer} from "./mypageReducer";
import {findAccountReducer} from "./findReducer";
import {passwordChangeReducer} from "./passwordChangeReducer";
import {cropperReducer} from "./cropperReducer";
import {babyInfoReducer} from "./babyInfoReducer";
import {subscriptionReducer} from "./subscriptionReducer";
import {dateReducer} from './dateReducer';
import {dashboardReducer} from "./dashboardReducer";

export default combineReducers({
    clientStatusReducer,
    languageReducer,
    headerReducer,
    settingReducer,
    addressReducer,
    phoneAuthReducer,
    clientSignUpReducer,
    autologinReducer,
    modalReducer,
    mypageReducer,
    findAccountReducer,
    passwordChangeReducer,
    cropperReducer,
    babyInfoReducer,
    subscriptionReducer,
    dateReducer,
    dashboardReducer
});
