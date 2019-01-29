import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import {checkAnimation} from "../../lib/script";

class InputPasswordComponent extends React.Component {

    static defaultState = {
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
    };

    constructor(props) {
        super(props);
        this.state = {
            validation: null,
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
        const result = Validations.checkPassword(val);

        if (val.length === 0) {
            this.setState({
                validation: null,
                checkAni: false,
                removeBtn: false
            });
            return;
        }//end if

        //유효성 검사에 통과시
        if (result) {
            this.setState({
                validation: null,
                checkAni: true
            });
            checkAnimation(this.check.current);
            //유효성 스테이트 변경
            if (this.props.action) {
                this.props.action(true)
            }

        } else {
            //유효성 검사 실패시
            this.setState({
                validation: 'validationFail',
                checkAni: false,
                removeBtn: false
            });

            this.inputComponent.current.value = null;
            this.inputComponent.current.focus();

            //유효성 스테이트 변경
            if (this.props.action) {
                this.props.action(false)
            }
        }//end if~else

    }

    onKeyHandler(e) {
        const val = this.inputComponent.current.value;
        const isLen = val.length > 0;
        isLen ? this.setState({
            removeBtn: true,
            validation: null
        }) : this.setState({
            removeBtn: false
        });
    }

    onRemoveHandler(ref) {
        ref.value = null;
        this.setState({
            error: false,
            removeBtn: false,
            checkAni: false
        });
        ref.focus();
        /*빈값을 디스패치*/
        //유효성 스테이트 변경
        if(this.props.action){
            this.props.action(false)
        }
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
                    <label htmlFor={this.props.id || InputPasswordComponent.defaultState.id} className={styles['password-icon']}
                           title={this.props.title || InputPasswordComponent.defaultState.title}></label>
                    <input type={InputPasswordComponent.defaultState.type}
                           name={this.props.name || InputPasswordComponent.defaultState.name}
                           id={this.props.id || InputPasswordComponent.defaultState.id}
                           required={this.props.required || InputPasswordComponent.defaultState.required}
                           placeholder={this.props.placeholder || InputPasswordComponent.defaultState.placeholder}
                           aria-placeholder={this.props.placeholder || InputPasswordComponent.defaultState.placeholder}
                           autoCapitalize={InputPasswordComponent.defaultState.autoCapitalize}
                           autoComplete={InputPasswordComponent.defaultState.autoComplete}
                           maxLength={this.props.maxLength || InputPasswordComponent.defaultState.maxLength}
                           className={styles['__default-input-component']}
                           ref={this.inputComponent}
                           onBlur={this.onBlurHandler}
                           onChange={this.onKeyHandler}
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
                         }}>{InputPasswordComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.state.checkAni ? styles['active'] : null)} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em>{this.state.validation === 'validationFail' ? '알파벳, 숫자, 특수문자로 조합된 8~20자 사이로 입력해주세요' : null}</em>
                </div>
            </div>
        )
    }
}

export default InputPasswordComponent;