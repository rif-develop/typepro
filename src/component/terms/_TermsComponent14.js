import React from 'react';
import classnames from 'classnames';
import styles from "../../pages/termsofuse/TermsOfUseLayout.scss";
const cx = classnames.bind(styles);

class _TermsComponent14 extends React.Component{

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
                <h2 className={cx(styles['terms-section--terms-contents--title'], this.state.view ? styles['active']:null)} onClick={this.onClickHandler}><em>제14조</em> 환급</h2>
                <div className={cx(styles['terms-section--terms-contents--list'],this.state.view ? styles['active']:null)}>
                    <ol className={styles['__description-ordered']}>
                        <li>
                            1. “몰”은 이용자가 구매신청한 재화 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 재화 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.
                        </li>
                    </ol>
                </div>
            </li>
        )
    }
}

export default _TermsComponent14;