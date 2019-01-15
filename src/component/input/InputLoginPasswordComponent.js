import React from 'react';
import styles from "../../pages/login/Login.scss";
import classnames from 'classnames';
import {store} from "../../store/StoreComponent";

const cx = classnames.bind(styles);

class InputLoginPasswordComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: false,
            removeBtn: false,
            visiblePassword: false,
            inputType: false
        };

        this.passwordInput = React.createRef();
        this.onKeyHandler = this.onKeyHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
        this.visiblePassword = this.visiblePassword.bind(this);
    }


    onKeyHandler(ref) {
        const val = ref.value.length;
        if(val > 0){
            this.setState({
                removeBtn:true
            });
            store.dispatch({
                type:"SET_LOGIN_PASSWORD_REQUEST",
                password:ref.value
            });
        } else {
            this.setState({
                removeBtn: false,
                visiblePassword: false,
                inputType:false
            });
            store.dispatch({
                type:"SET_LOGIN_PASSWORD_REQUEST",
                password:null
            });
        }
    }

    removeHandler(ref) {
        ref.value = '';
        this.setState({
            removeBtn: false,
            visiblePassword: false
        });
        store.dispatch({
            type:"SET_LOGIN_PASSWORD_REQUEST",
            password:null
        });
        ref.focus();

    }

    visiblePassword() {
        this.setState({
            visiblePassword: !this.state.visiblePassword,
            inputType: !this.state.inputType
        })
    }

    render() {
        return (
            <div className={styles['login-section-form--box']}>
                <label htmlFor="user_password" className={styles['client_password']}></label>
                <input
                    ref={this.passwordInput}
                    type={this.state.inputType ? 'text':'password'}
                    name="password"
                    id="user_password"
                    required={true}
                    autoCapitalize="off"
                    maxLength="20"
                    placeholder={'비밀번호'}
                    onKeyDown={() => {
                        this.onKeyHandler(this.passwordInput.current);
                    }}
                    onBlur={()=>{
                        this.onKeyHandler(this.passwordInput.current);
                    }}
                    defaultValue={'123a123a!'}
                />
                <div className={cx(styles['__remove-component'], this.state.removeBtn ? styles['active'] : null)} role="button"
                     onClick={() => {
                         this.removeHandler(this.passwordInput.current);
                     }}>닫기
                </div>
                <div
                    className={cx(styles['__check-client-password-num'], this.state.visiblePassword ? styles['visible']:null)}
                    role="button"
                    onClick={this.visiblePassword}>
                </div>
            </div>
        )
    }
}

export default InputLoginPasswordComponent