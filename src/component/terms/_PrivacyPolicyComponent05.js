import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';
const cx = classnames.bind(styles);
class _PrivacyPolicyComponent05 extends React.Component {

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>5. 개인정보의 보유 및 이용 기간</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 개인정보를 지체 없이 파기합니다.<br/>
                        단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 이용자
                        개인정보를 보관합니다.</strong>
                    <p className={styles['__middle-height']}>&lt; 회사 내부 방침에 의한 정보보유 사유 &gt;</p>
                    <table className={styles['terms-section--terms-contents--list--table']}>
                        <caption>회사 내부 방침에 의한 정보보유 사유의 표입니다.</caption>
                        <thead>
                        <tr>
                            <th width="40%">사유</th>
                            <th width="40%">보존이유</th>
                            <th>보존기간</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>부정 이용 기록</td>
                            <td>부정 이용 방지</td>
                            <td>1년</td>
                        </tr>
                        <tr>
                            <td>신용정보의 수집, 처리 및 이용 등에 관한 기록</td>
                            <td>신용정보의 이용 및 보호에 관한 법률</td>
                            <td>3년</td>
                        </tr>
                        <tr>
                            <td>본인 확인에 관한 기록 보존</td>
                            <td>정보통신망 이용촉진 및 정보보호에
                                관한 법률 제44조의5 및 시행령 제29조
                            </td>
                            <td>6개월</td>
                        </tr>
                        <tr>
                            <td>접속에 관한 기록 보존</td>
                            <td>통신비밀보호법 제15조의2 및 시행령 제41조</td>
                            <td>3개월</td>
                        </tr>
                        </tbody>
                    </table>
                    <p>기타, 이용자의 개별적인 동의가 있는 경우에는 개별 동의에 따른 기간까지 보관합니다.</p>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent05;