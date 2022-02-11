import { all, put, call, takeEvery } from 'redux-saga/effects';
import AuctionProductRepository from '../../repositories/AuctionProductRepository';
import actionTypes from './actionTypes';

import {
    getProductsError,
    getProductsSuccess,
    getListingByProductSuccess,
} from './action';

function* getProducts({ payload }) {
    try {
        const data = yield call(AuctionProductRepository.getRecords, payload);
        yield put(getProductsSuccess(data));
    } catch (err) {
        yield put(getProductsError(err));
    }
}
const log = console.log;
function* getListingsByProduct({ value }) {
    try {
        yield put(getListingByProductSuccess(null, true));
        const result = yield call(
            AuctionProductRepository.getListingsByProduct,
            value
        );

        yield put(getListingByProductSuccess(result.data.auctions, false));
    } catch (err) {
        log(err);
    }
}

export default function* rootSaga() {
    yield all([takeEvery(actionTypes.GET_AUCTION_PRODUCTS, getProducts)]);
    //new
    yield all([
        takeEvery(
            actionTypes.GET_AUCTION_LISTING_BY_PRODUCT,
            getListingsByProduct
        ),
    ]);
}
