import { call, put, takeLatest, all } from 'redux-saga/effects';

import { actions } from './slice';
import { CardHttp } from '../services/card.http';
import { PaymentHttp } from '../services/payment.http';
const cardRequest = new CardHttp();
const paymentRequest = new PaymentHttp();

export function* getDataCardHistory(api, action) {
  const response = yield call(api.getDataCardHistory, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getDataCardHistorySuccess(response.data));
    } else {
      yield put(actions.getDataCardHistoryFailure(response.message));
    }
  } catch (err) {
    yield put(actions.getDataCardHistoryFailure(err));
  }
}

export function* getDataCardStatistical(api, action) {
  const response = yield call(
    cardRequest.getDataCardStatistical,
    action.payload,
  );
  try {
    if (response.ok) {
      yield put(actions.getCardStatisticalSuccess(response.data));
    } else {
      yield put(actions.getCardStatisticalFailure(response.error));
    }
  } catch (error) {
    yield put(actions.getCardStatisticalFailure(response.error));
  }
}

export function* registerCardPayment(api, action) {
  const response = yield call(cardRequest.registerCardPayment, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerCardPaymentSuccess(response.data));
    } else {
      yield put(actions.registerCardPaymentFail(response.error));
    }
  } catch (error) {
    yield put(actions.registerCardPaymentFail(response.error));
  }
}

export function* cancelPayment(api, action) {
  const response = yield call(paymentRequest.cancelPayment, action.payload);
  try {
    if (response.ok) {
      yield put(actions.cancelPaymentSuccess(response.data.result));
    } else {
      yield put(actions.cancelPaymentFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.cancelPaymentFail(response.error));
  }
}

export function* exportListCard(api, action) {
  const response = yield call(cardRequest.exportListCard, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportListCardSuccess(response.data.result));
    } else {
      yield put(actions.exportListCardFail(response.error));
    }
  } catch (error) {
    yield put(actions.exportListCardFail(response.error));
  }
}
export function* getIdPrinter(api, action) {
  const response = yield call(cardRequest.getIdPrinter, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getIdPrinterSuccess(response.data));
    } else {
      yield put(actions.getIdPrinterFail(response.error));
    }
  } catch (error) {
    yield put(actions.getIdPrinterFail(error));
  }
}
export function* postCancelDeal(api, action) {
  const response = yield call(cardRequest.postCancelDeal, action.payload);
  try {
    if (response.ok) {
      yield put(actions.postCancelDealSuccess(response.data));
    } else {
      yield put(actions.postCancelDealFail(response.error));
    }
  } catch (error) {
    yield put(actions.postCancelDealFail(error));
  }
}

export function* getListValueExtend(api) {
  const response = yield call(cardRequest.getListValueExtend);
  try {
    if (response.ok) {
      yield put(actions.getListValueExtendSuccess(response.data.result));
    } else {
      yield put(actions.getListValueExtendFail(response.error));
    }
  } catch (error) {
    yield put(actions.getListValueExtendFail(error));
  }
}
/* Cards */

export function* CardFormSaga() {
  yield all([
    yield takeLatest(
      actions.getDataCardHistory.type,
      getDataCardHistory,
      cardRequest,
    ),
    yield takeLatest(
      actions.getCardStatistical.type,
      getDataCardStatistical,
      cardRequest,
    ),
    yield takeLatest(
      actions.registerCardPayment.type,
      registerCardPayment,
      cardRequest,
    ),
    yield takeLatest(actions.exportListCard.type, exportListCard, cardRequest),
    yield takeLatest(actions.cancelPayment.type, cancelPayment, paymentRequest),
    yield takeLatest(actions.getIdPrinter.type, getIdPrinter, cardRequest),
    yield takeLatest(actions.postCancelDeal.type, postCancelDeal, cardRequest),
    yield takeLatest(
      actions.getListValueExtend.type,
      getListValueExtend,
      cardRequest,
    ),
  ]);
}
