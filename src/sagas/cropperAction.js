import {takeEvery, put, call, all} from "redux-saga/effects";
import axios from "axios";

export function* watcherCropperRequest() {
    yield takeEvery('API_CROPPER_THUMBNAIL_SEND_REQUEST', cropperBlobSaga);
    yield takeEvery('API_THUMBNAIL_REMOVE_REQUEST', thumbnailRemoveSaga);
    yield takeEvery('API_THUMBNAIL_TEMP_SAVE_REQUEST', babyThumbnailSaga);
    yield takeEvery('API_BABY_THUMBNAIL_REMOVE_REQUEST', babyThumbnailRemoveSaga);
}

//사용자 썸네일 이미지 등록 및 수정 비동기 통신 요청
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

//썸네일 삭제 요청 비동기 통신
function thumbnailRemoveAxios({formData}) {
    return axios({
        method: 'POST',
        data: {
            key: formData.get('key'),
            clientIdx: formData.get('clientIdx')
        },
        url: '/upload/image/delete'
    });
}


function* thumbnailRemoveSaga(formData) {
    try {
        const response = yield call(thumbnailRemoveAxios, formData);
        if (response.data.success) {
            //세션 재갱신
            yield put({
                type: 'REFRESH_SESSION_REQUEST'
            });
        } else {
            throw response.data;
        }


    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_THUMBNAIL_REMOVE_FAILURE',
            error: e
        })
    }
}


//아기 썸네일 등록 및 수정 비동기 통신 요청
function babyThumbnailAxios({formData}) {
    console.log('send')
    return axios({
        method: 'POST',
        url: '/upload/temp/thumbnail',
        data: formData,
        headers: {
            "Content-Type": 'multipart/form-data'
        }
    })
}

//아기 썸네일 등록 및 수정 사가
function* babyThumbnailSaga(formData) {
    try {
        const response = yield call(babyThumbnailAxios, formData);
        if (response.data.success) {

            yield all([
                put({
                    type: 'SET_S3_SRC_REGISTER',
                    src: response.data.src //s3 임시 저장 경로
                }),
                put({
                    type: 'API_THUMBNAIL_TEMP_SAVE_SUCCESS'
                })
            ]);
        } else {
            throw response.data
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_THUMBNAIL_TEMP_SAVE_FAILURE',
            error: e
        });
    }
}


//아기 썸네일 삭제 비동기 통신

function babyThumbnailRemoveAxios(key) {
    return axios({
        url: "/upload/temp/deleteThumbnail",
        method: 'POST',
        data: {
            key: key
        }
    })
}

function* babyThumbnailRemoveSaga(key) {
    try {
        const response = yield call(babyThumbnailRemoveAxios, key.key);

        if (response.data.success) {
            yield put({
                type: 'API_BABY_THUMBNAIL_REMOVE_SUCCESS',
            });
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_BABY_THUMBNAIL_REMOVE_FAILURE',
            error: e
        });
    }

}