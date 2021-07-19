import { all, call, put, takeLatest } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import UserService from '~/repositories/UserRespository';
import { loginSuccess, logOutSuccess } from '../auth/action';
import { toggleUserInfoLoading } from './action';
import { notification } from 'antd';

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

function* updateProfilePhoto({ image }) {
    try {
        const userInfo = yield call(UserService.updateProfilePhoto, image);
        yield put(loginSuccess(userInfo.user));
        showNotification('success', {
            message: 'Updated',
            description: 'Profile Photo Updated',
        });
    } catch (error) {
        showNotification('error', { message: 'Failed', description: error });
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(actionTypes.GET_USER_DETAILS_REQUEST, getUserDetails),
    ]);

    yield all([
        takeLatest(actionTypes.UPDATE_PROFILE_PHOTO, updateProfilePhoto),
    ]);
}
