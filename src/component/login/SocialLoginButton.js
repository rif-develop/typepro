import React from 'react';

class SocialLoginButton extends React.Component{
    render(){
        return(
            <div className="login-section-social-media">
                <a href="/sociallogin/naver" className="__access-naver-account"><span></span><em>네이버 계정 로그인</em></a>
                <a href="/sociallogin/google" id={'google-login-component'} className="__access-google-account"><span></span><em>구글 계정 로그인</em></a>
                <a href="/sociallogin/kakao" id={'kakao-login-component'}><span></span><em>카카오 계정 로그인</em></a>
            </div>
        )
    }
}

export default SocialLoginButton