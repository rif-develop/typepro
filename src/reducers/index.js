import {combineReducers}  from 'redux';
import {languageReducer} from './languageReducer';
import {counterReducer} from './counterReducer'
import {axiosReducer} from './axiosReducer';

export default combineReducers({
    axiosReducer,
     languageReducer,
    counterReducer

});
