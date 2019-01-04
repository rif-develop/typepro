import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent09 extends React.Component {
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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>9. 적용 범위</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>본 취급방침에 대한 책임 및 권한은 리틀원주식회사에 있으며, 한국어 버전의 개인정보취급방침은 리틀원 플랫폼을 이용하는 한국 내 리틀원 플랫폼 서비스 이용자에게만 적용됩니다.</strong>
                    <p className={styles['__middle-height']}>한국 외 지역의 리틀원 플랫폼 서비스 이용의 경우에는<br/> Littleone Platform Privacy Policy(http://www.littleoneplatform.com/us/privacy)가 적용됩니다. 또한 링크 페이지 등 다른 사업자에 의한 개인정보 수집은 본
                        개인정보취급방침의 적용 범위가 아닙니다.</p>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent09;