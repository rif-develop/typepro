import React from 'react';
import styles from './Section05.scss'

class Section05 extends React.Component{

    render(){
        return(
            <section className={styles['fifth-section']}>
                <div>
                    <h1>스마트 보틀</h1>
                    <p>분유를 탈 때 너무 뜨겁지 않을까 걱정하셨나요.<br/>
                        수유할 때 우유 역류로 인한 질식이 염려되었나요.<em>스마트 보틀</em>이 영리하게 감지하여 알려드립니다!</p>
                </div>
                <svg viewBox="0 0 566 576" width="566" height="576" xmlns="http://www.w3.org/2000/svg" className="viewBox">
                    <defs>
                        <filter id="turb">
                            <feTurbulence id="turbwave" type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="turbulence_3" data-filterid="3"/>
                            <feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="turbulence_3" scale="40"/>
                        </filter>
                        <radialGradient cx="-5.741%" cy="113.797%" fx="-5.741%" fy="113.797%" r="149.243%"
                                        gradientTransform="matrix(1 0 0 .98264 0 .02)" id="svg-section-06">
                            <stop stopColor="#B620B4" offset="0%"/>
                            <stop stopColor="#A227B6" offset="15.76%"/>
                            <stop stopColor="#7437BC" offset="44.86%"/>
                            <stop stopColor="#623FB1" offset="58.39%"/>
                            <stop stopColor="#444E9F" offset="84.96%"/>
                            <stop stopColor="#395398" offset="100%"/>
                        </radialGradient>
                    </defs>
                    <path className="mobile_bubble"
                          d="M825.189 617.702c-5.22-7.944-11.583-14.857-17.937-21.666 0 0-104.165-118.7-280.723-151.383-48.338-11.121-101.669-2.497-147.057 27.916-45.387 30.413-73.3 76.713-81.244 125.51-35.856 175.668 34.041 316.611 34.495 317.292 3.858 8.398 8.397 16.569 13.616 24.512 43.346 64.23 123.228 89.877 196.756 68.997 0 0 119.143-29.279 252.81-162.051 63.316-60.372 77.622-157.18 29.284-229.127z"
                          transform="translate(-288 -440)" fill="url(#svg-section-06)" fillRule="nonzero" opacity=".8"/>
                </svg>
            </section>
        )
    }

}

export default Section05;