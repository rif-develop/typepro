import React from 'react';
import * as styles from './Section01.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section01 extends React.Component {
    constructor(props){
        super(props);

    }
    shouldComponentUpdate(nextProps) {
        return nextProps;
    }

    render() {
        let language = this.props.language;
        return (
            <div className={cx(styles['first-section'], 'section')}>
                <div className={styles['first-section--txt']}>
                    <div className={styles['first-section--txt__title']}>
                        <h1>{language.smartbottle.section01['00']}</h1>
                    </div>
                    <p>{language.smartbottle.section01['01']}<br/>{language.smartbottle.section01['02']}<br/>{language.smartbottle.section01['03']}</p>
                </div>
                <div className={styles['first-section--bottle']}>스마트 보틀 이미지입니다.</div>
            </div>
        )
    }
}

export default Section01;