/* eslint-disable @typescript-eslint/no-unused-vars */
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { CommonHttp } from '../services/common.http';
const commonRequest = new CommonHttp();

export function* getDefaultSetting(api) {
  const response: any = yield call(api.getDefaultSetting);
  try {
    if (response.ok) {
      yield put(actions.getDefaultSettingSuccess(response.data.result));
    } else {
      yield put(actions.getDefaultSettingFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDefaultSettingFailure(err));
  }
}

export function* createSettingSetting(api, action) {
  const response: any = yield call(api.createSettingSetting, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createSettingSettingSuccess(response.data.result));
    } else {
      yield put(actions.createSettingSettingFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createSettingSettingFailure(err));
  }
}

export function* updateSetting(api, action) {
  const response: any = yield call(api.updateSetting, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateSettingSuccess(action.payload));
    } else {
      yield put(actions.updateSettingFailure(response.error));
    }
  } catch (err) {
    yield put(actions.updateSettingFailure(err));
  }
}

export function* CommonSaga() {
  yield all([
    yield takeLatest(
      actions.getDefaultSetting.type,
      getDefaultSetting,
      commonRequest,
    ),
    yield takeLatest(
      actions.createSettingSetting.type,
      createSettingSetting,
      commonRequest,
    ),
    yield takeLatest(actions.updateSetting.type, updateSetting, commonRequest),
  ]);
}
