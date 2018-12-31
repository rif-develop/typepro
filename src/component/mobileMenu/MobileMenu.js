import React, {Fragment} from 'react';
import styles from "./MobileMenu.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import classnames from 'classnames';
import Anime from 'react-anime';


const cx = classnames.bind(styles);

class MobileMenu extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            width:  window.innerWidth && document.documentElement.clientWidth ?
                Math.min(window.innerWidth, document.documentElement.clientWidth) :
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.getElementsByTagName('body')[0].clientWidth
        }
        this.onResizeHandler = this.onResizeHandler.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps
    }

    componentDidMount() {
        window.onresize = this.onResizeHandler
    }

    onResizeHandler(){
        this.setState({
            width:window.innerWidth && document.documentElement.clientWidth ?
                Math.min(window.innerWidth, document.documentElement.clientWidth) :
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.getElementsByTagName('body')[0].clientWidth
        })
    }


    render() {
        return (
            <div className={cx(styles['mobile-menu-component'], {active: this.props.active && this.state.width <= 768})} ref={this.myRef} id={'mobile-menu'}>
                {/*네비*/}
                <nav className={styles['mobile-menu-component--nav']}>
                    {/*메뉴*/}
                    <ol className={styles['mobile-menu-component--nav__list']}>
                        <li>
                            <Link to="/smartbottle">디바이스</Link>
                        </li>
                        <li>
                            <Link to="/dashboard">대시보드</Link>
                        </li>
                        <li>
                            <Link to="/community">커뮤니티</Link>
                        </li>
                        <li>
                            <Link to="/gallery">갤러리</Link>
                        </li>
                    </ol>
                    <div className={styles['mobile-menu-component--nav__client-info']}>
                        <div className={styles['mobile-menu-component--nav__client-info__status']}>
                            <img src={"#"} alt={'ㅁㅁㅁ님의 썸네일 이미지입니다. 정말 이쁜 사진이에요.'}/>
                            <div className={styles['mobile-menu-component--nav__client-info__status__desc']}>
                                <p>닉네임<span>님</span></p>
                                <div>
                                    <span>등급 : 골드</span>
                                    <span>포인트 : 2,340 P</span>
                                </div>
                            </div>
                            <div className={styles['mobile-menu-component--nav__client-info__status__more']}>
                                <Link to={"#"} role="button" className={styles['__more-info-button']}>더보기</Link>
                                <div className={styles['mobile-menu-component--nav__client-info__status__more--vertical-bar']}></div>
                            </div>
                        </div>
                        <ul className={styles['mobile-menu-component--nav__client-info__list']}>
                            <li>
                                <Link to="/mypage/modify">회원정보 수정</Link>
                            </li>
                            <li>
                                <Link to="/mypage/password">비밀번호 변경</Link>
                            </li>
                            <li>
                                <Link to="/mypage/address">배송지 관리</Link>
                            </li>
                            <li>
                                <Link to="/mypage/setting">환경 설정</Link>
                            </li>
                        </ul>
                        <div className={styles['mobile-menu-component--nav__client-info__sign']}>
                            <Link to="/login">로그인・회원가입</Link>
                            {/*<Link to="/logout">로그아웃</Link>*/}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}


export default MobileMenu;