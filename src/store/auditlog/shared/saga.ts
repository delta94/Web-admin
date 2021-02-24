import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { AuditLogHttp } from '../services/auditlog.http';
const auditlogRequest = new AuditLogHttp();

export function* getAllAuditLog(api) {
  const response = yield call(api.getAllAuditLog);
  try {
    if (response.ok) {
      yield put(actions.getAllAuditLogSuccess(response.data.result));
    } else {
      yield put(actions.getAllAuditLogFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllAuditLogFailure(err));
  }
}
export function* filterAuditLog(api, action) {
  const response = yield call(api.filterAuditLog, action.payload);
  try {
    if (response.ok) {
      yield put(actions.filterAuditLogSuccess(response.data));
    } else {
      const { error, problem } = response;
      if (error) {
        yield put(actions.filterAuditLogFailure(error));
      } else {
        yield put(actions.filterAuditLogFailure(problem));
      }
    }
  } catch (err) {
    yield put(actions.filterAuditLogFailure(err));
  }
}

export function* AuditlogSaga() {
  yield all([
    yield takeLatest(
      actions.getAllAuditLog.type,
      getAllAuditLog,
      auditlogRequest,
    ),
    yield takeLatest(
      actions.filterAuditLog.type,
      filterAuditLog,
      auditlogRequest,
    ),
  ]);
}
