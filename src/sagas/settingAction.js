import {takeLatest, all,put, takeEvery, call} from "redux-saga/effects";
import axios from 'axios';

export function* watcherSetting() {
    yield takeEvery('API_CLIENT_SETTING_INFO_REQUEST', setSettingMenu);
    yield takeEvery('API_UNIT_OPTION_CHANGE_REQUEST', changeUnitSaga);
    yield takeEvery('API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_REQUEST', emailSubscriptionSaga);
    //회원 탈퇴 리덕스 요청
    yield takeEvery('API_CLIENT_WITHDRAWAL_REQUEST', withdrawalSaga);
}

//알람 메뉴 변경 비동기 통신
function settingAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/setting/update/alarm',
        data: {
            option: formData.get('option'),
            clientIdx: formData.get('clientIdx')
        }
    });
}

//알람 메뉴 변경 처리 리덕스-사가
function* setSettingMenu(formData) {

    try {
        const response = yield call(settingAxios, formData);

        if (response.data.success) {
            yield put({
                type: 'API_CLIENT_SETTING_INFO_SUCCESS',
                session: response.data.session
            });
        } else {
            throw response.data
        }

    } catch (e) {
        yield put({
            type: 'API_CLIENT_SETTING_INFO_FAILURE',
            error: e
        })
    }
}

//단위 수정 비동기 통신
function changeUnitAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/setting/update/unit',
        data: {
            clientIdx: formData.get('clientIdx'),
            unit: formData.get('unit')
        }
    });
}

//단위 수정 리덕스-사가
function* changeUnitSaga(formData) {
    try {
        const response = yield call(changeUnitAxios, formData);

        const isSuccess = response.data.success;

        if (isSuccess) {
            yield put({
                type: 'API_UNIT_OPTION_CHANGE_SUCCESS',
                session: response.data.session
            });
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_UNIT_OPTION_CHANGE_FAILURE',
            error: e
        });
    }
}

//이메일 구독 옵션 변경 비동기 처리
function emailSubscriptionAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/setting/update/emailsubscription',
        data: {
            email: formData.get('email'),
            clientIdx: formData.get('clientIdx')
        }
    })
}

//이메일 구독 옵션 리덕스-사가
function* emailSubscriptionSaga(formData) {
    try {
        const response = yield call(emailSubscriptionAxios, formData)

        const isSuccess = response.data.success;

        if (isSuccess) {
            yield put({
                type: 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_SUCCESS',
                session: response.data.session
            });
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'API_EMAIL_SUBSCRIPTION_OPTION_CHANGE_FAILURE',
            error: e
        });
    }
}


//일반 회원 탈퇴 비동기 통신
function withdrawalAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/request/withdrawal',
        data: {
            clientIdx: formData.get('clientIdx'),
            password: formData.get('password'),
            email:formData.get('email')
        }
    })
}

function* withdrawalSaga(formData) {
    try {
        const response = yield call(withdrawalAxios, formData);

        const isSuccess = response.data.success;

        if (isSuccess) {
            yield all([
                put({
                    type: 'API_CLIENT_WITHDRAWAL_SUCCESS',
                    success: isSuccess
                }),
                put({
                    type:'API_WEB_LOGOUT_REQUEST'
                })
            ]);

        } else {
            throw response.data;
        }


    } catch (e) {
        yield put({
            type: 'API_CLIENT_WITHDRAWAL_FAILURE',
            error: e
        });
    }
}