import React from 'react';
import styles from './Section09.scss';
import classNames from 'classnames';
import {Link} from "react-router-dom";

const cx = classNames.bind(styles);

class Section09 extends React.Component {


    shouldComponentUpdate(nextProps) {
        return nextProps;
    }


    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['other-product-section'], 'section')}>
                <div className={styles['other-product-section--desc']}>
                    <div>
                        <h2>SMART SERIES</h2>
                    </div>
                    <h1>{language.smarttemp.section09['00']}</h1>
                </div>
                <div className={styles['other-product-section--products']}>
                    <div className={styles['pee-pee']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smarttemp.section09['01']}<br/>{language.smarttemp.section09['02']}</h5>
                        <p>{language.smarttemp.section09['03']}<br/>
                            {language.smarttemp.section09['04']}<br/>
                            {language.smarttemp.section09['05']}</p>
                        <Link to={'/device/smartpeepee'}>
                            <button type={'button'} role={'button'}>{language.smarttemp.section09['common-button']}</button>
                        </Link>
                    </div>
                    <div className={styles['bottle']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smarttemp.section09['06']}<br/>{language.smarttemp.section09['07']}</h5>
                        <p>{language.smarttemp.section09['08']}<br/>
                            {language.smarttemp.section09['09']}<br/>
                            {language.smarttemp.section09['10']}</p>
                        <Link to={'/device/smartbottle'}>
                            <button type={'button'} role={'button'}>{language.smarttemp.section09['common-button']}</button>
                        </Link>
                    </div>
                    <div className={styles['temp']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smarttemp.section09['11']}<br/>{language.smarttemp.section09['12']}</h5>
                        <p>{language.smarttemp.section09['13']}<br/>
                            {language.smarttemp.section09['14']}<br/>
                            {language.smarttemp.section09['15']}</p>
                        <Link to={'/device/smarttemp'}>
                            <button type={'button'} role={'button'}>{language.smarttemp.section09['common-button']}</button>
                        </Link>
                    </div>
                </div>


            </div>
        )
    }
}

export default Section09;