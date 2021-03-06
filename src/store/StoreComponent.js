import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from "redux-saga";
import reducer from "../reducers";

export const sagaMiddleware = createSagaMiddleware();

//크롬 리덕스 데브툴
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let mode = process.env.MODE;

export const store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), mode === 'development' && window.navigator.userAgent.includes('Chrome') ? reduxDevTools : compose
    )
);


