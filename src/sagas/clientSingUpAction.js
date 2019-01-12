import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {store} from "../store/StoreComponent";

export function* wathcerSignup() {
    yield takeEvery('SET_SIGN_UP_EMAIL_REQUEST', signUpEmail);
    yield takeEvery('SET_SIGN_UP_PASSWORD_REQUEST', signUpPassword);
    yield takeEvery('SET_SIGN_UP_TERMS_REQUEST', signUpTerms);
    yield takeEvery('SET_SIGN_UP_COMPLETE_REQUEST', signUpSubmit);
    yield takeEvery('SET_SIGN_UP_INIT_REQUEST', signUpinit);
}

function* signUpEmail(action, type) {

    const email = action.email;
    try {
        yield put({
            type: "SET_SIGN_UP_EMAIL_SUCCESS",
            email
        })
    } catch (error) {
        yield put({
            type: 'SET_SIGN_UP_EMAIL_FAILURE',
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

function* signUpinit() {
    try {
        yield put({
            type: "SET_SIGN_UP_INIT_SUCCESS",

        })
    } catch (error) {
        yield put({
            type: "SET_SIGN_UP_INIT_FAILURE",
            error
        })
    }
}

function requestJoin() {
    return axios({
        method: 'post',
        url: '/request/signup',
        data: {
            email: store.getState().clientSignUpReducer.form.email,
            password: store.getState().clientSignUpReducer.form.password,
            terms: store.getState().clientSignUpReducer.form.terms
        }
    });
}

/*회원가입*/
function* signUpSubmit() {

    try {
        const result = yield call(requestJoin);
        const response = result.data;
        if (response.success) {
            yield put({
                type: 'SET_SIGN_UP_COMPLETE_SUCCESS',
                response
            })
        } else {
            yield put({
                type: 'SET_SIGN_UP_COMPLETE_FAILURE'
            })
        }
    } catch (error) {
        console.log(error)
    }

}