import AuthService from '~/repositories/AuthenticationRespository';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { notification } from 'antd';
import actionTypes from './actionTypes';
import { loginSuccess, logOutSuccess } from './action';
import { appName } from '~/repositories/Repository';
// import { toggleUserInfoLoading } from '../userInfo/action';
import Router from 'next/router';

const modalSuccess = (type) => {
    notification[type]({
        message: 'Wellcome back',
        description: 'You are login successful!',
    });
};

const modalWarning = (type) => {
    notification[type]({
        message: 'Good bye!',
        description: 'Your account has been logged out!',
    });
};

function* signUpSaga(action) {
    try {
        const { payload, tokens } = yield call(
            AuthService.register,
            action.payload
        );

        for (const key of Object.keys(tokens))
            localStorage.setItem(`${appName}_${key}`, tokens[key]);
        modalSuccess('success');
        yield put(loginSuccess(payload.user));

        Router.replace('/');
    } catch (err) {
        notification.error({
            message: 'Failed',
            description: err + '',
        });
        throw err;
    }
}

function* loginSaga(action) {
    try {
        const { payload, tokens } = yield call(
            AuthService.login,
            action.payload
        );

        for (const key of Object.keys(tokens))
            localStorage.setItem(`${appName}_${key}`, tokens[key]);
        modalSuccess('success');
        yield put(loginSuccess(payload.user));

        Router.replace('/');
    } catch (error) {
        notification.error({
            message: 'Failed',
            description: error + '',
        });

        throw error;
    }
}

function* logOutSaga() {
    try {
        yield call(AuthService.logout);
        yield put(logOutSuccess());
        localStorage.removeItem(`${appName}_xAuthToken`);
        localStorage.removeItem(`${appName}_refreshToken`);
        modalWarning('warning');
        Router.replace('/account/login');
    } catch (err) {}
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.SIGNUP_REQUEST, signUpSaga)]);
    yield all([takeLatest(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeLatest(actionTypes.LOGOUT, logOutSaga)]);
}
