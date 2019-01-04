import React from 'react';
import styles from "../../pages/privacypolicy/PrivacypolicyLayout.scss";
import classnames from 'classnames';

const cx = classnames.bind(styles);

class _PrivacyPolicyComponent08 extends React.Component {
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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active'] : null)} onClick={this.onClickHandler}>8. 개인정보보호 업무 관련 문의처</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active'] : null)}>
                    <strong>이용자의 개인정보와 관련한 문의 사항이 있으시면 아래의 개인정보 담당 부서로 연락을 주시기 바랍니다. 이용자의 문의사항에 신속하고 성실하게 답변해드리겠습니다. 또한, 회사는 아래와 같이 개인정보관리 책임자와 개인정보관리 담당부서를 두고 있습니다.</strong>
                    <div className={styles['terms-section--terms-contents--list--box']}>
                        <h3>개인정보 보호책임자</h3>
                        <div className={styles['terms-section--terms-contents--list--box--info']}>
                            <span>성명 : 윤병희</span>
                            <span>직책 : 운영이사</span>
                        </div>
                        <div className={styles['terms-section--terms-contents--list--box--info']}>
                            <span>전화 : 02-1661-2503</span>
                            <span>팩스 : 050-8090-2503</span>
                            <span className={styles['desktop-component']}>이메일 : <a href="mailto:cs@littleone.kr" target="_blank">cs@littleone.kr</a></span>
                        </div>
                        <div className={cx(styles['terms-section--terms-contents--list--box--info'], styles['hide-component'])}>
                                                <span>
                                                    이메일 : <a href="mailto:cs@littleone.kr" target="_blank">cs@littleone.kr</a>
                                                </span>
                        </div>
                    </div>
                    <p>당사 이외의 공공기관에서 개인정보침해 상담을 원하실 경우 아래의 기관의 도움을 받으시기 바랍니다.</p>
                    <table className={styles['terms-section--terms-contents--list--table']}>
                        <caption>개인정보 침해 상담을 원하실 경우 아래의 기관에서 도움을 받으세요.</caption>
                        <thead>
                        <tr>
                            <th width="40%">기관</th>
                            <th width="40%">홈페이지</th>
                            <th>전화</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>개인정보분쟁조정위원회</td>
                            <td><a href="http://www.kopico.go.kr" target="_blank">http://www.kopico.go.kr</a></td>
                            <td>1833-6927</td>
                        </tr>
                        <tr>
                            <td>개인정보침해신고센터</td>
                            <td><a href="http://privacy.kisa.or.kr" target="_blank">http://privacy.kisa.or.kr</a></td>
                            <td>118</td>
                        </tr>
                        <tr>
                            <td>대검찰청 사이버범죄수사단</td>
                            <td><a href="http://cybercid.spo.go.kr" target="_blank">http://cybercid.spo.go.kr</a></td>
                            <td>1301</td>
                        </tr>
                        <tr>
                            <td>경찰청 사이버안전국</td>
                            <td><a href="http://cyberbureau.police.go.kr" target="_blank">http://cyberbureau.police.go.kr</a></td>
                            <td>182</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </li>
        )
    }
}

export default _PrivacyPolicyComponent08;