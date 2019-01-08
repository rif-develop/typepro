webpackHotUpdate("app",{

/***/ "./src/sagas/clientSingUpAction.js":
/*!*****************************************!*\
  !*** ./src/sagas/clientSingUpAction.js ***!
  \*****************************************/
/*! exports provided: wathcerSignupEmail, wathcerSignupPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupEmail", function() { return wathcerSignupEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wathcerSignupPassword", function() { return wathcerSignupPassword; });
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux-saga/effects */ "./node_modules/redux-saga/es/effects.js");
var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerSignupEmail),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(wathcerSignupPassword),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpEmail),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(signUpPassword);


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

function signUpEmail(action) {
  var email;
  return regeneratorRuntime.wrap(function signUpEmail$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          console.log(action);
          email = action.email;
          _context3.prev = 2;
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_EMAIL_SUCCESS",
            email: email
          });

        case 5:
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](2);
          _context3.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: 'SET_SIGN_UP_EMAIL_FAILURE',
            e: _context3.t0
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[2, 7]]);
}

function signUpPassword(action) {
  var email;
  return regeneratorRuntime.wrap(function signUpPassword$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          email = action.password;
          _context4.prev = 1;
          _context4.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_0__["put"])({
            type: "SET_SIGN_UP_PASSWORD_SUCCESS",
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
            type: 'SET_SIGN_UP_PASSWORD_FAILURE',
            e: _context4.t0
          });

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[1, 6]]);
}

/***/ })

})
//# sourceMappingURL=app.b2a755a4b44628acd25a.hot-update.js.map