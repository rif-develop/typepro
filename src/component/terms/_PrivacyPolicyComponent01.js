import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent01 extends React.Component {


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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>1. 수집하는 개인정보의 항목 및 필요권한</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>회사는 리틀원 플랫폼 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</strong>
                    <p className={styles['__middle-height']}>[ 필수항목 ]</p>
                    <p>사용기기 운영체제(iOS/Android 등), 프로필 (이름/닉네임/나이/키/성별), 이메일, 비밀번호, 측정 시 신체데이터 항목</p>
                    <p className={styles['__middle-height']}>[ 선택항목 ]</p>
                    <p>젖병, 배변알리미, 체온계 및 연동 가능한 기기정보</p>
                    <p className={styles['__middle-height']}>[ 애플리케이션 필요 권한]</p>
                    <ul className={styles['__description-unordered']}>
                        <li>∙ 기기 &amp; 앱 기록 – 육아 활동을 이력을 기록/읽기 위함</li>
                        <li>∙ 위치 – BLE 수신 및 처리가 가능한 OS 버전을 탑재한 이동통신 단말 및 서비스가 특정 고유식별정보를 Broadcasting하는 기기 신호를 자동으로 인식, 고유식별정보를 서버에 전송하면, 서버에서 이에 해당하는 서비스 혹은 서비스 사업자에게 제공</li>
                        <li>∙ 사진/미디어/문서 – 프로필 사진을 업로드 혹은 촬영을 위함</li>
                        <li>∙ 리틀원 애플리케이션 이용 도중 가족 구성원 프로필 정보(닉네임/나이/키/성별)를 이용자가 선택적으로 입력할 수 있음</li>
                        <li>∙ Wi-Fi – 측정 기록을 클라우드로 저장하기 위함</li>
                        <li>∙ 주소록 – 가족 또는 친지를 그룹에 추가함에 있어 주소록(상대방 이름)을 불러오기 위함</li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent01;