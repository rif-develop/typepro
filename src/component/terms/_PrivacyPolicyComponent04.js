import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';
const cx = classnames.bind(styles);
class _PrivacyPolicyComponent04 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            view:false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        this.setState({
            view:!this.state.view
        })
    }
    render() {
        return (
            <li>
                <h2 className={cx(styles['terms-section--terms-contents--title'],this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>4. 개인정보의 공유 및 제공</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <ul className={styles['__description-ordered']}>
                        <li className={styles['__middle-height']}>1. 회사는 이용자의 동의가 있거나 관련 법령의 규정에 의한 경우를 제외하고는 어떠한 경우에도 [개인정보의 수집 및 이용목적]에서 고지한 범위를 넘어 이용자의 개인정보를 이용하거나 타인 또는 타기업, 단체, 기관에 제공하지 않습니다.</li>
                        <li className={styles['__middle-height']}>2. 다음의 경우에는 관련 법령의 규정에 의하여 이용자의 동의 없이 개인정보를 제공하는 것이 가능합니다.
                            <ol>
                                <li>1) 이용자 본인이 사전에 동의한 경우</li>
                                <li>2) 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우로서 특정 개인을 알아볼 수 없는 형태로 가공하여 제공하는 경우</li>
                                <li>3) 관계법령에 의하여 수사상의 목적으로 관계기관으로부터의 요구가 있을 경우</li>
                                <li>4) 법률에 특정한 규정이 있는경</li>
                            </ol>
                        </li>
                        <li className={styles['__middle-height']}>3. 회사는 서비스 제공 및 향상을 위하여 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
                            회사의 개인정보 수탁업체 및 위탁업무 내용은 아래와 같습니다.
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent04;