import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent09 extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            view:false
        };

        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler(){
        this.setState({
            view:!this.state.view
        });
    }

    render(){
        return(
            <li>
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제9조</em>구매신청</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. “몰”이용자는 “몰”상에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, “몰”은 이용자가 구매신청을 함에 있어서 다음의 각 내용을 알기 쉽게 제공하여야 합니다.
                            <ol>
                                <li>1) 재화 등의 검색 및 선택</li>
                                <li>2) 받는 사람의 성명, 주소, 전화번호, 전자우편주소(또는 이동전화번호) 등의 입력</li>
                                <li>3) 약관내용, 청약철회권이 제한되는 서비스, 배송비, 설치비 등의 비용부담과 관련한 내용에 대한 확인</li>
                                <li>4) 이 약관에 동의하고 위 3호의 사항을 확인하거나 거부하는 표시(예, 마우스 클릭)</li>
                                <li>5) 재화 등의 구매신청 및 이에 관한 확인 또는 “몰”의 확인에 대한 동의</li>
                                <li>6) 결제방법의 선택</li>
                            </ol>

                        </li>
                        <li>2. “몰”은 불특정다수 회원에 대한 통지의 경우 1주일이상 “몰” 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent09;