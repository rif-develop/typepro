import React, {Fragment} from 'react';
import styles from './SignupLayout.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import InputEmailComponent from "../../component/input/InputEmailComponent";
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import InputTermsagreeComponent from "../../component/input/InputTermsagreeComponent";
import axios from 'axios';
import InputSubmitComponent from "../../component/input/InputSubmitComponent";
import {store} from "../../store/StoreComponent";
import ModalComponent from "../../component/modal/ModalComponent";

const cx = classnames.bind(styles);

class SignupLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
    }

    componentWillUnmount() {
        store.dispatch({
            type: "SET_SIGN_UP_INIT_REQUEST"
        });
    }

    render() {
        const {language, terms, setEmail, modalOpen, result, redirectUrl, modalType, setPassword, sendData, emailCheck, passwordCheck, termsCheck, duplicatedEmail} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 회원가입'} description={'리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.'} language={language}/>
                <Header/>
                {modalOpen && modalType === 'notEmail' ? <ModalComponent subject={'알림'} desc={'이메일을 입력해 주세요.'}/> : null}
                {modalOpen && modalType === 'notPassword' ? <ModalComponent subject={'알림'} desc={'비밀번호를 입력해 주세요.'}/> : null}
                {modalOpen && modalType === 'notTerms' ? <ModalComponent subject={'알림'} desc={'약관에 동의해 주세요.'}/> : null}
                {modalOpen && modalType === 'server' ? <ModalComponent subject={'알림'} desc={'서버 에러'}/> : null}
                {/*회원가입 완료시*/}
                {result ? <ModalComponent subject={'성공'} desc={'회원가입이 완료되었습니다.'} action={()=>{
                    this.props.history.push(redirectUrl)
                }}/> : null}
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--logo']}>
                        리틀원의 회원가입 섹션의 로고입니다.
                    </div>
                    <div className={styles['client-join-section--bar']}></div>
                    <div className={styles['client-join-section--desc']}>
                        <h1>회원가입</h1>
                        <p>간단한 가입으로 리틀원의 서비스를 이용하실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className={styles['client-join-section--form']} id="client-join-section--form" role="form">
                            <fieldset form="client-join-section--form">
                                <legend>리틀원의 회원가입 폼입니다.</legend>
                                <InputEmailComponent action={setEmail} duplicatedEmail={duplicatedEmail}/>
                                <InputPasswordComponent action={setPassword}/>
                                <InputTermsagreeComponent terms={terms}/>
                                <InputSubmitComponent action={sendData}
                                                      emailCheck={emailCheck}
                                                      passwordCheck={passwordCheck}
                                                      termsCheck={termsCheck}
                                                      duplicatedEmail={duplicatedEmail}/>
                            </fieldset>
                        </form>
                        {/*<div className={styles['client-join-section-horizontal-line']}>*/}
                        {/*<em>OR</em>*/}
                        {/*<span className={styles['client-join-section-horizontal-line--bar']}></span>*/}
                        {/*</div>*/}
                        {/*<SocialSignButton/>*/}
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

//왠만하면 자식 컴포넌트들이 전달받아서 shouldcomponentupdate 할 수 있도록  밖에서 넘겨주자
const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        terms: state.clientSignUpReducer.form.terms,
        duplicatedEmail: state.clientSignUpReducer.validate.email.duplicate,
        emailCheck: state.clientSignUpReducer.validate.email.success,
        passwordCheck: state.clientSignUpReducer.validate.password.success,
        termsCheck: state.clientSignUpReducer.validate.terms.success,
        modalType: state.modalReducer.modal.type,
        modalOpen: state.modalReducer.modal.open,
        result: state.clientSignUpReducer.result.success,
        redirectUrl: state.clientSignUpReducer.result.redirectUrl,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        setEmail: (email) => dispatch({
            type: 'SET_SIGN_UP_EMAIL_REQUEST',
            email
        }),
        setPassword: (password) => dispatch({
            type: 'SET_SIGN_UP_PASSWORD_REQUEST',
            password
        }),
        sendData: () => dispatch({
            type: 'SET_SIGN_UP_COMPLETE_REQUEST',
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignupLayout);