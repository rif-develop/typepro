import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

class SmartTempWidgetComponent extends React.PureComponent {

    render() {
        const {temperature} = this.props;
        return (
            <div className={cx(styles['dashboard-component--widget'],'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>체온</h1>
                    <div className={cx(styles['dashboard-component--widget--container--icon-img'], styles['--smart-temp'])}>스마트 템프이미지 입니다.</div>
                    <div className={styles['dashboard-component--widget--container--widget-info']}>
                        <p>마지막 측정 체온</p>
                        <time>{temperature ? temperature : '기록 없음'}</time>
                        {
                            temperature && <span className={styles['separated-spec']}>℃</span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SmartTempWidgetComponent;

