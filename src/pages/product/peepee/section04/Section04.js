import React from 'react';
import styles from './Section04.scss'
import classNames from 'classnames';
import {getCookie} from "../../../library/_LittleoneScript";

const cx = classNames.bind(styles);

class Section04 extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps;
    }

    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['fourth-section'], 'section')}>
                <div className={styles['fourth-section--desc']}>
                    <div className={styles['fourth-section--integration']}>
                        <h2>APP INTEGRATION</h2>
                    </div>
                    <h1>{language.smartpeepee.section04['00']}<br/>{language.smartpeepee.section04['01']}</h1>
                </div>
                <div className={styles['fourth-section--spec']}>
                    <div className={styles['fourth-section--spec--box']}>
                        <img src={require('./web-peepee-4-icon-1.svg')} alt={'기저귀 상태  - 실시간 기저귀의 습도 및 온도를 보여줍니다.'} width={"auto"} height={"auto"}/>
                        <div className={styles['fourth-section--spec--box--txt']}>
                            <h3>{language.smartpeepee.section04['02']}</h3>
                            <p>{language.smartpeepee.section04['03']}<br/>
                                {language.smartpeepee.section04['04']}</p>
                        </div>
                    </div>
                    <div className={styles['fourth-section--spec--box']}>
                        <img src={require('./web-peepee-4-icon-2.svg')} alt={'배변 알림 - 배변시 앱을 통해 알려주고 배변일지를 작성합니다.'} width={"auto"} height={"auto"}/>
                        <div className={styles['fourth-section--spec--box--txt']}>
                            <h3>{language.smartpeepee.section04['05']}</h3>
                            <p>{language.smartpeepee.section04['06']}<br/>
                                {language.smartpeepee.section04['07']}</p>
                        </div>
                    </div>
                    <div className={styles['fourth-section--spec--box']}>
                        <img src={ getCookie('lang') === 'ko' ? require('./web-peepee-4-icon-3.svg'): require('./web-peepee-4-icon-3-eng@2x.png')}
                             alt={'기저귀 소비량 확인 - 기저귀 교체를 감지해 다음 번 기저귀 주문 시점을 예측할 수 있습니다.'} width={"auto"} height={"auto"}/>
                        <div className={styles['fourth-section--spec--box--txt']}>
                            <h3>{language.smartpeepee.section04['08']}</h3>
                            <p>{language.smartpeepee.section04['09']}<br/>
                                {language.smartpeepee.section04['10']}</p>
                        </div>
                    </div>
                </div>
                <div className={styles['fourth-section--app-image']}></div>
            </div>
        )
    }
}

export default Section04;
