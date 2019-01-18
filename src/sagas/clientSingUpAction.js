import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";

export function* watcherSignup() {
    yield takeEvery('API_SIGN_UP_COMPLETE_REQUEST', signUpSubmit);
}


function requestJoin({formData}) {

    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('terms'));
    return axios({
        method: 'post',
        url: '/signup/requestsignup',
        data: {
            email: formData.get('email'),
            password: formData.get('password'),
            terms: formData.get('terms')
        }
    });
}

/*회원가입*/
function* signUpSubmit(formData) {
    console.log(formData)

    try {
        const response = yield call(requestJoin, formData);

        console.log(response.data);
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