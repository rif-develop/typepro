webpackHotUpdate("app",{

/***/ "./src/component/input/InputPasswordComponent.js":
/*!*******************************************************!*\
  !*** ./src/component/input/InputPasswordComponent.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../pages/signup/SignupLayout.scss */ "./src/pages/signup/SignupLayout.scss");
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_validation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/validation */ "./src/lib/validation.js");
/* harmony import */ var _lib_script__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/script */ "./src/lib/script.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var cx = classnames__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a);



var InputPasswordComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputPasswordComponent, _React$Component);

  function InputPasswordComponent(props) {
    var _this;

    _classCallCheck(this, InputPasswordComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputPasswordComponent).call(this, props));
    _this.state = {
      error: false,
      checkAni: false,
      removeBtn: false
    };
    _this.inputComponent = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.check = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.removeBtn = react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    _this.onBlurHandler = _this.onBlurHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onKeyHandler = _this.onKeyHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onRemoveHandler = _this.onRemoveHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onFocusHandler = _this.onFocusHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(InputPasswordComponent, [{
    key: "onBlurHandler",
    value: function onBlurHandler() {
      var val = this.inputComponent.current.value;
      var result = _lib_validation__WEBPACK_IMPORTED_MODULE_3__["Validations"].checkPassword(val);

      if (val.length === 0) {
        this.setState({
          error: false,
          checkAni: false,
          removeBtn: false
        });
        return;
      }

      if (result) {
        this.setState({
          error: false,
          checkAni: true
        });
        Object(_lib_script__WEBPACK_IMPORTED_MODULE_4__["checkAnimation"])(this.check.current);
      } else {
        this.setState({
          error: true,
          checkAni: false
        });
        this.inputComponent.current.value = null;
        this.inputComponent.current.focus();
      }
    }
  }, {
    key: "onKeyHandler",
    value: function onKeyHandler(e) {
      var val = this.inputComponent.current.value;
      var isLen = val.length > 0;
      isLen ? this.setState({
        removeBtn: true,
        error: false
      }) : this.setState({
        removeBtn: false
      });
    }
  }, {
    key: "onRemoveHandler",
    value: function onRemoveHandler(ref) {
      ref.value = null;
      this.setState({
        error: false,
        removeBtn: false,
        checkAni: false
      });
      ref.focus();
    }
  }, {
    key: "onFocusHandler",
    value: function onFocusHandler() {
      this.setState({
        checkAni: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--form--box']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        htmlFor: InputPasswordComponent.defaultState.id,
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['password-icon'],
        title: InputPasswordComponent.defaultState.title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: InputPasswordComponent.defaultState.type,
        name: InputPasswordComponent.defaultState.name,
        id: InputPasswordComponent.defaultState.id,
        required: InputPasswordComponent.defaultState.required,
        placeholder: InputPasswordComponent.defaultState.placeholder,
        "aria-placeholder": InputPasswordComponent.defaultState.placeholder,
        autoCapitalize: InputPasswordComponent.defaultState.autoCapitalize,
        autoComplete: InputPasswordComponent.defaultState.autoComplete,
        maxLength: InputPasswordComponent.defaultState.maxLength,
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['__default-input-component'],
        ref: this.inputComponent,
        onBlur: this.onBlurHandler,
        onKeyDown: this.onKeyHandler,
        onKeyUp: this.onKeyHandler,
        onFocus: this.onFocusHandler
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: cx(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['__remove-input-button'], this.state.removeBtn ? _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['active'] : null),
        ref: this.removeBtn,
        onClick: function onClick() {
          _this2.onRemoveHandler(_this2.inputComponent.current);
        },
        onMouseEnter: function onMouseEnter() {
          _this2.removeBtn.current.style.zIndex = '1';
        },
        onMouseLeave: function onMouseLeave() {
          _this2.removeBtn.current.style.zIndex = '0';
        }
      }, InputPasswordComponent.defaultState.removeBtn), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 15 12",
        className: cx(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['__check-animation'], this.state.checkAni ? _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['active'] : null),
        ref: this.check
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
        fill: "none",
        stroke: "#19ebdd",
        strokeWidth: "3",
        strokeMiterlimit: "10",
        d: "M1.1,5.6"
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['client-join-section--form--warning']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, this.state.error ? InputPasswordComponent.defaultState.validationError : null)));
    }
  }]);

  return InputPasswordComponent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(InputPasswordComponent, "defaultState", {
  type: 'password',
  name: 'password',
  id: 'password-input-component',
  required: true,
  placeholder: '영문, 숫자, 특수문자의 조합으로 8~20자',
  maxLength: 20,
  removeBtn: '클릭시 현재 작성 중인 태그의 입력값을 지우는 버튼입니다.',
  autoCapitalize: 'off',
  autoComplete: 'off',
  title: '사용자님의 비밀번호를 입력할 수 있습니다.',
  validationError: '알파벳, 숫자, 특수문자로 조합된 8~20자 사이로 입력해주세요.'
});

/* harmony default export */ __webpack_exports__["default"] = (InputPasswordComponent);

/***/ })

})
//# sourceMappingURL=app.fc9920fdcdc9bd8c99fb.hot-update.js.map