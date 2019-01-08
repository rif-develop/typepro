webpackHotUpdate("app",{

/***/ "./src/component/input/InputTermsagreeComponent.js":
/*!*********************************************************!*\
  !*** ./src/component/input/InputTermsagreeComponent.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/es/index.js");
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/signup/SignupLayout.scss */ "./src/pages/signup/SignupLayout.scss");
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/script */ "./src/lib/script.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }







var cx = classnames__WEBPACK_IMPORTED_MODULE_3___default.a.bind(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a);

var InputTermsagreeComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputTermsagreeComponent, _React$Component);

  function InputTermsagreeComponent(props) {
    var _this;

    _classCallCheck(this, InputTermsagreeComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputTermsagreeComponent).call(this, props));
    _this.check = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.onChangeHandler = _this.onChangeHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(InputTermsagreeComponent, [{
    key: "onChangeHandler",
    value: function onChangeHandler(e) {
      Object(_lib_script__WEBPACK_IMPORTED_MODULE_4__["checkAnimation"])(this.check.current);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          terms = _this$props.terms,
          setTerms = _this$props.setTerms;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['client-join-section--form--terms-box']
      }, terms, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:void(0)",
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['__check-terms-agree-button'],
        role: "button",
        "aria-labelledby": "term-check-input-component",
        onClick: setTerms
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 15 12",
        className: cx(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['__check-animation'], terms ? _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['active'] : null),
        ref: this.check
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        fill: "none",
        stroke: "#19ebdd",
        strokeWidth: "3",
        strokeMiterlimit: "10",
        d: "M1.1,5.6"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: "term-check-input-component",
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['__terms-and-agree']
      }, "\uB9AC\uD2C0\uC6D0\uC758", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/privacypolicy",
        role: "link",
        target: "_blank"
      }, " \uAC1C\uC778\uC815\uBCF4\uBCF4\uD638\uC815\uCC45 "), "\uBC0F", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: "/termsofuse",
        role: "link",
        target: "_blank"
      }, " \uBAA8\uB4E0 \uC57D\uAD00"), "\uC5D0 \uB3D9\uC758\uD569\uB2C8\uB2E4.", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "terms",
        id: "term-check-input-component",
        role: "checkbox",
        required: "required",
        defaultChecked: terms,
        onChange: this.onChangeHandler
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['client-join-section--form--warning']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null)));
    }
  }]);

  return InputTermsagreeComponent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  console.log(state.clientSignUpReducer.form);
  return {
    terms: state.clientSignUpReducer.form.terms
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setTerms: function setTerms() {
      return dispatch({
        type: 'SET_SIGN_UP_TERMS_REQUEST'
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(InputTermsagreeComponent));

/***/ })

})
//# sourceMappingURL=app.e9f5ab42b057d1a0a116.hot-update.js.map