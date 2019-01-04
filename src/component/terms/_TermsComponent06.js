import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent06 extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            view:false
        }
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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제6조</em>회원가입</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. 이용자는 “몰”이 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.</li>
                        <li>2. “몰”은 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
                            <ol>
                                <li>1) 가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조 제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 “몰”의 회원재가입 승낙을 얻은 경우에는 예외로 한다.</li>
                                <li>2) 등록 내용에 허위, 기재누락, 오기가 있는 경우</li>
                                <li>3) 기타 회원으로 등록하는 것이 “몰”의 기술상 현저히 지장이 있다고 판단되는 경우</li>
                            </ol>
                        </li>
                        <li>3. 회원가입계약의 성립 시기는 “몰”의 승낙이 회원에게 도달한 시점으로 합니다.</li>
                        <li>4. 회원은 회원가입 시 등록한 사항에 변경이 있는 경우, 상당한 기간 이내에 “몰”에 대하여 회원정보 수정 등의 방법으로 그 변경사항을 알려야 합니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent06;