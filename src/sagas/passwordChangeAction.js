import {put, call, takeEvery} from "redux-saga/effects";
import axios from "axios";

export function* watcherPasswordChange() {
    yield takeEvery('API_LINK_PASSWORD_CHANGE_REQUEST', passwordSaga);
    yield takeEvery('API_PASSWORD_CHANGE_BY_PHONE_REQUEST', passwordChangeByPhoneSaga);
}

//이메일링크를 통한 비밀번호 변경 axios 통신
function passwordChangeAxios({formData}) {
    return axios({
        method: 'post',
        url: '/find/modifypassword',
        data: {
            token: formData.get('token'),
            email: formData.get('email'),
            password: formData.get('password')
        }
    })
}

function* passwordSaga(formData) {

    try {
        const response = yield call(passwordChangeAxios, formData);

        if (response.data.success) {
            yield put({
                type: 'API_LINK_PASSWORD_CHANGE_SUCCESS'
            });
        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_LINK_PASSWORD_CHANGE_FAILURE',
            error: e
        });
    }
}


//핸드폰 인증을 통한 비밀번호 변경통신 후 성공시 비밀번호 변경하는 비동기 통신
function passwordChangeByPhoneAxios({formData}) {
    return axios({
        method: 'POST',
        data: {
            password: formData.get('new-password'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        },
        url:'/find/phone/password'
    })
}


//핸드폰 인증을 통한 비밀번호 변경 사가
function* passwordChangeByPhoneSaga(formData) {

    try {

        const response = yield call(passwordChangeByPhoneAxios, formData);
        if (response.data.success) {
            yield put({
                type: 'API_PASSWORD_CHANGE_BY_PHONE_SUCCESS',
            })
        } else{
            throw response.data
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_PASSWORD_CHANGE_BY_PHONE_FAILURE',
            error: e
        });
    }
}