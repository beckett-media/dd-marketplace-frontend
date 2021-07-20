import actionTypes from './actionTypes';

export function getUserDetails() {
    return { type: actionTypes.GET_USER_DETAILS_REQUEST };
}

export function toggleUserInfoLoading(value) {
    return { type: actionTypes.TOGGLE_USER_INFO_LOADING, value };
}

export function updateProfilePhoto(image, callback) {
    return { type: actionTypes.UPDATE_PROFILE_PHOTO, image, callback };
}

export function updateUserName(userName) {
    return { type: actionTypes.UPDATE_USER_NAME, userName };
}
