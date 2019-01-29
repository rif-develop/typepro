import {takeEvery, put, call} from "redux-saga/effects";
import axios from 'axios';

export function* watcherFind() {
    yield takeEvery('API_FIND_ACCOUNT_REQUEST', findAccountSaga);
}

//서버 비동기 통신
function findEmailAxios({formData}) {
    //이메일찾는 방법은 핸드폰 인증방법뿐.
    // @param phone

    return axios({
        method: 'POST',
        url: '/find/email',
        data: {
            email: formData.get('email'),
            phone: formData.get('phone')
        }
    });

}

function findPasswordAxios({formData}) {
    //비밀번호는 이메일 및, 핸드폰 인증 2가지 방법으로 찾을 수 있다.

    return axios({
        method: 'POST',
        url: '/find/password',
        data: {
            email: formData.get('email')
        }
    });
}

function* findAccountSaga(formData) {

    //  eventType이 email이면 이메일 찾는 비동기통신으로,
    //  password면 비밀번호 찾는 비동기통신으로

    console.log(formData);
    console.log(formData.eventType);
    try {

        const eventType = formData.eventType;
        let response = null;

        if ('email' === eventType) {
            console.log('# 아이디 찾기');
            response = yield call(findEmailAxios, formData);
        } else if ('password' === eventType) {
            console.log('# 비밀번호 찾기');
            response = yield call(findPasswordAxios, formData);
        }
        // 성공이라면 success:true
        if (response.data.success) {

            yield put({
                type: 'API_FIND_ACCOUNT_SUCCESS',
                account: response.data.account,
                eventType:response.data.eventType
            });

        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_FIND_ACCOUNT_FAILURE',
            error: e
        })
    }

}



