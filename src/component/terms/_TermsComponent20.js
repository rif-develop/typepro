import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent20 extends React.Component{

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제20조</em> 이용자의 의무</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
                    <ul className={cx(styles['__description-ordered'], styles['__middle-height'])}>
                        <li>1. 신청 또는 변경 시 허위 내용의 등록</li>
                        <li>2. 타인의 정보 도용</li>
                        <li>3. “몰”에 게시된 정보의 변경</li>
                        <li>4. “몰”이 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                        <li>5. “몰” 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                        <li>6. “몰” 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                        <li>7. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 “몰”에 공개 또는 게시하는 행위</li>
                    </ul>
                </div>
            </li>
        )
    }
}

export default _TermsComponent20;