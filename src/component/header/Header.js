import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import styles from './Header.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import HeaderAlarm from "../headerAlarm/HeaderAlarm";
import ClientInfo from "../clientInfo/ClientInfo";
import MobileMenu from "../mobileMenu/MobileMenu";
import SubLink from "../sublink/SubLink";
import MobileHeaderAlarmComponent from "../mobileheaderalarm/MobileHeaderAlarmComponent";

const cx = classnames.bind(styles);

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subMenu: false,
        };

        this.Menu1 = React.createRef();
        this.Menu2 = React.createRef();
        this.Menu3 = React.createRef();
        this.Menu4 = React.createRef();

        this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
        this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
        this.onHoverHandler = this.onHoverHandler.bind(this);
        this.onHoverLeaveHandler = this.onHoverLeaveHandler.bind(this);
        this.onClickHeaderInit = this.onClickHeaderInit.bind(this);
    }

    onClickHeaderInit() {
        this.props.headerInit();
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
        //propsToAction
        const {clientAlarmToggle, clientMenuToggle, logoutRequest, clientMobileMenuToggle} = this.props;
        //propsToState
        const {nickName, thumbnail, clientMenu, grade, point, email, isLogin, mobileMenu, alarmMenu, dashboard, width, headerActive} = this.props;

        const dashboardStyle = {
            position: 'relative'
        };

        return (
            <header className={cx(styles['header'], !headerActive ? styles['__scrolling-down'] : undefined)} id={'header-component'} style={dashboard ? dashboardStyle : undefined} onMouseLeave={this.onMouseLeaveHandler}>
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
                        {
                            !isLogin ?
                                <div className={styles['header--menu__login']}>
                                    <Link to="/login">
                                        로그인
                                    </Link>
                                </div> :
                                <Fragment>
                                    <div className={styles['header--menu__alarm']} role="graphics-object" onClick={clientAlarmToggle}>
                                        <div className={styles['header--menu__alarm__notification']}></div>
                                        {/*헤더 알람*/}
                                        {
                                            width > 768 && <HeaderAlarm active={alarmMenu}/>
                                        }
                                    </div>
                                    <div className={styles['header--menu__client-info']} role="graphics-symbol">
                                        <a href="javascript:void(0)" onClick={clientMenuToggle}>
                                            <img src={thumbnail || require('./icn-no-baby@2x.png')} alt={'client-thumbnail'}/>
                                        </a>
                                        {/*클라이언트 정보 창*/}
                                        <ClientInfo active={clientMenu} logout={logoutRequest} thumbnail={thumbnail} point={point} grade={grade} nickName={nickName} email={email} onClickHeaderInit={this.onClickHeaderInit}/>
                                    </div>
                                </Fragment>
                        }
                    </div>
                    {/*모바일용 메뉴*/}
                    <div className={styles['header--hamburger']} onClick={clientMobileMenuToggle}>
                        <a href="javascript:void(0)" className={cx(styles['header--hamburger__menu'], mobileMenu ? styles['active'] : null)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                </div>
                {/*모바일 슬라이더 메뉴*/}
                <MobileMenu mobileMenu={mobileMenu} isLogin={isLogin} grade={grade} point={point} logout={logoutRequest} thumbnail={thumbnail} nickName={nickName} email={email} onClickHeaderInit={this.onClickHeaderInit}/>
                {/*서브링크(제품)*/}
                <SubLink active={this.state.subMenu}/>
                {
                    width <= 768 && alarmMenu && <MobileHeaderAlarmComponent/>

                }
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        alarmMenu: state.headerReducer.alarmMenu,
        clientMenu: state.headerReducer.clientMenu,
        mobileMenu: state.headerReducer.mobileMenu,
        width: state.clientStatusReducer.width,
        //
        loading: state.headerReducer.loading,
        error: state.headerReducer.error,
        isLogin: state.clientStatusReducer.login.isLogin,
        //
        thumbnail: state.clientStatusReducer.session.thumbnail,
        point: state.clientStatusReducer.session.point,
        grade: state.clientStatusReducer.session.grade,
        nickName: state.clientStatusReducer.session.nickname,
        email: state.clientStatusReducer.session.email,
        //
        headerActive: state.clientStatusReducer.scrollTop

    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        clientMenuToggle: () => dispatch({
            type: 'SET_HEADER_CLIENT_ACTIVE_REQUEST'
        }),
        clientAlarmToggle: () => dispatch({
            type: 'SET_HEADER_ALARM_ACTIVE_REQUEST'
        }),
        clientMobileMenuToggle: () => dispatch({
            type: 'SET_HEADER_MOBILE_MENU_REQUEST'
        }),
        headerInit: () => dispatch({
            type: 'SET_HEADER_INIT'
        }),
        logoutRequest: () => dispatch({
            type: 'API_WEB_LOGOUT_REQUEST'
        })
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Header)