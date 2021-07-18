import actionTypes from './actionTypes';

export function saveAddressRequest(address, isEdit) {
    return { type: actionTypes.ADD_ADDRESS_REQUEST, address, isEdit };
}

export function getSavedAddressRequest() {
    return { type: actionTypes.GET_SAVED_ADDRESS_REQUEST };
}

export function getSavedAddressSuccess(address) {
    return { type: actionTypes.GET_SAVED_ADDRESS_SUCCESS, address };
}

export function setDefaultAddressRequest(addressId) {
    return { type: actionTypes.SET_DEFAULT_ADDRESS, addressId };
}

export function setAddressDeleteRequest(addressId) {
    console.log('addressId: setAddressDeleteRequest', addressId);
    return { type: actionTypes.DELETE_ADDRESS_REQUEST, addressId };
}
