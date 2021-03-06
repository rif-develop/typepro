import React from 'react';
import styles from './CropperComponent.scss';
import Cropper from 'react-cropper';
import styles2 from './cropper.scss';
import {connect} from "react-redux";

/**
 * @param {File} image - Image File Object
 * @param {Object} pixelCrop - pixelCrop Object from the 2nd argument of onChange or onComplete
 * @param {String} fileName - Name of the returned file in Promise
 */
class CropperComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        //ref

        this.cropper = React.createRef();
        this.afterCrop = this.afterCrop.bind(this);
        this.babyCrop = this.babyCrop.bind(this);
    }

    //고객의 썸네일을 등록 및 수정 할떄
    afterCrop() {
        const cropper = this.cropper.current;
        const clientIdx = this.props.clientIdx;
        const originalName = this.props.fileInfo.originName;
        const name = this.props.fileInfo.name;
        const type = this.props.fileInfo.type;

        cropper.getCroppedCanvas({
            width: this.props.width || 200,
            height: this.props.height || 200,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 200,
            maxHeight: 200,
            fillColor: "#fff",
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high"
        }).toBlob(blob => {
            //클라이언트의 썸네일 변경(바로 변경되게)
            let formData = new FormData();
            formData.set('image', blob, name);
            formData.set('clientIdx', clientIdx);
            //서버에 데이터 전송 (리덕스);
            this.props.cropperBlobSend(formData);

        }, type);
    };

    //아이의 썸네일을 등록 및 수정 할 때 (props: isBabyCrop이 true여야만 한다)
    babyCrop() {
        const cropper = this.cropper.current;
        const clientIdx = this.props.clientIdx;
        const originalName = this.props.fileInfo.originName;
        const name = this.props.fileInfo.name;
        const type = this.props.fileInfo.type;

        cropper.getCroppedCanvas({
            width: this.props.width || 200,
            height: this.props.height || 200,
            minWidth: 0,
            minHeight: 0,
            maxWidth: 200,
            maxHeight: 200,
            fillColor: "#fff",
            imageSmoothingEnabled: true,
            imageSmoothingQuality: "high"
        }).toBlob(blob => {
            //클라이언트의 썸네일 변경(바로 변경되게)
            let formData = new FormData();
            formData.set('image', blob, name);
            //서버로 이미지 전송
            this.props.imageStoreRequest(formData);
        }, type);
    }

//1. 잘라진 이미지를 서버에 올린다. 2. 만약 사용자가 취소하면 삭제한다. 3.

    componentWillUnmount() {
        //스토어 초기화
        this.props.init();
    }

    render() {
        const {fileInfo, isBabyCrop} = this.props;


        return (
            <section className={styles['crop-image-modal']}>
                <div className={styles['crop-image-modal--container']}>
                    <h1>자르기</h1>
                    <div className={styles['crop-image-modal--container--buttons']}>
                        {/*이지 자르기 취소 버튼*/}
                        <button type="reset"
                                role="button"
                                aria-selected="true"
                                id="__cropper-cancel-button"
                                onClick={this.props.toggle}>취소
                        </button>
                        {/*이미지 자르기 버튼*/}
                        <button type="button"
                                role="button"
                                aria-selected="true"
                                id={'__crop-button'} className={styles['__crop-button']} onClick={isBabyCrop ? this.babyCrop : this.afterCrop}>썸네일 이미지 자르기
                        </button>
                    </div>
                </div>
                <div className={styles['crop-image-modal--canvas-box']}>
                    <Cropper ref={this.cropper} aspectRatio={1} style={{height: '100vh', width: 'auto'}} src={fileInfo.src}/>
                </div>
            </section>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        cropperInit: () => dispatch({
            type: 'SET_CROPPER_MODAL_INIT'
        }),
        imageStoreRequest: (formData) => dispatch({
            type: 'API_THUMBNAIL_TEMP_SAVE_REQUEST',
            formData
        })

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CropperComponent);