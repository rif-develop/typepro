import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async";
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
import BottleLayout from "./pages/product/bottle";
import PeepeeLayout from "./pages/product/peepee";
import TempLayout from "./pages/product/temp";
import SettingLayout from "./pages/setting/SettingLayout";
import PrivacypolicyLayout from "./pages/privacypolicy/PrivacypolicyLayout";
import TermsOfUseLayout from "./pages/termsofuse/TermsOfUseLayout";
import AddressLayout from "./pages/address/AddressLayout";

const root = document.getElementById('app');

const sagaMiddleware = createSagaMiddleware();

//크롬 리덕스 데브툴
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

//상태를 저장할 스토어(production모드에서는 devtool 빼기)
let store = createStore(
    reducer,
    compose(applyMiddleware(sagaMiddleware), window.navigator.userAgent.includes('Chrome') ? reduxDevTools : compose)
);
/*상태 변화시 마다 log 출력*/
store.subscribe(function (e) {
    console.log(store.getState());
});

/*미들웨어 구동*/
sagaMiddleware.run(rootSaga);

/*IE버젼 체커*/
const ieVersion = CheckWebBrowser();

/*리틀원 웹 앱 어플리케이션 구동 가능한 브라우저별 버전*/
const LauchableVersion = {
    ie: 10,
    firefox: '',
    opera: '',
    mozilla: '',
    chrome: '',
    safari: '',
};

//화면 사이즈 저장
window.addEventListener('resize', function () {
    store.dispatch({
        type: 'SET_WINDOW_WIDTH_REQUEST',
    })
});
//cookie값에 따라 언어 분기

/*익스 10보다 버전이 낮으면 대체 페이지로*/
if (ieVersion < LauchableVersion.ie) {
    ReactDOM.render(
        <Ie10/>, root
    )
} else {
    ReactDOM.render(
        <Provider store={store}>
            <HelmetProvider>
                <HashRouter>
                    <Switch>
                        <Route exact path={"/"} component={IndexLayout}/>
                        <Route path={"/login"} component={LoginLayout}/>
                        <Route path="/404error" component={ErrorPage} notFound/>
                        <Route exact path={'/device/smartbottle'} component={BottleLayout}/>
                        <Route exact path={'/device/smartpeepee'} component={PeepeeLayout}/>
                        <Route exact path={'/device/smarttemp'} component={TempLayout}/>
                        <Route exact path={'/mypage/setting'} component={SettingLayout}/>
                        <Route exact path={'/privacypolicy'} component={PrivacypolicyLayout}/>
                        <Route exact path={'/termsofuse'} component={TermsOfUseLayout}/>
                        <Route exact path={'/mypage/address'} component={AddressLayout}/>
                        <Redirect from="*" to="/404error"/>
                    </Switch>
                </HashRouter>
            </HelmetProvider>
        </Provider>, root
    );

}


