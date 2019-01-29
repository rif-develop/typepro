import React from 'react';
import styles from "./HeaderAlarm.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);


class HeaderAlarm extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        /*dumb 컴포넌트(stateless)*/
        const test = [1,2,3,4,5,6,7,8,9];
        const List = ( items ) => {
            return (
                items.map((item, i) => <li key={i}>{item}</li>)
            )
        };

        return(
            <div className={cx(styles['alarm-list-component'],this.props.active && styles['active'])}>
                <div className={styles['alarm-list-component--triangle']}></div>
                <div className={styles['alarm-list-component--header']}>
                    <h4>알림</h4>
                    <button type={'button'}>모두 읽은 상태로 표시</button>
                </div>
                <ul className={styles['alarm-list-component--list']}>
                    {List(test)}
                </ul>
                <div className={styles['alarm-list-component--more']}>
                    <button type="button">모두 보기</button>
                </div>
            </div>
        )
    }
}

export default HeaderAlarm