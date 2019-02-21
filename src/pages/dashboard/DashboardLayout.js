import React, {Fragment} from 'react';
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
import {pckry} from "../../action/packery";

class DashboardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            option: {
                itemSelector: '.widget-list',
                gutter: 24,
                percentPosition: false,
                initLayout: true,
                columnWidth: 318,
                transitionDuration: '0.4s'
            },
            smarttemp: 0
        };

        //ref
        this.container = React.createRef();
        //bind
        this.setTempState = this.setTempState.bind(this);
    }

    componentDidMount() {
        //화면 맨위로
        document.body.scrollTo(0, 0);





        //대쉬보드에 들어왔을 경우 소켓을 켜서 데이터를 받을 준비가 됐다고 서버에 알린다.
        const clientIdx = this.props.clientIdx;

        //자신만의 방을 만든다.

        socket.emit('test', 'dd');
        socket.emit('smarttemp', '스마트 보틀 연결되었습니다.');
        socket.emit('smartbottle', '스마트 피피 연결되었습니다.');
        socket.emit('smartpeepee', '스마트 템프 연결되었습니다.');

        socket.on('response', (data) => {
            console.log('서버오 통신에 성공해서 값을 가져옴');
            console.log(data);
            const temp = data.temperature;
            this.setTempState(temp);
        });
    }


    componentWillUpdate(nextProps, nextState, nextContext) {
        if (nextProps.width) {
            if (nextProps.width >= 641) {
                const elem = this.container.current;//요소를 담을 컨테이너
                const pckry = new Packery(elem, this.state.option);

                const target = document.querySelectorAll('.widget-list');
                //팩커리 드래거블 바인
                setTimeout(()=>{
                    target.forEach((elem, key) => {
                        const draggie = new Draggabilly(elem);
                        pckry.bindDraggabillyEvents(draggie);
                        pckry.layout()
                    });
                },300);


            } else {
                const elem = this.container.current;//요소를 담을 컨테이너
                const pckry = new Packery(elem, this.state.option);

                // const target = document.querySelectorAll('.widget-list');
                //
                // setTimeout(()=>{
                //     target.forEach((elem, key) => {
                //         const draggie = new Draggabilly(elem);
                //         pckry.unbindDraggabillyEvents(draggie);
                //         pckry.layout()
                //     });
                // },300);


            }
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.clientIdx) {
            //client의 _id로 방에 참가시킨다.
            socket.emit('join', {clientId: nextProps.clientIdx});
        }
    }

    setTempState(data) {
        this.setState({
            smarttemp: data
        })
    }

    componentWillMount() {
        this.props.getSession();
    }


    componentWillUnmount() {

    }

    render() {

        const {
            isLogin, language, babyRegisterToggle, babyRegisterModal,
            clientIdx, clientBabies, cropperOpen, cropperBlobSend, currentBaby,
            cropperInit, toggleCropper, fileInfo, babyThumbnailCrop, babyDeleteRequest,

        } = this.props;

        const {smarttemp} = this.state;

        if (!isLogin) {
            //로그인 되어 있지 않다면 돌려보낸다.
            return false;
        }


        return (
            <Fragment>
                <Head language={language} title={'리틀원 - 대쉬보드'} desc={'리틀원에서 소중한 아이의 매일의 변화를 관리하세요!'}/>
                <Header dashboard={true}/>
                {/*아이 등록 모달창이 뜨면 스크린 블락도 뜨게하기*/}
                {
                    babyRegisterModal && <ScreenBlockComponent action={babyRegisterToggle}/>
                }
                {/*아이 등록 모달*/}
                {
                    babyRegisterModal && <BabyRegisterModal closeModal={babyRegisterToggle} clientIdx={clientIdx}/>
                }
                {/* 이미지 크랍퍼 불러오기 */}
                {
                    cropperOpen && <CropperComponent cropperBlobSend={cropperBlobSend} toggle={toggleCropper} fileInfo={fileInfo} clientIdx={clientIdx} init={cropperInit} isBabyCrop={true} babyThumbnailCrop={babyThumbnailCrop}/>
                }
                <div className={styles['dashboard-layout-container']}>
                    <DashboardHeader babyRegisterToggle={babyRegisterToggle} clientBabies={clientBabies} babyDeleteRequest={babyDeleteRequest}/>
                    <ul className={styles['dashboard-component']} ref={this.container} id={'pckry-component'}>
                        <BabyInfoWidgetComponent currentBaby={currentBaby}/>
                        <SmartbottleWidgetComponent/>
                        <SmartpeepeeWidgetComponent/>
                        <SmartTempWidgetComponent temperature={smarttemp}/>
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
        width: state.clientStatusReducer.width,
        clientIdx: state.clientStatusReducer.session._id,
        clientBabies: state.clientStatusReducer.session.babies,
        cropperOpen: state.cropperReducer.open,
        fileInfo: state.cropperReducer.file,
        currentBaby: state.babyInfoReducer.currentBaby
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        babyRegisterToggle: () => dispatch({
            type: 'OPEN_BABY_REGISTER_MODAL'
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
        })

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);