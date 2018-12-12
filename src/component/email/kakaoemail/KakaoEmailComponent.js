import React from 'react';
import styles from './KakaoEmailComponent.scss';
import kakaoImg from './web-m-17-kor-icn-kakaotalk.svg'

class KakaoEmailComponent extends React.Component{
    render(){
        return(
            <a href="javascript:void(0)" role="button" className={styles['component-kakao-email']}>
                <img src={kakaoImg} alt="카카오톡으로 리틀원에 대해 물어보는 아이콘"/>
                <span>카카오톡으로 문의하기</span>
            </a>
        )
    }
}

export default KakaoEmailComponent;