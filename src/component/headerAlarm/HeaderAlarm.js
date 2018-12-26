import React from 'react';
import styles from "../header/Header.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class HeaderAlarm extends React.Component{
    render(){
        return(
            <div className={styles['header--menu__alarm__message']}>
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
        )
    }
}

export default HeaderAlarm