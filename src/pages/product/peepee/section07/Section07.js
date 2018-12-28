import React from 'react';
import * as styles from './Section07.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section07 extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps;
    }
    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['seventh-section'], 'section')}>
                <div className={styles['seventh-section--desc']}>
                    <div className={styles['seventh-section--desc--app-integration']}>
                        <h2>PRODUCT DETAIL</h2>
                    </div>
                    <h1>
                        {language.smartpeepee.section07['00']}<br/>
                        {language.smartpeepee.section07['01']}
                    </h1>
                    <p>
                        {language.smartpeepee.section07['02']}
                    </p>
                </div>
                <div className={styles['seventh-section--bottle-image']}>
                    {language.smartpeepee.section07['03']}
                </div>
            </div>
        )
    }
}

export default Section07;