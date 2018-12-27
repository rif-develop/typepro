import React from 'react';
import styles from "./ClientInfo.scss";
import {Link} from "react-router-dom";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class ClientInfo extends React.Component {
    render() {

        let items = [
            {
                url: '/mypage/modify',
                boardName: '회원정보 수정'
            },
            {
                url: '/mypage/password',
                boardName: '비밀번호 변경'
            },
            {
                url: '/mypage/address',
                boardName: '배송지 관리'
            },
            {
                url: '/mypage/setting',
                boardName: '환경 설정'
            }
        ];

        return (
            <div className={cx(styles['client-info-component'], {active: this.props.active})}>
                <div className={styles['client-info-component--triangle']}></div>
                <div className={styles['client-info-component--head']}>
                    <img src={"#"} alt={'client-thumbnail'}/>
                    <div className={styles['client-info-component--head--desc']}>
                        <p>닉네임<span>님</span></p>
                        <div className={styles['client-info-component--head--desc__activity']}>
                            <span>등급 : 골드</span>
                            <span>포인트 : 2,340 P</span>
                        </div>
                    </div>
                    <div className={styles['client-info-component--head--desc__more']}>
                        <a href="javascript:void(0)" role="button" className={styles['__more-info-button']}>더보기</a>
                        <div className={styles['client-info-component--head--desc__more--bottom-bar']}></div>
                    </div>
                </div>
                <ul className={styles['client-info-component__list']}>
                    {
                        items ? items.map((item, key)=>{
                            return <li key={key}><Link to={'item.url'}/>{item.boardName}</li>
                        }) : <li>메뉴가 활성화 되지 않았습니다.</li>

                    }
                </ul>
                <div className={styles['client-info-component__logout']}>
                    <Link to="/logout">로그아웃</Link>
                </div>
            </div>
        )
    }
}

export default ClientInfo