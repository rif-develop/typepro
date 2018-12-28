import React from 'react';
import * as styles from './Section05.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section05 extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps;
    }

    render() {

        let language = this.props.language;
        return (
            <div className={cx(styles['fifth-section'], 'section')}>
                <div className={styles['fifth-section--desc']}>
                    <div className={styles['fifth-section--desc--head']}>
                        <h2>PARENTING REPORTS</h2>
                    </div>
                    <h1 data-action="anime-17">{language.smartbottle.section05['00']}<br/>
                        {language.smartbottle.section05['01']}
                    </h1>
                    <p data-action="anime-18">{language.smartbottle.section05['02']}<br/>
                        {language.smartbottle.section05['03']}</p>
                </div>
                <div className={styles['fifth-section--image']}>{language.smartbottle.section05['04']}</div>
            </div>
        )
    }
}

export default Section05;