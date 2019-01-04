import React from 'react';
import styles from "../SettingLayout.scss";
import WithdrawalComponent from "../../../component/setting/option/WithdrawalComponent";

class WithdrawalMenu extends React.Component{
    render(){
        return(
            <ul className={styles['web-setting-section--container--options--measure-list']}>
                <WithdrawalComponent/>
            </ul>
        )
    }
}

export default WithdrawalMenu;