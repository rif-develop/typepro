webpackHotUpdate("app",{

/***/ "./src/component/input/InputEmailComponent.js":
/*!****************************************************!*\
  !*** ./src/component/input/InputEmailComponent.js ***!
  \****************************************************/
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



var InputEmailComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputEmailComponent, _React$Component);

  function InputEmailComponent(props) {
    var _this;

    _classCallCheck(this, InputEmailComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputEmailComponent).call(this, props));
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

  _createClass(InputEmailComponent, [{
    key: "onBlurHandler",
    value: function onBlurHandler() {
      var val = this.inputComponent.current.value;
      var result = _lib_validation__WEBPACK_IMPORTED_MODULE_3__["Validations"].checkEmail(val);

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
        /*리덕스에 디스패치*/

        this.props.action(val);
      } else {
        this.setState({
          error: true,
          checkAni: false
        });
        /*밸류를 초기화 한 후에 REDUX를 원래대로 한다.*/

        this.inputComponent.current.value = null;
        this.props.action(this.inputComponent.current.value);
        /*다시 인풋에 포커스*/

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
      this.props.action(this.inputComponent.current.value);
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
        htmlFor: InputEmailComponent.defaultState.id,
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a['email-icon'],
        title: InputEmailComponent.defaultState.title
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: InputEmailComponent.defaultState.type,
        name: InputEmailComponent.defaultState.name,
        id: InputEmailComponent.defaultState.id,
        required: InputEmailComponent.defaultState.required,
        placeholder: InputEmailComponent.defaultState.placeholder,
        "aria-placeholder": InputEmailComponent.defaultState.placeholder,
        autoCapitalize: InputEmailComponent.defaultState.autoCapitalize,
        autoComplete: InputEmailComponent.defaultState.autoComplete,
        maxLength: InputEmailComponent.defaultState.maxLength,
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
      }, InputEmailComponent.defaultState.removeBtn), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, this.state.error ? InputEmailComponent.defaultState.validationError : null)));
    }
  }]);

  return InputEmailComponent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

_defineProperty(InputEmailComponent, "defaultState", {
  type: 'email',
  name: 'email',
  id: 'email-input-component',
  required: true,
  placeholder: '이메일 (id@email.com)',
  maxLength: 42,
  removeBtn: '클릭시 현재 작성 중인 태그의 입력값을 지우는 버튼입니다.',
  autoCapitalize: 'off',
  autoComplete: 'off',
  title: '사용자님의 아이디로 사용 될 이메일을 입력할 수 있습니다.',
  validationError: '잘못된 형식입니다. 이메일 주소를 다시 입력해 주세요.'
});

/* harmony default export */ __webpack_exports__["default"] = (InputEmailComponent);

/***/ }),

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
      } //end if


      if (result) {
        this.setState({
          error: false,
          checkAni: true
        });
        Object(_lib_script__WEBPACK_IMPORTED_MODULE_4__["checkAnimation"])(this.check.current);
        this.props.action(this.inputComponent.current.value);
      } else {
        this.setState({
          error: true,
          checkAni: false
        });
        this.inputComponent.current.value = null;
        this.inputComponent.current.focus();
        /*빈값을 디스패치*/

        this.props.action(this.inputComponent.current.value);
      } //end if~else

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
      /*빈 값을 리덕스로 디스패치*/

      this.props.action(ref.value);
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

/***/ }),

/***/ "./src/component/input/InputSubmitComponent.js":
/*!*****************************************************!*\
  !*** ./src/component/input/InputSubmitComponent.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pages/signup/SignupLayout.scss */ "./src/pages/signup/SignupLayout.scss");
/* harmony import */ var _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }




var cx = classnames__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0___default.a);

var InputSubmitComponent =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InputSubmitComponent, _React$Component);

  function InputSubmitComponent(props) {
    var _this;

    _classCallCheck(this, InputSubmitComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputSubmitComponent).call(this, props));
    _this.onSubmitHandler = _this.onSubmitHandler.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(InputSubmitComponent, [{
    key: "onSubmitHandler",
    value: function onSubmitHandler(e) {
      e.preventDefault();
      this.props.action();
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
        type: "submit",
        role: "button",
        className: cx(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0___default.a['__join-member-button'], _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_0___default.a['__submit-default-button']),
        onClick: this.onSubmitHandler
      }, "\uD68C\uC6D0\uAC00\uC785"));
    }
  }]);

  return InputSubmitComponent;
}(react__WEBPACK_IMPORTED_MODULE_1___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (InputSubmitComponent);

/***/ }),

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
      this.props.action();
      Object(_lib_script__WEBPACK_IMPORTED_MODULE_4__["checkAnimation"])(this.check.current);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['client-join-section--form--terms-box']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: "javascript:void(0)",
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['__check-terms-agree-button'],
        role: "button",
        "aria-labelledby": "term-check-input-component",
        onClick: this.onChangeHandler
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 15 12",
        className: cx(_pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['__check-animation'], this.props.terms ? _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['active'] : null),
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
        defaultChecked: this.props.terms,
        onChange: this.onChangeHandler
      }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: _pages_signup_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_2___default.a['client-join-section--form--warning']
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null)));
    }
  }]);

  return InputTermsagreeComponent;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (InputTermsagreeComponent);

/***/ }),

/***/ "./src/lib/validation.js":
/*!*******************************!*\
  !*** ./src/lib/validation.js ***!
  \*******************************/
/*! exports provided: isEmpty, removeHtmlTag, Validations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeHtmlTag", function() { return removeHtmlTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Validations", function() { return Validations; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// 넘어 온 값이 빈값인지 체크하는 함수입니다.
// !value 하면 생기는 논리적 오류를 제거하기 위해 명시적으로 value === 사용
// [], {} 도 빈값으로 처리, 공백과 space한칸도 빈값으로 처리하였음.
function isEmpty(value) {
  var check = value === "" || value === " " || value === null || value === undefined || value !== null && _typeof(value) === "object" && !Object.keys(value).length;
  return check;
} // isEmpty function

/*input태그의 plcaholder value값 처리 이벤트*/

function placeholderHandler(cssSelector) {
  /*disabled된 input 태그라면 return 시킨다.*/
  var isDisabled = $(cssSelector).is(':disabled');

  if (isDisabled) {
    return false;
  }
  /*PLACEHOLDER의 값을 담을 변수*/


  var placeholderValue;
  /*타겟에 FOCUS시*/

  $(cssSelector).on("focus", function () {
    placeholderValue = $(this).attr("placeholder");
    $(this).attr("placeholder", "");
  }).on("blur", function () {
    $(this).attr("placeholder", placeholderValue);
  });
} // function placeholderHandler

/*연락처 정규식 검사*/


function telValidationCheck(cssSelector) {
  $(cssSelector).on('keydown', function (e) {
    // 숫자만 입력받기
    var trans_num = $(cssSelector).val().replace(/-/gi, '');
    var k = e.keyCode;
    console.log(trans_num);

    if (trans_num.length >= 11 && (k >= 48 && k <= 126 || k >= 12592 && k <= 12687 || k === 32 || k === 229 || k >= 45032 && k <= 55203)) {
      e.preventDefault();
    }
  }).on('blur', function () {
    // 포커스를 잃었을때 실행합니다.
    if ($(cssSelector).val() === '') return; // 기존 번호에서 - 를 삭제합니다.

    var trans_num = $(cssSelector).val().replace(/-/gi, ''); // 입력값이 있을때만 실행합니다.

    if (trans_num != null && trans_num != '') {
      // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
      if (trans_num.length === 11 || trans_num.length === 10) {
        // 유효성 체크
        var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;

        if (regExp_ctn.test(trans_num)) {
          // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
          $(cssSelector).next(".validation_check").css('color', '#ea8255').text("적합");
          trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
          $(cssSelector).val(trans_num);
        } else {
          $(cssSelector).val("");
          $(cssSelector).next(".validation_check").css('color', 'red').text("부적합");
          $(cssSelector).focus();
        }
      } else {
        $(cssSelector).val("");
        $(cssSelector).next(".validation_check").css('color', 'red').text("부적합");
        $(cssSelector).focus();
      }
    }
  }); //전화번호 정규식 검사
} //function telValidationCheck

/*Html태그 제거 함수*/


