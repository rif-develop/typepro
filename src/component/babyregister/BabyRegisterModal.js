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

class BabyRegisterModal extends React.PureComponent {

    static defaultProps = {};


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

    onClickCloseModal(){
        //아이 등록창 토글 요청
        this.props.closeModal();
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

        const formData = new FormData(form);

        //s3 key값을 추가해준다.
        formData.set('src', s3Key);
        //client고유 값을 추가해준다.
        formData.set('clientIdx', clientIdx);
        //아이등록 요청 액션 디스패치
        this.props.babyRegisterRequest(formData);
        //크랍퍼 초기화 요청 액션 디스패치

    }

    render() {

        const {closeModal, clientIdx, toggleCropper, setFileInfo, cropperInit, cropperBlobSend, thumbnailRemove, thumbnail} = this.props;
        return (
            <div className={styles['baby-info-register-modal']} ref={this.modal}>
                <div className={styles['baby-info-register-modal--head']}>
                    <h2 className={styles['baby-info-register-modal--head--title']}>아이정보</h2>
                </div>
                <form className={styles['baby-info-register-modal--form']} id={'baby-info-register-modal--form'} role="form" ref={this.form}>
                    <fieldset form={'baby-info-register-modal--form'}>
                        <legend>아이정보를 등록하실 수 있는 폼입니다.</legend>
                        <ThumbnailComponent toggle={toggleCropper} clientIdx={clientIdx} fileResult={setFileInfo} thumbnailRemove={thumbnailRemove} thumbnail={thumbnail}/>
                        <BabynameComponent/>
                        <BabybirthdateComponent/>
                        <BabyHeightComponent/>
                        <BabyWeightComponent/>
                        <BabyBloodtypeComponent/>
                        <BabyGenderComponent/>
                    </fieldset>
                </form>
                <div className={styles['baby-info-register-modal--buttons']}>
                    <button type="button" role="button" className={styles['__cancel-baby-modal-button']} onClick={this.onClickCloseModal}>취소</button>
                    <button type="submit" role="button" className={styles['__confirm-baby-modal-button']} onClick={this.onClickSubmit}>등록</button>
                </div>
                <button type="button" role="button" className={styles['__close-modal-button']} onClick={closeModal}>ENTER입력시 모달창을 닫습니다.</button>
            </div>
        )
    }
}

BabyRegisterModal.propTypes = {
    language: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        thumbnail: state.babyInfoReducer.src,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        babyRegisterRequest: (formData) => dispatch({
            type: 'API_REGISTER_BABY_INFO_REQUEST',
            formData
        }),
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BabyRegisterModal);