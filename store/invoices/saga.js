import { all, call, put, takeLatest, select } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import InvoicesRepository from '~/repositories/InvoicesRespository';
import { getInvoicesSuccess } from './actions';
const log = console.log;

function* getInvoices() {
    try {
        const data = yield call(InvoicesRepository.getInvoices);
        console.log('data: getInvoices', data);
        yield put(getInvoicesSuccess(data.data));
    } catch (error) {
        console.log('error: ', error);
        log(error, '[getInvoices]');
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actionTypes.GET_INVOICES_REQUEST, getInvoices)]);
}
