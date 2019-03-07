import React from 'react';
import styles from "./MobileHeaderAlarmComponent.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);


class MobileHeaderAlarmComponent extends React.PureComponent{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className={styles['mobile-alarm-list-component']}>
                <div className={styles['mobile-alarm-list-component--header']}>
                    <h4>알림</h4>
                    <button type={'button'}>모두 읽은 상태로 표시</button>
                </div>
                <ul className={styles['mobile-alarm-list-component--list']}>
                    mobile
                </ul>
                <div className={styles['mobile-alarm-list-component--more']}>
                    <button type="button">모두 보기</button>
                </div>
            </div>
        )
    }
}

export default MobileHeaderAlarmComponent