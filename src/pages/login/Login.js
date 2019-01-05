import React, {Fragment} from 'react';
import styles from './Login.scss';
import SocialSignButton from "../../component/socailSignButton/SocialSignButton";
import classnames from 'classnames';
import {Link} from "react-router-dom";
import AutoLogin from "../../component/autoLogin/AutoLogin";
import Header from "../../component/header/Header";
import Head from "../../component/head/head";
import {connect} from "react-redux";
import Footer from "../../component/footer/Footer";

const cx = classnames.bind(styles);

class LoginLayout extends React.Component {
    render() {
        return (
            <Fragment>
                <Head title={'리틀원 - 로그인'} description={'리틀원의 로그인 페이지입니다.'} language={this.props.language}/>
                <Header/>
                <section className={styles['login-section']}>
                    <div className={styles['login-section--logo']}>
                        리틀원 로그인 섹션의 기업로고입니다.
                    </div>
                    <div className={styles['login-section-form']}>
                        <form method="post" action="/login" role="form" id="littleone-login-form">
                            <fieldset form={'littleone-login-form'}>
                                <legend>리틀원의 로그인 페이지입니다. 아이디 비밀번호 입력 후 로그인 하실 수 있습니다.</legend>
                                <div className={styles['login-section-form--box']}>
                                    <label htmlFor="user_email" className={styles['client-email']}></label>
                                    <input type="email" name="email" id="user_email" maxLength="42" required="required" autoCapitalize="off"/>
                                    <button type="button" className={cx(styles['__remove-component'], styles['__email'])} role="button">닫기</button>
                                </div>
                                <div className={styles['login-section-form--box']}>
                                    <label htmlFor="user_password" className={styles['client_password']}></label>
                                    <input type="password" name="password" id="user_password" required="required" autoCapitalize="off" maxLength="16"/>
                                    <button type="button" className={cx(styles['__remove-component'], styles['__password'])} role="button">닫기</button>
                                    <button type="button" className={styles['__check-client-password-num']} role="button"></button>
                                </div>
                                <div className={styles['login-section-warning-text']}></div>
                                <div className={styles['login-section-captcha-area']} id="gcaptcha_div"></div>
                                <div className={styles['login-section-form--submit']}>
                                    <button type="submit" className={styles['__login-button']} role="button">로그인</button>
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
                    <div className="login-section-horizontal-line">
                        <em>OR</em>
                        <span className="login-section-horizontal-line--bar"></span>
                    </div>
                    <SocialSignButton/>
                    <div className="login-section-join">
                        <p>아직 계정이 없으신가요?</p><Link to="/signup">회원가입</Link>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language:state.languageReducer.language
    }
};


export default connect(mapStateToProps)(LoginLayout);