function removeHtmlTag(text) {
  text = text.replace(/<br\/>/ig, "\n");
  text = text.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "");
  return text;
}
var Validations =
/*#__PURE__*/
function () {
  function Validations() {
    _classCallCheck(this, Validations);
  }

  _createClass(Validations, null, [{
    key: "checkPhoneKr",
    value: function checkPhoneKr(value) {
      var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
      return regExp.test(value);
    }
  }, {
    key: "checkCrn",
    value: function checkCrn(value) {
      var regExp = /^([0-9]{3})-?([0-9]{2})-?([0-9]{5})$/i;
      return regExp.test(value);
    }
  }, {
    key: "checkEmail",
    value: function checkEmail(value) {
      var regExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
      return regExp.test(value);
    }
  }, {
    key: "checkPassword",
    value: function checkPassword(value) {
      var regExp = /^.*(?=.{8,20})(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\s!@#$%^&*()_+=-`~\\\]\[{}|';:/.,?><]).*$/;
      return regExp.test(value);
    }
  }, {
    key: "checkNumber",
    value: function checkNumber(value) {
      var regExp = /^[0-9]*$/gi;
      return regExp.test(value);
    } //스페이스는 허용한다.

  }, {
    key: "checkString",
    value: function checkString(value) {
      var regExp = /^[가-힣|a-z|A-Z|\*\s]+$/;
      return regExp.test(value);
    } //닉네임은 한글 1~8자, 영문 1~16자

  }, {
    key: "checkNickname",
    value: function checkNickname(value) {
      var regExp = /^[가-힣|a-z|A-Z|0-9|\*]+$/;
      return regExp.test(value);
    } //파일명 체크 (특수문자는 -, _, @만 허용)

  }, {
    key: "checkFilename",
    value: function checkFilename(value) {
      var regExp = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\-_@]+$/;
      return regExp.test(value);
    } //숫자 소수점 확인

  }, {
    key: "checkFloat",
    value: function checkFloat(value) {
      var regExp = /^([0-9]*)[\.]?([0-9])?$/;
      return regExp.test(value);
    } //정수 1~3자리 확인, 소수점 2자리까지 확인

  }, {
    key: "checkFloatDoublePoint",
    value: function checkFloatDoublePoint(value) {
      var regExp = /^(\d{1,3}([.]\d{0,2})?)?$/;
      return regExp.test(value);
    }
  }]);

  return Validations;
}();

/***/ }),

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
/* harmony import */ var _component_input_InputEmailComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../component/input/InputEmailComponent */ "./src/component/input/InputEmailComponent.js");
/* harmony import */ var _component_input_InputPasswordComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../component/input/InputPasswordComponent */ "./src/component/input/InputPasswordComponent.js");
/* harmony import */ var _component_input_InputTermsagreeComponent__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../component/input/InputTermsagreeComponent */ "./src/component/input/InputTermsagreeComponent.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _component_input_InputSubmitComponent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../component/input/InputSubmitComponent */ "./src/component/input/InputSubmitComponent.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }













var cx = classnames__WEBPACK_IMPORTED_MODULE_2___default.a.bind(_SignupLayout_scss__WEBPACK_IMPORTED_MODULE_1___default.a);

var SignupLayout =
/*#__PURE__*/
function (_React$Component) {
  _inherits(SignupLayout, _React$Component);

  function SignupLayout(props) {
    var _this;

    _classCallCheck(this, SignupLayout);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SignupLayout).call(this, props));
    _this.sendSignup = _this.sendSignup.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(SignupLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.scrollTo(0, 0);
    }
  }, {
    key: "sendSignup",
    value: function sendSignup(e) {
      e.preventDefault();
      var form = new FormData();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          language = _this$props.language,
          terms = _this$props.terms,
          setEmail = _this$props.setEmail,
          setTerms = _this$props.setTerms,
          setPassword = _this$props.setPassword,
          sendData = _this$props.sendData;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_head_head__WEBPACK_IMPORTED_MODULE_4__["default"], {
        title: '리틀원 - 회원가입',
        description: '리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.',
        language: language
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_header_Header__WEBPACK_IMPORTED_MODULE_5__["default"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", {
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
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("legend", null, "\uB9AC\uD2C0\uC6D0\uC758 \uD68C\uC6D0\uAC00\uC785 \uD3FC\uC785\uB2C8\uB2E4."), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputEmailComponent__WEBPACK_IMPORTED_MODULE_7__["default"], {
        action: setEmail
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputPasswordComponent__WEBPACK_IMPORTED_MODULE_8__["default"], {
        action: setPassword
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputTermsagreeComponent__WEBPACK_IMPORTED_MODULE_9__["default"], {
        terms: terms,
        action: setTerms
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_input_InputSubmitComponent__WEBPACK_IMPORTED_MODULE_11__["default"], {
        action: sendData
      }))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_component_footer_Footer__WEBPACK_IMPORTED_MODULE_6__["default"], null));
    }
  }]);

  return SignupLayout;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    language: state.languageReducer.language,
    phoneLoading: state.phoneAuthReducer.loading,
    phoneError: state.phoneAuthReducer.error,
    terms: state.clientSignUpReducer.form.terms
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
    setPassword: function setPassword(password) {
      return dispatch({
        type: 'SET_SIGN_UP_PASSWORD_REQUEST',
        password: password
      });
    },
    setTerms: function setTerms() {
      return dispatch({
        type: 'SET_SIGN_UP_TERMS_REQUEST'
      });
    },
    sendData: function sendData() {
      return dispatch({
        type: 'SET_SIGN_UP_COMPLETE_REQUEST'
      });
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(SignupLayout));

/***/ })

})
//# sourceMappingURL=app.7542072a434d5cffeb92.hot-update.js.map