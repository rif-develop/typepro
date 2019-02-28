import React from 'react';
import styles from './QrcodeForwardLayout.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

import {getOS} from "../../lib/script";

class QrcodeForwardLayout extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            os: null
        }
    }

    componentDidMount() {

        let os = getOS();

        let visitedTime = (new Date()).getTime();//방문시간

        if (os === 'iOS' || os === 'Mac OS') {
            this.setState({
                os:'앱 스토어로 이동합니다.'
            });
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://itunes.apple.com/kr/app/jellidaesi/id1436950482?mt=8')
                }
            }, 400);
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://itunes.apple.com/kr/app/jellidaesi/id1436950482?mt=8')
                }
            }, 800);

            setTimeout(function () {
                window.location.replace('https://itunes.apple.com/kr/app/jellidaesi/id1436950482?mt=8')
            }, 0)

        } else if (os === 'Android') {
            this.setState({
                os:'플레이 스토어로 이동합니다.'
            });
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://play.google.com/store/apps/details?id=com.littleone.feeder')
                }
            }, 800);
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://play.google.com/store/apps/details?id=com.littleone.feeder')
                }
            }, 400);
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://play.google.com/store/apps/details?id=com.littleone.feeder')
                }
            }, 0);
        } else {
            setTimeout(function () {
                if ((new Date().getTime() - visitedTime < 3000)) {
                    window.location.replace('https://play.google.com/store/apps/details?id=com.littleone.feeder')
                }
            }, 400);
        }
    }

    render() {
        return (
            <div className={styles['qrcode-page-component']}>
                <h1 className={styles['qrcode-page-component--title']}>
                    {this.state.os ? this.state.os : '디바이스를 식별 중입니다.'}
                </h1>
                <div className={styles['qrcode-page-component--container']}>
                    <a href={'https://play.google.com/store/apps/details?id=com.xrz.xxkko'}>
                        안드로이드 버전
                    </a>
                </div>
                <div className={styles['qrcode-page-component--container']}>
                    <a href={'https://itunes.apple.com/kr/app/jellidaesi/id1436950482?mt=8'}>
                        IOS 버전
                    </a>
                </div>
            </div>
        )
    }
}

export default QrcodeForwardLayout;