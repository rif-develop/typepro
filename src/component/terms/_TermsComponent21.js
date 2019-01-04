import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";

const cx = classnames.bind(styles);

class _TermsComponent21 extends React.Component {

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active'] : null)} onClick={this.onClickHandler}><em>제21조</em> 연결“몰”과 피연결“몰” 간의 관계</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active'] : null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. 상위 “몰”과 하위 “몰”이 하이퍼링크(예: 하이퍼링크의 대상에는 문자, 그림 및 동화상 등이 포함됨)방식 등으로 연결된 경우, 전자를 연결 “몰”(웹 사이트)이라고 하고 후자를 피연결 “몰”(웹사이트)이라고 합니다.</li>
                        <li>2. 연결“몰”은 피연결“몰”이 독자적으로 제공하는 재화 등에 의하여 이용자와 행하는 거래에 대해서 보증 책임을 지지 않는다는 뜻을 연결“몰”의 초기화면 또는 연결되는 시점의 팝업화면으로 명시한 경우에는 그 거래에 대한 보증 책임을 지지 않습니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent21;