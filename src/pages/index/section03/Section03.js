import React from 'react';
import styles from './Section03.scss';
import classnames from 'classnames';
import iccommuity from './ic-community.svg';
import ichealthcare from './ic-healthcare.svg';
import icshopping from './ic-shopping.svg';

const cx = classnames.bind(styles);

class Section03 extends React.Component {

    render() {
        const language = this.props.language;
        return (
            <section className={styles['third-section']}>
                <ul className={styles['third-section--content']}>
                    <li className={cx(styles['third-section--content--list'])}>
                        <div>
                            <img src={iccommuity} alt="메인페이지의 헬스케어 소개 아이콘입니다."/>
                            <h1>헬스케어</h1>
                            <p>사물인터넷으로 수집한 데이터를 통해 아이의 건강 상태를 확인할 수 있습니다. 또한 제휴 기관의 전문적인 상담과 올바른 육아를 위한 정보를 제공해드립니다.</p>
                        </div>
                    </li>
                    <li className={cx(styles['third-section--content--list'])}>
                        <div>
                            <img src={ichealthcare} alt="메인페이지의 커뮤니티 소개 아이콘입니다."/>
                            <h1>커뮤니티</h1>
                            <p>육아에 관련된 주요 정보나 육아 제품에 대한 리뷰, 아이의 성장 스토리를 공유할 수 있도록 자유로운 소통의 공간을 마련해드립니다.</p>
                        </div>
                    </li>
                    <li className={cx(styles['third-section--content--list'])}>
                        <div>
                            <img src={icshopping} alt="메인페이지의 쇼핑 소개 아이콘입니다."/>
                            <h1>쇼핑</h1>
                            <p>리틀원 특허 알고리즘을 이용하여 매번 구입하기 번거로운 육아용품 정기배송 서비스를 제공해드립니다.</p>
                        </div>
                    </li>
                </ul>
            </section>
        )
    }
}

export default Section03