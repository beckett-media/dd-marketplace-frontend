import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import CheckoutRespository from '~/repositories/CheckoutRespository';
import {
    getSavedAddressRequest,
    getSavedAddressSuccess,
    handleCheckoutLoading,
} from './action';
import actionTypes from './actionTypes';
import { notification } from 'antd';
import CartRespository from '~/repositories/CartRespository';
import { getDefaultAddress } from './selectors';
import Router from 'next/router';
import { RESET_AFTER_CHECKOUT } from '../globalTypes';

function* addAddress({ address, isEdit }) {
    try {
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
            duration: 15,
        });
    } catch (error) {
        notification.error({
            message: 'Failed',
            description: `${error}`,
            duration: 15,
        });
    }
}

function* getSavedAddress() {
    const request = yield call(CheckoutRespository.getSavedAddress);
    const address = request.data;
    yield put(getSavedAddressSuccess(address));
}

function* makeAddressDefault({ addressId }) {
    try {
        const request = yield call(
            CheckoutRespository.makeDefaultAddress,
            addressId
        );

        if (request.success) yield put(getSavedAddressRequest());

        notification.success({
            message: 'Success',
            description: `The Address has been default`,
            duration: 15,
        });
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error + '',
            duration: 15,
        });
    }
}

function* deleteAddress({ addressId }) {
    try {
        const request = yield call(
            CheckoutRespository.deleteAddress,
            addressId
        );
        if (request.success) {
            yield put(getSavedAddressRequest());
            notification.success({
                message: 'Success',
                description: `The Address has been deleted`,
                duration: 15,
            });
        }
    } catch (error) {
        notification.error({
            message: 'Error',
            description: error + '',
            duration: 15,
        });
    }
}

function* handleCheckoutComplete({ token }) {
    try {
        yield put(handleCheckoutLoading(true));
        const address = yield select(getDefaultAddress);

        const cart = yield call(CartRespository.getCart);
        const listingIds = cart.data.carts.map((i) => i.listing._id);

        const request = yield call(CheckoutRespository.checkoutComplete, {
            addressId: address._id,
            token,
            listingIds,
            customerId: '',
            isCardSave: true,
        });
        Router.replace('/account/checkoutSuccess');

        notification.success({
            message: 'Success!!',
            description: request.message,
            duration: 20,
        });

        yield put(handleCheckoutLoading(false));
        yield put({ type: RESET_AFTER_CHECKOUT });
    } catch (error) {
        yield put(handleCheckoutLoading(false));
        notification.error({
            message: 'Failed',
            description: `${error}`,
            duration: 15,
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

    yield all([
        takeLatest(actionTypes.HANDLE_CHECKOUT_REQUEST, handleCheckoutComplete),
    ]);
}
