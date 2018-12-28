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
                <div className={styles['seventh-section--bottle-image']}>
                    {language.smartbottle.section07['00']}
                </div>
                <div className={styles['seventh-section--desc']}>
                    <h1>
                        {language.smartbottle.section07['01']}<br/>
                        {language.smartbottle.section07['02']}
                    </h1>
                    <p>
                        {language.smartbottle.section07['03']}<br/>
                        {language.smartbottle.section07['04']}
                    </p>
                </div>
            </div>
        )
    }
}

export default Section07;