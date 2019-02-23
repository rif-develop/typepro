import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class SmartbottleWidgetComponent extends React.PureComponent {

    render() {
        return (
            <div className={cx(styles['dashboard-component--widget'],!this.props.desktop && 'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>수유</h1>
                    <div className={cx(styles['dashboard-component--widget--container--icon-img'], styles['--smart-bottle'])}>스마트 보틀이미지 입니다.</div>
                    <div className={styles['dashboard-component--widget--container--widget-info']}>
                        <p>마지막 수유시간</p>
                        <time>기록 없음</time>
                    </div>
                </div>
            </div>
        )
    }
}

export default SmartbottleWidgetComponent;

