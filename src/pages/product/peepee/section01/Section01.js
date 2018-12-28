import React from 'react';
import styles from './Section01.scss';
import classNames from 'classnames';

const cx = classNames.bind(styles);

class Section01 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            default:'',
            dev:false
        }
    }

    shouldComponentUpdate(nextProps){
        return nextProps;
    }
    render(){
        let language = this.props.language;
        return(
            <div className={cx(styles['first-section'],'section')}>
                <div className={styles['first-section--txt']}>
                    <div className={styles['first-section--txt__title']}>
                        <h1>{language.smartpeepee.section01['00']}</h1>
                    </div>
                    <p>{language.smartpeepee.section01['01']}<br/>
                        {language.smartpeepee.section01['02']}<br/>
                        {language.smartpeepee.section01['03']}</p>
                </div>
                <div className={styles['first-section--peepee']} title={'SMART PEE-PEE'}>스마트 보틀 이미지입니다.</div>
            </div>
        )
    }
}

export default Section01;