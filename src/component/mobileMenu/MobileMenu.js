import React, {Fragment} from 'react';
import styles from "./MobileMenu.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classnames from 'classnames';
import Anime from 'react-anime';
import {loginAxios} from "../../action/login/loginAxios";
import axios from "axios";
import {store} from "../../store/StoreComponent";


const cx = classnames.bind(styles);

class MobileMenu extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            width: window.innerWidth && document.documentElement.clientWidth ?
                Math.min(window.innerWidth, document.documentElement.clientWidth) :
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.getElementsByTagName('body')[0].clientWidth
        };
        this.onResizeHandler = this.onResizeHandler.bind(this);
        this.logoutHandler = this.logoutHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps
    }

    componentDidMount() {
        window.onresize = this.onResizeHandler
    }

    onResizeHandler() {
        this.setState({
            width: window.innerWidth && document.documentElement.clientWidth ?
                Math.min(window.innerWidth, document.documentElement.clientWidth) :
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.getElementsByTagName('body')[0].clientWidth
        })
    }

    logoutHandler(e){
        e.preventDefault();
        this.props.logout();
    }


    render() {
        //propsToState
        const {isLogin,mobileMenu} = this.props;
        //propsToAction
        const {onClickHeaderInit} = this.props;

        return (
            <div className={cx(styles['mobile-menu-component'], (mobileMenu && this.state.width <= 768) ? styles['active'] : null)} ref={this.myRef} id={'mobile-menu'}>
                {/*네비*/}
                <nav className={styles['mobile-menu-component--nav']}>
                    {/*메뉴*/}
                    <ol className={styles['mobile-menu-component--nav__list']}>
                        <li>
                            <Link to="/device/smartbottle" onClick={onClickHeaderInit}>디바이스</Link>
                        </li>
                        <li>
                            <Link to="/dashboard" onClick={onClickHeaderInit}>대시보드</Link>
                        </li>
                        <li>
                            <Link to="/community" onClick={onClickHeaderInit}>커뮤니티</Link>
                        </li>
                        <li>
                            <Link to="/gallery" onClick={onClickHeaderInit}>갤러리</Link>
                        </li>
                    </ol>
                    <div className={styles['mobile-menu-component--nav__client-info']}>
                        {
                            isLogin ? <Fragment>
                                <div className={styles['mobile-menu-component--nav__client-info__status']}>
                                    <img src={this.props.thumbnail || require('../header/icn-no-baby@2x.png')} alt={'ㅁㅁㅁ님의 썸네일 이미지입니다. 정말 이쁜 사진이에요.'}/>
                                    <div className={styles['mobile-menu-component--nav__client-info__status__desc']}>
                                        <p>{this.props.nickName || this.props.email}<span>님</span></p>
                                        <div>
                                            <span>등급 : {this.props.grade === 0 ? '일반':'??'}</span>
                                            <span>포인트 : {this.props.point} P</span>
                                        </div>
                                    </div>
                                    <div className={styles['mobile-menu-component--nav__client-info__status__more']}>
                                        <Link to={"#"} role="button" className={styles['__more-info-button']}>더보기</Link>
                                        <div className={styles['mobile-menu-component--nav__client-info__status__more--vertical-bar']}></div>
                                    </div>
                                </div>
                                <ul className={styles['mobile-menu-component--nav__client-info__list']}>
                                    <li>
                                        <Link to="/mypage/auth" onClick={onClickHeaderInit}>회원정보 수정</Link>
                                    </li>
                                    <li>
                                        <Link to="/mypage/password" onClick={onClickHeaderInit}>비밀번호 변경</Link>
                                    </li>
                                    <li>
                                        <Link to="/mypage/address" onClick={onClickHeaderInit}>배송지 관리</Link>
                                    </li>
                                    <li>
                                        <Link to="/mypage/setting" onClick={onClickHeaderInit}>환경 설정</Link>
                                    </li>
                                </ul>
                            </Fragment> : null
                        }


                        <div className={styles['mobile-menu-component--nav__client-info__sign']}>
                            {
                                isLogin ?   <Link to="/logout" onClick={this.logoutHandler}>로그아웃</Link>:<Link to="/login" onClick={onClickHeaderInit}>로그인・회원가입</Link>
                            }
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default MobileMenu;