import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import NexmoVerifyComponent from "../../component/modal/NexmoVerifyComponent";

const cx = classnames.bind(styles);

class FindClientIdLayout extends React.Component {

    componentWillMount() {
        this.props.getSession();
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    render() {
        const {language, openModalRequest, modalOpen, email, isLogin} = this.props;
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
                        <h1>아이디 찾기</h1>
                        <p id="find_id_result"></p>
                        <p>휴대폰 인증을 통해 이메일 아이디를 찾아보실 수 있습니다.</p>
                    </div>
                    {
                        email && <div id="find-result-box">
                            <p>{email}</p>
                            <Link to={'/login'}>
                                로그인 화면으로
                            </Link>
                        </div>
                    }
                    <div>
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
                    </div>
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
        })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(FindClientIdLayout);
