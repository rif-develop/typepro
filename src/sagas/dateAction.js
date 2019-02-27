import {takeEvery, put, call, all} from "redux-saga/effects";
import axios from 'axios';

export function* watcherDate() {
    //날짜 변경 요청
    yield takeEvery('SET_CHANGE_DATE_REQUEST', changeDateSaga);
    //해당 날짜의 데이터 요청
    yield takeEvery('API_CURRENT_DATE_DATA_REQUEST', selectedDatesDateSaga);
    //이전 날짜 변경 액션
    yield takeEvery('SET_CHANGE_PREV_DATE_REQUEST', setPrevDate);
    //다음 날짜 변경 액션
    yield takeEvery('SET_CHANGE_NEXT_DATE_REQUEST', setNextDate);
}

function* changeDateSaga(action) {

    const obj = action.obj;
    yield put({
        type: 'API_CURRENT_DATE_DATA_REQUEST',
        obj
    });
}


//선택된 날짜의 데이터를 요청하는 비동기 통신
function selectedDatesDataAxios(obj) {
    return axios({
        method: 'POST',
        url: '/dashboard/get/data',
        data: {
            babyIdx: obj.babyIdx,
            clientIdx: obj.clientIdx,
            date: obj.date,
        },
    })
}

//선택된 날짜의 데이터 요청 처리하는 사가
function* selectedDatesDateSaga(action) {
    console.log('aaa');
    console.log(action);

    const obj = {
        clientIdx: action.obj.clientIdx,
        babyIdx: action.obj.babyIdx,
        date: action.obj.date
    };

    try {
        const response = yield call(selectedDatesDataAxios, obj);

        const data = response.data;

        if (data.success) {

            yield all([
                put({
                    type: 'SET_DASHBOARD_BOTTLE_INFO',
                    data: data['bottleData']
                }),
                put({
                    type: 'SET_DASHBOARD_PEEPEE_INFO',
                    data: data['peepeeData']
                })
            ]);

        } else {
            throw data
        }
    } catch (e) {
        yield put({
            type: 'API_CURRENT_DATE_DATA_FAILURE',
            error: e
        })
    } finally {

    }
}


function* setPrevDate(action) {

    const date = new Date(action.obj.date);

    const prev = date.getDate() - 1;
    //날짜 설정
    date.setDate(prev);
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);

    //처리 할수 있께 가공
    const obj = action.obj;


    //헤더의 날짜 표시 변경해주고
    //서버에 이전 날짜 데이터 요청
    yield all([
        put({
            type: 'SET_CHANGE_DATE_SUCCESS',
            selected: date
        }),
        put({
            type: 'API_CURRENT_DATE_DATA_REQUEST',
            obj
        })
    ]);
}

function* setNextDate(action) {

    const date = new Date(action.obj.date);
    const next = date.getDate() + 1;

    //날짜 설정
    date.setDate(next);
    date.setHours(0);
    date.setMinutes(0);
    date.setMilliseconds(0);

    //헤더의 날짜 표시 변경해주고
    //서버에 다음 날짜 데이터 요청
    //처리 할수 있께 가공
   const obj = action.obj;
    yield all([
        put({
            type: 'SET_CHANGE_DATE_SUCCESS',
            selected: date
        }),
        put({
            type: 'API_CURRENT_DATE_DATA_REQUEST',
            obj
        })
    ]);
}
