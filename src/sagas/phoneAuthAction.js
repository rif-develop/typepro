import {put, takeEvery, call} from "redux-saga/effects";
import axios from 'axios'

export function* watcherPhoneAuth() {
    yield takeEvery('API_FIND_BY_PHONE_REQUEST', phonePasswordSaga); //비밀번호 찾기
    yield takeEvery('API_PHONE_AUTH_REQUEST', nexmoVerifyRequestSaga); //인증 요청
    yield takeEvery('API_PHONE_AUTH_VERIFY_CODE_REQUEST', nexmoDigitVerifyCheck);//인증 확인 요청
    yield takeEvery('API_FIND_ID_BY_PHONE_REQUEST', findIdSaga); //아이디 찾기
}


//넥스모 인증 번호 요청 비동기 통신
function nexmoDigitAxios({country, phone}) {
    return axios({
        method: 'post',
        url: '/nexmo/request',
        data: {
            country: country,
            phone: phone
        }
    })
}

//넥스모 인증 번호 요청 처리 사가
function* nexmoVerifyRequestSaga(req) {

    const country = req.country;
    const phone = req.phone;
    try {
        const response = yield call(nexmoDigitAxios, {country, phone});
        console.log(response.data);

        if (response.data.success) {
            yield put({
                type: 'API_PHONE_AUTH_SUCCESS',
                requestId: response.data.requestId
            })
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_PHONE_AUTH_FAILURE',
        })
    }
}

//넥스모 인증번호 검증 요청 비동기 처리 액션
function nexmoDigitVerifyRequest(obj) {

    console.log(obj);

    const phone = obj.phone;
    const country = obj.country;
    const code = obj.code;
    const requestId = obj.requestId;
    const clientIdx = obj.clientIdx;

    return axios({
        method: 'POST',
        url: '/nexmo/codecheck',
        data: {
            phone: phone,
            country: country,
            code: code,
            requestId: requestId,
            clientIdx: clientIdx
        }
    })
}

function* nexmoDigitVerifyCheck(value) {

    const obj = {
        phone: value.phone,
        requestId: value.requestId,
        code: value.code,
        country: value.country
    };

    console.log(obj);

    try {
        const response = yield call(nexmoDigitVerifyRequest, obj);
        if (response.data.success) {
            yield put({
                type: 'API_PHONE_AUTH_VERIFY_CODE_SUCCESS'
            });
        } else {
            throw response.data
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_PHONE_AUTH_VERIFY_CODE_FAILURE'
        });
    }
}


//전화번호로 비밀번호 찾기 비동기 통신

function findPasswordAxios(object) {
    //이메일과 전화번호를 보내서 확인


    return axios({
        method: 'POST',
        data: {
            phone: object.phone,
            email: object.email,
            requestId: object.requestId,
            code: object.code,
            country: object.country
        },
        url: "/nexmo/phone/password"
    });
}

//전화번호로 비밀번호 찾기 리덕스-사가
//기능 4자리 입력 후 인증 확인을 누를 떄 서버에 값을 보내서 해당 전화번호와 이메일에 매칭되는 비밀번호를 찾는다.
function* phonePasswordSaga(obj) {

    const object = obj.object;

    try {
        const response = yield call(findPasswordAxios, object);
        console.log(response);
        if (response.data.success) {
            yield put({
                type: 'API_FIND_BY_PHONE_SUCCESS',
            });
        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_FIND_BY_PHONE_FAILURE',
            error: e
        });
    }

}

//넥스모 전화 인증을 통한 아이디 찾기 비동기 통신

function findIdAxios(value) {

    console.log(value);
    return axios({
        method: 'POST',
        url: '/nexmo/phone/id',
        data: {
            phone: value.phone,
            requestId: value.requestId,
            code: value.code,
            country: value.country
        }
    });
}

//넥스모 아이디 찾기 사가
function* findIdSaga(obj) {

    const object = obj.object;

    try {
        const response = yield call(findIdAxios, object);

        if (response.data.success) {
            //인증 성공 및 아이디를 찾았을 경우
            yield put({
                type: 'API_FIND_ID_BY_PHONE_SUCCESS',
                email: response.data.email
            });
        } else if (!response.data.success) {
            //인증하였으나 해당 번호로 등록된 이메일을 찾지 못하였을 경우
            yield put({
                type: 'API_FIND_ID_BY_PHONE_SUCCESS',
                email: false
            });
        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_FIND_ID_BY_PHONE_FAILURE',
            error: e
        })
    }
}