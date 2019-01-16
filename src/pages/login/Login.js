import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import styles from './Login.scss';
import SocialSignButton from "../../component/socailSignButton/SocialSignButton";
import classnames from 'classnames';
import {Link} from "react-router-dom";
import AutoLogin from "../../component/autoLogin/AutoLogin";
import Header from "../../component/header/Header";
import Head from "../../component/head/head";
import {connect} from "react-redux";
import Footer from "../../component/footer/Footer";
import InputLoginEmailComponent from "../../component/input/InputLoginEmailComponent";
import InputLoginPasswordComponent from "../../component/input/InputLoginPasswordComponent";
import axios from 'axios';
import {store} from "../../store/StoreComponent";
import {getSessionAxios} from "../../action/session/sessionAxios";
import {loginAxios} from "../../action/login/loginAxios";

const cx = classnames.bind(styles);

class LoginLayout extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
        this.longinHandler = this.longinHandler.bind(this);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
        if(this.props.isLogin){
            alert('이미 로그인 되어 있습니다.');
            this.props.history.push('/');
        }
    }

    componentWillMount() {

        //세션 가져오기
        //세션을 받아와서 상태 갱신
        getSessionAxios().then((res) => {
            //isSession이 트루면 로그인 된 삳ㅇ태
            if (res.data.isSession) {
                store.dispatch({
                    type: 'WEB_LOGIN_REQUEST',
                    session: res.data.session
                });
            } else {
                console.log('세션 없음');
            }
        }).catch((err) => {
            console.log(err);
            store.dispatch({
                type: 'WEB_LOGOUT_REQUEST',
            });
        })




    }

    longinHandler() {
        loginAxios(this.props.emailValue, this.props.passwordValue).then((res) => {
            console.log(res.data);
            const data = res.data;
            if (data.success) {
                //페이지 이동
                this.props.history.push('/');
                //리덕스에 로그인 상태로 갱신
                store.dispatch({
                    type:'WEB_LOGIN_REQUEST',
                    session:res.data.key
                })
            } else if (!data.success) {
                this.setState({
                    error: data.type
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }


    render() {
        const {language} = this.props;

        return (
            <Fragment>
                <Head title={'리틀원 - 로그인'} description={'리틀원의 로그인 페이지입니다.'} language={language}/>
                <Header/>
                <section className={styles['login-section']}>
                    <div className={styles['login-section--logo']}>
                        리틀원 로그인 섹션의 기업로고입니다.
                    </div>
                    <div className={styles['login-section-form']}>
                        <form method="post" role="form" id="littleone-login-form">
                            <fieldset form={'littleone-login-form'}>
                                <legend>리틀원의 로그인 페이지입니다. 아이디 비밀번호 입력 후 로그인 하실 수 있습니다.</legend>
                                <InputLoginEmailComponent/>
                                <InputLoginPasswordComponent/>
                                <div className={cx(styles['login-section-warning-text'], this.state.error != null ? styles['active'] : null)}>
                                    <p>
                                        {this.state.error === 'account' ? '존재하지 않는 아이디입니다.' : null}
                                        {this.state.error === 'password' ? '비밀번호가 일치하지 않습니다.' : null}
                                        {this.state.error === 'server' ? '서버 통신 에러입니다.' : null}
                                    </p>
                                </div>
                                <div className={styles['login-section-captcha-area']} id="gcaptcha_div"></div>
                                <div className={styles['login-section-form--submit']}>
                                    <button type="submit" className={styles['__login-button']} role="button" onClick={(e) => {
                                        e.preventDefault();
                                        this.longinHandler();
                                    }}>로그인
                                    </button>
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

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        emailValue: state.clientStatusReducer.login.email,
        passwordValue: state.clientStatusReducer.login.password,
        isLogin:state.clientStatusReducer.login.isLogin
    }
};


export default connect(mapStateToProps)(LoginLayout);