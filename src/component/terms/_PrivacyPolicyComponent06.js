import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent06 extends React.Component {
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
        })
    }

    render() {
        return (
            <li>
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active'] : null)} onClick={this.onClickHandler}>6. 개인정보 파기절차 및 방법</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active'] : null)}>
                    <strong>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.</strong>
                    <ul className={cx(styles['__description-ordered'], styles['__middle-height'])}>
                        <li className={styles['__middle-height']}>1. 파기절차
                            <ol>
                                <li>1) 이용자가 서비스 이용 등을 위해 입력한 정보는 목적이 달성된 후, 내부 방침 및 기타 관련 법령에 의한 정보보호 사유(보유 및 이용기간
                                    참조)에 따라 일정 기간 저장된 후 파기됩니다. 동 개인정보는 법률에 의한 경우가 아니고서는 보유되는 이외의 다른 목적으로 이용되
                                    지 않습니다.
                                </li>
                            </ol>

                        </li>
                        <li className={styles['__middle-height']}>2. 파기방법
                            <ol>
                                <li>1) 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.</li>
                                <li>2) 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent06
;