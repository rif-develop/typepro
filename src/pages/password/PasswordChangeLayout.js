import React, {Fragment} from 'react';
import styles from './PasswordChangeLayout.scss';
import classnames from 'classnames';
import {Redirect} from "react-router-dom";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import {connect} from "react-redux";
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import ModalComponent from "../../component/modal/ModalComponent";

const cx = classnames.bind(styles);

class PasswordChangeLayout extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            lastModifiedPw: null
        };
        //ref

        this.form = React.createRef();
        this.onClickSubmit = this.onClickSubmit.bind(this);
        //bind
    }

    componentWillMount() {
        //세션이 있는 지 확인한다.
        this.props.getSession();

    }

    componentWillUnmount() {
        this.props.pageInit();
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // if (nextProps.success) {
        //     this.props.history.push('/');
        // }
    }

    onClickSubmit(e) {
        e.preventDefault();
        const ref = this.form.current;

        const formData = new FormData(ref);

        const clientIdx = this.props.clientIdx;

        formData.set('clientIdx', clientIdx);

        //clientIdx, 기존 비밀번호, 새 비밀번호를 전송
        this.props.onClickSubmit(formData)

    }

    render() {
        const {language, lastModifiedPw, isLogin, passwordChange, pageInit, success} = this.props;


        if (!isLogin) {
            return false
        }

        const date = new Date(lastModifiedPw);
        const clientYear = date.getFullYear();
        const clientMonth = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
        const clientDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

        return (
            <Fragment>
                {
                    passwordChange.error && passwordChange.error.type === 'password' ? <ModalComponent subject={'알림'} desc={'기존 비밀번호가 일치하지 않습니다.'} action={pageInit}/> : null
                }
                {
                    passwordChange.error && passwordChange.error.type === 'server' ? <ModalComponent subject={'서버'} desc={'서버 에러입니다.'} action={pageInit}/> : null
                }
                {
                    passwordChange.error && passwordChange.error.type === 'required' ? <ModalComponent subject={'알림'} desc={'입력값들을 넣어주세요.'} action={pageInit}/> : null
                }
                {
                    passwordChange.error && passwordChange.error.type === 'passwordValidation' ? <ModalComponent subject={'알림'} desc={'기존 비밀번호를 입력해주세요.'} action={pageInit}/> : null
                }
                {
                    passwordChange.error && passwordChange.error.type === 'newPasswordValidation' ? <ModalComponent subject={'알림'} desc={'변경하실 새로운 비밀번호를 입력해주세요.'} action={pageInit}/> : null
                }
                {
                    success ? <ModalComponent subject={'성공'} desc={'비밀번호가 변경 되었습니다.'} action={(e) => {
                        pageInit();
                        this.props.history.push('/');
                    }}/> : null
                }
                <Head title={'리틀원 - 비밀번호 변경'} description={'고객님의 비밀번호를 변경할 수 있는 리틀원의 페이지입니다.'} language={language}/>
                <Header/>
                <section className={cx(styles['littleone-common-section'], styles['password-change-section'])}>
                    <div className={styles['littleone-common-section--logo']}>
                        리틀원의 비밀번호 변경 페이지의 로고입니다.
                    </div>
                    <div className={styles['littleone-common-section--bar']}></div>
                    <div className={styles['littleone-common-section--desc']}>
                        <h1>비밀번호 변경</h1>
                        <p>회원님의 소중한 개인정보 보호를 위해서는 주기적인 비밀번호 변경을 권장합니다.</p>
                        <span>마지막 변경일: {`${clientYear}-${clientMonth}-${clientDate}`}</span>
                    </div>
                    <form className={styles['littleone-common-section--form']} id="password-change-form" role="form" ref={this.form}>
                        <fieldset form="password-change-form">
                            <legend>리틀원 비밀번호 변경 폼 입니다.</legend>
                            <InputPasswordComponent id={'client-password'} placeholder={'현재 비밀번호 입력'} name={'password'} required={true} title={'현재 고객님의 비밀번호를 입력해주세요.'}/>
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
        session: state.clientStatusReducer.session.isSession,
        clientIdx: state.clientStatusReducer.session._id,
        isLogin: state.clientStatusReducer.login.isLogin,
        passwordChange: state.mypageReducer.passwordChange,
        lastModifiedPw: state.clientStatusReducer.session.status.lastModifiedPw,
        success: state.mypageReducer.passwordChange.success
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickSubmit: (formData) => dispatch({
            type: 'API_PASSWORD_CHANGE_REQUEST',
            formData
        }),
        webLoginRequest: (session) => dispatch({
            type: 'WEB_LOGIN_REQUEST',
            session: session
        }),
        webLogoutRequest: () => dispatch({
            type: 'WEB_LOGOUT_REQUEST'
        }),
        pageInit: () => dispatch({
            type: 'API_MYPAGE_UPDATE_INIT'
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeLayout);