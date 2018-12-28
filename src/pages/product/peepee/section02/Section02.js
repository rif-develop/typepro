import React from 'react';
import * as styles from "./Section02.scss";
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section02 extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps;
    }

    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['second-section'], 'section')}>
                <div className={styles['second-section-desc']}>
                    <div className={styles['second-section-desc--sub']}>
                        <h2>{language.smartpeepee.section02['00']}</h2>
                    </div>
                    <h1 className={styles['second-section-desc--title']}>{language.smartpeepee.section02['01']}<br/>{language.smartpeepee.section02['02']}</h1>
                    <p className={styles['second-section-desc--paragraph']}>{language.smartpeepee.section02['03']}<br/>{language.smartpeepee.section02['04']}</p>
                </div>
                <div className={styles['second-section-spec']}>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-peepee-2-icon-1@2x.png')}
                             alt="제공되는 패치에 부착하여 기저귀 종류에 관계 없이손쉽게 사용할 수 있습니다." width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smartpeepee.section02['05']}</h3>
                            <p>{language.smartpeepee.section02['06']}<br/>
                                {language.smartpeepee.section02['07']}<br/>
                                {language.smartpeepee.section02['08']}</p>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-peepee-2-icon-2@2x.png')} alt={'배변활동이 감지되면 보호자의 스마트폰 앱을 통해 알림을 줍니다.'} width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smartpeepee.section02['09']}</h3>
                            <div>
                                <p>{language.smartpeepee.section02['10']}<br/>
                                    {language.smartpeepee.section02['11']}<br/>
                                    {language.smartpeepee.section02['12']}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-peepee-2-icon-3@2x.png')} alt={'배변활동을 수집하고 기록하여 아기의 다음번 배변 시점을 예측할 수 있도록 돕습니다.'} width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smartpeepee.section02['13']}</h3>
                            <p>{language.smartpeepee.section02['14']}<br/>
                                {language.smartpeepee.section02['15']}<br/>
                                {language.smartpeepee.section02['16']}</p>
                        </div>
                    </div>
                    <div className={styles['second-section-spec--container']}>
                        <img src={require('./web-peepee-2-icon-4@2x.png')} alt={'배변 시점을 제때 파악하여 기저귀 발진의 위험을 현저히 감소시켜 줍니다.'} width={"auto"} height={"auto"}/>
                        <div>
                            <h3>{language.smartpeepee.section02['17']}</h3>
                            <p>{language.smartpeepee.section02['18']} {language.smartpeepee.section02['19']} {language.smartpeepee.section02['20']}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Section02;