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

const cx = classnames.bind(styles);

class SignupLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.scrollTo(0, 0);
        store.getState();
    }

    componentWillUnmount() {

    }

    render() {
        const {language, terms, setEmail, setTerms, setPassword, sendData, emailCheck, passwordCheck, termsCheck} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 회원가입'} description={'리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.'} language={language}/>
                <Header/>
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
                                <InputEmailComponent action={setEmail}/>
                                <InputPasswordComponent action={setPassword}/>
                                <InputTermsagreeComponent terms={terms} action={setTerms}/>
                                <InputSubmitComponent action={sendData}/>
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

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        phoneLoading: state.phoneAuthReducer.loading,
        phoneError: state.phoneAuthReducer.error,
        terms: state.clientSignUpReducer.form.terms,
        emailCheck:state.clientSignUpReducer.validate.email,
        passwordCheck:state.clientSignUpReducer.validate.password,
        termsCheck:state.clientSignUpReducer.validate.terms,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        openPhoneAuth: () => dispatch({
            type: 'SET_PHONE_AUTH_REQUEST'
        }),
        setEmail: (email) => dispatch({
            type: 'SET_SIGN_UP_EMAIL_REQUEST',
            email
        }),
        setPassword: (password) => dispatch({
            type: 'SET_SIGN_UP_PASSWORD_REQUEST',
            password
        }),
        setTerms: () => dispatch({
            type: 'SET_SIGN_UP_TERMS_REQUEST',
        }),
        sendData: () => dispatch({
            type: 'SET_SIGN_UP_COMPLETE_REQUEST',
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SignupLayout);