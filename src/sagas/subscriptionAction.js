import {takeEvery, put, call} from "redux-saga/effects";
import axios from 'axios';

export function* watcherSubcscription() {
    yield takeEvery('API_EMAIL_SUBSCRIBE_REQUEST', emailSubscribeSaga);
}

//이메일 구독 신청 비동기 통신
function emailSubscribeAxios(obj) {
    console.log(obj.email);
    return axios({
        method: 'POST',
        data: {
            email: obj.email
        },
        url: '/find/subscribe'
    });
}

//이메일 구독 신청 사가
function* emailSubscribeSaga(obj) {
    try {
        const response = yield call(emailSubscribeAxios, obj);

        const success = response.data.success;
        if (success) {
            yield put({
                type: 'API_EMAIL_SUBSCRIBE_SUCCESS'
            });
        } else {
            throw response.data;
        }
    } catch (e) {
        yield put({
            type: 'API_EMAIL_SUBSCRIBE_FAILURE',
            error: e
        });
    }
}
