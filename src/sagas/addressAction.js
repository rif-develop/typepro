import {takeLatest, put, takeEvery, call} from "redux-saga/effects";
import axios from "axios";
import {store} from "../store/StoreComponent";

export function* watcherAddress() {
    yield takeLatest('SET_ADDRESS_REQUEST', setAddressSaga);
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

//어드레스 저장하기 비동기 통신
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
            zipcode: formData.get('zipcode'),
            address1: formData.get('address1'),
            address2: formData.get('address2'),
            default: formData.get('default') || false,
        },
        processData: false,
        contentType: false,
        cache: false
    });

}

function* setAddressSaga(formData) {
    try {
        const response = yield call(setAddressAxios, formData);

        yield put({
            type: "SET_ADDRESS_SUCCESS",
            data: response.data
        });
    } catch (e) {
        yield put({
            type: 'SET_ADDRESS_FAILURE',
            error: e
        })
    }
}


//서버와 통신해서 배송지 리스트를 불러오는 비동기 통신
function getAddressListAxios(id) {

    console.log('배송지 불러오기 비동기 통신 시작..');

    return axios({
        url: '/address/getaddress',
        method: 'POST',
        data: {
            id: id
        }
    });

}

//사이드 이펙트 처리
function* getListSaga() {

    const userIdx = store.getState().clientStatusReducer.session._id;
    console.log(userIdx);

    try {
        //인자와 함수를 불리해서 넣어라; 안 그러면
        //uncaught at check call: argument [object Promise] is not a function 에러가 뜬다.
        const response = yield call(getAddressListAxios, userIdx);
        console.log('getListSaga');
        console.log(response);
        //payload의 이름은 리듀서에서의 이름과 같아야 한다.
        yield put({
            type: 'GET_ADDRESS_LIST_SUCCESS',
            data: response.data
        });
    } catch (e) {
        console.log('//배송지 주소를 가져오는데 실패했습니다.');
        yield put({
            type: 'GET_ADDRESS_LIST_FAILURE',
            e
        });
    }
}


//배송지 삭제 통신
function removeAddressAxios({docsIdx, writerIdx}) {
    console.log('#배송지 삭제 통신을 시작합니다.');
    console.log(writerIdx);
    console.log(docsIdx);
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

        yield put({
            type: 'DELETE_ADDRESS_SUCCESS',
            data: response.data
        })
    } catch (e) {
        yield put({
            type: 'DELETE_ADDRESS_FAILURE',
            error: e
        })
    }
}


///기본 배송지로 설정하기

function setDefaultAxios({docsIdx, writerIdx}) {
    console.log('기본 배송지 설정..')
    console.log(docsIdx);
    console.log(writerIdx);
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
        yield put({
            type: 'SET_DEFAULT_ADDRESS_SUCCESS',
            data: response.data
        });
    } catch (e) {
        yield put({
            type: 'SET_DEFAULT_ADDRESS_FAILURE',
            error: e
        });
    }
}
