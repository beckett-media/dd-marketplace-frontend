import actionTypes from './actionTypes';

export function login(payload, callback) {
    console.log('payload:login ', payload);
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
