webpackHotUpdate("app",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.js");
/* harmony import */ var react_helmet_async__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_helmet_async__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/es/index.js");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reducers/index */ "./src/reducers/index.js");
/* harmony import */ var _sagas__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sagas */ "./src/sagas/index.js");
/* harmony import */ var _lib_script__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./lib/script */ "./src/lib/script.js");
/* harmony import */ var _pages_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/index */ "./src/pages/index/index.js");
/* harmony import */ var _pages_login_Login__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./pages/login/Login */ "./src/pages/login/Login.js");
/* harmony import */ var _pages_error_ErrorPage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/error/ErrorPage */ "./src/pages/error/ErrorPage.js");
/* harmony import */ var _pages_ie_Ie10__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/ie/Ie10 */ "./src/pages/ie/Ie10.js");
/* harmony import */ var _pages_product_bottle__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/product/bottle */ "./src/pages/product/bottle/index.js");
/* harmony import */ var _pages_product_peepee__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/product/peepee */ "./src/pages/product/peepee/index.js");
/* harmony import */ var _pages_product_temp__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/product/temp */ "./src/pages/product/temp/index.js");
/* harmony import */ var _pages_setting_SettingLayout__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/setting/SettingLayout */ "./src/pages/setting/SettingLayout.js");
/* harmony import */ var _pages_privacypolicy_PrivacypolicyLayout__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/privacypolicy/PrivacypolicyLayout */ "./src/pages/privacypolicy/PrivacypolicyLayout.js");
/* harmony import */ var _pages_termsofuse_TermsOfUseLayout__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/termsofuse/TermsOfUseLayout */ "./src/pages/termsofuse/TermsOfUseLayout.js");
/* harmony import */ var _pages_address_AddressLayout__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/address/AddressLayout */ "./src/pages/address/AddressLayout.js");
/* harmony import */ var _pages_signup_SignupLayout__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/signup/SignupLayout */ "./src/pages/signup/SignupLayout.js");
/* harmony import */ var _pages_find_FindClientIdLayout__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./pages/find/FindClientIdLayout */ "./src/pages/find/FindClientIdLayout.js");
/* harmony import */ var _pages_find_FindClientPasswordLayout__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./pages/find/FindClientPasswordLayout */ "./src/pages/find/FindClientPasswordLayout.js");
/* harmony import */ var _store_StoreComponent__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./store/StoreComponent */ "./src/store/StoreComponent.js");

























var root = document.getElementById('app'); // Store();

var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_6__["default"])(); //크롬 리덕스 데브툴

var reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(); //상태를 저장할 스토어(production모드에서는 devtool 빼기)


var store = Object(redux__WEBPACK_IMPORTED_MODULE_3__["createStore"])(_reducers_index__WEBPACK_IMPORTED_MODULE_7__["default"], Object(redux__WEBPACK_IMPORTED_MODULE_3__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_3__["applyMiddleware"])(sagaMiddleware), window.navigator.userAgent.includes('Chrome') ? reduxDevTools : redux__WEBPACK_IMPORTED_MODULE_3__["compose"]));
/*상태 변화시 마다 log 출력*/

store.subscribe(function (e) {
  console.log(store.getState());
});
/*미들웨어 구동*/

sagaMiddleware.run(_sagas__WEBPACK_IMPORTED_MODULE_8__["default"]);
/*IE버젼 체커*/

var ieVersion = Object(_lib_script__WEBPACK_IMPORTED_MODULE_9__["CheckWebBrowser"])();
/*리틀원 웹 앱 어플리케이션 구동 가능한 브라우저별 버전*/

var LauchableVersion = {
  ie: 10,
  firefox: '',
  opera: '',
  mozilla: '',
  chrome: '',
  safari: ''
}; //화면 사이즈 저장

window.addEventListener('resize', function () {
  store.dispatch({
    type: 'SET_WINDOW_WIDTH_REQUEST'
  });
}); //cookie값에 따라 언어 분기

/*익스 10보다 버전이 낮으면 대체 페이지로*/

if (ieVersion < LauchableVersion.ie) {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_pages_ie_Ie10__WEBPACK_IMPORTED_MODULE_13__["default"], null), root);
} else {
  react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_5__["Provider"], {
    store: store
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_helmet_async__WEBPACK_IMPORTED_MODULE_2__["HelmetProvider"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["BrowserRouter"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Switch"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: "/",
    component: _pages_index__WEBPACK_IMPORTED_MODULE_10__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    path: "/login",
    component: _pages_login_Login__WEBPACK_IMPORTED_MODULE_11__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    path: "/404error",
    component: _pages_error_ErrorPage__WEBPACK_IMPORTED_MODULE_12__["default"],
    notFound: true
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/device/smartbottle',
    component: _pages_product_bottle__WEBPACK_IMPORTED_MODULE_14__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/device/smartpeepee',
    component: _pages_product_peepee__WEBPACK_IMPORTED_MODULE_15__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/device/smarttemp',
    component: _pages_product_temp__WEBPACK_IMPORTED_MODULE_16__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/mypage/setting',
    component: _pages_setting_SettingLayout__WEBPACK_IMPORTED_MODULE_17__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/privacypolicy',
    component: _pages_privacypolicy_PrivacypolicyLayout__WEBPACK_IMPORTED_MODULE_18__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/termsofuse',
    component: _pages_termsofuse_TermsOfUseLayout__WEBPACK_IMPORTED_MODULE_19__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/mypage/address',
    component: _pages_address_AddressLayout__WEBPACK_IMPORTED_MODULE_20__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/signup',
    component: _pages_signup_SignupLayout__WEBPACK_IMPORTED_MODULE_21__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/findid',
    component: _pages_find_FindClientIdLayout__WEBPACK_IMPORTED_MODULE_22__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Route"], {
    exact: true,
    path: '/findpassword',
    component: _pages_find_FindClientPasswordLayout__WEBPACK_IMPORTED_MODULE_23__["default"]
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__["Redirect"], {
    from: "*",
    to: "/404error"
  }))))), root);
}

/***/ })

})
//# sourceMappingURL=app.51d795e3b45017ec55dc.hot-update.js.map