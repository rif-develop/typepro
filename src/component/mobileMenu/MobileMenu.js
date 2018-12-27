import React from 'react';
import styles from "./MobileMenu.scss";
import {Link} from "react-router-dom";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class MobileMenu extends React.Component{
    render(){
        return(
            <div className={cx(styles['mobile-menu-component'],{active:this.props.active})}>
                {/*네비*/}
                <nav className={styles['slide-nav']}>
                    {/*메뉴*/}
                    <ol className={styles['header--mobile--menu']}>
                        <li className={styles['header--mobile--menu__device']}>
                            <Link to="/smartbottle">디바이스</Link>
                        </li>
                        <li className={styles['header--mobile--menu__shopping']}>
                            <Link to="/dashboard">대시보드</Link>
                        </li>
                        <li className={styles['header--mobile--menu__community']}>
                            <Link to="/community">커뮤니티</Link>
                        </li>
                        <li className={styles['header--mobile--menu__dashboard']}>
                            <Link to="/gallery">갤러리</Link>
                        </li>
                    </ol>
                    <div className={styles['header--mobile--user-info']}>
                        <div className={styles['menu_triangle']}></div>
                        <div className={styles['header--menu__client-info__head']}>
                            <img src={"#"} alt={'client-thumbnail'}/>
                            <div className={styles['header--menu__client-info__head--desc']}>
                                <p>닉네임<span>님</span></p>
                                <div>
                                    <span>등급 : 골드</span>
                                    <span>포인트 : 2,340 P</span>
                                </div>
                            </div>
                            <div className={styles['header--menu__client-info__head--more']}>
                                <Link to={"#"} role="button" className={styles['more-info__button']}>더보기</Link>
                                <div className={styles['header--menu__client-info__head--more--bottom-bar']}></div>
                            </div>
                        </div>
                        <ul className={styles['header--mobile--user-info__list']}>
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
                        <div className={styles['header--mobile--user-info__logout']}>
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