import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent24 extends React.Component{

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제24조</em> 재판권 및 준거법</h2>
                <div className={cx(styles['terms-section--terms-contents--list'], this.state.view? styles['active']:null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>1. “몰”과 이용자 간에 발생한 전자상거래 분쟁에 관한 소송은 제소 당시의 이용자의 주소에 의하고, 주소가 없는 경우에는 거소를 관할하는 지방법원의 전속관할로 합니다. 다만, 제소 당시 이용자의 주소 또는 거소가 분명하지 않거나 외국 거주자의 경우에는 민사소송법상의 관할법원에 제기합니다.</li>
                        <li>2. “몰”과 이용자 간에 제기된 전자상거래 소송에는 한국법을 적용합니다.</li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent24;