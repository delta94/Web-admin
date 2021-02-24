import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { ReportHttp } from '../services/report.http';
const reportRequest = new ReportHttp();

export function* getDataAdminStatistical(api, action) {
  const response = yield call(api.statisRequest, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getDataAdminStatisticalSuccess(response.data));
    } else {
      yield put(actions.getDataAdminStatisticalFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDataAdminStatisticalFailure(err));
  }
}

export function* getListHistoryTekmediCard(api, action) {
  const response = yield call(api.getListHistoryTekmediCard, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getListHistoryTekmediCardSuccess(response.data));
    } else {
      yield put(actions.getListHistoryTekmediCardFail(response.error));
    }
  } catch (error) {
    yield put(actions.getListHistoryTekmediCardFail(error));
  }
}

export function* getIdPrinterDeal(api, action) {
  const response = yield call(api.getIdPrinterDeal, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getIdPrinterDealSuccess(response.data));
    } else {
      yield put(actions.getIdPrinterDealFail(response.error));
    }
  } catch (error) {
    yield put(actions.getIdPrinterDealFail(error));
  }
}

export function* postCancelDeal(api, action) {
  const response = yield call(api.postCancelDeal, action.payload);
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

export function* exportFileHistoryCart(api, action) {
  const response = yield call(api.exportFileHistoryCard, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportFileHistoryCardSuccess(response.data.result));
    } else {
      yield put(actions.exportFileHistoryCardFail(response.error));
    }
  } catch (error) {
    yield put(actions.exportFileHistoryCardFail(error));
  }
}
export function* ReportFormSaga() {
  yield all([
    yield takeLatest(
      actions.getDataAdminStatistical.type,
      getDataAdminStatistical,
      reportRequest,
    ),
    yield takeLatest(
      actions.getListHistoryTekmediCard.type,
      getListHistoryTekmediCard,
      reportRequest,
    ),
    yield takeLatest(
      actions.getIdPrinterDeal.type,
      getIdPrinterDeal,
      reportRequest,
    ),
    yield takeLatest(
      actions.postCancelDeal.type,
      postCancelDeal,
      reportRequest,
    ),
    yield takeLatest(
      actions.exportFileHistoryCard.type,
      exportFileHistoryCart,
      reportRequest,
    ),
  ]);
}
