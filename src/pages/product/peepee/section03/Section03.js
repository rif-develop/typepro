import React, {Fragment} from 'react';
import styles from './Section03.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section03 extends React.Component {

    shouldComponentUpdate(nextProps) {
        return nextProps;
    }

    render() {
        let language = this.props.language;

        return (
            <div className={cx(styles['third-section'], 'section')}>
                <div className={styles['third-section--desc']}>
                    <div className={styles['third-section--desc--integration']}>
                        <h2>APP INTEGRATION</h2>
                    </div>
                    <h1>{language.smartpeepee.section03['00']}<br/>{language.smartpeepee.section03['01']}</h1>
                    <p>{language.smartpeepee.section03['02']}{language.smartpeepee.section03['03']}</p>
                </div>
                <div className={styles['third-section--progress']}>
                    <div>
                        <img className={styles['third-section--progress--device']}
                             src={require('./web-peepee-3-icon-1.svg')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartpeepee.section03['04']}</span>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--data']}
                             src={require('./web-bottle-3-date.svg')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--device']}
                             src={require('./web-peepee-3-icon-2.svg')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartpeepee.section03['05']}</span>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--data']}
                             src={require('./web-bottle-3-platform.svg')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                    </div>
                    <div>
                        <img className={styles['third-section--progress--device']}
                             src={require('./web-peepee-3-icon-3.svg')} alt={'스마트보틀과 앱의 연동'} width={"auto"} height={"auto"}/>
                        <span>{language.smartpeepee.section03['06']}</span>
                    </div>
                    <span className={styles['horizon-bar']}></span>
                </div>
                <div className={styles['third-section--devices']}>
                    <img src={require('./web-peepee-3-peepee@2x.png')} alt={'스마트 보틀'} width={"auto"} height={"auto"}/>
                    <img src={require('./web-peepee-3-mobile@2x.png')} alt={'앱 어플리케이션의 이미지'} width={"auto"} height={"auto"}/>
                </div>
            </div>
        )
    }
}

export default Section03;