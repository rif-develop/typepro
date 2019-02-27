import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';
import {connect} from "react-redux";

const cx = classnames.bind(styles);

class SmartbottleWidgetComponent extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            time: null
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const newDate = new Date(prevProps.smartBottleInfo);
        const year = newDate.getFullYear();
        const month = newDate.getMonth() < 10 ? '0' + newDate.getMonth() : newDate.getMonth();
        const date = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        const hour = newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours();
        const min = newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes();

        this.setState({
            time: `${year}-${month}-${date} ${hour}:${min}`
        })
    }

    render() {
        const {smartBottleInfo} = this.props;


        return (
            <div className={cx(styles['dashboard-component--widget'], 'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>수유</h1>
                    <div className={cx(styles['dashboard-component--widget--container--icon-img'], styles['--smart-bottle'])}>스마트 보틀이미지 입니다.</div>
                    <div className={styles['dashboard-component--widget--container--widget-info']}>
                        <p>마지막 수유시간</p>
                        <time>{smartBottleInfo ? smartBottleInfo : '기록 없음'}</time>
                        {
                            smartBottleInfo && <time className={styles['separated-spec']} dateTime={smartBottleInfo}></time>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        smartBottleInfo: state.dashboardReducer.smartBottle.lastTime
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(SmartbottleWidgetComponent);

