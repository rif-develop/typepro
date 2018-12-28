import React from 'react';
import * as styles from "./Section03.scss";
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section03 extends React.Component {


    shouldComponentUpdate(nextProps){
        return nextProps
    }

    render() {

        let language = this.props.language;

        return (
            <div className={cx(styles['third-section'], 'section')}>
                <div className={styles['third-section--desc']}>
                    <div className={styles['third-section--desc--integration']}>
                        <h2>APP INTEGRATION</h2>
                    </div>
                    <h1 data-action="anime-06">{language.smartbottle.section03['00']}<br/>{language.smartbottle.section03['01']}</h1>
                    <p data-action="anime-07">{language.smartbottle.section03['02']}<br/>
                        {language.smartbottle.section03['03']}</p>
                </div>
                <div className={styles['third-section--progress']}>
                    <div>
                        <img className={styles['third-section--progress--device']} data-action="anime-08"
                             src={require('./web-bottle-3-icon-1@2x .png')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartbottle.section03['04']}</span>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--data']} data-action="anime-08"
                             src={require('./web-bottle-3-date@2x.png')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--device']} data-action="anime-08"
                             src={require('./web-bottle-3-icon-2@2x .png')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartbottle.section03['05']}</span>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--data']} data-action="anime-08"
                             src={require('./web-bottle-3-platform@2x.png')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--device']} data-action="anime-08"
                             src={require('./web-bottle-3-icon-3@2x.png')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartbottle.section03['06']}</span>
                    </div>
                    <span data-action="anime-09" className={styles['horizon-bar']}></span>
                </div>
                <div className={styles['third-section--devices']}>
                    <img src={require('./web-bottle-3-bottle@2x.png')} alt={'스마트 보틀'} width={"auto"} height={"auto"} data-action="anime-10"/>
                    <img src={require('./web-bottle-3-mobile@2x.png')} alt={'앱 어플리케이션의 이미지'} width={"auto"} height={"auto"} data-action="anime-11"/>
                </div>


            </div>
        )
    }
}

export default Section03