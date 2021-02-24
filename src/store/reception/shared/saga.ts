import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { ReceptionHttp } from '../services/reception.http';
const receptionRequest = new ReceptionHttp();

export function* getReceptionByPatientCode(api, action) {
  const response = yield call(api.getReceptionByPatientCode, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getReceptionByPatientCodeSuccess(response.data));
    } else {
      yield put(actions.getReceptionByPatientCodeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getReceptionByPatientCodeFailure(err));
  }
}

export function* getAllReception(api, action) {
  const response = yield call(api.getAllReception, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllReceptionSuccess(response.data));
    } else {
      yield put(actions.getAllReceptionFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllReceptionFailure(err));
  }
}

export function* exportReception(api, action) {
  const response = yield call(api.exportReception, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportReceptionSuccess(response.data.result));
    } else {
      yield put(actions.exportReceptionFailure(response.error));
    }
  } catch (err) {
    yield put(actions.exportReceptionFailure(err));
  }
}

export function* changeFinished(api, action) {
  const response = yield call(api.changeFinished, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changeFinishedSuccess(response.data.result));
    } else {
      yield put(actions.changeFinishedFailure(response.error));
    }
  } catch (err) {
    yield put(actions.changeFinishedFailure(err));
  }
}

export function* getAllReason(api, action) {
  const response = yield call(api.getAllReason, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllReasonSuccess(response.data.result));
    } else {
      yield put(actions.getAllReasonFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllReasonFailure(err));
  }
}

export function* checkFinally(api, action) {
  const response = yield call(api.checkFinally, action.payload);
  try {
    if (response.ok) {
      yield put(actions.checkFinallySuccess(response.data.result));
    } else {
      yield put(actions.checkFinallyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.checkFinallyFailure(err));
  }
}

export function* ReceptionSaga() {
  yield all([
    yield takeLatest(
      actions.getReceptionByPatientCode.type,
      getReceptionByPatientCode,
      receptionRequest,
    ),
    yield takeLatest(
      actions.getAllReception.type,
      getAllReception,
      receptionRequest,
    ),
    yield takeLatest(
      actions.exportReception.type,
      exportReception,
      receptionRequest,
    ),
    yield takeLatest(
      actions.changeFinished.type,
      changeFinished,
      receptionRequest,
    ),
    yield takeLatest(actions.getAllReason.type, getAllReason, receptionRequest),
    yield takeLatest(actions.checkFinally.type, checkFinally, receptionRequest),
  ]);
}
