webpackHotUpdate("app",{

/***/ "./src/reducers/clientSignupReducer.js":
/*!*********************************************!*\
  !*** ./src/reducers/clientSignupReducer.js ***!
  \*********************************************/
/*! exports provided: clientSignUpReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clientSignUpReducer", function() { return clientSignUpReducer; });
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_SIGN_UP_EMAIL_REQUEST = 'SET_SIGN_UP_EMAIL_REQUEST';
var SET_SIGN_UP_EMAIL_SUCCESS = 'SET_SIGN_UP_EMAIL_SUCCESS';
var SET_SIGN_UP_EMAIL_FAILURE = 'SET_SIGN_UP_EMAIL_FAILURE';
var SET_SIGN_UP_PASSWORD_REQUEST = 'SET_SIGN_UP_PASSWORD_REQUEST';
var SET_SIGN_UP_PASSWORD_SUCCESS = 'SET_SIGN_UP_PASSWORD_SUCCESS';
var SET_SIGN_UP_PASSWORD_FAILURE = 'SET_SIGN_UP_PASSWORD_FAILURE';
var SET_SIGN_UP_INIT = 'SET_SIGN_UP_INIT';
var initialState = {
  loading: false,
  error: null,
  email: null,
  password: null
};
function clientSignUpReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case SET_SIGN_UP_EMAIL_REQUEST:
      return _objectSpread({}, state, {
        loading: true,
        error: null
      });

    case SET_SIGN_UP_EMAIL_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        error: null,
        email: action.email
      });

    case SET_SIGN_UP_EMAIL_FAILURE:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case SET_SIGN_UP_PASSWORD_REQUEST:
      return _objectSpread({}, state, {
        loading: true,
        error: null
      });

    case SET_SIGN_UP_PASSWORD_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        error: null,
        password: action.password
      });

    case SET_SIGN_UP_PASSWORD_FAILURE:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case SET_SIGN_UP_INIT:
      return _objectSpread({}, state, {
        initialState: initialState
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
/* harmony import */ var _counterReducer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./counterReducer */ "./src/reducers/counterReducer.js");
/* harmony import */ var _axiosReducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./axiosReducer */ "./src/reducers/axiosReducer.js");
/* harmony import */ var _autoLoginReducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./autoLoginReducer */ "./src/reducers/autoLoginReducer.js");
/* harmony import */ var _headerReducer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./headerReducer */ "./src/reducers/headerReducer.js");
/* harmony import */ var _clientStatusReducer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./clientStatusReducer */ "./src/reducers/clientStatusReducer.js");
/* harmony import */ var _settingReducer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./settingReducer */ "./src/reducers/settingReducer.js");
/* harmony import */ var _addressReducer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./addressReducer */ "./src/reducers/addressReducer.js");
/* harmony import */ var _phoneAuthReducer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./phoneAuthReducer */ "./src/reducers/phoneAuthReducer.js");
/* harmony import */ var _clientSignupReducer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./clientSignupReducer */ "./src/reducers/clientSignupReducer.js");











/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  clientStatusReducer: _clientStatusReducer__WEBPACK_IMPORTED_MODULE_6__["clientStatusReducer"],
  axiosReducer: _axiosReducer__WEBPACK_IMPORTED_MODULE_3__["axiosReducer"],
  languageReducer: _languageReducer__WEBPACK_IMPORTED_MODULE_1__["languageReducer"],
  counterReducer: _counterReducer__WEBPACK_IMPORTED_MODULE_2__["counterReducer"],
  autologinReducer: _autoLoginReducer__WEBPACK_IMPORTED_MODULE_4__["autologinReducer"],
  headerReducer: _headerReducer__WEBPACK_IMPORTED_MODULE_5__["headerReducer"],
  settingReducer: _settingReducer__WEBPACK_IMPORTED_MODULE_7__["settingReducer"],
  addressReducer: _addressReducer__WEBPACK_IMPORTED_MODULE_8__["addressReducer"],
  phoneAuthReducer: _phoneAuthReducer__WEBPACK_IMPORTED_MODULE_9__["phoneAuthReducer"],
  clientSignUpReducer: _clientSignupReducer__WEBPACK_IMPORTED_MODULE_10__["clientSignUpReducer"]
}));

/***/ })

})
//# sourceMappingURL=app.2cf73c4319b5325424cb.hot-update.js.map