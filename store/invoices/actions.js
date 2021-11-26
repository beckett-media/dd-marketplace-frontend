import actionTypes from './actionTypes';

export function getInvoicesRequest() {
    return { type: actionTypes.GET_INVOICES_REQUEST };
}

export function getInvoicesSuccess(orders) {
    return { type: actionTypes.GET_INVOICES_SUCCESS, orders };
}
