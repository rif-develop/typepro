import React from 'react';
import styles from '../DashboardHeader.scss';

class _ConnectedDeviceComponent extends React.PureComponent {
    render() {

        const {bottleImg, tempImg, peepeeImg} = this.props;

        return (
            <div className={styles['dashboard-header-component--device']}>
                <div className={styles['dashboard-header-component--device--desc']}>
                    <p>연결된<br/>디바이스</p>
                </div>
                <div className={styles['dashboard-header-component--device__connected']}>
                    <img alt={'현재 웹 어플리케이션과 스마트보틀은 연동되어 있는 상태가 아닙니다.'} src={bottleImg} width="auto" height="auto"/>
                    <img alt={'현재 웹 어플리케이션과 스마트피피는 연동되어 있는 상태가 아닙니다.'} src={peepeeImg} width="auto" height="auto"/>
                    <img alt={'현재 웹 어플리케이션과 스마트템플은 연동되어 있는 상태가 아닙니다.'} src={tempImg} width="auto" height="auto"/>
                </div>
            </div>
        )
    }
}

export default _ConnectedDeviceComponent