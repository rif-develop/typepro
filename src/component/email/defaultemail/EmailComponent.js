import React from 'react';
import styles from "./EmailComponent.scss";
import emailImg from './web-m-17-kor-icn-email.svg'

class DefaultEmailComponent extends React.Component{
    render(){
        return (
            <a href="javascript:void(0)" role="button" className={styles['component-default-email']}>
                <img src={emailImg} alt="이메일로 리틀원에 제품과 서비스에 대해 물어보세요!"/>
                <span>이메일로 문의하기</span>
            </a>
        )
    }
}

export default DefaultEmailComponent;