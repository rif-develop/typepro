import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import IndexLayout from "./pages/index/Index";
import rootSaga from "./action/dispatch/saga";
import reducer from "./reducers/Reducer";
import createSagaMiddleware from "redux-saga";

const root = document.getElementById('app');


const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleWare)
);

console.log(store);
ReactDOM.render(
    <Provider store={store}>
        <IndexLayout/>
    </Provider>, root
);