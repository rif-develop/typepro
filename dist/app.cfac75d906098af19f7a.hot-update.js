webpackHotUpdate("app",{

/***/ "./src/sagas/addressAction.js":
/*!************************************!*\
  !*** ./src/sagas/addressAction.js ***!
  \************************************/
/*! exports provided: watcherAddress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherAddress", function() { return watcherAddress; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherAddress),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(checkValue);


function watcherAddress() {
  return regeneratorRuntime.wrap(function watcherAddress$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_ADDRESS_REQUEST', checkValue);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function checkValue(data) {
  var value;
  return regeneratorRuntime.wrap(function checkValue$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          value = data.value;
          _context2.prev = 1;

          if (!('add' === value)) {
            _context2.next = 7;
            break;
          }

          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_ADDRESS_REGISTER',
            value: value
          });

        case 5:
          _context2.next = 10;
          break;

        case 7:
          if (!('edit' === value)) {
            _context2.next = 10;
            break;
          }

          _context2.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_ADDRESS_MODIFY',
            value: value
          });

        case 10:
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_ADDRESS_FAILURE',
            error: _context2.t0
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 12]]);
}

/***/ }),

/***/ "./src/sagas/autoLoginSaga.js":
/*!************************************!*\
  !*** ./src/sagas/autoLoginSaga.js ***!
  \************************************/
/*! exports provided: watcherAutoLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherAutoLogin", function() { return watcherAutoLogin; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherAutoLogin),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(checkAutoLogin);


function watcherAutoLogin() {
  return regeneratorRuntime.wrap(function watcherAutoLogin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])('AUTO_LOGIN_REQUEST', checkAutoLogin);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function checkAutoLogin() {
  return regeneratorRuntime.wrap(function checkAutoLogin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "AUTO_LOGIN_SUCCESS"
          });

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'AUTO_LOGIN_FAILURE',
            e: _context2.t0
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 5]]);
}

/***/ }),

/***/ "./src/sagas/axiosSaga.js":
/*!********************************!*\
  !*** ./src/sagas/axiosSaga.js ***!
  \********************************/
/*! exports provided: watcherSaga */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherSaga", function() { return watcherSaga; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherSaga),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(workerSaga);


 // watcher saga: watches for actions dispatched to the store, starts worker saga

function watcherSaga() {
  return regeneratorRuntime.wrap(function watcherSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])("API_CALL_REQUEST", workerSaga);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
} // function that makes the api request and returns a Promise for response

function fetchDog() {
  return axios__WEBPACK_IMPORTED_MODULE_1___default()({
    method: "get",
    url: "https://dog.ceo/api/breeds/image/random"
  });
} // worker saga: makes the api call when watcher saga sees the action


function workerSaga() {
  var response, dog;
  return regeneratorRuntime.wrap(function workerSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(fetchDog);

        case 3:
          response = _context2.sent;
          dog = response.data.message; // dispatch a success action to the store with the new dog

          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "API_CALL_SUCCESS",
            dog: dog
          });

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "API_CALL_FAILURE",
            error: _context2.t0
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 9]]);
}

/***/ }),

/***/ "./src/sagas/clientSingUpAction.js":
/*!*****************************************!*\
  !*** ./src/sagas/clientSingUpAction.js ***!
  \*****************************************/
/*! exports provided: wathcerSignupEmail, wathcerSignupPassword, wathcerSignupTerms */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupEmail", function() { return wathcerSignupEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupPassword", function() { return wathcerSignupPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupTerms", function() { return wathcerSignupTerms; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerSignupEmail),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerSignupPassword),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerSignupTerms),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpEmail),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpPassword),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpTerms);


function wathcerSignupEmail() {
  return regeneratorRuntime.wrap(function wathcerSignupEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_SIGN_UP_EMAIL_REQUEST', signUpEmail);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
function wathcerSignupPassword() {
  return regeneratorRuntime.wrap(function wathcerSignupPassword$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_SIGN_UP_PASSWORD_REQUEST', signUpPassword);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
function wathcerSignupTerms() {
  return regeneratorRuntime.wrap(function wathcerSignupTerms$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_SIGN_UP_TERMS_REQUEST', signUpTerms);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function signUpEmail(action) {
  var email;
  return regeneratorRuntime.wrap(function signUpEmail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = action.email;
          _context4.prev = 1;
          _context4.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_EMAIL_SUCCESS",
            email: email
          });

        case 4:
          _context4.next = 10;
          break;

        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](1);
          _context4.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_EMAIL_FAILURE',
            error: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[1, 6]]);
}

function signUpPassword(action) {
  var password;
  return regeneratorRuntime.wrap(function signUpPassword$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          password = action.password;
          _context5.prev = 1;
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_PASSWORD_SUCCESS",
            password: password
          });

        case 4:
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_PASSWORD_FAILURE',
            error: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[1, 6]]);
}

