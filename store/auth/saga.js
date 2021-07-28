import AuthService from '~/repositories/AuthenticationRespository';
import {
    all,
    call,
    put,
    takeEvery,
    takeLatest,
    cancel,
    cancelled,
} from 'redux-saga/effects';
import { notification } from 'antd';
import actionTypes from './actionTypes';
import { loginSuccess, logOutSuccess } from './action';
import { appName } from '~/repositories/Repository';
// import { toggleUserInfoLoading } from '../userInfo/action';
import Router from 'next/router';
import { addItem } from '../cart/action';

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

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

        const notAuthCart = JSON.parse(localStorage.getItem('not-auth-cart'));

        if (notAuthCart && notAuthCart != null && notAuthCart != 'null') {
            yield sleep(1000);
            if (notAuthCart?.product) {
                yield put(addItem(notAuthCart?.product));
                localStorage.setItem('not-auth-cart', null);
                const path = localStorage.getItem('not-auth-cart-path');
                Router.push(path);
                localStorage.setItem('not-auth-cart-path', null);
            } else {
                Router.push('/');
            }
        } else {
            Router.push('/');
        }
    } catch (err) {
        notification.error({
            message: 'Failed',
            description: err + '',
        });
        throw err;
    } finally {
        yield cancel();
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

        const notAuthCart = JSON.parse(localStorage.getItem('not-auth-cart'));

        if (notAuthCart && notAuthCart != null && notAuthCart != 'null') {
            yield sleep(1000);
            if (notAuthCart?.product) {
                yield put(addItem(notAuthCart?.product));
                localStorage.setItem('not-auth-cart', null);

                const path = localStorage.getItem('not-auth-cart-path');
                Router.push(path);
                localStorage.setItem('not-auth-cart-path', null);
            } else {
                Router.push('/');
            }
        } else {
            Router.push('/');
        }
    } catch (error) {
        console.log('error: ', error);
        if (action && action.callback) action.callback();
        notification.error({
            message: 'Failed',
            description: error + '',
        });

        throw error;
    } finally {
        yield cancel();
    }
}

function* logOutSaga() {
    try {
        yield call(AuthService.logout);
        yield put(logOutSuccess());
        localStorage.removeItem(`${appName}_xAuthToken`);
        localStorage.removeItem(`${appName}_refreshToken`);
        modalWarning('warning');
        Router.replace('/');
    } catch (err) {}
}

function* forgotpasswordSaga({ method, payload, callback }) {
    try {
        switch (method) {
            case 'send-otp':
                yield call(AuthService.sendotp, payload);
                notification.success({
                    message: 'Success',
                    description: 'Please check your email for the OTP',
                });
                if (callback) callback();
                break;
            case 'verify-otp':
                yield call(AuthService.verifyOtp, payload);
                notification.success({
                    message: 'Success',
                    description: 'OTP has been verified!',
                });
                if (callback) callback();
                break;
            case 'newpassword':
                yield call(AuthService.newpassword, payload);
                notification.success({
                    message: 'Success',
                    description: 'Your password has been reset!',
                });
                if (callback) callback();
                break;
        }
    } catch (error) {
        notification.error({
            message: 'Failed',
            description: error + '',
        });
        if (callback) callback(true);
    } finally {
        yield cancel();
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.SIGNUP_REQUEST, signUpSaga)]);
    yield all([takeEvery(actionTypes.LOGIN_REQUEST, loginSaga)]);
    yield all([takeEvery(actionTypes.LOGOUT, logOutSaga)]);
    yield all([
        takeLatest(actionTypes.FORGOTPASSWORD_REQUEST, forgotpasswordSaga),
    ]);
}
