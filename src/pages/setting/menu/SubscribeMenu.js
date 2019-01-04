import React from 'react';
import styles from '../SettingLayout.scss';
import DefaultOptionComponent from "../../../component/setting/option/DefaultOptionComponent";

class SubscribeMenu extends React.Component{
    render() {
        return(
            <ul className={styles['web-setting-section--container--options--list']}>
                <DefaultOptionComponent name={'이메일 구독'} desc={'리틀원의 이벤트 및 소식 등에 대한 메일링을 받습니다.'} optionName={'email-subscription'}/>
            </ul>
        )
    }
}

export default SubscribeMenu