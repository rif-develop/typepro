import React, {Fragment} from 'react';
import styles from './Section02.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section02 extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps;
    }


    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['second-section'], 'section')}>
                <div className={styles['second-section-desc']}>
                    <div className={styles['second-section-desc--sub']}>
                        <h2>INTERNET OF BABIES</h2>
                    </div>
                    <h1 className={styles['second-section-desc--title']}>{language.smarttemp.section02['01'].split('\n').map(function (item, key) {
                        return (
                            <Fragment key={key}>
                                {item}
                                <br/>
                            </Fragment>
                        )
                    })}{language.smarttemp.section02['02']}</h1>
                    <p className={styles['second-section-desc--paragraph']}>{language.smarttemp.section02['03']}
                        <br/>{language.smarttemp.section02['04']}</p>
                </div>
                <div className={styles['second-section-spec']}>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-temp-2-icon-1.svg')}
                             alt="저전력 블루투스 통신으로 연동앱에 체온 변화 추이를 송신하며 설정 온도 이상 시 알림을 줍니다." width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smarttemp.section02['05']}</h3>
                            <p>{language.smarttemp.section02['06']} {language.smarttemp.section02['07']} {language.smarttemp.section02['08']}</p>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-temp-2-icon-2.svg')} alt="디바이스의 디스플레이로 체온 및 배터리 잔량 확인 가능합니다." width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smarttemp.section02['09']}</h3>
                            <div>
                                <p>{language.smarttemp.section02['10']} {language.smarttemp.section02['11']} {language.smarttemp.section02['12']}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-temp-2-icon-3.svg')} alt="고정밀 온도 센서 탑재로 오차 없이 정확하게 체온을 잴 수 있습니다." width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smarttemp.section02['13']}</h3>
                            <p>{language.smarttemp.section02['14']} {language.smarttemp.section02['15']} {language.smarttemp.section02['16']}</p>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-temp-2-icon-4.svg')}
                             alt="열기와 습기를 효과적으로 방출하고 알러지로부터 민감한 아기 피부를 보호합니다." width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smarttemp.section02['17']}</h3>
                            <p>{language.smarttemp.section02['18']} {language.smarttemp.section02['19']} {language.smarttemp.section02['20']}</p>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Section02;