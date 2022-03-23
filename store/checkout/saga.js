import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import CheckoutRespository from '~/repositories/CheckoutRespository';
import {
    getSavedAddressRequest,
    getSavedAddressSuccess,
    handleCheckoutLoading,
    promoValidationSuccess,
} from './action';
import AuctionProductRepository from '~/repositories/AuctionProductRepository';

import actionTypes from './actionTypes';
import { notification } from 'antd';
import CartRespository from '~/repositories/CartRespository';
import {
    getDefaultAddress,
    getSavedAddress as getSavedAddressSelector,
} from './selectors';
import Router from 'next/router';
import { RESET_AFTER_CHECKOUT } from '../globalTypes';

function* addAddress({ address, auctionId, isEdit, callback }) {
    try {
        let request;
        if (isEdit) {
            request = yield call(
                CheckoutRespository.editAddress,
                address,
                address._id
            );
        } else request = yield call(CheckoutRespository.saveAddress, address);

        if (request.success) yield put(getSavedAddressRequest(true));

        notification.success({
            message: 'Success',
            description: `The Address has been ${isEdit ? 'updated' : 'saved'}`,
            duration: 15,
        });
        if (callback) callback();
        if (!isEdit && !auctionId) {
            Router.push('/account/payment');
        } else {
            Router.push(`/account/payment-auction?id_=${auctionId}`);
        }
    } catch (error) {
        notification.error({
            message: 'Failed',
            description: `${error}`,
            duration: 15,
        });
    }
}

function* getSavedAddress({ refetch }) {
    try {
        const saved = yield select(getSavedAddressSelector);

        if (!saved.length || refetch) {
            const request = yield call(CheckoutRespository.getSavedAddress);
            const address = request.data;
            yield put(getSavedAddressSuccess(address));
        }
    } catch (error) {}
}

function* makeAddressDefault({ addressId }) {
    try {
        const request = yield call(
            CheckoutRespository.makeDefaultAddress,
            addressId
        );

        if (request.success) yield put(getSavedAddressRequest(true));

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
            yield put(getSavedAddressRequest(true));
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

function* handleCheckoutComplete({ token, promoCode }) {
    try {
        yield put(handleCheckoutLoading(true));
        const address = yield select(getDefaultAddress);

        const cart = yield call(CartRespository.getCart);
        const listingIds = cart.data.carts.map((i) => i.listing._id);

        const request = yield call(CheckoutRespository.checkoutComplete, {
            addressId: address._id,
            token,
            listingIds,
            promoCode,
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
function* handleAuctionCheckoutComplete({ token, auctionId }) {
    try {
        yield put(handleCheckoutLoading(true));
        const address = yield select(getDefaultAddress);
        const request = yield call(
            CheckoutRespository.auctionCheckoutComplete,
            {
                addressId: address._id,
                token,
                auctionId,
                isCardSave: 'true',
            }
        );
        Router.replace('/account/checkoutSuccess');

        notification.success({
            message: 'Success!!',
            description: request.message,
            duration: 15,
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

function* validatePromoCode(action) {
    try {
        const request = yield call(CheckoutRespository.validatePromo, {
            promoCode: action.promoCode,
        });
        yield put(promoValidationSuccess(request.data.promo));
        notification.success({
            message: 'Success!!',
            description: request.message,
            duration: 20,
        });
    } catch (error) {
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
    yield all([
        takeLatest(
            actionTypes.HANDLE_AUCTION_CHECKOUT_REQUEST,
            handleAuctionCheckoutComplete
        ),
    ]);

    yield all([takeLatest(actionTypes.VALIDATE_PROMO_CODE, validatePromoCode)]);
}
