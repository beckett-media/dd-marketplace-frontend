import { all, call, put, takeLatest } from 'redux-saga/effects';
import CheckoutRespository from '~/repositories/CheckoutRespository';
import { getSavedAddressRequest, getSavedAddressSuccess } from './action';
import actionTypes from './actionTypes';
import { notification } from 'antd';

function* addAddress({ address, isEdit }) {
    let request;
    if (isEdit) {
        request = yield call(
            CheckoutRespository.editAddress,
            address,
            address._id
        );
    } else request = yield call(CheckoutRespository.saveAddress, address);

    if (request.success) yield put(getSavedAddressRequest());

    notification.success({
        message: 'Success',
        description: `The Address has been ${isEdit ? 'updated' : 'saved'}`,
        duration: 1,
    });
}

function* getSavedAddress() {
    const request = yield call(CheckoutRespository.getSavedAddress);
    const address = request.data;
    yield put(getSavedAddressSuccess(address));
}

function* makeAddressDefault({ addressId }) {
    const request = yield call(
        CheckoutRespository.makeDefaultAddress,
        addressId
    );

    if (request.success) yield put(getSavedAddressRequest());

    notification.success({
        message: 'Success',
        description: `The Address has been default`,
        duration: 1,
    });
}

function* deleteAddress({ addressId }) {
    const request = yield call(CheckoutRespository.deleteAddress, addressId);
    if (request.success) {
        yield put(getSavedAddressRequest());
        notification.success({
            message: 'Success',
            description: `The Address has been deleted`,
            duration: 1,
        });
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.ADD_ADDRESS_REQUEST, addAddress)]);

    yield all([
        takeLatest(actionTypes.GET_SAVED_ADDRESS_REQUEST, getSavedAddress),
    ]);

    yield all([
        takeLatest(actionTypes.SET_DEFAULT_ADDRESS, makeAddressDefault),
    ]);

    yield all([takeLatest(actionTypes.DELETE_ADDRESS_REQUEST, deleteAddress)]);
}
