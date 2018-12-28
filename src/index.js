import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, createStore, compose} from 'redux';
import {Route, BrowserRouter, HashRouter, Switch, Redirect} from "react-router-dom";
import {Provider} from 'react-redux';
import createSagaMiddleware from "redux-saga";
import reducer from "./reducers/index";
import rootSaga from "./sagas";
import {CheckWebBrowser} from "./lib/script";

import IndexLayout from "./pages/index";
import LoginLayout from "./pages/login/Login";
import ErrorPage from "./pages/error/ErrorPage";
import Ie10 from "./pages/ie/Ie10";

const root = document.getElementById('app');

const sagaMiddleware = createSagaMiddleware();

//크롬 리덕스 데브툴
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//상태를 저장할 스토어(production모드에서는 devtool 빼기)
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware),
        window.navigator.userAgent.includes('Chrome') ? reduxDevTools : compose)
);

/*상태 변화시 마다 log 출력*/
store.subscribe(function (e) {
    console.log(store.getState());
});
/*미들웨어 구동*/
sagaMiddleware.run(rootSaga);

/*IE버젼 체커*/
var ieVersion = CheckWebBrowser();

/*익스 10보다 버전이 낮으면 대체 페이지로*/
if(ieVersion < 10){
    ReactDOM.render(
        <Ie10/>,root
    )
} else{
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path={"/"} component={IndexLayout}/>
                    <Route path={"/login"} component={LoginLayout}/>
                    <Route path="/404error" component={ErrorPage} notFound/>
                    <Redirect from="*" to="/404error"/>
                </Switch>
            </HashRouter>
        </Provider>, root
    );

}


