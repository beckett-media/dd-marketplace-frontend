import actionTypes from './actionTypes';

export function login(payload) {
    console.log('payload:login ', payload);
    return { type: actionTypes.LOGIN_REQUEST, payload };
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
