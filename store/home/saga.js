import actionTypes from './actionTypes';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import HomeRespository from '~/repositories/HomeRespository';
import { getMarketPlaceDetailsData, getMarketPlaceLoading } from './action';

function* getMarketPlaceDetails() {
    yield put(getMarketPlaceLoading(true));
    const marketPlace = yield call(HomeRespository.getmarketPlace);
    yield put(getMarketPlaceDetailsData(marketPlace));
    yield put(getMarketPlaceLoading(false));
}

export default function* rootSaga() {
    yield all([
        takeLatest(
            actionTypes.GET_MARKET_PLACE_HOME_REQUEST,
            getMarketPlaceDetails
        ),
    ]);
}
