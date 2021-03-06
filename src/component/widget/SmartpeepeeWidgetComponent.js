import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class SmartpeepeeWidgetComponent extends React.PureComponent {

    render() {

        //propstostate
        const {smartpeepeeInfo} = this.props;

        return (
            <div className={cx(styles['dashboard-component--widget'], 'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>배변</h1>
                    <div className={cx(styles['dashboard-component--widget--container--icon-img'], styles['--smart-peepee'])}>스마트 피피이미지 입니다.</div>
                    <div className={styles['dashboard-component--widget--container--widget-info']}>
                        <p>배변 횟수</p>
                        <time>{smartpeepeeInfo ? smartpeepeeInfo : '기록 없음'}</time>
                        {
                            smartpeepeeInfo && <span className={styles['separated-spec']}>회</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        smartpeepeeInfo: state.dashboardReducer.smartPeepee.data
    }
};


export default connect(mapStateToProps)(SmartpeepeeWidgetComponent);