function signUpTerms() {
  return regeneratorRuntime.wrap(function signUpTerms$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_TERMS_SUCCESS"
          });

        case 3:
          _context6.next = 9;
          break;

        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_TERMS_FAILURE',
            error: _context6.t0
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this, [[0, 5]]);
}

/***/ }),

/***/ "./src/sagas/clientStatusAction.js":
/*!*****************************************!*\
  !*** ./src/sagas/clientStatusAction.js ***!
  \*****************************************/
/*! exports provided: wathcerWindowWidth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerWindowWidth", function() { return wathcerWindowWidth; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerWindowWidth),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(setWidthSaga);


function wathcerWindowWidth() {
  return regeneratorRuntime.wrap(function wathcerWindowWidth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_WINDOW_WIDTH_REQUEST', setWidthSaga);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function setWidthSaga() {
  var width;
  return regeneratorRuntime.wrap(function setWidthSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          width = window.innerWidth && document.documentElement.clientWidth ? Math.min(window.innerWidth, document.documentElement.clientWidth) : window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
          _context2.prev = 1;
          _context2.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_WINDOW_WIDTH_SUCCESS",
            width: width
          });

        case 4:
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_WINDOW_WIDTH_FAILURE',
            e: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 6]]);
}

/***/ }),

/***/ "./src/sagas/counterSaga.js":
/*!**********************************!*\
  !*** ./src/sagas/counterSaga.js ***!
  \**********************************/
/*! exports provided: watcherCounter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherCounter", function() { return watcherCounter; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherCounter),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(incrementSaga);


function watcherCounter() {
  return regeneratorRuntime.wrap(function watcherCounter$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])('INCREMENT_REQUEST', incrementSaga);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function incrementSaga() {
  var count,
      _args2 = arguments;
  return regeneratorRuntime.wrap(function incrementSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          count = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : 1;
          _context2.prev = 1;
          _context2.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "INCREMENT_SUCCESS"
          });

        case 4:
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'INCREMENT_FAILURE',
            e: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 6]]);
}

/***/ }),

/***/ "./src/sagas/headerSaga.js":
/*!*********************************!*\
  !*** ./src/sagas/headerSaga.js ***!
  \*********************************/
