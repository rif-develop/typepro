import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';
const cx = classnames.bind(styles);

class _PrivacyPolicyComponent03 extends React.Component {

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>3. 개인정보의 수집 및 이용목적</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>회사는 수집한 정보를 다음과 같은 목적으로 이용합니다.</strong>
                    <ul className={cx(styles['__description-default'], styles['__middle-height'])}>
                        <li>∙ 이용자가 서비스를 원활히 이용할 수 있도록 하기 위해</li>
                        <li>∙ 본인확인과 부정 이용 방지를 위해</li>
                        <li>∙ 리틀원 플랫폼 서비스 이용에 관한 통계 데이터를 작성하기 위해</li>
                        <li>∙ 리틀원 플랫폼 서비스의 검토, 서비스 개선에 필요한 설문 조사 및 분석을 위해</li>
                        <li>∙ 이용자 문의가 있을 때 문의 사항에 대응하기 위해</li>
                        <li>∙ 캠페인 및 이벤트 등의 추첨 및 쿠폰이나 선물 발송을 위해</li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent03;