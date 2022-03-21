import actionTypes from './actionTypes';

export function saveAddressRequest(address, auctionId, isEdit, callback) {
    return {
        type: actionTypes.ADD_ADDRESS_REQUEST,
        address,
        auctionId,
        isEdit,
        callback,
    };
}

export function getSavedAddressRequest(refetch) {
    return { type: actionTypes.GET_SAVED_ADDRESS_REQUEST, refetch };
}

export function getSavedAddressSuccess(address) {
    return { type: actionTypes.GET_SAVED_ADDRESS_SUCCESS, address };
}

export function validatePromoCode(promoCode) {
    return { type: actionTypes.VALIDATE_PROMO_CODE, promoCode };
}

export function resetPromo() {
    return { type: actionTypes.RESET_PROMO };
}

export function promoValidationSuccess(promo) {
    return { type: actionTypes.PROMO_VALIDATION_SUCCESS, promo };
}

export function setDefaultAddressRequest(addressId) {
    return { type: actionTypes.SET_DEFAULT_ADDRESS, addressId };
}

export function setAddressDeleteRequest(addressId) {
    return { type: actionTypes.DELETE_ADDRESS_REQUEST, addressId };
}

export function onCheckoutComplete(token, promoCode = '') {
    return { type: actionTypes.HANDLE_CHECKOUT_REQUEST, token, promoCode };
}
export function onAuctionCheckoutComplete(token, auctionId) {
    return {
        type: actionTypes.HANDLE_AUCTION_CHECKOUT_REQUEST,
        auctionId,
        token,
    };
}

export function handleCheckoutLoading(value) {
    return { type: actionTypes.HANDLE_CHECKOUT_LOADING, value };
}
