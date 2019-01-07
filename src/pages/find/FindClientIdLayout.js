import React, {Fragment} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";

const cx = classnames.bind(styles);

class FindClientIdLayout extends React.Component {

    componentDidMount() {
        document.body.scrollTo(0,0);
    }
    render() {
        const {language} = this.props;
        return (
            <Fragment>
                <Head title={'리틀원 - 아이디 찾기'} desc={'휴대폰 인증을 통하여 회원님의 아이디를 찾을 수 있는 페이지입니다.'} language={language}/>
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
                    <div id="find-result-box">
                        <p>등록된 아이디가 없습니다.</p>
                        <Link to={'/login'}>
                            로그인 화면으로
                        </Link>
                    </div>
                    <div>
                        <form className="client-join-section--form" id="client-join-section--form" role="form" action="/find_email" method="POST">
                            <fieldset form="client-join-section--form">
                                <legend>리틀원의 아이디 찾기 폼입니다.</legend>
                                <div className={styles['client-join-section--form--authorization-box']}>
                                    <a href="javascript:void(0)" className={styles['__auth-client-phone-button']} role="button" id="buttons">
                                        <span className={styles['--mobile-icon']}>휴대폰 인증</span>
                                        <input type="hidden" name="phone"/>
                                        <span className={styles['__authorization']}></span>
                                    </a>
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
        language:state.languageReducer.language
    }
};
export default connect(mapStateToProps)(FindClientIdLayout);
