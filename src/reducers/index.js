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

export default combineReducers({
    clientStatusReducer,
    languageReducer,
    headerReducer,
    settingReducer,
    addressReducer,
    phoneAuthReducer,
    clientSignUpReducer,
    autologinReducer,
    modalReducer
});
