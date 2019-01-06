import React, {Fragment} from 'react';
import styles from './SignupLayout.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import SocialSignButton from "../../component/socailSignButton/SocialSignButton";
import InputEmailComponent from "../../component/input/InputEmailComponent";
import InputPasswordComponent from "../../component/input/InputPasswordComponent";
import InputNicknameComponent from "../../component/input/InputNicknameComponent";
import InputNameComponent from "../../component/input/InputNameComponent";
import InputBirthdateComponent from "../../component/input/InputBirthdateComponent";
import InputGenderComponent from "../../component/input/InputGenderComponent";
import InputTermsagreeComponent from "../../component/input/InputTermsagreeComponent";

const cx = classnames.bind(styles);

class SignupLayout extends React.Component {
    render() {
        const {language} = this.props;
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
                                <InputEmailComponent/>
                                <InputPasswordComponent/>
                                <InputNicknameComponent/>
                                <InputNameComponent/>
                                <InputBirthdateComponent/>
                                <InputGenderComponent/>

                                <div className="client-join-section--form--authorization-box">
                                    <a href="javascript:void(0)" className="__auth-client-phone-button" role="button" id="buttons">
                                        <span className="--mobile-icon">휴대폰 인증</span>
                                        <input type="hidden" name="phone"/>
                                        <span className="__authorization"></span>
                                    </a>
                                </div>
                                <div className="client-join-section--form--warning" data-name="phone">
                                    <em></em>
                                </div>

                                <InputTermsagreeComponent/>
                                <div>
                                    <button type="submit" role="button" className="__join-member-button __submit-default-button">회원가입</button>
                                </div>
                            </fieldset>
                        </form>
                        <div className={styles['client-join-section-horizontal-line']}>
                            <em>OR</em>
                            <span className={styles['client-join-section-horizontal-line--bar']}></span>
                        </div>
                        <SocialSignButton/>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language:state.languageReducer.language
    }
};

export default connect(mapStateToProps)(SignupLayout);