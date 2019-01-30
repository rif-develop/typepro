import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import NexmoVerifyComponent from "../../component/nexmoVerify/NexmoVerifyComponent";

const cx = classnames.bind(styles);

class FindClientIdLayout extends React.Component {

    componentWillMount() {
        this.props.getSession();
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this.props.phoneAuthInit();
    }

    render() {
        const {language, openModalRequest, modalOpen, email, isLogin,error} = this.props;
        //로그인한 유저는 접근할 수 없는 페이지
        if (isLogin) {
            window.location.replace('/');
            return false;
        }
        return (
            <Fragment>
                {
                    modalOpen ? <NexmoVerifyComponent actionType={'findEmail'} toggle={openModalRequest}/> : null
                }
                <Head title={'리틀원 - 아이디 찾기'} desc={'핸드폰 인증을 통해 아이디를 찾아보실 수 있습니다.'} language={language}/>
                <Header/>
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--logo']}>
                        리틀원의 회원가입 섹션의 로고입니다.
                    </div>
                    <div className={styles['client-join-section--bar']}></div>
                    <div className={styles['client-join-section--desc']}>
                        <h1>{email ? '아이디를 찾았습니다.' : '아이디 찾기'}</h1>
                        <p id="find_id_result"></p>
                        <p>{email ? '고객님의 이메일은 다음과 같습니다.' : '휴대폰 인증을 통해 이메일 아이디를 찾아보실 수 있습니다.'}</p>
                    </div>
                    <div id="find-result-box" className={cx(styles['client-join-section--result-box'], email && styles['active'])}>
                        <p>
                            {email ? email.toString() : '해당 번호로 가입된 이메일이 없습니다.'}
                        </p>
                        {
                            email && <Link to={'/login'}>
                                로그인 화면으로
                            </Link>
                        }

                    </div>
                    {
                        email === null ? <div>
                            <form className={styles['client-join-section--form']} id="client-join-section--form" role="form">
                                <fieldset form="client-join-section--form">
                                    <legend>리틀원의 아이디 찾기 폼입니다.</legend>
                                    <div className={styles['client-join-section--form--authorization-box']}>
                                        <div id={'client-id'}></div>
                                        <div className={styles['client-join-section--form--select-box']}>
                                            <button type="button" role="button" className={styles['__auth-client-phone-button']} onClick={openModalRequest}>휴대폰 인증으로 찾기</button>
                                        </div>
                                    </div>
                                    <div className={styles['client-join-section--form--warning']}>
                                        <em></em>
                                    </div>
                                </fieldset>
                            </form>
                        </div> : null
                    }
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        modalOpen: state.phoneAuthReducer.open,
        email: state.phoneAuthReducer.findResult.email,
        error: state.phoneAuthReducer.error,
        isLogin: state.clientStatusReducer.login.isLogin
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        openModalRequest: () => dispatch({
            type: 'SET_PHONE_AUTH_MODAL_OPEN_TOGGLE'
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        }),
        phoneAuthInit: () => dispatch({
            type: 'API_PHONE_AUTH_INIT'
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FindClientIdLayout);
