import React from 'react';
import styles from './Section01.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section01 extends React.Component {

    shouldComponentUpdate(nextProps){
        return nextProps;
    }

    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['first-section'], 'section')}>
                <div className={styles['first-section--txt']}>
                    <div className={styles['first-section--txt__title']}>
                        <h1>{language.smarttemp.section01['00']}</h1>
                    </div>
                    <p>{language.smarttemp.section01['01']}<br/>
                        {language.smarttemp.section01['02']}<br/>
                        {language.smarttemp.section01['03']}</p>
                </div>
                <div className={styles['first-section--temp']}>{language.smarttemp.section01['01']} {language.smarttemp.section01['02']} {language.smarttemp.section01['03']}</div>
            </div>
        )
    }
}

export default Section01;