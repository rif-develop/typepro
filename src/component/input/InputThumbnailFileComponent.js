import React, {Fragment} from 'react';
import styles from "../../pages/signup/SignupLayout.scss";
import classnames from 'classnames';
import {Validations} from "../../lib/validation";
import axios from 'axios';

const cx = classnames.bind(styles);

class InputThumbnailFileComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileSize: 3000000,
            format: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/svg'],
        };
        this.thumbnail = React.createRef();
        this.onChangeFile = this.onChangeFile.bind(this);
        this.removeRequest = this.removeRequest.bind(this);
    }

    removeRequest() {
        const key = this.props.thumbnail;
        const clientIdx = this.props.clientIdx;
        const formData = new FormData();

        formData.set('key', key);//s3 버킷의 키값(이미지이름);
        formData.set('clientIdx',clientIdx);// 디비에서 삭제할 썸네일의 주인

        if (this.props.thumbnailRemove) {
            this.props.thumbnailRemove(formData);
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
                    //리덕스 스토어에 파일 정보 저장
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


    render() {
        return (
            <div className={cx(styles['client-join-section--form--box'], styles['thumbnail-modify-component'])}>
                <div className={styles['thumbnail-modify-component--image']}>
                    <img id="client-thumbnail-image" ref={this.thumbnail} src={this.props.thumbnail || require('./icn-no-baby@2x.png')} width={'auto'} height={'auto'} alt={''}/>
                </div>
                <div className={styles['thumbnail-modify-component--file-upload']}>
                    <button type="button" className={styles['__remove-client-thumbnail']} tabIndex={1} onClick={this.removeRequest}>삭제</button>
                    <label htmlFor="thumbnail-input-component" tabIndex={2} className={styles['__upload-client-thumbnail']}>
                        업로드
                        <input type="file"
                               name="hidden-thumbnail"
                               id="thumbnail-input-component"
                               capture=".jpg, .png, .jpeg, .gif, .svg"
                               onChange={this.onChangeFile}/>
                    </label>
                </div>
            </div>
        )
    }
}

export default InputThumbnailFileComponent