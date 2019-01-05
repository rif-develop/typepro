import {takeLatest, put} from "redux-saga/effects";

export function* watcherAddress() {
    yield takeLatest('SET_ADDRESS_REQUEST', checkValue);
}

function* checkValue(data) {

    const value = data.value;

    try {
        if ('add' === value) {
            yield put({
                type: 'SET_ADDRESS_REGISTER',
                value
            });
        } else if ('edit' === value) {
            yield put({
                type: 'SET_ADDRESS_MODIFY',
                value
            });
        }
    } catch (error) {
        yield put({
            type: 'SET_ADDRESS_FAILURE',
            error
        })
    }

}