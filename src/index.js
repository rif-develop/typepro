import React from 'react';
import ReactDOM from 'react-dom';
import {HelmetProvider} from "react-helmet-async";
import {Route, BrowserRouter as Router, HashRouter, Switch, Redirect,} from "react-router-dom";
import {Provider} from 'react-redux';
import rootSaga from "./sagas";

import {CheckWebBrowser, getCurrentScrollPos} from "./lib/script";
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
import MypageLayout from "./pages/mypage/MypageLayout";
import MypageUpdateLayout from "./pages/mypage/MypageUpdateLayout";
import PasswordChangeLayout from "./pages/password/PasswordChangeLayout";
import FindClientChangeLayout from "./pages/find/FindClientChangeLayout";
import NotValidPage from "./pages/error/NotValidPage";
import PasswordChangeByPhoneLayout from "./pages/password/PasswordChangeByPhoneLayout";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
//웹소켓
import {socket} from "./action/socket";
import AdminLayout from "./pages/admin/AdminLayout";
import QrcodeForwardLayout from "./pages/qrcode/QrcodeForwardLayout";
//스크롤 폴리필
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

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

//이전 스크롤 위치
let lastScrollTop = getCurrentScrollPos();

window.addEventListener('scroll', function (e) {
    //현재 스크롤 위치
    const currentScrollTop = getCurrentScrollPos();

    console.log(lastScrollTop, currentScrollTop);

    if (currentScrollTop > lastScrollTop && (currentScrollTop >= 70)) {
        //false아래
        console.log('아래로 ');
        //아래면은 active:True props
        store.dispatch({
            type: 'SET_WINDOW_SCROLL_Y_REQUEST',
            scrollTop: false//false면 안 보이게
        });
    } else {
        //true위
        console.log('위로');
        store.dispatch({
            type: 'SET_WINDOW_SCROLL_Y_REQUEST',
            scrollTop: true
        });
    }
    //이전 스크롤 위치 값 갱신
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});
//cookie값에 따라 언어 분기

//웹소켓 시작
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
                        <Route path="/notvalid" component={NotValidPage} notFound/>
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
                        <Route exact path={'/mypage/auth'} component={MypageLayout}/>
                        <Route exact path={'/mypage/auth/modify'} component={MypageUpdateLayout}/>
                        <Route exact path={'/mypage/password'} component={PasswordChangeLayout}/>
                        <Route exact path={'/email/passwordchange'} component={FindClientChangeLayout}/>
                        <Route exact path={'/phone/passwordchange'} component={PasswordChangeByPhoneLayout}/>
                        <Route exact path={'/dashboard'} component={DashboardLayout}/>
                        <Route exact path={'/admin'} component={AdminLayout}/>
                        <Route exact path={'/healthCheck'}/>
                        <Route exact path={'/download/app'} component={QrcodeForwardLayout}/>
                        <Redirect from="*" to="/404error"/>
                        <Redirect to={'/login'}/>
                    </Switch>
                </Router>
            </HelmetProvider>
        </Provider>, root
    );
    setTimeout(()=>{
        window.scroll({top: 0, left: 0, behavior: 'smooth'});
    },200)
}
