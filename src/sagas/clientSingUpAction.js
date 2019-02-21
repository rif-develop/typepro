import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

export function* watcherSignup() {
    yield takeEvery('API_SIGN_UP_COMPLETE_REQUEST', signUpSubmit);
}


function requestJoin({formData}) {

    return axios({
        method: 'post',
        url: '/signup/request/signUp',
        data: {
            email: formData.get('email'),
            password: formData.get('password'),
            terms: formData.get('terms')
        }
    });
}

/*회원가입*/
function* signUpSubmit(formData) {

    try {
        const response = yield call(requestJoin, formData);

        if (response.data.success) {
            yield put({
                type: 'API_SIGN_UP_COMPLETE_SUCCESS'
            })
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_SIGN_UP_COMPLETE_FAILURE',
            error: e
        })
    } finally {
        console.log('# 회워가입 통신 종료')
    }

}