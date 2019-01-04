import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent10 extends React.Component {
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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}>10. 개인정보 취급방침의 개정</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <strong>개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 추가, 삭제 및 수정이 있을 시에는 개정 최소 10일전 부터 당사 홈페이지 또는 당사가 제공하는 애플리케이션를 통해 변경이유 및 내용 등을 공지하도록 하겠습니다.</strong>
                    <p className={styles['__middle-height']}>개인정보처리방침 공고일자 : 2019-1-1<br/>
                        개인정보처리방침 시행일자 : 2019-1-1</p>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent10;