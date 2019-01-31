import {takeLatest, put, takeEvery, call} from "redux-saga/effects";
import axios from 'axios';

export function* watcherSetting() {
    yield takeEvery('SET_MENU_REQUEST', setSettingMenu)
}


function settingAxios(value) {
    return axios({
        method: 'POST',
        url: '/setting/update',
        data: {
            option: value.option
        }
    });
}

function* setSettingMenu(option) {


    try {

        const response = yield call(settingAxios, option);

        if (response.data.success) {
            yield put({
                type: 'SET_MENU_SUCCESS',
                option: response.data.option
            });
        } else {
            throw response.data
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'SET_MENU_FAILURE',
            error: e
        })
    }
}