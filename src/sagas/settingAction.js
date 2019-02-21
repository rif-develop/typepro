import {takeLatest, put, takeEvery, call} from "redux-saga/effects";
import axios from 'axios';

export function* watcherSetting() {
    yield takeEvery('API_CLIENT_SETTING_INFO_REQUEST', setSettingMenu);
}


function settingAxios({formData}) {
    return axios({
        method: 'POST',
        url: '/setting/update',
        data: {
            option: formData.get('option'),
            clientIdx: formData.get('clientIdx')
        }
    });
}

function* setSettingMenu(formData) {


    try {

        const response = yield call(settingAxios, formData);

        if (response.data.success) {
            yield put({
                type: 'API_CLIENT_SETTING_INFO_SUCCESS',
                option: response.data.option
            });
        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'API_CLIENT_SETTING_INFO_FAILURE',
            error: e
        })
    }
}
