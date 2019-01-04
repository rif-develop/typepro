import {takeLatest, put} from "redux-saga/effects";

export function* watcherSetting(){
    yield takeLatest('SET_MENU_REQUEST',setSettingMenu)
}

function* setSettingMenu(data){
    const menu = data['data'];
    console.log(menu);
    try{
        yield put({
            type:'SET_MENU_SUCCESS',
            menu
        })
    } catch(e){
        yield put({
            type:'SET_MENU_FAILURE',
            e
        })
    }
}