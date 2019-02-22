import {put, call, takeEvery, all} from "redux-saga/effects";
import axios from 'axios';

export function* watcherCurrentBabyInfo() {
    yield takeEvery('API_CURRENT_BABY_INFO_REQUEST', getCurrentBabyInfoSaga);
    //아이 삭제
    yield takeEvery('API_DELETE_BABY_INFO_REQUEST', babyDeleteSaga);
    // 아이 등록
    yield takeEvery('API_REGISTER_BABY_INFO_REQUEST', babyInfoSaga);
    //기본 아기 정보 가져오기
    yield takeEvery('API_DEFAULT_BABY_INFO_REQUEST', defaultBabySaga);

}

//현재 클릭한 아이의 정보 비동기 통신 요청
function getCurrentBabyInfoAxios(val) {
    return axios({
        method: 'POST',
        url: '/baby/get/info',
        data: {
            babyIdx: val.babyIdx,
            clientIdx: val.clientIdx
        }
    });
}

//현재 클릭한 아이의 정보를 가져온다.
function* getCurrentBabyInfoSaga(val) {
    try {
        const response = yield call(getCurrentBabyInfoAxios, val.obj);
        //통신 성공시에
        const data = response.data;
        if (data.success) {
            yield put({
                type: 'API_CURRENT_BABY_INFO_SUCCESS',
                currentBaby: data.currentBaby
            });
        } else {
            throw data
        }
    } catch (e) {
        yield put({
            type: 'API_CURRENT_BABY_INFO_FAILURE',
            error: e
        });
    }
}


//아이 정보 등록 요청 비동기 통신
function axiosBabyInfo({formData}) {
    return axios({
        url: '/baby/register',
        method: 'POST',
        data: {
            clientIdx: formData.get('clientIdx'),
            name: formData.get('name'),
            gender: formData.get('gender'),
            weight: formData.get('weight'),
            height: formData.get('height'),
            bloodType: formData.get('bloodType'),
            year: formData.get('year'),
            month: formData.get('month'),
            date: formData.get('date'),
            src: formData.get('src')
        }
    })
}

//아이 정보 등록 사가
function* babyInfoSaga(formData) {

    try {
        const response = yield call(axiosBabyInfo, formData);
        console.log(response);

        //아이 정보가 등록되면 src를 꼭 지워주자.
        //currentBaby reducer의 현재 아이도 갱신해주자.
        if (response.data.success) {
            //1. 유저 세션 갱신(아이의 정보는 여기에 저장)
            //2. 모달창 닫기(등록,수정)
            //3. 크랍퍼에 남아 있는 src 지워주기
            //4. 현재 아이에 정보 넣기

            const lastBaby = response.data.session.babies.length;

            yield all([
                put({
                    type: 'UPDATE_CLIENT_SESSION',
                    session: response.data.session
                }),
                put({
                    type: 'OPEN_BABY_REGISTER_MODAL'
                }),
                put({
                    type: 'SET_CROPPER_SRC_INIT'
                }),
            ]);

        } else {
            throw response.data.error
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_REGISTER_BABY_INFO_FAILURE',
            error: e
        });
    }
}


//아이 삭제 요청 비동기 통신

function babyDeleteAxios(obj) {
    return axios({
        method: 'POST',
        url: '/baby/delete',
        data: {
            clientIdx: obj.clientIdx,
            babyIdx: obj.babyIdx
        }
    });
}

//아이 삭제 처리 사가

function* babyDeleteSaga(data) {
    const obj = {
        clientIdx: data.clientIdx,
        babyIdx: data.babyIdx
    };

    console.log(obj);

    try {
        const response = yield call(babyDeleteAxios, obj);
        if (response.data.success) {


            yield put({
                type: 'API_DELETE_BABY_INFO_SUCCESS',
                session: response.data.session
            })
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_DELETE_BABY_INFO_FAILURE',
            error: e
        });
    }
}

function defaultBabyAxios(obj) {
    console.log(obj);
    return axios({
        url: "/baby/get/defaultbaby",
        method: 'POST',
        data: {
            clientIdx: obj.clientIdx
        }
    });
}


//기본 아이 정보 가져오기
function* defaultBabySaga(obj) {
    try {
        const response = yield call(defaultBabyAxios, obj);
        if (response.data.success) {
            yield put({
                type: 'API_DEFAULT_BABY_INFO_SUCCESS',
                currentBaby: response.data.currentBaby
            });
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_DEFAULT_BABY_INFO_FAILURE',
            error: e
        })
    }
}

