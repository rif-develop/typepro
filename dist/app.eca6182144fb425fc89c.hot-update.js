webpackHotUpdate("app",{

/***/ "./src/sagas/clientSingUpAction.js":
/*!*****************************************!*\
  !*** ./src/sagas/clientSingUpAction.js ***!
  \*****************************************/
/*! exports provided: wathcerSignupEmail, wathcerSignupPassword, wathcerSignupTerms, watcherSignSubmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupEmail", function() { return wathcerSignupEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupPassword", function() { return wathcerSignupPassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupTerms", function() { return wathcerSignupTerms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "watcherSignSubmit", function() { return watcherSignSubmit; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../index */ "./src/index.js");
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
regeneratorRuntime.mark(watcherSignSubmit),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpEmail),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpPassword),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpTerms),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpSubmit);




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
function watcherSignSubmit() {
  return regeneratorRuntime.wrap(function watcherSignSubmit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["takeEvery"])('SET_SIGN_UP_COMPLETE_REQUEST', signUpSubmit);

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

function signUpEmail(action) {
  var email;
  return regeneratorRuntime.wrap(function signUpEmail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          email = action.email;
          _context5.prev = 1;
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_EMAIL_SUCCESS",
            email: email
          });

        case 4:
          _context5.next = 10;
          break;

        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_EMAIL_FAILURE',
            error: _context5.t0
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[1, 6]]);
}

function signUpPassword(action) {
  var password;
  return regeneratorRuntime.wrap(function signUpPassword$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          password = action.password;
          _context6.prev = 1;
          _context6.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_PASSWORD_SUCCESS",
            password: password
          });

        case 4:
          _context6.next = 10;
          break;

        case 6:
          _context6.prev = 6;
          _context6.t0 = _context6["catch"](1);
          _context6.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_PASSWORD_FAILURE',
            error: _context6.t0
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this, [[1, 6]]);
}

function signUpTerms() {
  return regeneratorRuntime.wrap(function signUpTerms$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_TERMS_SUCCESS"
          });

        case 3:
          _context7.next = 9;
          break;

        case 5:
          _context7.prev = 5;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_TERMS_FAILURE',
            error: _context7.t0
          });

        case 9:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, this, [[0, 5]]);
}
/*회원가입*/


function axiosSaga() {
  _index__WEBPACK_IMPORTED_MODULE_2__["store"].getState();
  return axios__WEBPACK_IMPORTED_MODULE_1___default()({
    method: 'post',
    url: '/request/signup',
    data: {
      email: 'opereun@naver.com',
      password: '123a123a!',
      terms: true
    }
  }).catch(function (error) {
    console.log(error);
  });
}

function signUpSubmit() {
  var response, success;
  return regeneratorRuntime.wrap(function signUpSubmit$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["call"])(axiosSaga);

        case 3:
          response = _context8.sent;
          success = response.data;
          _context8.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_COMPLETE_SUCCESS',
            success: success
          });

        case 7:
          _context8.next = 13;
          break;

        case 9:
          _context8.prev = 9;
          _context8.t0 = _context8["catch"](0);
          _context8.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_COMPLETE_FAILURE',
            e: _context8.t0
          });

        case 13:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, this, [[0, 9]]);
}

/***/ })

})
//# sourceMappingURL=app.eca6182144fb425fc89c.hot-update.js.map