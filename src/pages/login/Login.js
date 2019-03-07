import React, {Fragment} from 'react';
import styles from './Login.scss';
import SocialSignButton from "../../component/socailSignButton/SocialSignButton";
import classnames from 'classnames';
import {Link, Redirect} from "react-router-dom";
import AutoLogin from "../../component/autoLogin/AutoLogin";
import Header from "../../component/header/Header";
import Head from "../../component/head/head";
import {connect} from "react-redux";
import Footer from "../../component/footer/Footer";
import InputLoginEmailComponent from "../../component/input/InputLoginEmailComponent";
import InputLoginPasswordComponent from "../../component/input/InputLoginPasswordComponent";
import DefaultLoading from "../../component/loading/DefaultLoading";

const cx = classnames.bind(styles);

class LoginLayout extends React.Component {


    constructor(props) {
        super(props);

        //ref
        this.form = React.createRef();

        //binding
        this.longinHandler = this.longinHandler.bind(this);
    }

    componentDidMount() {
        this.props.getSession();
        //세션을 가져올 떄 isLogin은 null -> false or true가 된다.
    }


    longinHandler(e) {
        e.preventDefault();
        const ref = this.form.current;
        const formData = new FormData(ref);

        this.props.loginRequest(formData);
    }


    render() {
        const {language, isLogin, error, loginLoading} = this.props;

        //null -> false or true
        if (isLogin === null) {
            return (
                <div>LOADING..</div>
            )
        } else if (isLogin && isLogin !== null) {
            //로그인 되어 있는 상태에서는 로그인 페이지에 접근할 수 없다.
            return (
                <Redirect to={'/'}/>
            )
        } else {
            return (
                <Fragment>
                    <Head title={'리틀원 - 로그인'} description={'리틀원의 로그인 페이지입니다.'} language={language}/>
                    <Header/>
                    <section className={styles['login-section']}>
                        <div className={styles['login-section--logo']}>
                            리틀원 로그인 섹션의 기업로고입니다.
                        </div>
                        <div className={styles['login-section-form']}>
                            <form method="post" role="form" id="littleone-login-form" ref={this.form}>
                                <fieldset form={'littleone-login-form'}>
                                    <legend>리틀원의 로그인 페이지입니다. 아이디 비밀번호 입력 후 로그인 하실 수 있습니다.</legend>
                                    <InputLoginEmailComponent/>
                                    <InputLoginPasswordComponent/>
                                    <div className={cx(styles['login-section-warning-text'], error.error ? styles['active'] : null)}>
                                        <p>
                                            {error.error && error.type === 'account' ? '존재하지 않는 아이디입니다.' : null}
                                            {error.error && error.type === 'password' ? '비밀번호가 일치하지 않습니다.' : null}
                                            {error.error && error.type === 'server' ? '서버 통신 에러입니다.' : null}
                                        </p>
                                    </div>
                                    <div className={styles['login-section-captcha-area']} id="gcaptcha_div"></div>
                                    <div className={styles['login-section-form--submit']}>
                                        <button type="submit" className={styles['__login-button']} role="button" onClick={this.longinHandler}>로그인</button>
                                    </div>
                                    <div className={styles['login-section-find-action-box']}>
                                        <AutoLogin/>
                                        <div className={styles['login-section-find-action-box--find-section']}>
                                            <Link to={'/findid'} className={styles['__find-account']}>아이디 찾기</Link>
                                            <span className={styles['login-section-find-action-box--find-section--vertical-bar']}></span>
                                            <Link to={'/findpassword'} className={styles['__find-password']}>비밀번호 찾기</Link>
                                        </div>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        {/*<div className={styles['login-section-horizontal-line']}>*/}
                        {/*<em>OR</em>*/}
                        {/*<span className={styles['login-section-horizontal-line--bar']}></span>*/}
                        {/*</div>*/}
                        {/*<SocialSignButton/>*/}
                        <div className={styles['login-section-join']}>
                            <p>아직 계정이 없으신가요?</p><Link to="/signup">회원가입</Link>
                        </div>
                    </section>
                    <Footer/>
                </Fragment>
            );

        }

    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        isLogin: state.clientStatusReducer.login.isLogin,
        error: state.clientStatusReducer.login.error,
        loginLoading: state.clientStatusReducer.login.loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loginRequest: (formData) => dispatch({
            type: 'API_WEB_LOGIN_REQUEST',
            formData
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginLayout);