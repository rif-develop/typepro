import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {store} from "../store/StoreComponent";

export function* wathcerSignupEmail() {
    yield takeLatest('SET_SIGN_UP_EMAIL_REQUEST', signUpEmail);
}

export function* wathcerSignupPassword() {
    yield takeLatest('SET_SIGN_UP_PASSWORD_REQUEST', signUpPassword);
}

export function* wathcerSignupTerms() {
    yield takeLatest('SET_SIGN_UP_TERMS_REQUEST', signUpTerms);
}

export function* watcherSignSubmit() {
    yield takeEvery('SET_SIGN_UP_COMPLETE_REQUEST', signUpSubmit);
}

function* signUpEmail(action) {

    const email = action.email;
    try {
        yield put({
            type: "SET_SIGN_UP_EMAIL_SUCCESS",
            email
        })
    } catch (error) {
        yield put({
            type: 'SET_SIGN_UP_EMAIL_FAILURE',
            error
        })
    }
}

function* signUpPassword(action) {
    const password = action.password;
    try {
        yield put({
            type: "SET_SIGN_UP_PASSWORD_SUCCESS",
            password
        })
    } catch (error) {
        yield put({
            type: 'SET_SIGN_UP_PASSWORD_FAILURE',
            error
        })
    }
}

function* signUpTerms() {

    try {
        yield put({
            type: "SET_SIGN_UP_TERMS_SUCCESS",
        });
    } catch (error) {
        yield put({
            type: 'SET_SIGN_UP_TERMS_FAILURE',
            error
        });
    }
}


/*회원가입*/

function axiosSaga() {

    return axios({
        method: 'post',
        url: '/request/signup',
        data: {
            email: store.getState().clientSignUpReducer.form.email,
            password: store.getState().clientSignUpReducer.form.password,
            terms: store.getState().clientSignUpReducer.form.terms
        }
    }).catch((error) => {
        console.log(error);
    })
}

function* signUpSubmit() {

    try {
        const result = yield call(axiosSaga);
        const response = result.data;

        if(result.data.success === true){

        }

        yield put({
            type: 'SET_SIGN_UP_COMPLETE_SUCCESS',
            response
        })
    } catch (error) {
        yield put({
            type: 'SET_SIGN_UP_COMPLETE_FAILURE',
            error
        })
    }

}