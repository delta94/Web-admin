import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { TableHttp } from '../services/table.http';
const tableRequest = new TableHttp();

export function* getTableAll(api, action) {
  const response = yield call(api.getTableAll, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getTableAllSuccess(response.data));
    } else {
      yield put(actions.getTableAllFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getTableAllFailure(err));
  }
}

export function* getTableWithId(api, action) {
  const response = yield call(api.getTableWithId, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getTableWithIdSuccess(response.data.result));
    } else {
      yield put(actions.getTableWithIdFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getTableWithIdFailure(err));
  }
}

export function* createTable(api, action) {
  const response = yield call(api.createTable, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createTableSuccess(response.data.result));
    } else {
      yield put(actions.createTableFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createTableFailure(err));
  }
}

export function* updateTable(api, action) {
  const response = yield call(api.updateTable, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateTableSuccess(response.data.result));
    } else {
      yield put(actions.updateTableFailure(response.error));
    }
  } catch (err) {
    yield put(actions.updateTableFailure(err));
  }
}

export function* deleteTable(api, action) {
  const response = yield call(api.deleteTable, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteTableSuccess(response.data.result));
    } else {
      yield put(actions.deleteTableFailure(response.error));
    }
  } catch (err) {
    yield put(actions.deleteTableFailure(err));
  }
}

export function* callTableAble(api, action) {
  const response = yield call(api.callTableAble, action.payload);
  try {
    if (response.ok) {
      yield put(actions.callTableAbleSuccess(response.data.result));
    } else {
      yield put(actions.callTableAbleFailure(response.error));
    }
  } catch (err) {
    yield put(actions.callTableAbleFailure(err));
  }
}

export function* TableSaga() {
  yield all([
    yield takeLatest(actions.getTableAll.type, getTableAll, tableRequest),
    yield takeLatest(actions.getTableWithId.type, getTableWithId, tableRequest),
    yield takeLatest(actions.createTable.type, createTable, tableRequest),
    yield takeLatest(actions.updateTable.type, updateTable, tableRequest),
    yield takeLatest(actions.deleteTable.type, deleteTable, tableRequest),
    yield takeLatest(actions.callTableAble.type, callTableAble, tableRequest),
  ]);
}
