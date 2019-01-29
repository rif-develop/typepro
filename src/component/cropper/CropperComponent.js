import React from 'react';
import styles from './CropperComponent.scss';
import Cropper from 'react-cropper';
import './cropper.scss';

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
    }

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
            let formData = new FormData();
            formData.set('image', blob, name);
            formData.set('clientIdx', clientIdx);
            //서버에 데이터 전송 (리덕스);
            this.props.cropperBlobSend(formData);
        }, type);
    };

    componentWillUnmount() {
        //스토어 초기화
        this.props.init();
    }

    render() {
        const {fileInfo} = this.props;


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
                                id="__crop-button" onClick={this.afterCrop}>썸네일 이미지 자르기
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

export default CropperComponent