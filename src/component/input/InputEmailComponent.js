import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import {checkAnimation} from "../../lib/script";
import axios from 'axios';

class InputEmailComponent extends React.Component {

    static defaultState = {
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

    };

    constructor(props) {
        super(props);
        this.state = {
            error: null, //error 종류에 따라서 다르게 보여주게 하자. validation 이면 유효성 실패, duplicate 이면 중복
            checkAni: false,
            removeBtn: false
        };

        this.inputComponent = React.createRef();
        this.check = React.createRef();
        this.removeBtn = React.createRef();
        this.error = React.createRef();

        this.onBlurHandler = this.onBlurHandler.bind(this);
        this.onKeyHandler = this.onKeyHandler.bind(this);
        this.onRemoveHandler = this.onRemoveHandler.bind(this);
        this.onFocusHandler = this.onFocusHandler.bind(this);
    }

    onBlurHandler() {
        const val = this.inputComponent.current.value;
        const result = Validations.checkEmail(val);

        //아무 값이 없을 떄
        if (val.length === 0) {
            this.setState({
                error: false,
                checkAni: false,
                removeBtn: false
            });
            return;
        }
        //유효성 통과를 실패했을 경우
        if (!result) {
            this.setState({
                error: 1,
                checkAni: false
            });
            /*밸류를 초기화 한 후에 REDUX를 원래대로 한다.*/
            this.inputComponent.current.value = null;
            this.props.action(this.inputComponent.current.value);
            /*다시 인풋에 포커스*/
            this.inputComponent.current.focus();
            return;
        }


        //아이디 중복 검사
        axios({
            method: 'post',
            url: '/emailcheck',
            data: {
                email: val
            }
        }).then((response) => {
            //중복되지 않은 이메일이라면
            console.log(response.data)
            if (!response.data.duplicate && result) {
                this.setState({
                    error: false,
                    checkAni: true
                });
                checkAnimation(this.check.current);
                /*리덕스에 디스패치*/
                this.props.action(val);

            } else {
                //중복된 이메일이라면
                this.setState({
                    error: 0,
                    checkAni: false
                });
                /*밸류를 초기화 한 후에 REDUX를 원래대로 한다.*/
                this.inputComponent.current.value = null;
                this.props.action(this.inputComponent.current.value);
                /*다시 인풋에 포커스*/
                this.inputComponent.current.focus();
            }
        }).catch((error) => {
            console.log(error);
        });
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
        ref.value = null;
        this.setState({
            error: false,
            removeBtn: false,
            checkAni: false
        });
        ref.focus();
        this.props.action(this.inputComponent.current.value);
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
                    <label htmlFor={InputEmailComponent.defaultState.id} className={styles['email-icon']}
                           title={InputEmailComponent.defaultState.title}></label>
                    <input type={InputEmailComponent.defaultState.type}
                           name={InputEmailComponent.defaultState.name}
                           id={InputEmailComponent.defaultState.id}
                           required={InputEmailComponent.defaultState.required}
                           placeholder={InputEmailComponent.defaultState.placeholder}
                           aria-placeholder={InputEmailComponent.defaultState.placeholder}
                           autoCapitalize={InputEmailComponent.defaultState.autoCapitalize}
                           autoComplete={InputEmailComponent.defaultState.autoComplete}
                           maxLength={InputEmailComponent.defaultState.maxLength}
                           className={styles['__default-input-component']}
                           ref={this.inputComponent}
                           onBlur={this.onBlurHandler}
                           onKeyDown={this.onKeyHandler}
                           onKeyUp={this.onKeyHandler} onFocus={this.onFocusHandler}/>
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
                         }}>{InputEmailComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.state.checkAni ? styles['active'] : null)} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em ref={this.error}>
                        {
                            this.state.error === 1 ? InputEmailComponent.defaultState.validationError :  this.state.error === 0 ? '중복된 이메일입니다.':null
                        }
                    </em>
                </div>
            </div>
        )
    }
}

export default InputEmailComponent;