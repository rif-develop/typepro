import React from 'react';
import styles from "../../pages/login/Login.scss";
import classnames from 'classnames';
import {store} from "../../store/StoreComponent";

const cx = classnames.bind(styles);

class InputLoginEmailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            removeBtn: false,
            error: false
        };

        //ref
        this.loginInput = React.createRef();
        /*bind*/
        this.onKeyHandler = this.onKeyHandler.bind(this);
        this.removeHandler = this.removeHandler.bind(this);
    }

    onKeyHandler(ref) {
        const val = ref.value.length;
        if (val > 0) {
            this.setState({
                removeBtn: true
            });
            store.dispatch({
                type: 'SET_LOGIN_EMAIL_REQUEST',
                email: ref.value
            });
        } else {
            this.setState({
                removeBtn: false
            });
            store.dispatch({
                type: 'SET_LOGIN_EMAIL_REQUEST',
                email: null
            });
        }
    }

    removeHandler(ref) {
        ref.value = '';
        this.setState({
            removeBtn: false
        });
        store.dispatch({
            type: 'SET_LOGIN_EMAIL_REQUEST',
            email: null
        });
        ref.focus();
    }


    render() {
        return (
            <div className={styles['login-section-form--box']}>
                <label htmlFor="user_email" className={styles['client-email']}></label>
                <input type="email"
                       name="email"
                       id="user_email"
                       maxLength="42"
                       required={true}
                       autoCapitalize={'off'}
                       placeholder={'이메일(아이디)'}
                       ref={this.loginInput}
                       onChange={(e) => {
                           e.preventDefault();
                           this.onKeyHandler(this.loginInput.current);
                       }}
                       onBlur={(e) => {
                           e.preventDefault();
                           this.onKeyHandler(this.loginInput.current)
                       }} defaultValue={'test@naver.com'}/>
                <div className={cx(styles['__remove-component'], this.state.removeBtn ? styles['active'] : null)} role="button" onClick={() => {
                    this.removeHandler(this.loginInput.current);
                }}>닫기
                </div>
            </div>
        )
    }
}

export default InputLoginEmailComponent;