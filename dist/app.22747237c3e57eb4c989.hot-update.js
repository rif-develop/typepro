webpackHotUpdate("app",{

/***/ "./src/sagas/index.js":
/*!****************************!*\
  !*** ./src/sagas/index.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rootSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
/* harmony import */ var _counterSaga__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./counterSaga */ "./src/sagas/counterSaga.js");
/* harmony import */ var _languageAction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languageAction */ "./src/sagas/languageAction.js");
/* harmony import */ var _axiosSaga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./axiosSaga */ "./src/sagas/axiosSaga.js");
/* harmony import */ var _autoLoginSaga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autoLoginSaga */ "./src/sagas/autoLoginSaga.js");
/* harmony import */ var _headerSaga__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./headerSaga */ "./src/sagas/headerSaga.js");
/* harmony import */ var _clientStatusAction__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clientStatusAction */ "./src/sagas/clientStatusAction.js");
/* harmony import */ var _settingAction__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settingAction */ "./src/sagas/settingAction.js");
/* harmony import */ var _addressAction__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addressAction */ "./src/sagas/addressAction.js");
/* harmony import */ var _phoneAuthAction__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./phoneAuthAction */ "./src/sagas/phoneAuthAction.js");
/* harmony import */ var _clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./clientSingUpAction */ "./src/sagas/clientSingUpAction.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(rootSaga);












function rootSaga() {
  return regeneratorRuntime.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_counterSaga__WEBPACK_IMPORTED_MODULE_1__["watcherCounter"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_languageAction__WEBPACK_IMPORTED_MODULE_2__["watcherLanguage"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_axiosSaga__WEBPACK_IMPORTED_MODULE_3__["watcherSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_autoLoginSaga__WEBPACK_IMPORTED_MODULE_4__["watcherAutoLogin"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["wathcerAlarmHeader"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["wathcerClientInfoHeader"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["watcherMobileMenu"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientStatusAction__WEBPACK_IMPORTED_MODULE_6__["wathcerWindowWidth"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_settingAction__WEBPACK_IMPORTED_MODULE_7__["watcherSetting"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_addressAction__WEBPACK_IMPORTED_MODULE_8__["watcherAddress"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_phoneAuthAction__WEBPACK_IMPORTED_MODULE_9__["wathcerPhoneAuth"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupEmail"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupPassword"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupTerms"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["watcherSignSubmit"])]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ })

})
//# sourceMappingURL=app.22747237c3e57eb4c989.hot-update.js.map