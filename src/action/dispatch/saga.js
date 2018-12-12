import {delay}from 'redux-saga'
import {all,put, call, takeEvery, select} from 'redux-saga/effects'

export function* helloSaga(){
    console.log('잘 이해해 보자 창현아');
}
export function* changeLanguageAsync(){
    //제네레이터 함수는 일드를 만나면 멈췄다가 다시 호출되면 멈췄던 부분에서부터 시작한다.
    yield call(delay, 1000);
    yield put({
        language:'ko'
    });
    yield put({
        toto:12
    })
}

export function* watchchangeLanguageAsync() {
    yield takeEvery('INCREMENT_ASYNC', changeLanguageAsync);
    const state = yield select();
    console.log(state);
}

export default function* rootSaga(){
    yield all([
        helloSaga(),
        watchchangeLanguageAsync()
    ])
}