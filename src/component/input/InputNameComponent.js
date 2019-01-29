import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import {checkAnimation} from "../../lib/script";

class InputNameComponent extends React.Component {

    static defaultState = {
        type: 'text',
        name: 'name',
        id: 'name-input-component',
        required: true,
        placeholder: '전체 이름을 기입하세요.',
        maxLength: 32,
        removeBtn: '클릭시 현재 작성 중인 태그의 입력값을 지우는 버튼입니다.',
        autoCapitalize: 'off',
        autoComplete: 'off',
        title: '사용자님의 실명을 입력해주세요.',
        validationError: '문자만 입력해주세요.'
    };

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            checkAni: false,
            removeBtn: false
        };

        this.inputComponent = React.createRef();
        this.check = React.createRef();
        this.removeBtn = React.createRef();

        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);
        this.onRemoveHandler = this.onRemoveHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);

    }

    onBlurHandler() {
        const val = this.inputComponent.current.value;
        const result = Validations.checkString(val);

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
            checkAnimation(this.check.current);
        } else {
            this.setState({
                error: true,
                checkAni: false
            });

            this.inputComponent.current.value = '';
            this.inputComponent.current.focus();
        }
    }

    onKeyHandler(e) {
        const val = this.inputComponent.current.value;
        const isLen = val.length > 0;
        isLen ? this.setState({
            removeBtn: true,
            error:false

        }) : this.setState({
            removeBtn: false
        });
    }

    onRemoveHandler(ref) {
        ref.value = '';
        this.setState({
            error: false,
            removeBtn: false,
            checkAni: false
        });
        ref.focus();
    }

    onFocusHandler() {
        this.setState({
            checkAni: false
        })
    }

    render() {
        return (
            <div>
                <div className={styles['client-join-section--form--box']}>
                    <label htmlFor={InputNameComponent.defaultState.id} className={styles['family-name-icon']}
                           title={InputNameComponent.defaultState.title}></label>
                    <input type={InputNameComponent.defaultState.type}
                           name={InputNameComponent.defaultState.name}
                           id={InputNameComponent.defaultState.id}
                           required={InputNameComponent.defaultState.required}
                           placeholder={InputNameComponent.defaultState.placeholder}
                           aria-placeholder={InputNameComponent.defaultState.placeholder}
                           autoCapitalize={InputNameComponent.defaultState.autoCapitalize}
                           autoComplete={InputNameComponent.defaultState.autoComplete}
                           maxLength={InputNameComponent.defaultState.maxLength}
                           className={styles['__default-input-component']}
                           defaultValue={this.props.clientName}
                           ref={this.inputComponent}
                           onBlur={this.onBlurHandler}
                           onKeyDown={this.onKeyHandler}
                           onKeyUp={this.onKeyHandler}
                           onFocus={this.onFocusHandler}/>
                    <div className={cx(styles['__remove-input-button'], this.state.removeBtn ? styles['active'] : null)}
                         ref={this.removeBtn}
                         onClick={() => {
                             this.onRemoveHandler(this.inputComponent.current);
                         }}
                         onMouseEnter={() => {
                             this.removeBtn.current.style.zIndex = '1';
                         }}
                         onMouseLeave={() => {
                             this.removeBtn.current.style.zIndex = '0';
                         }}>{InputNameComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.state.checkAni ? styles['active'] : null)} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em>{this.state.error ? InputNameComponent.defaultState.validationError : null}</em>
                </div>
            </div>
        )
    }
}

export default InputNameComponent;