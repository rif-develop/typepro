import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async";
import {Route, BrowserRouter as Router, HashRouter, Switch, Redirect,} from "react-router-dom";
import {Provider} from 'react-redux';
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
import SignupLayout from "./pages/signup/SignupLayout";
import FindClientIdLayout from "./pages/find/FindClientIdLayout";
import FindClientPasswordLayout from "./pages/find/FindClientPasswordLayout";
import {sagaMiddleware, store} from './store/StoreComponent'

const root = document.getElementById('app');

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

/*미들웨어 구동*/
sagaMiddleware.run(rootSaga);

/*상태 변화시 마다 log 출력*/
if (process.env.MODE === 'development') {
    console.log('개발모드에서 작업 중입니다.');
    store.subscribe(function (e) {
        console.log(store.getState());
    });
}

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
                <Router>
                    <Switch>
                        <Route exact path={"/"} component={IndexLayout}/>
                        <Route path={"/login"} component={LoginLayout}/>
                        <Route path="/404error" component={ErrorPage} notFound/>
                        <Route exact path={'/device/smartbottle'} component={BottleLayout}/>
                        <Route exact path={'/device/smartpeepee'} component={PeepeeLayout}/>
                        <Route exact path={'/device/smarttemp'} component={TempLayout}/>
                        <Route exact path={'/mypage/setting'} component={SettingLayout}/>
                        <Route exact path={'/mypage/address'} component={AddressLayout}/>
                        <Route exact path={'/privacypolicy'} component={PrivacypolicyLayout}/>
                        <Route exact path={'/termsofuse'} component={TermsOfUseLayout}/>
                        <Route exact path={'/signup'} component={SignupLayout}/>
                        <Route exact path={'/findid'} component={FindClientIdLayout}/>
                        <Route exact path={'/findpassword'} component={FindClientPasswordLayout}/>
                        <Redirect from="*" to="/404error"/>
                        <Redirect to={'/login'}/>
                    </Switch>
                </Router>
            </HelmetProvider>
        </Provider>, root
    );

}


