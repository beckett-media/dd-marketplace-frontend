import { all, call, put, takeLatest } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import UserService from '~/repositories/UserRespository';
import { loginSuccess, logOutSuccess } from '../auth/action';
import { toggleUserInfoLoading } from './action';
import { notification } from 'antd';
import Router from 'next/router';

const showNotification = (type, payload) => {
    /*
	payload:{
		message: string,
		description: string,
	}

*/
    notification[type](payload);
};

function* getUserDetails() {
    try {
        put(toggleUserInfoLoading(true));
        const userInfo = yield call(UserService.getUserInfo);

        yield put(loginSuccess(userInfo.user));
        yield put(toggleUserInfoLoading(false));
    } catch (error) {
        yield put(toggleUserInfoLoading(false));
        yield put(logOutSuccess());
    }
}

function* updateProfilePhoto({ image, callback }) {
    try {
        const userInfo = yield call(UserService.updateProfilePhoto, image);
        yield put(loginSuccess(userInfo.data.user));
        showNotification('success', {
            message: 'Updated',
            description: 'Profile Photo Updated',
        });
        if (callback) callback(image);
    } catch (error) {
        showNotification('error', { message: 'Failed', description: error });
        if (callback) callback(null);
    }
}

function* updateUserName({ userName }) {
    try {
        const userInfo = yield call(UserService.updateUserName, userName);
        yield put(loginSuccess(userInfo.data.user));
        notification.success({
            message: 'Updated',
            description: 'User Name Updated',
        });
    } catch (error) {
        notification.error({ message: 'Failed', description: error + '' });
    }
}

function* stripeCodeVerification(action) {
    try {
        yield call(UserService.stripeVerification, action.code);
        notification.success({
            message: 'Verification Complete',
            description: 'The stripe verifcation has been completed',
        });
        const path = action.redirectPath ? action.redirectPath : '/auctions';

        Router.replace(path);
    } catch (error) {
        notification.error({
            message: 'Verification Failed',
            description: error + '',
        });
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(actionTypes.GET_USER_DETAILS_REQUEST, getUserDetails),
    ]);

    yield all([
        takeLatest(
            actionTypes.STRIPE_CODE_VERIFICTION_REQUEST,
            stripeCodeVerification
        ),
    ]);

    yield all([takeLatest(actionTypes.UPDATE_USER_NAME, updateUserName)]);

    yield all([
        takeLatest(actionTypes.UPDATE_PROFILE_PHOTO, updateProfilePhoto),
    ]);
}
