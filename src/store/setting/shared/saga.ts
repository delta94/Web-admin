import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { SettingHttp } from '../services/setting.http';
const settingRequest = new SettingHttp();

/* ManageType */
export function* getAllManageType(api, action) {
  const response = yield call(api.getAllManageType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllManageTypeSuccess(response.data.result.data));
    } else {
      yield put(actions.getAllManageTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllManageTypeFailure(err));
  }
}

export function* getManageType(api, action) {
  const response = yield call(api.getManageType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getManageTypeSuccess(response.data.result));
    } else {
      yield put(actions.getManageTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getManageTypeFailure(err));
  }
}

export function* changeManageTypeActive(api, action) {
  const response = yield call(api.changeManageTypeActive, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changeManageTypeActiveSuccess(action.payload));
    } else {
      yield put(actions.changeManageTypeActiveFailure(response.error));
    }
  } catch (err) {
    yield put(actions.changeManageTypeActiveFailure(err));
  }
}

export function* createManageType(api, action) {
  const response = yield call(api.createManageType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createManageTypeSuccess(action.payload));
    } else {
      yield put(actions.createManageTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createManageTypeFailure(err));
  }
}

export function* deleteManageType(api, action) {
  const response = yield call(api.deleteManageType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteManageTypeSuccess(action.payload));
    } else {
      yield put(actions.deleteManageTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.deleteManageTypeFailure(err));
  }
}

export function* updateManageType(api, action) {
  const response = yield call(api.updateManageType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateManageTypeSuccess(action.payload));
    } else {
      yield put(actions.updateManageTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.updateManageTypeFailure(err));
  }
}
/* ManageType */

export function* SettingSaga() {
  yield all([
    /* ManageType */
    yield takeLatest(
      actions.getAllManageType.type,
      getAllManageType,
      settingRequest,
    ),
    yield takeLatest(
      actions.createManageType.type,
      createManageType,
      settingRequest,
    ),
    yield takeLatest(
      actions.updateManageType.type,
      updateManageType,
      settingRequest,
    ),
    yield takeLatest(
      actions.deleteManageType.type,
      deleteManageType,
      settingRequest,
    ),
    yield takeLatest(actions.getManageType.type, getManageType, settingRequest),
    yield takeLatest(
      actions.changeManageTypeActive.type,
      changeManageTypeActive,
      settingRequest,
    ),
    /* ManageType */
  ]);
}
