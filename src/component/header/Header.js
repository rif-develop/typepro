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
import SubLink from "../sublink/SubLink";

const cx = classnames.bind(styles);

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subMenu: false
        };

        this.Menu1 = React.createRef();
        this.Menu2 = React.createRef();
        this.Menu3 = React.createRef();
        this.Menu4 = React.createRef();

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.onHoverHandler = this.onHoverHandler.bind(this);
        this.onHoverLeaveHandler = this.onHoverLeaveHandler.bind(this);
    }

    onMouseEnterHandler() {
        this.setState({
            subMenu: true
        })
    }

    onMouseLeaveHandler() {
        this.setState({
            subMenu: false
        })
    }


    onHoverHandler(target) {
        if (target === 'Menu1') {
            this.Menu1.current.classList.add('active')
        } else if (target === 'Menu2') {
            this.Menu2.current.classList.add('active')

        } else if (target === 'Menu3') {
            this.Menu3.current.classList.add('active')

        } else if (target === 'Menu4') {
            this.Menu4.current.classList.add('active')
        }
    }

    onHoverLeaveHandler(target) {
        if (target === 'Menu1') {
            this.Menu1.current.classList.remove('active')
        } else if (target === 'Menu2') {
            this.Menu2.current.classList.remove('active')

        } else if (target === 'Menu3') {
            this.Menu3.current.classList.remove('active')

        } else if (target === 'Menu4') {
            this.Menu4.current.classList.remove('active')
        }
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
            <header className={styles['header']} id={'header-component'} onMouseLeave={this.onMouseLeaveHandler}>
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
                            <li onMouseEnter={this.onMouseEnterHandler}>
                                <a href="javascript:void(0)" className={styles['link_device']} onMouseEnter={() => {
                                    this.onHoverHandler('Menu1')
                                }} onMouseLeave={() => {
                                    this.onHoverLeaveHandler('Menu1');
                                }}>
                                    <span>디바이스</span>
                                    <div className={styles['navigation__effect']} ref={this.Menu1}></div>
                                </a>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']} onMouseEnter={() => {
                                    this.onHoverHandler('Menu2')
                                }} onMouseLeave={() => {
                                    this.onHoverLeaveHandler('Menu2');
                                }}>
                                    <span>대시보드</span>
                                    <div className={styles['navigation__effect']} ref={this.Menu2}></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']} onMouseEnter={() => {
                                    this.onHoverHandler('Menu3')
                                }} onMouseLeave={() => {
                                    this.onHoverLeaveHandler('Menu3');
                                }}>
                                    <span>커뮤니티</span>
                                    <div className={styles['navigation__effect']} ref={this.Menu3}></div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className={styles['link_device']} onMouseEnter={() => {
                                    this.onHoverHandler('Menu4')
                                }} onMouseLeave={() => {
                                    this.onHoverLeaveHandler('Menu4');
                                }}>
                                    <span>갤러리</span>
                                    <div className={styles['navigation__effect']} ref={this.Menu4}></div>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles['header--menu']}>
                        {/*로그인*/}
                        <div className={styles['header--menu__login']}>
                            <Link to="/login">
                                로그인
                            </Link>
                        </div>
                        {/*알람*/}
                        {/*<div className={styles['header--menu__alarm']} role="graphics-object" onClick={onClickAlarmHandler}>*/}
                        {/*<div className={styles['header--menu__alarm__notification']}></div>*/}
                        {/*<HeaderAlarm active={alarmList}/>*/}
                        {/*</div>*/}
                        {/*유저정보*/}
                        {/*<div className={styles['header--menu__client-info']} role="graphics-symbol" onClick={onClickClientHandler}>*/}
                        {/*<a href="javascript:void(0)">*/}
                        {/*<img src={require('./icon-144.png')} alt={'client-thumbnail'}/>*/}
                        {/*</a>*/}
                        {/*/!*유저 정보 창 들어올 곳*!/*/}
                        {/*<ClientInfo active={clientMenu}/>*/}
                        {/*</div>*/}
                    </div>
                    {/*모바일용 메뉴*/}
                    <div className={styles['header--hamburger']} onClick={onClickMobileHandler}>
                        <a href="javascript:void(0)" className={cx(styles['header--hamburger__menu'], mobileMenu ? styles['active']:null)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                </div>
                {/*모바일 슬라이더 메뉴*/}
                <MobileMenu active={mobileMenu}/>
                {/*서브링크(제품)*/}
                <SubLink active={this.state.subMenu}/>
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