/*! exports provided: wathcerAlarmHeader, wathcerClientInfoHeader, watcherMobileMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerAlarmHeader", function() { return wathcerAlarmHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerClientInfoHeader", function() { return wathcerClientInfoHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherMobileMenu", function() { return watcherMobileMenu; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerAlarmHeader),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerClientInfoHeader),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(watcherMobileMenu),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(alarmActiveSaga),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(clientInfoActiveSaga),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(mobileMenuSaga);


function wathcerAlarmHeader() {
  return regeneratorRuntime.wrap(function wathcerAlarmHeader$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('HEADER_ALARM_ACTIVE_REQUEST', alarmActiveSaga);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}
function wathcerClientInfoHeader() {
  return regeneratorRuntime.wrap(function wathcerClientInfoHeader$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('HEADER_CLIENT_ACTIVE_REQUEST', clientInfoActiveSaga);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}
function watcherMobileMenu() {
  return regeneratorRuntime.wrap(function watcherMobileMenu$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('HEADER_MOBILE_MENU_REQUEST', mobileMenuSaga);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

function alarmActiveSaga() {
  return regeneratorRuntime.wrap(function alarmActiveSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "HEADER_ALARM_ACTIVE_SUCCESS"
          });

        case 3:
          _context4.next = 9;
          break;

        case 5:
          _context4.prev = 5;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'HEADER_ALARM_ACTIVE_FAILURE',
            e: _context4.t0
          });

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 5]]);
}

function clientInfoActiveSaga() {
  return regeneratorRuntime.wrap(function clientInfoActiveSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "HEADER_CLIENT_ACTIVE_SUCCESS"
          });

        case 3:
          _context5.next = 9;
          break;

        case 5:
          _context5.prev = 5;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "HEADER_CLIENT_ACTIVE_FAILURE",
            e: _context5.t0
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[0, 5]]);
}

function mobileMenuSaga() {
  return regeneratorRuntime.wrap(function mobileMenuSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'HEADER_MOBILE_MENU_SUCCESS'
          });

        case 3:
          _context6.next = 9;
          break;

        case 5:
          _context6.prev = 5;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'HEADER_MOBILE_MENU_FAILURE',
            e: _context6.t0
          });

        case 9:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this, [[0, 5]]);
}

/***/ }),

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
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["all"])([Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_counterSaga__WEBPACK_IMPORTED_MODULE_1__["watcherCounter"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_languageAction__WEBPACK_IMPORTED_MODULE_2__["watcherLanguage"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_axiosSaga__WEBPACK_IMPORTED_MODULE_3__["watcherSaga"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_autoLoginSaga__WEBPACK_IMPORTED_MODULE_4__["watcherAutoLogin"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["wathcerAlarmHeader"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["wathcerClientInfoHeader"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_headerSaga__WEBPACK_IMPORTED_MODULE_5__["watcherMobileMenu"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientStatusAction__WEBPACK_IMPORTED_MODULE_6__["wathcerWindowWidth"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_settingAction__WEBPACK_IMPORTED_MODULE_7__["watcherSetting"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_addressAction__WEBPACK_IMPORTED_MODULE_8__["watcherAddress"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_phoneAuthAction__WEBPACK_IMPORTED_MODULE_9__["wathcerPhoneAuth"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupEmail"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupPassword"]), Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["fork"])(_clientSingUpAction__WEBPACK_IMPORTED_MODULE_10__["wathcerSignupTerms"])]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

/***/ }),

/***/ "./src/sagas/languageAction.js":
/*!*************************************!*\
  !*** ./src/sagas/languageAction.js ***!
  \*************************************/
/*! exports provided: watcherLanguage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherLanguage", function() { return watcherLanguage; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherLanguage),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(setLanguage);


function watcherLanguage() {
  return regeneratorRuntime.wrap(function watcherLanguage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_LANGUAGE_REQUEST', setLanguage);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function setLanguage(data) {
  var language;
  return regeneratorRuntime.wrap(function setLanguage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          language = data.lang || 'en';
          _context2.prev = 1;
          _context2.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_LANGUAGE_SUCCESS',
            language: language
          });

        case 4:
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2["catch"](1);
          _context2.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_LANGUAGE_FAILURE',
            error: _context2.t0
          });

        case 10:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[1, 6]]);
}

/***/ }),

/***/ "./src/sagas/phoneAuthAction.js":
/*!**************************************!*\
  !*** ./src/sagas/phoneAuthAction.js ***!
  \**************************************/
/*! exports provided: wathcerPhoneAuth */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerPhoneAuth", function() { return wathcerPhoneAuth; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerPhoneAuth),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(phoneHandler);


function wathcerPhoneAuth() {
  return regeneratorRuntime.wrap(function wathcerPhoneAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_PHONE_AUTH_REQUEST', phoneHandler);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function phoneHandler() {
  return regeneratorRuntime.wrap(function phoneHandler$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_PHONE_AUTH_SUCCESS'
          });

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_PHONE_AUTH_FAILURE',
            e: _context2.t0
          });

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 5]]);
}

/***/ }),

/***/ "./src/sagas/settingAction.js":
/*!************************************!*\
  !*** ./src/sagas/settingAction.js ***!
  \************************************/
/*! exports provided: watcherSetting */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherSetting", function() { return watcherSetting; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(watcherSetting),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(setSettingMenu);


function watcherSetting() {
  return regeneratorRuntime.wrap(function watcherSetting$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeLatest"])('SET_MENU_REQUEST', setSettingMenu);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

function setSettingMenu(data) {
  var menu;
  return regeneratorRuntime.wrap(function setSettingMenu$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          menu = data['data'];
          console.log(menu);
          _context2.prev = 2;
          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_MENU_SUCCESS',
            menu: menu
          });

        case 5:
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](2);
          _context2.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_MENU_FAILURE',
            e: _context2.t0
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[2, 7]]);
}

/***/ })

})
//# sourceMappingURL=app.cfac75d906098af19f7a.hot-update.js.map