import React from 'react';
import classnames from 'classnames';
import styles from '../BabyRegisterModal.scss';
import {Validations} from "../../../lib/validation";
const cx = classnames.bind(styles);

class _ThumbnailComponent extends React.PureComponent{


    constructor(props) {
        super(props);
        this.state = {
            fileSize: 3000000,
            format: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'],
        };
        this.thumbnail = React.createRef();
        this.onChangeFile = this.onChangeFile.bind(this);
        this.thumbnailRemoveHandler = this.thumbnailRemoveHandler.bind(this);
    }

    thumbnailRemoveHandler() {
        //s3key 링크
        const thumbnail = this.props.thumbnail;

        if (this.props.thumbnailRemove) {
            this.props.thumbnailRemove(thumbnail);
        }
    }

    onChangeFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0];
            const type = file.type;
            const size = file.size;
            let name = file.name;
            const originName = name;

            console.log(`${type} ${size} ${name} ${file}`);

            if (size >= this.state.fileSize) {
                alert('용량이 너무 큽니다.');
                return;
            } else if (this.state.format.indexOf(type) === -1) {
                alert('jpg, jpeg, gif, png, svg만 가능합니다.');
                return;
            }
            const ext = name.substr(name.lastIndexOf('.'), name.length);
            name = name.replace(ext, '').trim();
            console.log(name);
            console.log(ext);

            //파일명 정규식 검사
            const regResult = Validations.checkFilename(name);

            //정규식 검사 통과시
            if (regResult) {

                let fileReader = new FileReader();
                //cropper 여는 요청
                this.props.toggle();


                fileReader.onload = (e) => {
                    // 아이 정보 및 등록은 바로 s3에 등록시키지 않는다.
                    this.props.fileResult(e.target.result, name, type, size, originName);
                };//file onload

                fileReader.readAsDataURL(file);


            } else {
                alert('파일명에 특수문자를 넣지 마세요.');
                file = null;
            }

            e.target.value = null;
        } else {
            alert('no')
        }//end if~else
    }

    render(){
        return(
            <div className={styles['baby-info-register-modal--form--thumb-box']}>
                <img ref={this.thumbnail}  src={this.props.thumbnail || require('../icn-no-baby@2x.png')} className={styles['_image']} width="auto" height="auto" alt={'아이의 썸네일 이미지를 넣어주세요.'}/>
                <div className={styles['baby-info-register-modal--form--thumb-box--buttons']}>
                    <button type="button" className={styles['__remove-baby-thumbnail-button']} onClick={this.thumbnailRemoveHandler}>삭제</button>
                    <label htmlFor={'baby-thumbnail-component'} className={styles['__find-picture-button']}>사진찾기
                        <input type="file" name="baby_file" id={'baby-thumbnail-component'} accept={'image/*'} onChange={this.onChangeFile}/>
                    </label>
                </div>
            </div>
        )
    }
}

export default _ThumbnailComponent
