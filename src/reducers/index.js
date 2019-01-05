import {combineReducers} from 'redux';
import {languageReducer} from './languageReducer';
import {counterReducer} from './counterReducer'
import {axiosReducer} from './axiosReducer';
import {autologinReducer} from "./autoLoginReducer";
import {headerReducer} from './headerReducer';
import {clientStatusReducer} from "./clientStatusReducer";
import {settingReducer} from "./settingReducer";
import {addressReducer} from "./addressReducer";

export default combineReducers({
    clientStatusReducer,
    axiosReducer,
    languageReducer,
    counterReducer,
    autologinReducer,
    headerReducer,
    settingReducer,
    addressReducer
});
