import React from 'react';
import styles from './Section05.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section05 extends React.Component{

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
                    <h1>{language.smarttemp.section05['00']}<br/>
                        {language.smarttemp.section05['01']}
                    </h1>
                    <p>{language.smarttemp.section05['02']}<br/>
                        {language.smarttemp.section05['03']}</p>
                </div>
                <div className={styles['fifth-section--image']}>리틀원의 대시보드로 편리한 육아를 경험해 보세요.</div>
            </div>
        )
    }
}
export default Section05;