import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Route, Router, BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers/index";
import rootSaga from "./sagas";

import IndexLayout from "./pages/index";
import LoginLayout from "./pages/login/Login";

const root = document.getElementById('app');

const sagaMiddleware = createSagaMiddleware();

//크롬 리덕스 데브툴
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//상태를 저장할 스토어
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);

/*상태 변화시 마다 log 출력*/
store.subscribe(function () {
    console.log(store.getState());
});
/*미들웨어 구동*/
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Fragment>
                <Route exact path={"/"} component={IndexLayout}/>
                <Route path={"/login"} component={LoginLayout}/>
            </Fragment>
        </HashRouter>
    </Provider>, root
);

