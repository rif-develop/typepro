import {combineReducers} from 'redux';
import {languageReducer} from './languageReducer';
import {counterReducer} from './counterReducer'
import {axiosReducer} from './axiosReducer';
import {autologinReducer} from "./autoLoginReducer";
import {headerReducer} from './headerReducer';

export default combineReducers({
    axiosReducer,
    languageReducer,
    counterReducer,
    autologinReducer,
    headerReducer
});
