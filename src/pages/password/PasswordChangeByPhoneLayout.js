import React, {Fragment} from 'react';
import {Redirect} from "react-router-dom";
import styles from './PasswordChangeLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {connect} from "react-redux";
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import ModalComponent from "../../component/modal/ModalComponent";

const cx = classnames.bind(styles);

class PasswordChangeByPhoneLayout extends React.Component {

    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.onClickSubmit = this.onClickSubmit.bind(this);
    }

    componentWillMount() {
        this.props.getSession();

        //인증 성공 받지 못한 유저와 로그인 되어 있는 유저의 접근을 제한
        if (!this.props.phoneAuthSuccess || this.props.isLogin) {
            console.log('접근 권한 없음');
            this.props.history.push('/');
        }
    }

    onClickSubmit(e) {
        e.preventDefault();
        const ref = this.form.current;
        const phone = this.props.phone;
        const email = this.props.email;

        const formData = new FormData(ref);

        formData.set('phone', phone);
        formData.set('email', email);
        //비밀번호 변경 요청
        this.props.passwordChangeRequest(formData);
    }

    render() {
        const {language, isLogin, passwordChangeSuccess, passwordChangeInit, error, phoneAuthInit} = this.props;
        //로그인 되어 있는 유저의 접근도 막는다.
        if (isLogin) {
            return false;
        }
        return (
            <Fragment>
                {
                    passwordChangeSuccess ? <ModalComponent subject={'성공'} desc={'비밀번호 변경이 완료되었습니다.'} action={(e) => {
                        passwordChangeInit(); // 비밀번호 변경 관련 스토어 초기화
                        phoneAuthInit(); // 전화번호 인증 관련 스토어 초기화
                        this.props.history.push('/login');
                    }}/> : null
                }

                {/*에러 핸들링*/}
                {error.error && error.type === 'emailValidation' ? <ModalComponent subject={'알림'} desc={'적합하지 않은 이메일입니다.'} action={passwordChangeInit}/> : null}
                {error.error && error.type === 'passwordValidation' ? <ModalComponent subject={'알림'} desc={'적합하지 않은 비밀번호입니다.'} action={passwordChangeInit}/> : null}
                {error.error && error.type === 'isEmptyPhone' ? <ModalComponent subject={'알림'} desc={'핸드폰을 입력해주세요.'} action={passwordChangeInit}/> : null}
                {error.error && error.type === 'isEmptyPassword' ? <ModalComponent subject={'알림'} desc={'비밀번호를 입력해주세요.'} action={passwordChangeInit}/> : null}
                {error.error && error.type === 'isEmptyEmail' ? <ModalComponent subject={'알림'} desc={'이메일을 입력해주세요.'} action={passwordChangeInit}/> : null}

                <Head title={'리틀원 - 비밀번호 변경'} description={'고객님의 비밀번호를 변경할 수 있는 리틀원의 페이지입니다.'} language={language}/>
                <Header/>
                <section className={cx(styles['littleone-common-section'], styles['password-change-section'])}>
                    <div className={styles['littleone-common-section--logo']}>
                        리틀원의 비밀번호 변경 페이지의 로고입니다.
                    </div>
                    <div className={styles['littleone-common-section--bar']}></div>
                    <div className={styles['littleone-common-section--desc']}>
                        <h1>비밀번호 변경</h1>
                    </div>
                    <form className={styles['littleone-common-section--form']} id="password-change-form" role="form" ref={this.form}>
                        <fieldset form="password-change-form">
                            <legend>리틀원 비밀번호 변경 폼 입니다.</legend>
                            <InputPasswordComponent id={'client-new-password'} placeholder={'새 비밀번호 입력'} name={'new-password'} required={true} title={'고객님이 바꾸실 비밀번호를 입력해주세요.'}/>
                            <button type="submit" role="button" className={styles['__submit-btn']} onClick={this.onClickSubmit}>확인</button>
                        </fieldset>
                    </form>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        isLogin: state.clientStatusReducer.login.isLogin,
        phoneAuthSuccess: state.phoneAuthReducer.auth.success,
        email: state.phoneAuthReducer.auth.email,
        phone: state.phoneAuthReducer.auth.phone,
        error: state.passwordChangeReducer.error,
        passwordChangeSuccess: state.passwordChangeReducer.success
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        passwordChangeRequest: (formData) => dispatch({
            type: 'API_PASSWORD_CHANGE_BY_PHONE_REQUEST',
            formData
        }),
        passwordChangeInit: () => dispatch({
            type: 'API_LINK_PASSWORD_CHANGE_INIT'
        }),
        phoneAuthInit: () => dispatch({
            type: 'API_PHONE_AUTH_INIT'
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeByPhoneLayout);