/* eslint-disable prettier/prettier */
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { TransactionHttp } from '../services/transaction.http';
const transactionRequest = new TransactionHttp();

export function* getDataPaidWaiting(api, action) {
  const response = yield call(api.statisRequest);
  try {
    if (response.ok) {
      yield put(actions.getDataPaidWaitingSuccess(response.data));
    } else {
      yield put(actions.getDataPaidWaitingFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDataPaidWaitingFailure(err));
  }
}
export function* getListTranSaction(api, action) {
  const response = yield call(
    transactionRequest.getListTranSaction,
    action.payload,
  );
  try {
    if (response.ok) {
      yield put(actions.getListTranSactionSuccess(response.data));
    } else {
      yield put(actions.getListTranSactionFail(response.error));
    }
  } catch (error) {
    yield put(actions.getListTranSactionFail(error));
  }
}
export function* getListTransactionDetail(api, action) {
  const response = yield call(api.getListTransactionDetail, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getListTransactionDetaiSuccess(response.data));
    } else {
      yield put(actions.getListTransactionDetaiFail(response.error));
    }
  } catch (error) {
    yield put(actions.getListTransactionDetaiFail(error));
  }
}
export function* getListTransactionDetailModal(api, action) {
  const response = yield call(
    api.getListTransactionDetailModal,
    action.payload,
  );
  try {
    if (response.ok) {
      yield put(actions.getListTransactionDetailModalSuccess(response.data));
    } else {
      yield put(actions.getListTransactionDetailModalFail(response.error));
    }
  } catch (error) {
    yield put(actions.getListTransactionDetailModalFail(error));
  }
}
export function* PaidWaitingFormSaga() {
  yield all([
    yield takeLatest(
      actions.getDataPaidWaiting.type,
      getDataPaidWaiting,
      transactionRequest,
    ),
    yield takeLatest(
      actions.getListTranSaction.type,
      getListTranSaction,
      transactionRequest,
    ),
    yield takeLatest(
      actions.getListTransactionDetail.type,
      getListTransactionDetail,
      transactionRequest,
    ),
    yield takeLatest(
      actions.getListTransactionDetailModal.type,
      getListTransactionDetailModal,
      transactionRequest,
    ),
  ]);
}
