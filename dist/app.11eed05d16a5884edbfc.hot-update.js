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

/*이메일 액션*/
var SET_SIGN_UP_EMAIL_REQUEST = 'SET_SIGN_UP_EMAIL_REQUEST';
var SET_SIGN_UP_EMAIL_SUCCESS = 'SET_SIGN_UP_EMAIL_SUCCESS';
var SET_SIGN_UP_EMAIL_FAILURE = 'SET_SIGN_UP_EMAIL_FAILURE';
/*비밀번호 액션*/

var SET_SIGN_UP_PASSWORD_REQUEST = 'SET_SIGN_UP_PASSWORD_REQUEST';
var SET_SIGN_UP_PASSWORD_SUCCESS = 'SET_SIGN_UP_PASSWORD_SUCCESS';
var SET_SIGN_UP_PASSWORD_FAILURE = 'SET_SIGN_UP_PASSWORD_FAILURE';
/*이용약관 동의 액션*/

var SET_SIGN_UP_TERMS_REQUEST = 'SET_SIGN_UP_TERMS_REQUEST';
var SET_SIGN_UP_TERMS_SUCCESS = 'SET_SIGN_UP_TERMS_SUCCESS';
var SET_SIGN_UP_TERMS_FAILURE = 'SET_SIGN_UP_TERMS_FAILURE';
/*회원가입 처리 액션*/

var SET_SIGN_UP_COMPLETE_REQUEST = 'SET_SIGN_UP_COMPLETE_REQUEST';
var SET_SIGN_UP_COMPLETE_SUCCESS = 'SET_SIGN_UP_COMPLETE_SUCCESS';
var SET_SIGN_UP_COMPLETE_FAILURE = 'SET_SIGN_UP_COMPLETE_FAILURE';
/*초기화*/

var SET_SIGN_UP_INIT = 'SET_SIGN_UP_INIT';
var initialState = {
  loading: false,
  error: null,
  form: {
    email: null,
    password: null,
    terms: false,
    date: new Date()
  },
  result: {
    loading: false,
    error: null,
    success: false
  }
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
        form: {
          email: action.email,
          password: state.form.password,
          terms: state.form.terms,
          date: new Date()
        }
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
        form: {
          email: state.form.email,
          password: action.password,
          terms: state.form.terms,
          date: new Date()
        }
      });

    case SET_SIGN_UP_PASSWORD_FAILURE:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case SET_SIGN_UP_TERMS_REQUEST:
      return _objectSpread({}, state, {
        loading: true,
        error: null
      });

    case SET_SIGN_UP_TERMS_SUCCESS:
      return _objectSpread({}, state, {
        loading: false,
        error: null,
        form: {
          email: state.form.email,
          password: state.form.password,
          terms: !state.form.terms,
          date: new Date()
        }
      });

    case SET_SIGN_UP_TERMS_FAILURE:
      return _objectSpread({}, state, {
        loading: false,
        error: action.error
      });

    case SET_SIGN_UP_COMPLETE_REQUEST:
      return _objectSpread({}, state, {
        result: {
          loading: true,
          error: null
        }
      });

    case SET_SIGN_UP_COMPLETE_SUCCESS:
      return _objectSpread({}, state, {
        result: {
          loading: true,
          error: null
        }
      });

    case SET_SIGN_UP_COMPLETE_FAILURE:
      return _objectSpread({}, state, {
        result: {
          loading: true,
          error: null
        }
      });

    case SET_SIGN_UP_INIT:
      return _objectSpread({}, state, {
        initialState: initialState
      });

    default:
      return state;
  }
}

/***/ })

})
//# sourceMappingURL=app.11eed05d16a5884edbfc.hot-update.js.map