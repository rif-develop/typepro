import React from 'react';
import styles from './OtherProduct.scss';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const cx = classNames.bind(styles);

class OtherProduct extends React.Component {


    shouldComponentUpdate(nextProps){
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
                    <h1>{language.smartbottle.section09['00']}</h1>
                </div>
                <div className={styles['other-product-section--products']}>
                    <div className={styles['pee-pee']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smartbottle.section09['01']}<br/>{language.smartbottle.section09['02']}</h5>
                        <p>{language.smartbottle.section09['03']}<br/>
                            {language.smartbottle.section09['04']}<br/>
                            {language.smartbottle.section09['05']}</p>
                        <Link to={'/smartpeepee'}>
                            <button type={'button'} role={'button'}>{language.smartbottle.section09['common-button']}</button>
                        </Link>
                    </div>
                    <div className={styles['bottle']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smartbottle.section09['06']}<br/>{language.smartbottle.section09['07']}</h5>
                        <p>{language.smartbottle.section09['08']}<br/>
                            {language.smartbottle.section09['09']}<br/>
                            {language.smartbottle.section09['10']}</p>
                        <Link to={'/smartbottle'}>
                            <button type={'button'} role={'button'}>{language.smartbottle.section09['common-button']}</button>
                        </Link>
                    </div>
                    <div className={styles['temp']}>
                        <div className={styles["other-product-section--products--image"]}></div>
                        <h5>{language.smartbottle.section09['11']}<br/>{language.smartbottle.section09['12']}</h5>
                        <p>{language.smartbottle.section09['13']}<br/>
                            {language.smartbottle.section09['14']}<br/>
                            {language.smartbottle.section09['15']}</p>
                        <Link to={'/smarttemp'}>
                            <button type={'button'} role={'button'}>{language.smartbottle.section09['common-button']}</button>
                        </Link>
                    </div>
                </div>


            </div>
        )
    }
}

export default OtherProduct;