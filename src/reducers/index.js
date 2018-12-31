import {combineReducers} from 'redux';
import {languageReducer} from './languageReducer';
import {counterReducer} from './counterReducer'
import {axiosReducer} from './axiosReducer';
import {autologinReducer} from "./autoLoginReducer";
import {headerReducer} from './headerReducer';
import {clientStatusReducer} from "./clientStatusReducer";

export default combineReducers({
    clientStatusReducer,
    axiosReducer,
    languageReducer,
    counterReducer,
    autologinReducer,
    headerReducer
});
