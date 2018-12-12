import React from 'react';
import styles from './Section04.scss';

class Section04 extends React.Component{

    render(){
        const language = this.props.language;
        return(
            <section className={styles['fourth-section']}>
                <div className={styles['fourth-section--article']}>
                    <div>
                        <h1>더없이 행복한 혁신, <br/>스마트 디바이스</h1>
                        <p>리틀원의 스마트 시리즈를 통해 언제 어디서든<br/> 아이의 상태를 모니터링하고 케어하세요.<br/>
                            아이의 행복은 곧 엄마의 기쁨입니다.</p>
                    </div>
                </div>
                <div className={styles['fourth-section--mobile']}>
                    <div className={styles['fourth-section--mobile--devices']}>리틀원의 디바이스 제품군 사진입니다.</div>
                    <div className={styles['fourth-section--mobile--mobile']}>리틀원 앱 어플리케이션의 사진입니다.</div>
                    <div className={styles['fourth-section--mobile--pictures']}>리틀원의 갤러리 사진 나열 입니다.</div>
                </div>
            </section>
        )
    }
}
export default Section04;