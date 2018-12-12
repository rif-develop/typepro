webpackHotUpdate("app",{

/***/ "./src/component/flag/FlagComponent.tsx":
/*!**********************************************!*\
  !*** ./src/component/flag/FlagComponent.tsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));
const FlagComponent_scss_1 = __importDefault(__webpack_require__(/*! ./FlagComponent.scss */ "./src/component/flag/FlagComponent.scss"));
const classnames_1 = __importDefault(__webpack_require__(/*! classnames */ "./node_modules/classnames/index.js"));
const CountryListComponent_1 = __importDefault(__webpack_require__(/*! ./list/CountryListComponent */ "./src/component/flag/list/CountryListComponent.tsx"));
const cx = classnames_1.default.bind(FlagComponent_scss_1.default);
class FlagComponent extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            country: ['korea', 'japan', 'usa', 'china'],
            listActive: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
    }
    onClickHandler() {
        this.setState({
            listActive: !this.state.listActive
        });
    }
    render() {
        return (react_1.default.createElement("div", { id: FlagComponent_scss_1.default['footer-language-box'] },
            react_1.default.createElement("ul", { onClick: this.onClickHandler },
                react_1.default.createElement("li", null,
                    react_1.default.createElement("a", { href: "javascript:void(0)", className: FlagComponent_scss_1.default['__change-locale'] },
                        react_1.default.createElement("div", { className: FlagComponent_scss_1.default['locale-container'] },
                            react_1.default.createElement("div", { className: cx(FlagComponent_scss_1.default['locale-container--flag'], FlagComponent_scss_1.default['korea-flag']) }),
                            react_1.default.createElement("div", { className: FlagComponent_scss_1.default['locale-container--country'] }, "\uD55C\uAD6D"),
                            react_1.default.createElement("div", { className: FlagComponent_scss_1.default['locale-container--down-arrow'] }))))),
            react_1.default.createElement("ol", { className: this.state.listActive ? FlagComponent_scss_1.default['active'] : null }, this.state.country.map((key, i) => {
                return react_1.default.createElement(CountryListComponent_1.default, { country: key, key: i.toString() });
            }))));
    }
}
exports.default = FlagComponent;


/***/ })

})
//# sourceMappingURL=app.e91052eec214cffa07b0.hot-update.js.map