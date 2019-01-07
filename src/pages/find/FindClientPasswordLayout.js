import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

const cx = classnames.bind(styles);

class FindClientPasswordLayout extends React.Component {

    componentDidMount() {
        document.body.scrollTo(0,0);
    }

    render() {
        const {language} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 아이디 찾기'} desc={'휴대폰 인증을 통하여 회원님의 아이디를 찾을 수 있는 페이지입니다.'} language={language}/>
                <Header/>
                <section className="client-join-section section">
                    <div className="client-join-section--logo">
                        리틀원의 비밀번호 찾기 섹션의 로고입니다.
                    </div>
                    <div className="client-join-section--bar"></div>
                    <div className="client-join-section--desc">
                        <h1>비밀번호 찾기</h1>
                        <p style={{
                            'lineHeight':'normal'
                        }}>이메일 아이디를 입력하신 후, 이메일 혹은<br/> 휴대폰 인증으로 비밀번호를 찾으실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className="client-join-section--form" id="client-join-section--form" role="form">
                            <fieldset form="client-join-section--form">
                                <legend>리틀원의 비밀번호 찾기 입력 폼입니다.</legend>
                                <div className="client-join-section--form--box">
                                    <label htmlFor="email-input-component" className="email-icon"></label>
                                    <input type="email" name="pwfind_email" id="email-input-component" required="required"  autoCapitalize="off"
                                           className="__default-input-component" maxLength="42" placeholder={'이메일(아이디) 필수입력'}/>
                                        <button type="button" role="button" data-name="pwfind_email" className="__remove-input-button">입력 값을 지웁니다.</button>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className="__check-animation">
                                            <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit="10" d="M1.1,5.6"></path>
                                        </svg>
                                </div>
                                <div className="client-join-section--form--warning">
                                    <em></em>
                                </div>
                                <div className="client-join-section--form--select-box">
                                    <a href="javascript:void(0)" role="button" className="__find-client-password-button">이메일로 찾기</a>
                                    <a href="javascript:void(0)" role="button" className="__auth-client-phone-button-ni">휴대폰 인증으로 찾기
                                        <input type="hidden" name="phone"/>
                                    </a>
                                </div>
                            </fieldset>
                        </form>
                        <div></div>
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
export default connect(mapStateToProps)(FindClientPasswordLayout);
