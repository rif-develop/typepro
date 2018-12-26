import React from 'react';
import {connect} from "react-redux";
import styles from '../../pages/login/Login.scss'
import classnames from 'classnames';

const cx = classnames.bind(styles);
class AutoLogin extends React.Component {

    render() {

        const {fetching, autoLogin, error, onClickHandler} = this.props;

        return (
            <a href="javascript:void(0)" className={cx(styles['__check-box-pointer'], autoLogin ? styles['active']:null)} >
                {fetching ? 'loading...':null}
                <span onClick={onClickHandler}> 자동 로그인 체크박스 입니다.
                    <svg width="15" height="12" viewBox="0 0 15 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.708 0l-7.5 7.447-2.916-2.895L0 6.83 5.208 12 15 2.277z" fill="#9013FE"
                              fillRule="nonzero" id="auto-check-svg"/>
                    </svg>
                </span>
                <label htmlFor="auto-login" className={styles['__set-auto-login']} onClick={onClickHandler}>자동로그인
                    <input type="hidden" name="auto_login" id="auto-login" className={styles['__check-component']} value={autoLogin}/>
                </label>
            </a>
        )
    }
}

let mapStateToProps = state => {
    return {
        fetching:state.autologinReducer.fetching,
        autoLogin:state.autologinReducer.autoLogin,
        error:state.autologinReducer.error
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onClickHandler: () => dispatch({
            type: 'AUTO_LOGIN_REQUEST'
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoLogin);