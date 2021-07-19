import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import InvoicesRepository from '~/repositories/InvoicesRespository';
import { getInvoicesSuccess } from './actions';
const log = console.log;

function* getInvoices() {
    try {
        const { data: { data: { orders = [] } = {} } = {} } = yield call(
            InvoicesRepository.getInvoices
        );
        yield put(getInvoicesSuccess(orders));
    } catch (error) {
        log(error, '[getInvoices]');
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.GET_INVOICES_REQUEST, getInvoices)]);
}
