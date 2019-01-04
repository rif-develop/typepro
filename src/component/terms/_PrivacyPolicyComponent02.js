import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';
const cx = classnames.bind(styles);
class _PrivacyPolicyComponent02 extends React.Component {

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>2. 개인정보 수집방법</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>회사는 리틀원 플랫폼 서비스 제공을 위해 다음과 같은 방법으로 개인정보를 수집합니다.</strong>
                    <ul className={cx(styles['__description-default'], styles['__middle-height'])}>
                        <li>∙ 리틀원 애플리케이션 서비스 가입 시 동의 절차 제공을 통해 수집</li>
                        <li>∙ 프로모션 및 이벤트 진행을 위해서는 별도의 동의절차를 통해 수집</li>
                        <li>∙ 회사와 서비스 제공 관련 제휴 관계에 있는 플랫폼을 통해 자동으로 수집</li>
                        <li>∙ 서비스 가입 및 사용 중 고객 응대 시 이용자의 자발적 제공 또는 필요에 의해 요청 후 수집</li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent02;