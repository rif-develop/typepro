import React, {Fragment} from 'react';
import {Router, Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import styles from './DashboardLayout.scss';
import BabyInfoWidgetComponent from "../../component/widget/BabyInfoWidgetComponent";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import DashboardHeader from "../../component/dashboardheader/DashboardHeader";
import classnames from 'classnames';
import Packery from 'packery';
import Draggabilly from 'draggabilly'
import BabyRegisterModal from "../../component/babyregister/BabyRegisterModal";
import ScreenBlockComponent from "../../component/screenblock/ScreenBlockComponent";
import CropperComponent from "../../component/cropper/CropperComponent";
import SmartbottleWidgetComponent from "../../component/widget/SmartbottleWidgetComponent";
import SmartpeepeeWidgetComponent from "../../component/widget/SmartpeepeeWidgetComponent";
import SmartTempWidgetComponent from "../../component/widget/SmartTempWidgetComponent";
import {socket} from "../../action/socket";
import BabyModifyModal from "../../component/babyregister/BabyModifyModal";
import {checkMobile} from "../../action/checkmobile";
import DatePickerComponent from "../../component/datepicker/DatePickerComponent";
import LoginLayout from "../login/Login";

class DashboardLayout extends React.PureComponent {

    static defaultProps = {
        isLogin: false
    };

    constructor(props) {
        super(props);
        this.state = {
            option: {
                itemSelector: '.widget-list',
                gutter: 24,
                percentPosition: false,
                initLayout: true,
                stagger: 40,
                columnWidth: 318,
                transitionDuration: '0.4s'
            },
            smartTemp: null,
            packery: 'no',
        };

        //packery, this.pckry로 접근;
        let pckry = null;
        //ref
        this.container = React.createRef();
        //bind
        this.setTempState = this.setTempState.bind(this);
    }
    componentDidMount() {
        //화면 맨위로
        document.body.scrollTo(0, 0);
        //1. 세션을 가져오고
        this.props.getSession();


        socket.emit('join', {clientId: '5c750b1a08edf25f97f2fb70'});
        socket.emit('test', 'dddd')


        socket.on('get smarttemp', (data) => {
            console.log('서버오 통신에 성공해서 값을 가져옴');
            console.log(data);
            const temp = data.temperature;
            this.setTempState(temp);
        });

        socket.on('get smartbottle', (data) => {
            console.log('# 스마트 보틀 데이터가 드디어@@');
            console.log(data);
        });

        socket.on('get smartpeepee', (data) => {
            console.log('# 스마트 피피 데이터가 드이어~~');
            console.log(data);
        });

        //1.세션을 가져오고 디폴트 아기를 가져오고 그 디폴트 아기의 정보도 가져온다.
        setTimeout(() => {
            const clientIdx = this.state.clientIdx;
            this.props.getDefaultBabyInfo(clientIdx);
        }, 200);

        setTimeout(() => {
            const obj = {
                clientIdx: this.props.clientIdx,
                babyIdx: this.props.babyIdx,
                date: new Date()
            };

            this.props.deviceDataRequest(obj)
        }, 300);

        //client의 _id로 방에 참가시킨다.

        //2. clientIdx를 보내서 서버에서 디폴트 아기값을 가져와야 한다. 하지만 새로고침하면 props가 늦게 받아진다.
        //자신만의 방을 만든다.
    }


    static getDerivedStateFromProps(props, state) {
        if (props.clientIdx !== state.clientIdx) {
            return {
                clientIdx: props.clientIdx
            }
        }
        if (props.babyIdx !== state.babyIdx) {
            return {
                babyIdx: props.babyIdx
            }
        }
        return null
    }

    //렌더링 후에 돔에 반영되기 전에
    getSnapshotBeforeUpdate(prevProps, prevState) {
        const width = prevProps.width;
        if (width <= 640) {
            //snapshot을 반환하면 componentDidUpdate에서 받아서 처리한다.
            return 'mobilePackery'
        } else if (width > 640) {
            return 'desktopPackery'
        }
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot === 'mobilePackery') {
            this.setState({
                packery: false
            })
        } else if (snapshot === 'desktopPackery') {
            this.setState({
                packery: true
            })
        }
    }

    setTempState(data) {
        this.setState({
            smartTemp: data
        })
    }

    componentWillUnmount() {

    }


    render() {
        //PropsToState
        const {
            isLogin, language, babyRegisterToggle, babyRegisterModal, babyModifyModal, closeAllModal,
            clientIdx, clientBabies, cropperOpen, cropperBlobSend, currentBaby, babyModifyToggle,
            cropperInit, toggleCropper, fileInfo, babyThumbnailCrop, babyDeleteRequest, setModifyInfo,
            pickerState, babyIdx
        } = this.props;

        //Action
        const {datepickerOpenRequest, deviceDataRequest} = this.props;

        const {smartTemp, option, packery} = this.state;

        //팩커리 변수
        let pckry = this.pckry;
        const elem = this.container.current;//요소를 담을 컨테이너

        if (elem !== null) {
            pckry = new Packery(elem, option);
        }
        if (packery && pckry !== null && mobilecheck() === false) {
            const target = document.querySelectorAll('.widget-list');
            target.forEach((elem, key) => {
                let draggie = new Draggabilly(elem);
                pckry.bindDraggabillyEvents(draggie);
            });
        }

        if (!isLogin) {
            return (
                <Redirect to={'/login'}></Redirect>
            )
        }

        return (
            <Fragment>
                <Head language={language} title={'리틀원 - 대쉬보드'} desc={'리틀원에서 소중한 아이의 매일의 변화를 관리하세요!'}/>
                <Header dashboard={true}/>

                {/*아이 모달창 활성화시 레이어 뒤에  스크린 블락*/}
                {
                    babyRegisterModal || babyModifyModal ? <ScreenBlockComponent action={closeAllModal}/> : undefined
                }
                {/*날짜 선택시 뜨는 모달창*/}
                {
                    pickerState && <ScreenBlockComponent action={datepickerOpenRequest}/>
                }
                {/*아이 등록 모달*/}
                {
                    babyRegisterModal && <BabyRegisterModal closeModal={babyRegisterToggle} clientIdx={clientIdx}/>
                }
                {/*아이 수정 모달*/}
                {
                    babyModifyModal && <BabyModifyModal babyModifyToggle={babyModifyToggle} clientIdx={clientIdx}/>
                }
                {/* 이미지 크랍퍼 불러오기 */}
                {
                    cropperOpen &&
                    <CropperComponent cropperBlobSend={cropperBlobSend} toggle={toggleCropper} fileInfo={fileInfo} clientIdx={clientIdx} init={cropperInit} isBabyCrop={true} babyThumbnailCrop={babyThumbnailCrop}/>
                }
                <div className={styles['dashboard-layout-container']}>
                    <DashboardHeader setModifyInfo={setModifyInfo} babyRegisterToggle={babyRegisterToggle} babyModifyToggle={babyModifyToggle} babyDeleteRequest={babyDeleteRequest} clientBabies={clientBabies}/>
                    <ul className={styles['dashboard-component']} ref={this.container} id={'pckry-component'}>
                        <BabyInfoWidgetComponent clientBabies={clientBabies} currentBaby={currentBaby} babyRegisterToggle={babyRegisterToggle} babyModifyToggle={babyModifyToggle} setModifyInfo={setModifyInfo}/>
                        <SmartbottleWidgetComponent/>
                        <SmartpeepeeWidgetComponent/>
                        <SmartTempWidgetComponent temperature={smartTemp}/>
                    </ul>
                </div>
            </Fragment>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.clientStatusReducer.login.isLogin,
        language: state.languageReducer.language,
        babyRegisterModal: state.babyInfoReducer.register,
        babyModifyModal: state.babyInfoReducer.modify,
        width: state.clientStatusReducer.width,
        clientIdx: state.clientStatusReducer.session._id,
        clientBabies: state.clientStatusReducer.session.babies,
        cropperOpen: state.cropperReducer.open,
        fileInfo: state.cropperReducer.file,
        currentBaby: state.babyInfoReducer.currentBaby,
        pickerState: state.dateReducer.dateModal,
        babyIdx: state.babyInfoReducer.currentBaby._id
    }
};
const
    mapDispatchToProps = (dispatch) => {
        return {
            babyRegisterToggle: () => dispatch({ //아이 등록 모달
                type: 'OPEN_BABY_REGISTER_MODAL'
            }),
            babyModifyToggle: () => dispatch({ //아이 수정 모달
                type: 'OPEN_BABY_MODIFY_MODAL',
            }),
            getSession: () => dispatch({
                type: 'REFRESH_SESSION_REQUEST'
            }),
            toggleCropper: () => dispatch({
                type: 'SET_CROPPER_MODAL_TOGGLE_REQUEST'
            }),
            cropperInit: () => dispatch({
                type: 'SET_CROPPER_MODAL_INIT'
            }),
            cropperBlobSend: (formData) => dispatch({ //아이 썸네일 변경을 요청,
                type: 'API_CROPPER_THUMBNAIL_SEND_REQUEST',
                formData
            }),
            babyThumbnailCrop: (blob) => dispatch({
                type: 'SET_TEMP_CROPPER_RESULT_BLOB',
                blob: blob
            }),
            babyDeleteRequest: (clientIdx, babyIdx) => dispatch({
                type: 'API_DELETE_BABY_INFO_REQUEST',
                clientIdx: clientIdx,
                babyIdx: babyIdx
            }),
            setModifyInfo: (baby) => dispatch({ //아이 수정시 리덕스토어에 수정할 아이 정보 저장
                type: 'SET_MODIFY_BABY_INFO',
                baby
            }),
            closeAllModal: () => dispatch({
                type: 'SET_BABY_INFO_ALL_MODAL_CLOSE'
            }),
            getDefaultBabyInfo: (clientIdx) => dispatch({
                type: 'API_DEFAULT_BABY_INFO_REQUEST',
                clientIdx
            }),
            datepickerOpenRequest: () => dispatch({
                type: 'SET_DATE_PICKER_TOGGLE'
            }),
            deviceDataRequest: (obj) => dispatch({ //렌더링 시 서버에 디바이스 데이터 요청
                type: 'API_CURRENT_DATE_DATA_REQUEST',
                obj
            })


        }
    };


export default connect(mapStateToProps, mapDispatchToProps)

(
    DashboardLayout
)
;