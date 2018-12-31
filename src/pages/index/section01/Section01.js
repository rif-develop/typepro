import React from 'react';
import styles from './Section01.scss';
import classNames from 'classnames';
const cx = classNames.bind(styles);

class Section01 extends React.Component{

    constructor(props){
        super(props);
    }
    render(){

        const language = this.props.language;
        return(
            <section className={cx(styles['main-section'],'section')}>
                <div className={styles['main-section--content']}>
                    <div className={styles['outer']}>
                        <div className={styles['inner']}>
                            <div className={styles['centered']}>
                                <div></div>
                                <div className={styles['main-section--content--text']}>
                                    <div className={styles['main-section--content--text__upper']}>
                                        <h1></h1>
                                    </div>
                                    <div className={styles['main-section--content--text__lower']}>
                                        <p></p>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles['main-section--svg-container']}>
                    <svg width="532" height="513" viewBox="0 0 532 513" id={styles['violet']}>
                        <defs>
                            <radialGradient cx="-19.513%" cy="89.587%" fx="-19.513%" fy="89.587%" r="139.856%"
                                            gradientTransform="matrix(.85454 -.4665 .45729 .89748 -.438 0)"
                                            id="violetColor">
                                <stop stopColor="#B620B4" offset="0%"/>
                                <stop stopColor="#3726AF" offset="100%"/>
                            </radialGradient>
                        </defs>
                        <path id="violet-one"
                              d="M528.805 144.532C521.3 97.183 488.097 48.514 436.778 26.95 385.46 5.383 294.643-5.13 230.926 2.45 167.208 10.033 98.08 23.381 55.647 64.234 13.214 105.086-14.909 166.159 8.443 240.668c23.352 74.51 66.843 148.604 139.515 216.06 72.673 67.455 152.487 70.83 217.185 28.381 64.697-42.45 110.55-135.469 136.267-198.44 25.717-62.971 34.06-100.093 27.395-142.137z"
                              fill="url(#violetColor)" fillRule="evenodd" opacity=".896"/>
                    </svg>
                    <svg width="532" height="513" viewBox="0 0 532 513" id={styles['purple']}>
                        <defs>
                            <linearGradient x1="1.879%" y1="40.27%" x2="105.235%" y2="40.27%" id="purpleColor">
                                <stop stopColor="#B620B4" offset="0%"/>
                                <stop stopColor="#7437BC" offset="100%"/>
                            </linearGradient>
                        </defs>
                        <path id="purple-one"
                              d="M530.752 362.109c9.752-68.076-39.012-188.737-98.21-263.415C373.344 24.016 330.504 3.206 270.555.225c-59.95-2.98-107.77 23.79-149.24 71.931-41.47 48.14-61.623 80.755-80.072 120.52C22.793 232.443-3.587 300.937.405 354.26c3.991 53.323 42.612 120.037 125.305 142.859 82.694 22.822 184.502 18.325 264.564 3.6C470.337 485.994 521 430.186 530.752 362.11z"
                              fill="url(#purpleColor)" fillRule="evenodd" opacity=".9"/>
                    </svg>
                    <svg width="577" height="577" viewBox="0 0 577 577" id={styles['green']}>
                        <defs>
                            <linearGradient x1="6.116%" y1="6.905%" x2="95.02%" y2="91.749%" id="greenColor">
                                <stop stopColor="#00FFCD" offset="0%"/>
                                <stop stopColor="#00D4E4" offset="100%"/>
                            </linearGradient>
                        </defs>
                        <path id="green-one"
                              d="M541.317 169.948c-33.91-41.177-73.476-70.409-132.648-105.33C363.035 37.685 288.5 11.05 233.439 2.792c-55.06-8.258-90.923 2.32-131.886 24.816C60.59 50.104 25.256 95.316 13.738 142.903S-2.127 236.1.968 291.38c3.62 64.656 24.306 143.548 44.33 185.018 20.022 41.47 54.599 71.94 92.447 87.217 46.042 18.583 97.844 17.098 143.101 0 45.258-17.099 76.856-32.659 127.823-66.586 50.966-33.927 87.887-67.74 116.62-96.828 28.735-29.088 45.82-64.792 50.73-107.9 4.909-43.108-8.895-90.105-34.702-122.352z"
                              fill="url(#greenColor)" fillRule="evenodd" opacity=".9"/>
                    </svg>
                </div>
            </section>
        )
    }
}

export default Section01;