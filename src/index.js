import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import createSagaMiddleware from "redux-saga";
import Button from "./test/Button";
import reducer from "./reducers/index";
import Counter from './test/Counter'
import rootSaga from "./sagas";
import App from "./test/app";
const root = document.getElementById('app');

//상태를 저장할 스토어
const sagaMiddleware = createSagaMiddleware();
//크롬 리덕스 데브툴
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);


store.subscribe(function(){
    console.log(store.getState());
});

sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Button/>
            <Counter/>
            <App/>
        </div>
    </Provider>, root
);

