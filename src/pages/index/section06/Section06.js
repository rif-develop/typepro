import React from 'react';
import styles from './Section06.scss';

class Section06 extends React.Component{
    render(){
        const language = this.props.language;
        return(
            <section className={styles['seventh-section']}>
                <div className={styles['seventh-section--txt']}>
                    <h1>스마트 피피</h1>
                    <p>아기가 자주 울어서 혹은 잘 울지 않아서 적절한 기저귀 교체 시기를 놓치셨나요.<br/>
                        <em>스마트 피피</em>로 배변 알림을 받고 기저귀를 교체해보세요. 엉덩이 짓무름을 예방하고 늘 보송보송하게 유지해드립니다!</p>
                </div>
                <svg viewBox="0 0 324 330" width="324" height="330" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient x1="6.95%" y1="16.146%" x2="96.282%" y2="63.497%" id="Fo">
                            <stop stopColor="#24FCD2" offset="0%"/>
                            <stop stopColor="#51C8DD" offset="100%"/>
                        </linearGradient>
                    </defs>
                    <path
                        d="M307.507 101.809c-2.988-4.552-6.63-8.512-10.267-12.413 0 0-59.628-68.006-160.697-86.73-27.67-6.372-58.199-1.43-84.18 15.994C26.38 36.084 10.401 62.61 5.854 90.566-14.67 191.21 25.341 271.958 25.601 272.348a106.605 106.605 0 0 0 7.795 14.043c24.812 36.799 70.54 51.492 112.63 39.53 0 0 68.202-16.774 144.718-92.842 36.245-34.588 44.434-90.051 16.763-131.27z"
                        fill="url(#Fo)" fillRule="nonzero" opacity=".85"/>
                </svg>
            </section>
        )
    }
}

export default Section06;