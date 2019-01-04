import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent11 extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            view:false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        this.setState({
            view:!this.state.view
        });
    }

    render(){
        return(
            <li>
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제11조</em>지급방법</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <p>“몰”에서 구매한 재화 또는 용역에 대한 대금지급방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다. 단, “몰”은 이용자의 지급방법에 대하여 재화 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.</p>
                    <ul className={cx(styles['__description-ordered'], styles['__middle-height'])}>
                        <li>1. 폰뱅킹, 인터넷뱅킹, 메일 뱅킹 등의 각종 계좌이체</li>
                        <li>2. 선불카드, 직불카드, 신용카드 등의 각종 카드 결제</li>
                        <li>3. 온라인무통장입금</li>
                        <li>4. 전자화폐에 의한 결제</li>
                        <li>5. 수령 시 대금지급</li>
                        <li>6. 마일리지 등 “몰”이 지급한 포인트에 의한 결제</li>
                        <li>7. “몰”과 계약을 맺었거나 “몰”이 인정한 상품권에 의한 결제</li>
                        <li>8. 기타 전자적 지급 방법에 의한 대금 지급 등</li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _TermsComponent11;