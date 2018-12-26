import React from 'react';
import {Link} from "react-router-dom";
import styles from './Header.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class Header extends React.Component {
    render() {
        return (
            <header className={styles['header']} id={'header-component'}>
                <div>
                    {/*로고*/}
                    <div className={styles['header--logo']}>
                        <a href="/">
                            <span className={styles['__beta-testing']}></span>
                        </a>
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
                        <div className={styles['header--menu__login']}>
                            <Link to="/login">
                                로그인
                            </Link>
                        </div>
                        <div className={styles['header--menu__alarm']} role="graphics-object">
                            <div className={styles['header--menu__alarm__notification']}></div>
                            <div className={cx(styles['header--menu__alarm__message'], styles['active'])}>
                                <div className={styles['menu_triangle']}></div>
                                <div className={styles['header--menu__alarm__message__header']}>
                                    <h4>알림</h4>
                                    <button type={'button'}>모두 읽은 상태로 표시</button>
                                </div>
                                <ul className={styles['header--menu__alarm__message__list']}>
                                    <li className={styles['default_message']}>
                                        <a href="javascript:void(0)">
                                            <p><em>일시적인 오류</em>로불러오는 데 실패했습니다.</p>
                                        </a>
                                    </li>
                                </ul>
                                <div className={styles['header--menu__alarm__message__list-next']}>
                                    <button type="button">모두 보기</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles['header--menu__client-info']} role="graphics-symbol">
                            <a href="javascript:void(0)">
                                <img src={"#"} alt={'client-thumbnail'}/>
                            </a>
                            <div>
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
                                        <a href="javascript:void(0)" role="button" className={styles['more-info__button']}>더보기</a>
                                        <div className={styles['header--menu__client-info__head--more--bottom-bar']}></div>
                                    </div>
                                </div>
                                <ul className={styles['header--menu__client-info__list']}>
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
                                <div className={styles['header--menu__client-info__logout']}>
                                    <Link to="/logout">로그아웃</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['header--hamburger']}>
                        <a href="javascript:void(0)" className={styles['header--hamburger__menu']}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </a>
                    </div>
                </div>
                <div className={styles['header--sublink']}>
                    <nav className={styles['header--sublink__device']}>
                        <Link to="/device/smartbottle" className={styles['header--sublink__device__smart-bottle']}>
                            <div></div>
                            <span>스마트 보틀</span>
                        </Link>
                        <Link to="/device/smartpeepee" className={styles['header--sublink__device__smart-peepee']}>
                            <div></div>
                            <span>스마트 피피</span>
                        </Link>
                        <Link to="/device/smarttemp" className={styles['header--sublink__device__smart-temp']}>
                            <div></div>
                            <span>스마트 템프</span>
                        </Link>
                    </nav>
                </div>
                <div className={styles['header--mobile']}>
                    <nav className={styles['slide-nav']}>
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
            </header>
        )
    }
}

export default Header