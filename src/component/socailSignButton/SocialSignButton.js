import React from 'react';
import {Link} from "react-router-dom";
import styles from './SocialSignButton.scss'

class SocialSignButton extends React.Component{
    render(){
        return(
            <div className={styles['social-sign-component']}>
                <Link to={"/"} className={styles['__access-naver-account']}><span></span><em>네이버 계정 가입</em></Link>
                <Link to={"/"} className={styles['__access-google-account']}><span></span><em>구글 계정 가입</em></Link>
                <Link to={"/"} className={styles['__access-kakao-account']}><span></span><em>카카오 계정 가입</em></Link>
            </div>
        )
    }
}

export default SocialSignButton