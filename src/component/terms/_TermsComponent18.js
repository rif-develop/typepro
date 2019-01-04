import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent18 extends React.Component{

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제18조</em> “몰”의 의무</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view ? styles['active']:null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. “몰”은 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 재화‧용역을 제공하는데 최선을 다하여야 합니다.</li>
                        <li>2. “몰”은 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.</li>
                        <li>3. “몰”이 상품이나 용역에 대하여 「표시‧광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시‧광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.</li>
                        <li>4. “몰”은 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent18;