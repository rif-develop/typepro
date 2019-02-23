import React, {Fragment} from 'react';
import styles from './DashboardHeader.scss';
import classnames from 'classnames';
import DateSelectorComponent from './dateselector/_DateSelectComponent';
import UpdateInfoComponent from './updatetime/_UpdateInfoComponent';
import ConnectedDeviceComponent from './device/_ConnectedDeviceComponent';
import Anime from 'react-anime';
import {connect} from "react-redux";

const cx = classnames.bind(styles);

//썸네일이 없는 기본 아이 이미지
const defaultThumb = require('./icn-no-baby@2x.png');

//update 시간 아이콘
const bottleTimeIcon = require('./update-icn-bottle@2x.png');
const peepeeTimeIcon = require('./update-icn-peepee@2x.png');
const tempTimeIcon = require('./update-icn-temp@2x.png');

//비활성화된 기기
const inactiveBottle = require('./web-dashboard-2560-1329-dashboard-icn-bottle-inactive@2x.png');
const inactivePeepee = require('./web-dashboard-2560-1329-dashboard-icn-peepee-inactive@2x.png');
const inactiveTemp = require('./web-dashboard-2560-1329-dashboard-icn-temp-inactive@2x.png');

//활성 기기
const activeBottle = require('./web-dashboard-2560-1329-dashboard-icn-bottle-active@2x.png');
const activePeepee = require('./web-dashboard-2560-1329-dashboard-icn-peepee-active@2x.png');
const activeTemp = require('./web-dashboard-2560-1329-dashboard-icn-temp-active@2x.png');

//기본 아이 썸네일
const boyThumb = require('./image/card-baby-info-icn-biy@2x.png');
const girlThumb = require('./image/card-baby-info-icn-girl@2x.png');


const clientBabyList = (clientBabies, babyRegisterToggle, babyDeleteRequest, getThisBaby, babyListToggle, babyModifyToggle, setModifyInfo) => {
    return (
        <div className={styles['dashboard-header-component--baby-container__list-box']} key={clientBabies.length + Date.now()}>
            <Anime opacity={[0, 1]} scale={[0.4, 1]} translateY={[`${Math.floor(Math.random() * 10 % 2) === 0 ? '+' : '-'}${Math.random() * 5}em`, '0']}
                   translateX={[`${Math.floor(Math.random() * 10 % 2) === 0 ? '+' : '-'}${Math.random() * 5}em`, '0']} delay={(e, i) => i * 70}>
                {
                    clientBabies.map((elem, key) => {
                        return (
                            <div key={key} data-id={elem._id}>
                                <a href={'#'} key={key} className={styles['dashboard-header-component--baby-container__selected']} onClick={(e) => {
                                    getThisBaby({
                                        clientIdx: elem.parent,
                                        babyIdx: elem._id
                                    });
                                }}>
                                    {
                                        (elem.src === null || elem.src === 'null') && elem.gender === 'm' ? <img src={boyThumb} title={elem.name + '이 반가워요!'}/> : null
                                    }
                                    {
                                        (elem.src === null || elem.src === 'null') && elem.gender === 'f' ? <img src={girlThumb} title={elem.name + '이 반가워요!'}/> : null
                                    }
                                    {
                                        (elem.src !== null || elem.src !== 'null') ? <img src={elem.src} title={elem.name + '이 반가워요!'}/> : null
                                    }
                                </a>
                                <div className={styles['dashboard-header-component--baby-container__list-box__buttons']}>
                                    <button type={'button'} className={styles['__modify-button']} onClick={(e) => {
                                        //모달창 토글
                                        babyModifyToggle();
                                        //수정할 아이 정보
                                        setModifyInfo(elem);
                                    }}>수정
                                    </button>
                                    <button type={'button'} className={styles['__delete-button']} onClick={(e) => {
                                        //아이가 한 명만 남았을 경우에 삭제하면 베이비리스트 창 닫아주기
                                        if (clientBabies.length <= 1) {
                                            babyListToggle();
                                            babyDeleteRequest(elem.parent, elem._id);
                                        } else {
                                            babyDeleteRequest(elem.parent, elem._id);
                                        }
                                    }}>삭제
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </Anime>
            <div style={{textAlign: 'center', marginTop: '10px'}}>
                <button type={'button'} onClick={babyRegisterToggle} className={styles['__add-button']}>추가</button>
            </div>
        </div>
    )
};

class DashboardHeader extends React.PureComponent {

    constructor(props) {
        super(props);
        //bind
    }


    render() {
        const {babyRegisterToggle, clientBabies, babyDeleteRequest, getThisBaby, currentBaby, babyListToggle, babyList, babyModifyToggle, setModifyInfo} = this.props;

        //아이가 1명이상이며, 썸네일이 있는 아이의 조건
        const condition = clientBabies.length >= 1;
        //현재 선택된 아기의 썸네일 값 조건
        const thumbCon = currentBaby.src !== null && currentBaby.src !== 'null';

        //썸네일 조건
        return (
            <div className={styles['dashboard-header-component']}>
                {/*클라이언트의 자녀 정보*/}


                <div className={styles['dashboard-header-component--baby-container']}>

                    {/*썸네일 조건*/}
                    {
                        condition ?
                            <a href="javascript:void(0)" title={currentBaby.name+'이의 대쉬보드 입니다.'} className={styles['dashboard-header-component--baby-container__selected']} onClick={condition ? babyListToggle : babyRegisterToggle}>
                                <img src={thumbCon ? currentBaby.src : !thumbCon && currentBaby.gender==='m' ? boyThumb:girlThumb} alt={'현재 선택된 아이의 썸네일 이미지입니다'}/>
                            </a> :
                            <a href="javascript:void(0)" title="등록된 아기가 없습니다." className={styles['dashboard-header-component--baby-container__selected']} onClick={condition ? babyListToggle : babyRegisterToggle}>
                                <img src={defaultThumb} alt={'현재 선택된 아이의 썸네일 이미지입니다'}/>
                            </a>

                    }

                    {/*아이 리스트 창*/}
                    {
                        babyList && clientBabies ? clientBabyList(clientBabies, babyRegisterToggle, babyDeleteRequest, getThisBaby, babyListToggle, babyModifyToggle, setModifyInfo) : undefined
                    }
                </div>
                {/*클라이언트의 자녀 정보*/}
                <DateSelectorComponent/>
                <UpdateInfoComponent bottleTimeIcon={bottleTimeIcon} peepeeTimeIcon={peepeeTimeIcon} tempTimeIcon={tempTimeIcon}/>
                <ConnectedDeviceComponent bottleImg={inactiveBottle} peepeeImg={inactivePeepee} tempImg={inactiveTemp}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentBaby: state.babyInfoReducer.currentBaby,
        babyList: state.babyInfoReducer.babyList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getThisBaby: (obj) => dispatch({
            type: 'API_CURRENT_BABY_INFO_REQUEST',
            obj
        }),
        babyListToggle: () => dispatch({
            type: 'SET_BABY_LIST_TOGGLE'
        }),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);