webpackHotUpdate("app",{

/***/ "./src/pages/signup/SignupLayout.js":
/*!******************************************!*\
  !*** ./src/pages/signup/SignupLayout.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SignupLayout.scss */ "./src/pages/signup/SignupLayout.scss");
/* harmony import */ var _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _component_head_head__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../component/head/head */ "./src/component/head/head.js");
/* harmony import */ var _component_header_Header__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../component/header/Header */ "./src/component/header/Header.js");
/* harmony import */ var _component_footer_Footer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../component/footer/Footer */ "./src/component/footer/Footer.js");
/* harmony import */ var _component_socailSignButton_SocialSignButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/socailSignButton/SocialSignButton */ "./src/component/socailSignButton/SocialSignButton.js");
/* harmony import */ var _component_input_InputEmailComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/input/InputEmailComponent */ "./src/component/input/InputEmailComponent.js");
/* harmony import */ var _component_input_InputPasswordComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/input/InputPasswordComponent */ "./src/component/input/InputPasswordComponent.js");
/* harmony import */ var _component_input_InputNicknameComponent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../component/input/InputNicknameComponent */ "./src/component/input/InputNicknameComponent.js");
/* harmony import */ var _component_input_InputNameComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../component/input/InputNameComponent */ "./src/component/input/InputNameComponent.js");
/* harmony import */ var _component_input_InputBirthdateComponent__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../component/input/InputBirthdateComponent */ "./src/component/input/InputBirthdateComponent.js");
/* harmony import */ var _component_input_InputGenderComponent__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../component/input/InputGenderComponent */ "./src/component/input/InputGenderComponent.js");
/* harmony import */ var _component_input_InputTermsagreeComponent__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../component/input/InputTermsagreeComponent */ "./src/component/input/InputTermsagreeComponent.js");
/* harmony import */ var _component_firebase_PhoneAuthComponent__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../component/firebase/PhoneAuthComponent */ "./src/component/firebase/PhoneAuthComponent.js");
/* harmony import */ var _component_screenblock_ScreenBlockComponent__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../component/screenblock/ScreenBlockComponent */ "./src/component/screenblock/ScreenBlockComponent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }


















var cx = classnames__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a);

var SignupLayout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SignupLayout, _React$Component);

  function SignupLayout(props) {
    _classCallCheck(this, SignupLayout);

    return _possibleConstructorReturn(this, _getPrototypeOf(SignupLayout).call(this, props));
  }

  _createClass(SignupLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.scrollTo(0, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          language = _this$props.language,
          phoneError = _this$props.phoneError,
          phoneAuth = _this$props.phoneAuth,
          phoneLoading = _this$props.phoneLoading,
          openPhoneAuth = _this$props.openPhoneAuth;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_head_head__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: '리틀원 - 회원가입',
        description: '리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.',
        language: language
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: 'firebase-container',
        style: phoneAuth ? {
          'visibility': 'visible',
          'opacity': '1'
        } : {
          'visibility': 'hidden',
          'opacity': '0'
        }
      }), phoneAuth ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_screenblock_ScreenBlockComponent__WEBPACK_IMPORTED_MODULE_16__["default"], {
        action: openPhoneAuth
      }) : null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_header_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
        className: _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--logo']
      }, "\uB9AC\uD2C0\uC6D0\uC758 \uD68C\uC6D0\uAC00\uC785 \uC139\uC158\uC758 \uB85C\uACE0\uC785\uB2C8\uB2E4."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--bar']
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--desc']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "\uD68C\uC6D0\uAC00\uC785"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "\uAC04\uB2E8\uD55C \uAC00\uC785\uC73C\uB85C \uB9AC\uD2C0\uC6D0\uC758 \uC11C\uBE44\uC2A4\uB97C \uC774\uC6A9\uD558\uC2E4 \uC218 \uC788\uC2B5\uB2C8\uB2E4.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
        className: _SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--form'],
        id: "client-join-section--form",
        role: "form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("fieldset", {
        form: "client-join-section--form"
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "\uB9AC\uD2C0\uC6D0\uC758 \uD68C\uC6D0\uAC00\uC785 \uD3FC\uC785\uB2C8\uB2E4."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputEmailComponent__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputPasswordComponent__WEBPACK_IMPORTED_MODULE_9__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputTermsagreeComponent__WEBPACK_IMPORTED_MODULE_14__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        role: "button",
        className: "__join-member-button __submit-default-button"
      }, "\uD68C\uC6D0\uAC00\uC785")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_footer_Footer__WEBPACK_IMPORTED_MODULE_6__["default"], null));
    }
  }]);

  return SignupLayout;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    language: state.languageReducer.language,
    phoneLoading: state.phoneAuthReducer.loading,
    phoneError: state.phoneAuthReducer.error,
    phoneAuth: state.phoneAuthReducer.auth
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    openPhoneAuth: function openPhoneAuth() {
      return dispatch({
        type: 'SET_PHONE_AUTH_REQUEST'
      });
    },
    setEmail: function setEmail(email) {
      return dispatch({
        type: 'SET_SIGN_UP_EMAIL_REQUEST',
        email: email
      });
    },
    setPassword: function setPassword(email) {
      return dispatch({
        type: 'SET_SIGN_UP_PASSWORD_REQUEST',
        email: email
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(SignupLayout));

/***/ })

})
//# sourceMappingURL=app.27c4f3c8bd1820f2cc88.hot-update.js.map