import actionTypes from './actionTypes';

export function saveAddressRequest(address, isEdit, callback) {
    return { type: actionTypes.ADD_ADDRESS_REQUEST, address, isEdit, callback };
}

export function getSavedAddressRequest(refetch) {
    return { type: actionTypes.GET_SAVED_ADDRESS_REQUEST, refetch };
}

export function getSavedAddressSuccess(address) {
    return { type: actionTypes.GET_SAVED_ADDRESS_SUCCESS, address };
}

export function setDefaultAddressRequest(addressId) {
    return { type: actionTypes.SET_DEFAULT_ADDRESS, addressId };
}

export function setAddressDeleteRequest(addressId) {
    return { type: actionTypes.DELETE_ADDRESS_REQUEST, addressId };
}

export function onCheckoutComplete(token) {
    return { type: actionTypes.HANDLE_CHECKOUT_REQUEST, token };
}

export function handleCheckoutLoading(value) {
    return { type: actionTypes.HANDLE_CHECKOUT_LOADING, value };
}
