webpackHotUpdate("app",{

/***/ "./src/reducers/autoLoginReducer.js":
/*!******************************************!*\
  !*** ./src/reducers/autoLoginReducer.js ***!
  \******************************************/
/*! exports provided: autologinReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autologinReducer", function() { return autologinReducer; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AUTO_LOGIN_REQUEST = 'AUTO_LOGIN_REQUEST';
var AUTO_LOGIN_SUCCESS = 'AUTO_LOGIN_SUCCESS';
var AUTO_LOGIN_FAILURE = 'AUTO_LOGIN_FAILURE';
var initialState = {
  fetching: false,
  autoLogin: false,
  error: null
};
function autologinReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case AUTO_LOGIN_REQUEST:
      return _objectSpread({}, state, {
        fetching: true,
        error: null
      });

    case AUTO_LOGIN_SUCCESS:
      return _objectSpread({}, state, {
        fetching: false,
        autoLogin: !state.autoLogin,
        error: null
      });

    case AUTO_LOGIN_FAILURE:
      return _objectSpread({}, state, {
        fetching: false,
        autoLogin: false,
        error: action.error
      });

    default:
      return state;
  }
}

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _languageReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languageReducer */ "./src/reducers/languageReducer.js");
/* harmony import */ var _headerReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./headerReducer */ "./src/reducers/headerReducer.js");
/* harmony import */ var _clientStatusReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./clientStatusReducer */ "./src/reducers/clientStatusReducer.js");
/* harmony import */ var _settingReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settingReducer */ "./src/reducers/settingReducer.js");
/* harmony import */ var _addressReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addressReducer */ "./src/reducers/addressReducer.js");
/* harmony import */ var _phoneAuthReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./phoneAuthReducer */ "./src/reducers/phoneAuthReducer.js");
/* harmony import */ var _clientSignupReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./clientSignupReducer */ "./src/reducers/clientSignupReducer.js");
/* harmony import */ var _autoLoginReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./autoLoginReducer */ "./src/reducers/autoLoginReducer.js");









/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  clientStatusReducer: _clientStatusReducer__WEBPACK_IMPORTED_MODULE_3__["clientStatusReducer"],
  languageReducer: _languageReducer__WEBPACK_IMPORTED_MODULE_1__["languageReducer"],
  headerReducer: _headerReducer__WEBPACK_IMPORTED_MODULE_2__["headerReducer"],
  settingReducer: _settingReducer__WEBPACK_IMPORTED_MODULE_4__["settingReducer"],
  addressReducer: _addressReducer__WEBPACK_IMPORTED_MODULE_5__["addressReducer"],
  phoneAuthReducer: _phoneAuthReducer__WEBPACK_IMPORTED_MODULE_6__["phoneAuthReducer"],
  clientSignUpReducer: _clientSignupReducer__WEBPACK_IMPORTED_MODULE_7__["clientSignUpReducer"],
  autologinReducer: _autoLoginReducer__WEBPACK_IMPORTED_MODULE_8__["autologinReducer"]
}));

/***/ })

})
//# sourceMappingURL=app.f0c09322309c2de725ed.hot-update.js.map