import React from "react";
import styles from "../DashboardHeader.scss";

class _UpdateInfoComponent extends React.PureComponent{
    render(){

        const {bottleTimeIcon,peepeeTimeIcon,tempTimeIcon} = this.props;
        return(
            <div className={styles['dashboard-header-component--update-info']}>
                <h2>최근 업데이트</h2>
                <div className={styles['dashboard-header-component--update-info--device']}>
                    <div>
                        <img src={bottleTimeIcon} alt={'스마트 보틀의 마지막 업데이트 시간을 나타냅니다.'} width="auto" height="auto"/>
                        <time>기록 없음</time>
                    </div>
                    <div>
                        <img src={peepeeTimeIcon} alt={'스마트 피피의 마지막 업데이트 시간을 나타냅니다.'} width="auto" height="auto"/>
                        <time>기록 없음</time>
                    </div>
                    <div>
                        <img src={tempTimeIcon} alt={'스마트 템프의 마지막 업데이트 시간을 나타냅니다.'} width="auto" height="auto"/>
                        <time>기록 없음</time>
                    </div>
                </div>
            </div>
        )
    }
}

export default _UpdateInfoComponent
