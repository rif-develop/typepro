webpackHotUpdate("app",{

/***/ "./src/store/StoreComponent.js":
/*!*************************************!*\
  !*** ./src/store/StoreComponent.js ***!
  \*************************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga */ "./node_modules/redux-saga/es/index.js");
/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../reducers */ "./src/reducers/index.js");
/* harmony import */ var _sagas__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sagas */ "./src/sagas/index.js");




var sagaMiddleware = Object(redux_saga__WEBPACK_IMPORTED_MODULE_1__["default"])(); //크롬 리덕스 데브툴

var reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(_reducers__WEBPACK_IMPORTED_MODULE_2__["default"], Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(sagaMiddleware), window.navigator.userAgent.includes('Chrome') ? reduxDevTools : redux__WEBPACK_IMPORTED_MODULE_0__["compose"]));
/*미들웨어 구동*/

sagaMiddleware.run(_sagas__WEBPACK_IMPORTED_MODULE_3__["default"]);

/***/ })

})
//# sourceMappingURL=app.68197cf3323797f1e215.hot-update.js.map