import React from 'react';
import {Link} from "react-router-dom";
import styles from './Header.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import HeaderAlarm from "../headerAlarm/HeaderAlarm";
import ClientInfo from "../clientInfo/ClientInfo";
import MobileMenu from "../mobileMenu/MobileMenu";
import DefaultLoading from '../loading/DefaultLoading'
import Anime from 'react-anime';

const cx = classnames.bind(styles);

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {loading, error, alarmList, clientMenu, mobileMenu, onClickClientHandler, onClickAlarmHandler, onClickMobileHandler} = this.props;

        let openanimeState = {
            opacity: [0.7, 1],
            height: ['0%', '100%'],
            duration: 600,
            easing: 'easeInSine'
        };

        return (
            <header className={styles['header']} id={'header-component'}>
                <div>
                    {/*로고*/}
                    <div className={styles['header--logo']}>
                        <Link to="/">
                            <span className={styles['__beta-testing']}></span>
                        </Link>
                    </div>
                    {/*데스크탑 메뉴*/}
                    <nav className={styles['header--navigation']}>
                        <ul>
                            <li>
                                <Link to="javascript:void(0)" className={styles['link_device']}>
                                    <span>디바이스</span>
                                    <div className={styles['navigation__effect']}></div>
                                    {/*<div className={styles['selected_effect']}></div>*/}
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']}>
                                    <span>대시보드</span>
                                    <div className={styles['navigation__effect']}></div>
                                    {/*<div className={styles['selected_effect']}></div>*/}
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']}>
                                    <span>커뮤니티</span>
                                    <div className={styles['navigation__effect']}></div>
                                    {/*<div className={styles['selected_effect']}></div>*/}
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']}>
                                    <span>갤러리</span>
                                    <div className={styles['navigation__effect']}></div>
                                    {/*<div className={styles['selected_effect']}></div>*/}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles['header--menu']}>
                        {/*로그인*/}
                        {/*<div className={styles['header--menu__login']}>*/}
                        {/*<Link to="/login">*/}
                        {/*로그인*/}
                        {/*</Link>*/}
                        {/*</div>*/}
                        {/*알람*/}
                        <div className={styles['header--menu__alarm']} role="graphics-object" onClick={onClickAlarmHandler}>
                            <div className={styles['header--menu__alarm__notification']}></div>
                            <HeaderAlarm active={alarmList}/>
                        </div>
                        {/*유저정보*/}
                        <div className={styles['header--menu__client-info']} role="graphics-symbol" onClick={onClickClientHandler}>
                            <a href="javascript:void(0)">
                                <img src={require('./icon-144.png')} alt={'client-thumbnail'}/>
                            </a>
                            {/*유저 정보 창 들어올 곳*/}
                            <ClientInfo active={clientMenu}/>
                        </div>
                    </div>
                    {/*모바일용 메뉴*/}
                    <div className={styles['header--hamburger']} onClick={onClickMobileHandler}>
                        <a href="javascript:void(0)" className={cx(styles['header--hamburger__menu'], {active: mobileMenu})}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                </div>
                {/*서브링크(제품)*/}
                {/*모바일 슬라이더 메뉴*/}
                <MobileMenu active={mobileMenu}/>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.headerReducer.loading,
        alarmList: state.headerReducer.alarmList,
        clientMenu: state.headerReducer.clientMenu,
        mobileMenu: state.headerReducer.mobileMenu,
        error: state.headerReducer.error
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        onClickClientHandler: () => dispatch({
            type: 'HEADER_CLIENT_ACTIVE_REQUEST'
        }),
        onClickAlarmHandler: () => dispatch({
            type: 'HEADER_ALARM_ACTIVE_REQUEST'
        }),
        onClickMobileHandler: () => dispatch({
            type: "HEADER_MOBILE_MENU_REQUEST"
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header)