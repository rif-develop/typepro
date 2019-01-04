import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";

const cx = classnames.bind(styles);

class _TermsComponent12 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view: false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        this.setState({
            view: !this.state.view
        });
    }

    render() {
        return (
            <li>
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active'] : null)} onClick={this.onClickHandler}><em>제12조</em> 수신확인통지‧구매신청 변경 및 취소</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active'] : null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. “몰”은 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.</li>
                        <li>2. “몰”은 이용자가 구매한 재화에 대해 배송수단, 수단별 배송비용 부담자, 수단별 배송기간 등을 명시합니다. 만약 “몰”이 약정 배송기간을 초과한 경우에는 그로 인한 이용자의 손해를 배상하여야 합니다. 다만 “몰”이 고의‧과실이 없음을 입증한 경우에는 그러하지 아니합니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent12;