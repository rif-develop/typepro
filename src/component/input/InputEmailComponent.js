import React from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);
import {Validations} from "../../lib/validation";
import {checkAnimation} from "../../lib/script";
import {store} from "../../store/StoreComponent";
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
    };

    constructor(props) {
        super(props);

        this.state = {
            checkAni: false,
            removeBtn: false,
            validation:null
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
                checkAni: false,
                removeBtn: false,
                validation:null
            });
            return;
        }

        //유효성 통과를 실패했을 경우
        if (!result) {
            this.setState({
                checkAni: false,
                validation:'validationFail',
                removeBtn:false
            });
            this.inputComponent.current.value = null;
            //실패했음을 스토어에 액션
            store.dispatch({
                type: 'SET_SIGN_UP_EMAIL_FAILURE'
            });
            //중복 여부도 초기
            store.dispatch({
                type: 'SET_SIGN_UP_EMAIL_DUPLICATE_FALSE'
            });
            /*다시 인풋에 포커스*/
            this.inputComponent.current.focus();

            return;
        }

        //아이디 중복 검사
        axios({
            method: 'post',
            url: '/signup/emailcheck',
            data: {
                email: val
            }
        }).then((response) => {
            //중복되지 않은 이메일이라면
            console.log(response.data);
            if (!response.data.duplicate && result) {
                //중복되지 않았으니 체크 애니메이션

                this.setState({
                    checkAni: true
                });

                checkAnimation(this.check.current);
                /*리덕스에 디스패치 중복 되지 않았다고 액션 디스패치*/
                store.dispatch({
                    type: 'SET_SIGN_UP_EMAIL_DUPLICATE_FALSE'
                });
                //리덕스 스토어에 성공했음을 알리는 액션 디스패치
                store.dispatch({
                    type: 'SET_SIGN_UP_EMAIL_SUCCESS',
                    email: response.data.verifiedId
                })

            } else {
                //중복된 이메일이라면
                this.setState({
                    checkAni: false,
                    removeBtn:false,
                    validation:'duplicated'
                });
                /*밸류를 초기화 한 후에 REDUX를 원래대로 한다.*/
                this.inputComponent.current.value = null;

                //중복 되었다고 스토어 갱신
                store.dispatch({
                    type: 'SET_SIGN_UP_EMAIL_DUPLICATE_TRUE'
                });

                store.dispatch({
                    type: 'SET_SIGN_UP_EMAIL_FAILURE'
                });

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
            validation:null
        }) : this.setState({
            removeBtn: false
        });
    }

    onRemoveHandler(ref) {
        ref.value = null;
        this.setState({
            removeBtn: false,
            checkAni: false,
        });
        store.dispatch({
            type: 'SET_SIGN_UP_EMAIL_DUPLICATE_FALSE'
        });
        store.dispatch({
            type: 'SET_SIGN_UP_EMAIL_FAILURE'
        });

        ref.focus();
    }

    onFocusHandler() {
        this.setState({
            checkAni: false,
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
                         }}>{InputEmailComponent.defaultState.removeBtn}</div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={cx(styles['__check-animation'], this.state.checkAni ? styles['active'] : null)} ref={this.check}>
                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit={"10"} d="M1.1,5.6"/>
                    </svg>
                </div>
                <div className={styles['client-join-section--form--warning']}>
                    <em ref={this.error}>
                        {this.state.validation === 'duplicated' ? '중복된 이메일입니다.' : null}
                        {this.state.validation === 'validationFail' ? '잘못된 형식입니다. 이메일 주소를 다시 입력해 주세요.' : null}
                    </em>
                </div>
            </div>
        )
    }
}

export default InputEmailComponent;