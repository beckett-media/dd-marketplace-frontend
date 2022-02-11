import actionTypes from './actionTypes';

export function getAuctionListingsByProducts(value) {
    return { type: actionTypes.GET_AUCTION_LISTING_BY_PRODUCT, value };
}

export function getListingByProductSuccess(payload, loading) {
    return {
        type: actionTypes.GET_AUCTION_LISTING_BY_PRODUCT_AND_GRADE_SUCCESS,
        payload,
        loading,
    };
}

export function getProducts(payload) {
    return { type: actionTypes.GET_PRODUCTS, payload };
}

export function getProductsSuccess(data) {
    return {
        type: actionTypes.GET_AUCTION_PRODUCTS_SUCCESS,
        data,
    };
}

export function getProductsError(error) {
    return {
        type: actionTypes.GET_AUCTION_PRODUCTS_ERROR,
        error,
    };
}

export function getProductsById(id) {
    return {
        type: actionTypes.GET_AUCTION_PRODUCT_BY_ID,
        id,
    };
}
