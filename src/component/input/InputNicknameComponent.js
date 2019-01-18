import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import {checkAnimation} from "../../lib/script";
import {checkDuplicatedNickname} from "../../action/duplicatedCheck/duplicatedCheckAxios";

class InputNicknameComponent extends React.Component {

    static defaultState = {
        type: 'text',
        name: 'nickname',
        id: 'nickname-input-component',
        required: true,
        placeholder: '닉네임(한글 1~8자, 영문 1~16자)',
        maxLength: 16,
        removeBtn: '클릭시 현재 작성 중인 태그의 입력값을 지우는 버튼입니다.',
        autoCapitalize: 'off',
        autoComplete: 'off',
        title: '다른 사용자에게 보여질 사용자님의 닉네임을 입력할 수 있습니다.',
        validationError: '특수문자를 제외한, 한글 1~8자, 영문 1~16자를 입력해주세요.'
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
        const result = Validations.checkNickname(val);

        if (val.length === 0) {
            this.setState({
                error: false,
                checkAni: false,
                removeBtn: false
            });
            return;
        }


        //닉네임 중복 여부 검사
        checkDuplicatedNickname(val).then((res) => {
            // 중복된 닉네임이라면
            if (res.data.isDuplicated) {
                this.setState({
                    error: 'duplicated'
                });
                this.inputComponent.current.focus();

            } else if (!res.data.isDuplicated && result) {
                //중복되지 않았고 유효성도 통과했을 경우
                this.setState({
                    error: false,
                    checkAni: true
                });
                checkAnimation(this.check.current);
            } else {

                this.setState({
                    error: 'validation',
                    checkAni: false,
                    removeBtn: false
                });
                this.inputComponent.current.value = '';
                this.inputComponent.current.focus();
            }
        }).catch((err)=>{

            this.setState({
                error: 'server',
                checkAni: false,
                removeBtn: false
            });
            this.inputComponent.current.focus();

        })

    }

    onKeyHandler(e) {
        const val = this.inputComponent.current.value;
        const isLen = val.length > 0;
        isLen ? this.setState({
            removeBtn: true,
            error: false
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
                    <label htmlFor={InputNicknameComponent.defaultState.id} className={styles['nickname-icon']}
                           title={InputNicknameComponent.defaultState.title}></label>
                    <input type={InputNicknameComponent.defaultState.type}
                           name={InputNicknameComponent.defaultState.name}
                           id={InputNicknameComponent.defaultState.id}
                           required={InputNicknameComponent.defaultState.required}
                           placeholder={InputNicknameComponent.defaultState.placeholder}
                           aria-placeholder={InputNicknameComponent.defaultState.placeholder}
                           autoCapitalize={InputNicknameComponent.defaultState.autoCapitalize}
                           autoComplete={InputNicknameComponent.defaultState.autoComplete}
                           maxLength={InputNicknameComponent.defaultState.maxLength}
                           defaultValue={this.props.clientNickName}
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
                         }}>{InputNicknameComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.state.checkAni ? styles['active'] : null)} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em>
                        {this.state.error === 'validation' ? InputNicknameComponent.defaultState.validationError : null}
                        {this.state.error === 'duplicated' ? '중복된 닉네임입니다.' : null}
                        {this.state.error === 'server' ? '서버에러. 관리자에게 문의해주세요.' : null}
                    </em>
                </div>
            </div>
        )
    }
}

export default InputNicknameComponent;