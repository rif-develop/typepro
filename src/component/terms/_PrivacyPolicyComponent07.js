import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent07 extends React.Component {

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active'] : null)} onClick={this.onClickHandler}>7. 개인정보의 기술적/관리적 보호 대책</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active'] : null)}>
                    <strong>회사는 이용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적/관리적 대책을 강구하고 있습니다.</strong>
                    <ul className={cx(styles['__description-ordered'], styles['__middle-height'])}>
                        <li className={styles['__middle-height']}>1.&nbsp;&nbsp;비밀번호의 암호화<br/>
                            회사는 서비스 제공 관련 제휴 관계에 있는 플랫폼 회원의 비밀번호를 수집하지 않습니다.
                        </li>
                        <li className={styles['__middle-height']}>2.&nbsp;&nbsp;해킹 등의 대비책<br/>
                            해킹 등에 의해 이용자의 개인정보가 유출되는 것을 막기 위해 외부로부터 침입을 차단하는 장치를 설치, 운용하여 외부로부터의 공격, 해킹 등을 막고 있으며, 특히 이용자의 개인정보를 가지고 있는 서버는 외부의 인터넷 라인과 직접 연결하지 않고 별도로 내부관리하는 등 수준 이상의 보안을 유지하고 있습니다.
                            또한 만약의 사태에 대비하여 시스템과 데이터를 백업하는 체제를 갖추고 있고, 개인정보를 취급하는 직원 PC에는 백신프로그램과 방화벽을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며, 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써
                            개인정보가
                            침해되는 것을 방지하고 있습니다.
                        </li>
                        <li className={styles['__middle-height']}>3.&nbsp;&nbsp;취급 직원의 제한 및 교육<br/>
                            개인정보취급 직원은 최소한으로 제한하고 담당직원에 대한 수시 교육을 통하여 본 정책의 준수를 강조하고 있습니다.
                        </li>
                        <li className={styles['__middle-height']}>4.&nbsp;&nbsp;개인정보보호 전담기구의 운영<br/>
                            사내 개인정보보호 전담기구 등을 통하여 본 정책의 이행사항 및 담당자의 준수 여부를 점검하여 문제가 발견될 경우 즉시 시정조치하고 있습니다.
                            단, 이용자 본인의 부주의나 인터넷상의 문제로 개인정보가 유출되어 발생한 문제에 대해 회사는 일체의 책임을 지지 않습니다.
                        </li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent07;