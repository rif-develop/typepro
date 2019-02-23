import React, {Fragment} from 'react';
import styles from './WidgetComponent.scss';
import classnames from 'classnames';

const cx = classnames.bind(styles);
//성별 아이콘
const boyIcon = require('./boy.png');
const girIcon = require('./girl.png');
//성별 썸네일
const defaultBoyThumb = require('./image/card-baby-info-icn-biy@2x.png');
const defaultGirlThumb = require('./image/card-baby-info-icn-girl@2x.png');

class BabyInfoWidgetComponent extends React.PureComponent {
    render() {

        //State Props
        const {currentBaby, clientBabies, clientIdx} = this.props;
        //Action Props
        const {babyModifyToggle, babyRegisterToggle,setModifyInfo} = this.props;
        const condition = currentBaby !== null && currentBaby !== undefined && clientBabies.length > 0;

        const thumbCon = currentBaby.src !== null && currentBaby.src !== 'null';


        return (
            <div className={cx(styles['dashboard-component--widget'], 'widget-list')}>
                <div className={styles['dashboard-component--widget--container']}>
                    <h1 className={styles['dashboard-component--widget--container--title']}>아이정보</h1>
                    <div className={styles['dashboard-component--widget--container--thumbnail']}>
                        {
                            condition ? <img src={thumbCon ? currentBaby.src : currentBaby.gender === 'm' ? defaultBoyThumb : defaultGirlThumb} width="auto" height="auto" alt={'썸네일을 등록하지 않은 아이입니다.'}/>
                                : <img src={require('./icn-no-baby@2x.png')} width="auto" height="auto" alt={'아이가 없습니다. 아이를 등록해 주세요.'}/>

                        }
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
                        <button type="button" className={cx(styles['__more-info-button'], condition ? undefined : styles['baby-register'])} onClick={condition ? (e) => {
                            //수정할 아이의 정보를 리덕스에 디스패치
                            setModifyInfo(currentBaby);
                            //수정 모달창 토글
                            babyModifyToggle();
                        } : babyRegisterToggle}>
                            {condition ? '수정' : '등록'}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default BabyInfoWidgetComponent