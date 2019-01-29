import {takeEvery, put, call, all} from "redux-saga/effects";
import axios from "axios";

export function* watcherCropperRequest() {
    yield takeEvery('API_CROPPER_THUMBNAIL_SEND_REQUEST', cropperBlobSaga);
    yield takeEvery('API_THUMBNAIL_REMOVE_REQUEST', thumbnailRemoveSaga);
}


function cropperBlobAxios({formData}) {
    return axios({
        url: '/upload/image',
        data: formData,
        method: 'POST',
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    });
}

function* cropperBlobSaga(formData) {
    try {
        const response = yield call(cropperBlobAxios, formData);
        if (response.data.success) {
            //성공 처리
            yield all([
                put({
                    type: 'API_CROPPER_THUMBNAIL_SEND_SUCCESS',
                }),
                put({
                    type: 'REFRESH_SESSION_REQUEST'
                })
            ]);
            //썸네일 갱신을 위한 리덕스 스토어 및 세션 업데이트

        } else {
            throw response.data
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_CROPPER_THUMBNAIL_SEND_FAILURE',
            error: e
        })
    }
}


function thumbnailRemoveAxios({formData}) {
    return axios({
        method: 'POST',
        data: {
            key:formData.get('key'),
            clientIdx:formData.get('clientIdx')
        },
        url: '/upload/image/delete'
    });
}


function* thumbnailRemoveSaga(formData) {
    try{
        const response = yield call(thumbnailRemoveAxios, formData);
        if(response.data.success){
            //세션 재갱신
            yield put({
                type:'REFRESH_SESSION_REQUEST'
            });
        } else{
            throw response.data;
        }


    } catch (e) {
        console.log(e);
        yield put({
            type:'API_THUMBNAIL_REMOVE_FAILURE',
            error:e
        })
    }

}