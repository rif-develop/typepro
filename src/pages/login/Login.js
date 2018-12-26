import React from 'react';


class Login extends React.Component {
    render() {
        return (
            <section className="login-section security">
                <div className="login-section--logo">
                    리틀원 로그인 섹션의 기업로고입니다.
                </div>
                <div className="login-section-form">
                    <form method="post" action="/login" role="form" id="littleone-login-form">
                        <fieldset>
                            <legend>리틀원의 로그인 페이지입니다. 아이디 비밀번호 입력 후 로그인 하실 수 있습니다.</legend>
                            <div className="login-section-form--box">
                                <label htmlFor="user_email" className="client-email"></label>
                                <input type="email" name="email" id="user_email" maxLength="42" required="required" autoCapitalize="off"/>
                                <button type="button" className="__remove-component __email" role="button">닫기</button>
                            </div>
                            <div className="login-section-form--box">
                                <label htmlFor="user_password" className="client_password"></label>
                                <input type="password" name="password" id="user_password" required="required" autoCapitalize="off" maxLength="16"/>
                                <button type="button" className="__remove-component __password" role="button">닫기</button>
                                <button type="button" className="__check-client-password-num" role="button"></button>
                            </div>
                            <div className="login-section-warning-text"></div>
                            <div className="login-section-captcha-area" id="gcaptcha_div"></div>
                            <div className="login-section-form--submit">
                                <button type="submit" className="__login-button" role="button">로그인</button>
                            </div>
                        </fieldset>
                        <div className="login-section-find-action-box">
                            <a href="#" className="__check-box-pointer">
                                <span>자동 로그인 체크박스 입니다.
                                    <svg width="15" height="12" viewBox="0 0 15 12" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.708 0l-7.5 7.447-2.916-2.895L0 6.83 5.208 12 15 2.277z" fill="#9013FE"
                                              fillRule="nonzero" id="auto-check-svg"/>
                                    </svg>
                                </span>
                                <label htmlFor="auto-login" className="__set-auto-login">
                                    <input type="checkbox" name="auto_login" id="auto-login" className="__check-component"/>
                                </label>
                            </a>
                            <div className="login-section-find-action-box--find-section">
                                <a href="/findid" className="__find-account">아이디 찾기</a>
                                <span className="login-section-find-action-box--find-section--vertical-bar"></span>
                                <a href="/findpassword" className="__find-password">비밀번호 찾기</a>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="login-section-horizontal-line">
                    <em>OR</em>
                    <span className="login-section-horizontal-line--bar"></span>
                </div>
                <div className="login-section-social-media">
                    <a href="/sociallogin/naver" className="__access-naver-account"><span></span><em>네이버 계정 로그인</em></a>
                    <a href="/sociallogin/google" id={'google-login-component'} className="__access-google-account"><span></span><em>구글 계정 로그인</em></a>
                    <a href="/sociallogin/kakao" id={'kakao-login-component'}><span></span><em>카카오 계정 로그인</em></a>
                </div>
                <div className="login-section-join">
                    <p>아직 계정이 없으신가요?</p><a href="/join">회원가입</a>
                </div>
            </section>
        );
    }
}

export default Login