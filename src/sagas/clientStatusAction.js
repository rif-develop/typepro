import {put, takeEvery, call, all} from "redux-saga/effects";
import axios from "axios";

export function* watcherWebLogin() {
    yield takeEvery('API_WEB_LOGIN_REQUEST', webLoginRequestSaga);
    yield takeEvery('API_WEB_LOGOUT_REQUEST', logoutSaga);
    yield takeEvery('REFRESH_SESSION_REQUEST', sessionRequestSaga);
}

//로그인 요청처리  비동기 통신

function webLoginAxios({formData}) {
    return axios({
        method: 'post',
        url: "/login",
        data: {
            email: formData.get('email'),
            password: formData.get('password')
        },
    });
}

//로그인 요청 처리 사가
function* webLoginRequestSaga(formData) {

    try {
        const response = yield call(webLoginAxios, formData);
        //로그인 요청 후 비밀번호 및 아이디 적합 검증후 성공시 서버에서 success:ture 리턴 그 외에는 전부 에러니까 던진다.
        if (response.data.success) {
            yield put({
                type: 'API_WEB_LOGIN_SUCCESS',
                session: response.data.session
            });
        } else {
            throw response.data;
        }
    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_WEB_LOGIN_FAILURE',
            error: e
        });
    }
}


//로그아웃 요청 비동기 통신

function logoutAxios() {
    return axios({
        method: 'post',
        url: '/logout',
    });
}

//로그아웃 요청 처리 리덕스 사가

function* logoutSaga() {
    try {

        const response = yield call(logoutAxios);

        if (response.data.success) {
            window.location.replace('/');
        } else {
            throw response.data;
        }

    } catch (e) {
        console.log(e);
        alert('로그아웃 처리 중 에러가 발생했습니다.');
    }
}

//세션 요청 비동기 통신
function sessionAxios() {
    return axios({
        method: 'POST',
        url: '/getSession',
    });
}

//세션 요청 처리 사가
function* sessionRequestSaga() {
    try {
        //cookie에 저장되어 있는 세션데이터와 레디스 서버에 저장되어 있는 서버데이터를 조회 있으면 success:ture
        const response = yield call(sessionAxios);

        if (response.data.isSession) {
            yield put({
                type: 'API_WEB_LOGIN_SUCCESS',
                session: response.data.session
            });
        } else {
            throw response.data;
        }
    } catch (e) {
        console.log(e);
        //세션이 없으면 로그아웃한 것과 동일하게 처리
        yield put({
            type: 'API_WEB_LOGIN_FAILURE',
            error: e
        })
    }
}


