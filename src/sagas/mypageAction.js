import {takeEvery, put, call, all} from "redux-saga/effects";
import axios from 'axios';


export function* watcherPasswordCheck() {
    yield takeEvery('API_PASSWORD_CHECK_REQUEST', passwordSaga);
    yield takeEvery('UPDATE_CLIENT_INFO_REQUEST', updateSaga);
    yield takeEvery('API_PASSWORD_CHANGE_REQUEST', passwordUpdateSaga);
}

//비밀번호 체크 비동기 통신
function passwordCheckAxios({email, password}) {

    return axios({
        method: 'POST',
        url: '/mypage/passwordcheck',
        data: {
            email: email,
            password: password,
        }
    });
}

function* passwordSaga(request) {

    const {email, password} = request;
    console.log(email, password);
    try {

        const response = yield call(passwordCheckAxios, {email, password});

        console.log(response.data);

        if (response.data.error) {
            throw response.data;
        }

        if (response.data.success) {
            yield put({
                type: 'API_PASSWORD_CHECK_SUCCESS',
            });
        }

    } catch (e) {
        console.log('비밀번호 확인에 실패했습니다..');
        yield put({
            type: 'API_PASSWORD_CHECK_FAILURE',
            error: e
        });
    }


}


//회원정보 수정 비동기 통신

function clientUpdateAxios({formData}) {

    return axios({
        url: '/mypage/updateclient',
        data: {
            clientIdx: formData.get('clientIdx'),
            nickname: formData.get('nickname'),
            name: formData.get('name'),
            year: formData.get('year'),
            month: formData.get('month'),
            date: formData.get('date'),
            gender: formData.get('gender')
        },
        method: 'POST'
    });
}


//회원 정보 수정 처리 리덕스 사가
function* updateSaga(formData) {

    try {
        const response = yield call(clientUpdateAxios, formData);

        console.log(response.data);
        if (response.data.success) {

            yield all([
                put({
                    type: 'UPDATE_CLIENT_INFO_SUCCESS',
                }),
                put({
                    type: 'REFRESH_SESSION_REQUEST',
                    session: response.data.session
                })
            ])
            // yield put({
            //     type: 'UPDATE_CLIENT_INFO_SUCCESS',
            // });
            //
            // yield put({
            //     type: 'REFRESH_SESSION_REQUEST',
            //     session: response.data.session
            // });
        } else {
            throw response.data
        }

    } catch (e) {
        yield put({
            type: 'UPDATE_CLIENT_INFO_FAILURE',
            error: e
        })
    }


}


//비밀번호 수정 비동기 통신

function passwordUpdateAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/mypage/passwordupdate',
        data: {
            clientIdx: formData.get('clientIdx'),
            password: formData.get('password'),
            newPassword: formData.get('new-password'),
        }
    })
}

//비밀번호 수정 사가

function* passwordUpdateSaga(formData) {

    try {

        const response = yield call(passwordUpdateAxios, formData);

        if (response.data.success) {
            yield put({
                type: 'API_PASSWORD_CHANGE_SUCCESS'
            })
        } else {
            throw response.data
        }


    } catch (e) {
        console.log(e);

        yield put({
            type: 'API_PASSWORD_CHANGE_FAILURE',
            error: e
        })
    }
}