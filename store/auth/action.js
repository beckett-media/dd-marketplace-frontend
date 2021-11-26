import { appName } from '~/repositories/Repository';
import actionTypes from './actionTypes';
import actionTypesUser from '../userInfo/actionTypes';

export function login(payload, callback) {
    return { type: actionTypes.LOGIN_REQUEST, payload, callback };
}
export function register(payload) {
    return { type: actionTypes.SIGNUP_REQUEST, payload };
}

export function loginSuccess(user) {
    return { type: actionTypes.LOGIN_SUCCESS, user };
}

export function signUpSuccess() {
    return { type: actionTypes.SIGNUP_SUCCESS };
}

export function logOut() {
    return { type: actionTypes.LOGOUT };
}

export function logOutSuccess() {
    return { type: actionTypes.LOGOUT_SUCCESS };
}

export function forgotpasswordrequests(method, payload, callback) {
    return {
        type: actionTypes.FORGOTPASSWORD_REQUEST,
        method,
        payload,
        callback,
    };
}
