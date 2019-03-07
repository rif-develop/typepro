import React from 'react';
import styles from '../SettingLayout.scss';
import DefaultOptionComponent from "../../../component/setting/option/DefaultOptionComponent";
import EmailSubscriptionComponent from "../../../component/setting/option/EmailSubscriptionComponent";

class SubscribeMenu extends React.Component{
    render() {
        return(
            <ul className={styles['web-setting-section--container--options--list']}>
                <EmailSubscriptionComponent clientIdx={this.props.clientIdx}/>
            </ul>
        )
    }
}

export default SubscribeMenu