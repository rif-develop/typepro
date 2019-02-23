import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class SmartpeepeeWidgetComponent extends React.PureComponent {

    render() {
        return (
            <div className={cx(styles['dashboard-component--widget'], !this.props.desktop &&'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>배변</h1>
                    <div className={cx(styles['dashboard-component--widget--container--icon-img'], styles['--smart-peepee'])}>스마트 피피이미지 입니다.</div>
                    <div className={styles['dashboard-component--widget--container--widget-info']}>
                        <p>배변 횟수</p>
                        <time>기록 없음</time>
                    </div>
                </div>
            </div>
        )
    }
}

export default SmartpeepeeWidgetComponent;

