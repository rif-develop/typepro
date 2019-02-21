import React, {Fragment} from 'react';
import {Redirect} from "react-router-dom";
import styles from './SettingLayout.scss';
import classnames from 'classnames';
import Footer from "../../component/footer/Footer";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import {connect} from "react-redux";
import AlarmMenu from "./menu/AlarmMenu";
import MeasureMenu from "./menu/MeasureMenu";
import SubscribeMenu from "./menu/SubscribeMenu";
import WithdrawalMenu from "./menu/WithdrawalMenu";

const cx = classnames.bind(styles);



const mapStateToProps = (state) => {
    return {
        loading: state.settingReducer.loading,
        error: state.settingReducer.error,
        menu: state.settingReducer.menu,
        language: state.languageReducer.language,
        clientIdx: state.clientStatusReducer.session._id,
        isLogin: state.clientStatusReducer.login.isLogin,
        //옵션
        memberActivityAlarm: state.clientStatusReducer.session.option.memberActivityAlarm,
        likeAlarm: state.clientStatusReducer.session.option.likeAlarm,
        replyAlarm: state.clientStatusReducer.session.option.replyAlarm,
        invitationAlarm: state.clientStatusReducer.session.option.invitationAlarm,
        scheduleAlarm: state.clientStatusReducer.session.option.scheduleAlarm,
        birthdayAlarm: state.clientStatusReducer.session.option.birthdayAlarm,
        connectedDeviceAlarm: state.clientStatusReducer.session.option.connectedDeviceAlarm,
        unit: state.clientStatusReducer.session.option.unit,
        emailSubscription: state.clientStatusReducer.session.option.emailSubscription,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        }),
        setOptionRequest: (formData) => dispatch({
            type: 'API_CLIENT_SETTING_INFO_REQUEST',
            formData
        }),
    }
};


class SettingLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: 'alarm',
        };

        this.selectMenu = this.selectMenu.bind(this);
    }

    componentWillMount() {
        //세션을 가져옴
        this.props.getSession();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(`기분 팍 상해버렿쓰~${nextProps.isLogin}`);
    }

    //메뉴 선택하는 함수
    selectMenu(menu) {
        this.setState({
            menu: menu
        });
    }

    render() {
        const {
            language,
            error,
            loading,
            menu,
            memberActivityAlarm,
            likeAlarm,
            replyAlarm,
            invitationAlarm,
            birthdayAlarm,
            scheduleAlarm,
            connectedDeviceAlarm,
            unit,
            emailSubscription,
            setOptionRequest,
            clientIdx,
            isLogin
        } = this.props;

        return (
            <Fragment>
                <Head title={'리틀원 - 환경설정'} desc={'리틀원 웹 어플리케이션의 사용자 환경설정을 변경할 수 있는 페이지입니다.'} language={language}/>
                <Header/>
                {
                    !isLogin && isLogin !== null && <Redirect to={'/login'}/>
                }
                <section className={styles['web-setting-section']}>
                    <div className={styles['mobile-header']}>환경 설정</div>
                    <div className={cx(styles['web-setting-section--container'], styles['menu-=list'])}>
                        <ul className={styles['web-setting-section--container--menu']}>
                            <li className={cx(styles['default-list'], 'alarm' === this.state.menu && styles['active'])} onClick={() => {
                                this.selectMenu('alarm');
                            }}>
                                <a href="javascript:void(0)" className={styles['__alarm']} data-link="notification"><span></span>알람</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'measure' === this.state.menu && styles['active'])} onClick={() => {
                                this.selectMenu('measure');
                            }}>
                                <a href="javascript:void(0)" className={styles['__measure']} data-link="measure"><span></span>단위</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'subscription' === this.state.menu && styles['active'])} onClick={() => {
                                this.selectMenu('subscription');
                            }}>
                                <a href="javascript:void(0)" className={styles['__subscribe']} data-link="subscribe"><span></span>구독</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                            <li className={cx(styles['default-list'], 'withdrawal' === this.state.menu && styles['active'])} onClick={() => {
                                this.selectMenu('withdrawal');
                            }}>
                                <a href="javascript:void(0)" className={styles['__leave']} data-link="withdrawal"><span></span>회원 탈퇴</a><span className={styles['vertical-bar']}>│</span>
                            </li>
                        </ul>
                    </div>
                    <div className={styles['web-setting-section--container']}>
                        <div className={styles['web-setting-section--container--options']} id="option-container">
                            <h1 className={cx(styles['web-setting-section--container--options--head'], styles[`${menu}-icon`])}>{'alarm' === menu ? '알람' : 'measure' === menu ? '단위' : 'subscription' === menu ? '구독' : 'withdrawal' === menu ? '회원 탈퇴' : null}</h1>
                            {
                                this.state.menu === 'alarm' && <AlarmMenu memberActivityAlarm={memberActivityAlarm}
                                                                          likeAlarm={likeAlarm}
                                                                          replyAlarm={replyAlarm}
                                                                          invitationAlarm={invitationAlarm}
                                                                          birthdayAlarm={birthdayAlarm}
                                                                          scheduleAlarm={scheduleAlarm}
                                                                          connectedDeviceAlarm={connectedDeviceAlarm}
                                                                          setOptionRequest={setOptionRequest} clientIdx={clientIdx}/>
                            }
                            {
                                this.state.menu === 'measure' && <MeasureMenu unit={unit} clientIdx={clientIdx}/>
                            }
                            {
                                this.state.menu === 'subscription' && <SubscribeMenu emailSubscription={emailSubscription} clientIdx={clientIdx}/>
                            }
                            {
                                this.state.menu === 'withdrawal' && <WithdrawalMenu clientIdx={clientIdx}/>
                            }
                        </div>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SettingLayout);
