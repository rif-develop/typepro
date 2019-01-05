import React, {Fragment} from 'react';
import styles from './SignupLayout.scss';
import classnames from 'classnames';
import {Link} from "react-router-dom";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import SocialSignButton from "../../component/socailSignButton/SocialSignButton";
import InputEmailComponent from "../../component/input/InputEmailComponent";

const cx = classnames.bind(styles);

class SignupLayout extends React.Component {
    render() {
        return (
            <Fragment>
                <Head title={'리틀원 - 회원가입'} description={'리틀원에 회원가입하고 다양한 육아정보를 얻어보세요.'}/>
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
                                <div className={styles['client-join-section--form--box']}>
                                    <label htmlFor="password-input-component" className={styles['password-icon']}></label>
                                    <input type="password" name="password" required="required" id="password-input-component" maxLength="20" placeholder="" autoCapitalize="off"
                                           className={styles['__default-input-component']}/>
                                    <button type="button" role="button" data-name="password" className={styles['__remove-input-button']}>입력 값을 지웁니다.</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={styles['__check-animation']} data-name="password">
                                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit="10" d="M1.1,5.6"/>
                                    </svg>
                                </div>
                                <div className={styles['client-join-section--form--warning']} data-name="password">
                                    <em className={styles['pass']}></em>
                                </div>
                                <div className={styles['client-join-section--form--box']}>
                                    <label htmlFor="re-password-input-component" className={styles['password-icon']} title=""></label>
                                    <input type="password" name="re-password" required={true} id="re-password-input-component" maxLength="20" placeholder="#{join.password_confirm.placeholder}" autoCapitalize="off"
                                           className={styles['__default-input-component']}/>
                                    <button type="button" role="button" data-name="re-password" className={styles['__remove-input-button']}>입력 값을 지웁니다.</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={styles['__check-animation']} data-name="re-password">
                                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit="10" d="M1.1,5.6"/>
                                    </svg>
                                </div>
                                <div className={styles['client-join-section--form--warning']} data-name="re-password">
                                    <em></em>
                                </div>
                                <div className={styles['client-join-section--form--box']}>
                                    <label htmlFor="nickname-icon-input-component" className={styles['nickname-icon']} title="#{join.nickname.placeholder}"></label>
                                    <input type="text" name="nickname" required={true}
                                           id="nickname-icon-input-component" placeholder="#{join.nickname.placeholder}"
                                           autoCapitalize="off" className={styles['__default-input-component']}/>
                                    <button type="button" role="button" data-name="nickname" className={styles['__remove-input-button']}>입력 값을 지웁니다.</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={styles['__check-animation']} data-name="nickname">
                                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit="10" d="M1.1,5.6"/>
                                    </svg>
                                </div>
                                <div className={styles['client-join-section--form--warning']} data-name="nickname">
                                    <em></em>
                                </div>
                                <div className={styles['client-join-section--form--box']}>
                                    <label htmlFor="last-name-input-component" className={styles['family-name-icon']}></label>
                                    <input type="text" name="name" required={true} id="last-name-input-component" placeholder="#{join.name.placeholder}" autoCapitalize="off" className={styles['__default-input-component']} maxLength="24"/>
                                    <button type="button" role="button" data-name="name" className={styles['__remove-input-button']}>입력 값을 지웁니다.</button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 12" className={styles['__check-animation']} data-name="name">
                                        <path fill="none" stroke="#19ebdd" strokeWidth="3" strokeMiterlimit="10" d="M1.1,5.6"/>
                                    </svg>
                                </div>
                                <div className={styles['client-join-section--form--warning']} data-name="name">
                                    <em></em>
                                </div>
                                <div className={cx(styles['client-join-section--form--box'], styles['multiple-input-box'])}>
                                    <div className={styles['multiple-input-box--icon']}>
                                        <label htmlFor="birthdate-input-component" className={styles['birthdate-icon']} title="#{join.birth.title}"></label>
                                    </div>
                                    <input type="text" name="year" id="birthdate-input-component" placeholder="YYYY" autoCapitalize="off" className={styles['__birth-date-input-component']} required={true} maxLength="4"/>
                                    <input type="text" name="month" placeholder="MM" autoCapitalize="off" className={styles['__birth-date-input-component']} required={true} maxLength="2"/>
                                    <input type="text" name="date" placeholder="DD" autoCapitalize="off" className={styles['__birth-date-input-component']} required={true} maxLength="2"/>
                                </div>
                                <div className={styles['client-join-section--form--warning']} data-name="birthdate">
                                    <em></em>
                                </div>
                                <div className="client-join-section--form--box" style={{'overflow':'hidden', 'borderBottom': 'none'}}>
                                    <label htmlFor="gender-input-component--female" className="gender-icon" title="성별을 선택해주세요."></label>
                                    <label htmlFor="gender-input-component--female" className="__check-button active">여성
                                        <input type="radio" name="gender" id="gender-input-component--female" defaultValue="f" defaultChecked={true} className={styles['__radio-input-component']}/></label>
                                    <label htmlFor="gender-input-component--male" className="__check-button">남성
                                        <input type="radio" name="gender" id="gender-input-component--male" defaultValue="m" className="__radio-input-component"/></label>
                                </div>
                                <div className="client-join-section--form--warning" data-name="gender"></div>
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
                                <div className="client-join-section--form--terms-box">
                                    <a href="javascript:void(0)" className="__check-terms-agree-button" role="button"
                                       aria-labelledby="term-check-input-component">
                                        <svg width="15" height="12" viewBox="0 0 15 12" className="svg-animated">
                                            <path d="M12.708 0l-7.5 7.447-2.916-2.895L0 6.83 5.208 12 15 2.277z" fill="#9013FE" fillRule={"nonzero"}/>
                                        </svg>
                                    </a>
                                    <label htmlFor="term-check-input-component" className="__terms-and-agree">
                                        <Link to="/privacypolicy" role="link" target="_blank">개인정보보호정책</Link><Link to="/termsofuse" role="link" target="_blank">모든 약관</Link>
                                        <input type="checkbox" name="terms" id="term-check-input-component" role="checkbox" required="required" defaultChecked={false}/>
                                    </label>
                                </div>
                                <div className="client-join-section--form--warning" data-name="terms">
                                    <em></em>
                                </div>
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

export default SignupLayout;