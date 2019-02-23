import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import styles from './BabyRegisterModal.scss';
import {innerCenter} from "../../lib/script";
import io from 'socket.io-client';

//컴포넌트
import ThumbnailComponent from './component/_ThumbnailComponent';
import BabynameComponent from './component/_BabynameComponent';
import BabybirthdateComponent from './component/_BabybirthdateComponent';
import BabyHeightComponent from './component/_BabyHeightComponent';
import BabyWeightComponent from './component/_BabyWeightComponent';
import BabyGenderComponent from './component/_BabyGenderComponent';
import BabyBloodtypeComponent from './component/_BabyBloodtypeComponent';
import InputThumbnailFileComponent from "../../pages/mypage/MypageUpdateLayout";

const cx = classnames.bind(styles);

class BabyModifyModal extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            form: new FormData()
        };

        //ref;
        this.modal = React.createRef();
        this.form = React.createRef();
        //binding
        this.onClickSubmit = this.onClickSubmit.bind(this);
        this.onClickCloseModal = this.onClickCloseModal.bind(this);
    }

    componentDidMount() {
        const ref = this.modal.current;
        innerCenter(ref);
        window.addEventListener('resize', function () {
            innerCenter(ref)
        });
    }

    onClickCloseModal() {
        //아이 등록창 토글 요청
        this.props.babyModifyToggle();
        //크랍퍼 초기화 요청 액션 디스패치
    }


    componentWillUnmount() {
        const ref = this.modal.current;
        window.removeEventListener('resize', function () {
            innerCenter(ref);
        });
    }

    onClickSubmit(e) {
        e.preventDefault();

        const form = this.form.current;

        const s3Key = this.props.thumbnail;
        const clientIdx = this.props.clientIdx;
        const babyIdx = this.props.babyInfo._id;

        console.log(babyIdx);

        const formData = new FormData(form);

        //s3 key값을 추가해준다.
        formData.set('src', s3Key);
        //client고유 값을 추가해준다.
        formData.set('clientIdx', clientIdx);
        //아이의 idx값을 추가해준다.
        formData.set('babyIdx', babyIdx);

        //아이수정 요청 액션 디스패치
        this.props.babyModifyRequest(formData);
    }

    render() {

        const {clientIdx, toggleCropper, setFileInfo, babyModifyToggle, thumbnailRemove, thumbnail, babyInfo} = this.props;

        return (
            <div className={styles['baby-info-register-modal']} ref={this.modal}>
                <div className={styles['baby-info-register-modal--head']}>
                    <h2 className={styles['baby-info-register-modal--head--title']}>아이 정보 수정</h2>
                </div>
                <form className={styles['baby-info-register-modal--form']} id={'baby-info-register-modal--form'} role="form" ref={this.form}>
                    <fieldset form={'baby-info-register-modal--form'}>
                        <legend>아이정보를 수정하실 수 있는 폼입니다.</legend>
                        <ThumbnailComponent toggle={toggleCropper} clientIdx={clientIdx} fileResult={setFileInfo} thumbnailRemove={thumbnailRemove} thumbnail={babyInfo.src}/>
                        <BabynameComponent name={babyInfo.name}/>
                        <BabybirthdateComponent year={babyInfo.year} month={babyInfo.month} date={babyInfo.date}/>
                        <BabyHeightComponent height={babyInfo.height}/>
                        <BabyWeightComponent weight={babyInfo.weight}/>
                        <BabyBloodtypeComponent bloodType={babyInfo.bloodType}/>
                        <BabyGenderComponent gender={babyInfo.gender}/>
                    </fieldset>
                </form>
                <div className={styles['baby-info-register-modal--buttons']}>
                    <button type="button" role="button" className={styles['__cancel-baby-modal-button']} onClick={this.onClickCloseModal}>취소</button>
                    <button type="submit" role="button" className={styles['__confirm-baby-modal-button']} onClick={this.onClickSubmit}>수정</button>
                </div>
                <button type="button" role="button" className={styles['__close-modal-button']} onClick={babyModifyToggle}>ENTER입력시 모달창을 닫습니다.</button>
            </div>
        )
    }
}

BabyModifyModal.propTypes = {
    language: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        thumbnail: state.babyInfoReducer.src,
        babyInfo: state.babyInfoReducer.currentModifyBaby
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleCropper: () => dispatch({
            type: 'SET_CROPPER_MODAL_TOGGLE_REQUEST'
        }),
        cropperInit: () => dispatch({
            type: 'SET_CROPPER_MODAL_INIT'
        }),
        cropperBlobSend: (formData) => dispatch({
            type: 'API_CROPPER_THUMBNAIL_SEND_REQUEST',
            formData
        }),
        thumbnailRemove: (key) => dispatch({
            type: 'API_BABY_THUMBNAIL_REMOVE_REQUEST',
            key
        }),
        setFileInfo: (src, fileName, fileType, size, originName) => dispatch({
            type: 'SET_CROPPER_SRC_RESULT_REQUEST',
            src: src,
            fileName: fileName,
            fileType: fileType,
            size: size,
            originName: originName,
        }),
        babyModifyRequest:(formData)=> dispatch({
            type:'API_MODIFY_BABY_INFO_REQUEST',
            formData
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BabyModifyModal);