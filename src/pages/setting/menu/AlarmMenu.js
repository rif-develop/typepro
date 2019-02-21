import React from 'react';
import styles from '../SettingLayout.scss';
import DefaultOptionComponent from "../../../component/setting/option/DefaultOptionComponent";

class AlarmMenu extends React.Component {
    render() {
        const {
            memberActivityAlarm,
            likeAlarm,
            replyAlarm,
            invitationAlarm,
            scheduleAlarm,
            birthdayAlarm,
            connectedDeviceAlarm,
            setOptionRequest,
            clientIdx
        } = this.props;
        return (
            <ul className={styles['web-setting-section--container--options--list']}>
                <DefaultOptionComponent name={'그룹원 활동'}
                                        desc={'그룹원의 활동에 대한 알림을 받습니다.'}
                                        optionName={'memberActivityAlarm'}
                                        switch={memberActivityAlarm}
                                        setOptionRequest={setOptionRequest} clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'좋아요'}
                                        desc={'타 회원이 내 게시물에 좋아요를 누르면 알림을 받습니다.'}
                                        optionName={'likeAlarm'}
                                        switch={likeAlarm}
                                        setOptionRequest={setOptionRequest} clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'댓글'}
                                        desc={'타 회원이 내 게시물에 댓글을 달면 알림을 받습니다.'}
                                        optionName={'replyAlarm'}
                                        switch={replyAlarm}
                                        setOptionRequest={setOptionRequest}
                                        clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'초대'}
                                        desc={'초대 신청 및 수락에 대한 알림을 받습니다.'}
                                        optionName={'invitationAlarm'}
                                        switch={invitationAlarm}
                                        setOptionRequest={setOptionRequest}
                                        clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'생일'}
                                        desc={'본인, 아이, 그룹원의 생일 등에 대한 알림을 받습니다.'}
                                        optionName={'birthdayAlarm'} switch={birthdayAlarm}
                                        setOptionRequest={setOptionRequest}
                                        clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'일정'}
                                        desc={'등록한 일정에 대한 알림을 받습니다.'}
                                        optionName={'scheduleAlarm'}
                                        switch={scheduleAlarm}
                                        setOptionRequest={setOptionRequest}
                                        clientIdx={clientIdx}/>
                <DefaultOptionComponent name={'디바이스'}
                                        desc={'연동한 디바이스와 관련된 알림을 받습니다.'}
                                        optionName={'connectedDeviceAlarm'}
                                        switch={connectedDeviceAlarm}
                                        setOptionRequest={setOptionRequest}
                                        clientIdx={clientIdx}/>
            </ul>
        )
    }
}

export default AlarmMenu