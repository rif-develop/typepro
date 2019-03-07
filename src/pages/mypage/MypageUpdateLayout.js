import React, {Fragment} from 'react';
import styles from '../signup/SignupLayout.scss';
import classnames from 'classnames';
import {connect} from "react-redux";
import Head from "../../component/head/head";
import Header from "../../component/header/Header";
import Footer from "../../component/footer/Footer";
import InputEmailComponent from "../../component/input/InputEmailComponent";
import InputNicknameComponent from "../../component/input/InputNicknameComponent";
import InputNameComponent from "../../component/input/InputNameComponent";
import InputGenderComponent from "../../component/input/InputGenderComponent";
import InputBirthdateComponent from "../../component/input/InputBirthdateComponent";
import InputUpdateSubmitComponent from "../../component/input/InputUpdateSubmitComponent";
import ModalComponent from "../../component/modal/ModalComponent";
import InputPhoneAuthComponent from "../../component/input/InputPhoneAuthComponent";
import InputThumbnailFileComponent from "../../component/input/InputThumbnailFileComponent";
import CropperComponent from "../../component/cropper/CropperComponent";
import NexmoVerifyComponent from "../../component/nexmoVerify/NexmoVerifyComponent";
import InputPhoneComponent from "../../component/input/InputPhoneComponent";

const cx = classnames.bind(styles);

class MypageUpdateLayout extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            phoneModal: false,
        };
        //ref
        this.form = React.createRef();
        //bind
        this.nexmoAuthProcess = this.nexmoAuthProcess.bind(this);

    }


    componentWillMount() {
        //세션이 있는 지 확인한다.
        this.props.getSession();

    }

    componentDidMount() {
        // 페이지에 접근할 수 있는 상태인지 확인한다.
        // if (!this.props.isChecked) {
        //     console.log('접근 권한이 없습니다.');
        //     //돌려보낸다.
        //     this.props.history.push('/')
        // }
    }

    componentWillUnmount() {
        this.props.pageInit()
    }

    nexmoAuthProcess() {
        this.setState({
            phoneModal: !this.state.phoneModal
        })
    }


    render() {
        const {
            language, updateClientRequest,
            thumbnailRemove, clientIdx, success,
            clientStatus, isLogin, toggleCropper,
            cropperOpen, fileInfo, setFileInfo,
            cropperBlobSend, thumbnail, cropperInit,
            modalOpen, openModalRequest, phoneVerified, clientPhone
        } = this.props;

        if (!isLogin) {
            return false
        }

        return (
            <Fragment>
                {
                    modalOpen ? <NexmoVerifyComponent actionType={'updatePhone'} toggle={openModalRequest}/> : null
                }
                {
                    success && <ModalComponent action={(e) => {
                        this.props.history.push('/')
                    }}
                                               subject={'성공'}
                                               desc={'회원님의 정보가 수정되었습니다.'}/>
                }

                {
                    cropperOpen && <CropperComponent cropperBlobSend={cropperBlobSend} toggle={toggleCropper} fileInfo={fileInfo} clientIdx={clientIdx} init={cropperInit}/>
                }

                <Head language={language} title={'리틀원 - 회원 정보 수정'} description={'리틀원 회원님의 개인 정보를 수정하실 수 있는 페이지입니다.'}/>
                <Header/>
                <section className={styles['client-join-section']}>
                    <div className={styles['client-join-section--desc']}>
                        <h1>회원 정보 수정</h1>
                        <p>회원님의 개인정보를 수정하실 수 있습니다.</p>
                    </div>
                    <div>
                        <form className={styles['client-join-section--form']} id={'client-update-form'} role="form" ref={this.form}>
                            <fieldset form="client-update-form">
                                <legend>리틀원의 회원정보 수정 폼입니다.</legend>
                                <InputThumbnailFileComponent toggle={toggleCropper} clientIdx={clientIdx} fileResult={setFileInfo} thumbnail={thumbnail} thumbnailRemove={thumbnailRemove}/>
                                <InputEmailComponent clientEmail={clientStatus.email}/>
                                <InputNicknameComponent clientNickName={clientStatus.nickname} clientIdx={clientIdx}/>
                                <InputNameComponent clientName={clientStatus.name.first}/>
                                <InputGenderComponent clientGender={clientStatus.gender}/>
                                <InputBirthdateComponent year={clientStatus.birth.year} month={clientStatus.birth.month} date={clientStatus.birth.date}/>
                                <InputPhoneAuthComponent toggle={openModalRequest} phoneVerified={phoneVerified} clientPhone={clientPhone}/>
                                {
                                    clientPhone ? <InputPhoneComponent clientPhone={clientPhone}/> : undefined
                                }
                                <InputUpdateSubmitComponent clientIdx={clientIdx} form={'client-update-form'} action={updateClientRequest}/>
                            </fieldset>
                        </form>
                    </div>
                </section>
                <Footer/>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.languageReducer.language,
        clientIdx: state.clientStatusReducer.session._id,
        clientPhone: state.clientStatusReducer.session.phone,
        success: state.mypageReducer.success,
        isChecked: state.mypageReducer.isChecked,
        clientStatus: state.clientStatusReducer.session,
        isLogin: state.clientStatusReducer.login.isLogin,
        cropperOpen: state.cropperReducer.open,
        fileInfo: state.cropperReducer.file,
        thumbnail: state.clientStatusReducer.session.thumbnail,
        modalOpen: state.phoneAuthReducer.open,
        phoneVerified: state.phoneAuthReducer.updateResult
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        webLoginRequest: (session) => dispatch({
            type: 'WEB_LOGIN_REQUEST',
            session: session
        }),
        webLogoutRequest: () => dispatch({
            type: 'WEB_LOGOUT_REQUEST'
        }),
        updateClientRequest: (formData) => dispatch({
            type: 'UPDATE_CLIENT_INFO_REQUEST',
            formData
        }),
        pageInit: () => dispatch({
            type: 'API_MYPAGE_UPDATE_INIT'
        }),
        getSession: () => dispatch({
            type: 'REFRESH_SESSION_REQUEST'
        }),
        toggleCropper: () => dispatch({
            type: 'SET_CROPPER_MODAL_TOGGLE_REQUEST'
        }),
        setFileInfo: (src, fileName, fileType, size, originName) => dispatch({
            type: 'SET_CROPPER_SRC_RESULT_REQUEST',
            src: src,
            fileName: fileName,
            fileType: fileType,
            size: size,
            originName: originName,
        }),
        cropperInit: () => dispatch({
            type: 'SET_CROPPER_MODAL_INIT'
        }),
        cropperBlobSend: (formData) => dispatch({
            type: 'API_CROPPER_THUMBNAIL_SEND_REQUEST',
            formData
        }),
        thumbnailRemove: (formData) => dispatch({
            type: 'API_THUMBNAIL_REMOVE_REQUEST',
            formData
        }),
        openModalRequest: () => dispatch({
            type: 'SET_PHONE_AUTH_MODAL_OPEN_TOGGLE'
        }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MypageUpdateLayout);
