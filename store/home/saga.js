import actionTypes from './actionTypes';
import { all, put, takeLatest, call } from 'redux-saga/effects';
import HomeRespository from '~/repositories/HomeRespository';

function* getMarketPlaceDetails() {
    const marketPlace = yield call(HomeRespository.getmarketPlace);

    console.log('getMarketPlaceDetails: ', { marketPlace });
}

export default function* rootSaga() {
    yield all([
        takeLatest(
            actionTypes.GET_MARKET_PLACE_HOME_REQUEST,
            getMarketPlaceDetails
        ),
    ]);
}
