import actionTypes from './actionTypes';

export const getMarketPlaceDetails = () => ({
    type: actionTypes.GET_MARKET_PLACE_HOME_REQUEST,
});

export const getMarketPlaceDetailsData = (payload) => ({
    type: actionTypes.SET_MARKET_PLACE_DATA,
    payload,
});

export const getMarketPlaceLoading = (value) => ({
    type: actionTypes.SET_MARKET_PLACE_LOADING,
    value,
});
