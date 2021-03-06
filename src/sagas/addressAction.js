import {takeLatest, put, takeEvery, call} from "redux-saga/effects";
import axios from "axios";
import {store} from "../store/StoreComponent";

export function* watcherAddress() {
    yield takeEvery('SET_ADDRESS_REQUEST', setAddressSaga);
}

export function* watcherAddressList() {
    yield takeEvery('GET_ADDRESS_LIST_REQUEST', getListSaga);
}

export function* watcherAddressRemove() {
    yield takeEvery('DELETE_ADDRESS_REQUEST', removeSaga);
}

export function* watcherSetDefaultAddress() {
    yield takeEvery('SET_DEFAULT_ADDRESS_REQUEST', defaultSaga);
}

export function* watcherUpdateAddress() {
    yield takeEvery('UPDATE_ADDRESS_REQUEST', updateSaga)
}

//배송지 저장 비동기 통신
function setAddressAxios({formData}) {
    console.log('배송지 저장 비동기 통신 시작...');

    return axios({
        url: '/address/register',
        method: 'POST',
        data: {
            idx: formData.get('idx'),
            addressName: formData.get('addressName'),
            recipientName: formData.get('recipientName'),
            recipientPhone: formData.get('recipientPhone'),
            otherPhone: formData.get('otherPhone'),
            zipCode: formData.get('zipcode'),
            address1: formData.get('address1'),
            address2: formData.get('address2'),
            default: formData.get('default') || false,
        },
    });

}

//배송지 저장 리덕스-사가
function* setAddressSaga(formData) {
    try {
        const response = yield call(setAddressAxios, formData);

        const isSuccess = response.data.success;

        if (isSuccess) {
            yield put({
                type: "SET_ADDRESS_SUCCESS",
                data: response.data.addressList
            });
        } else {
            throw response.data
        }
    } catch (e) {
        yield put({
            type: 'SET_ADDRESS_FAILURE',
            error: e
        })
    }
}


//서버와 통신해서 배송지 리스트를 불러오는 비동기 통신
function getAddressListAxios(id) {

    return axios({
        url: '/address/get/address',
        method: 'POST',
        data: {
            id: id
        }
    });

}

//배송지 리스트 리덕스 사가 사이드 이펙트 처리
function* getListSaga() {

    const userIdx = store.getState().clientStatusReducer.session._id;
    console.log(userIdx);

    try {
        //인자와 함수를 불리해서 넣어라; 안 그러면
        //uncaught at check call: argument [object Promise] is not a function 에러가 뜬다.
        const response = yield call(getAddressListAxios, userIdx);

        //payload의 이름은 리듀서에서의 이름과 같아야 한다.
        const isSuccess = response.data.success;

        if (isSuccess) {
            yield put({
                type: 'GET_ADDRESS_LIST_SUCCESS',
                data: response.data.addressList
            });
        } else {
            throw response.data;
        }

    } catch (e) {
        console.log(e);
        yield put({
            type: 'GET_ADDRESS_LIST_FAILURE',
            error: e
        });
    }
}


//배송지 삭제 비동기 통신
function removeAddressAxios({docsIdx, writerIdx}) {

    return axios({
        url: '/address/remove',
        method: 'POST',
        data: {
            docsIdx: docsIdx,
            writerIdx: writerIdx
        }
    })
}

function* removeSaga(request) {

    try {

        const writerIdx = store.getState().clientStatusReducer.session._id;
        const docsIdx = request.docsIdx;


        const response = yield call(removeAddressAxios, {docsIdx, writerIdx});

        const isSuccess = response.data.success;

        if (isSuccess) {
            yield put({
                type: 'DELETE_ADDRESS_SUCCESS',
                data: response.data.addressList
            });
        } else {
            throw response.data
        }


    } catch (e) {
        yield put({
            type: 'DELETE_ADDRESS_FAILURE',
            error: e
        })
    }
}


///기본 배송지로 설정하기

function setDefaultAxios({docsIdx, writerIdx}) {
    return axios({
        url: '/address/default',
        data: {
            docsIdx: docsIdx,
            writerIdx: writerIdx
        },
        method: 'POST'
    });

}

function* defaultSaga(request) {
    const writerIdx = store.getState().clientStatusReducer.session._id;
    const docsIdx = request.docsIdx;
    const response = yield call(setDefaultAxios, {docsIdx, writerIdx});

    try {

        const isSuccess = response.data.success;

        if(isSuccess){
            yield put({
                type: 'SET_DEFAULT_ADDRESS_SUCCESS',
                data: response.data.addressList
            });
        } else{
            throw response.data
        }


    } catch (e) {
        yield put({
            type: 'SET_DEFAULT_ADDRESS_FAILURE',
            error: e
        });
    }
}


//배송지 수정

function updateAddressAxios({formData}) {

    console.log('배송지 수정 비동기 통신 시작...');

    return axios({
        url: '/address/modify',
        method: 'POST',
        data: {
            writerIdx: formData.get('writerIdx'),
            docsIdx: formData.get('docsIdx'),
            addressName: formData.get('addressName'),
            recipientName: formData.get('recipientName'),
            recipientPhone: formData.get('recipientPhone'),
            otherPhone: formData.get('otherPhone'),
            zipCode: formData.get('zipcode'),
            address1: formData.get('address1'),
            address2: formData.get('address2'),
            default: formData.get('default') || false,
        },
        processData: false,
        contentType: false,
        cache: false
    });
}

function* updateSaga(formData) {

    try {
        const response = yield call(updateAddressAxios, formData);

        console.log(response.data);

        if (response.data.error) {
            //catch 블록으로 에러 던짐
            throw response.data;

        } else {
            yield put({
                type: 'UPDATE_ADDRESS_SUCCESS',
                data: response.data
            })
        }


    } catch (e) {
        yield put({
            type: 'UPDATE_ADDRESS_FAILURE',
            error: e
        });
    }


}