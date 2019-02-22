import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);

const boyIcon = require('./boy.png');
const girIcon = require('./girl.png');

class BabyInfoWidgetComponent extends React.PureComponent {
    render() {

        const {currentBaby, clientBabies} = this.props;
        const condition = currentBaby !== null && currentBaby !== undefined && clientBabies.length > 0;
        return (
            <div className={cx(styles['dashboard-component--widget'], 'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>아이정보</h1>
                    <div className={styles['dashboard-component--widget--container--thumbnail']}>
                        <img src={condition ? currentBaby.src : require('./icn-no-baby@2x.png')} width="auto" height="auto" alt={'썸네일을 등록하지 않은 아이입니다.'}/>
                    </div>
                    <div className={styles['dashboard-component--widget--container--info']}>
                        {
                            condition ? <Fragment>
                                <div className={styles['dashboard-component--widget--container--info__title']}>
                                    <h2>{currentBaby.name}</h2>
                                    <img className={styles['__gender']} src={currentBaby.gender === 'm' ? boyIcon : girIcon} alt="회원님의 아기의 성별 정보입니다." width="auto" height="auto"/>
                                </div>
                                <span>생년월일 : {currentBaby.year + '-' + currentBaby.month + '-' + currentBaby.date}</span>
                                <span>키 : {currentBaby.height}cm , 몸무게 : {currentBaby.weight} kg , 혈액형 : {currentBaby.bloodType}</span>
                            </Fragment> : <h2>아이 정보 없음</h2>
                        }
                    </div>
                    <div className={styles['dashboard-component--widget--container--button-box']}>
                        <button type="button" className={cx(styles['__more-info-button'], condition ? undefined : styles['baby-register'])} onClick={condition ? null : null}>
                            {condition ? '수정' : '등록'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BabyInfoWidgetComponent