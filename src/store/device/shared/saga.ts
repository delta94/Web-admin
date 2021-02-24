import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { DeviceHttp } from '../services/device.http';
const deviceRequest = new DeviceHttp();

export function* getDeviceAll(api, action) {
  const response = yield call(api.getDeviceAll, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getDeviceAllSuccess(response.data.result));
    } else {
      yield put(actions.getDeviceAllFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDeviceAllFailure(err));
  }
}

export function* getDeviceById(api, action) {
  const response = yield call(api.getDeviceById, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getDeviceByIdSuccess(response.data.result));
    } else {
      yield put(actions.getDeviceByIdFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDeviceByIdFailure(err));
  }
}

export function* createDevice(api, action) {
  const response = yield call(api.createDevice, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createDeviceSuccess(response.data.result));
    } else {
      yield put(actions.createDeviceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createDeviceFailure(err));
  }
}

export function* updateDevice(api, action) {
  const response = yield call(api.updateDevice, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateDeviceSuccess(response.data.result));
    } else {
      yield put(actions.updateDeviceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.updateDeviceFailure(err));
  }
}

export function* deleteDevice(api, action) {
  const response = yield call(api.deleteDevice, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteDeviceSuccess(response.data.result));
    } else {
      yield put(actions.deleteDeviceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.deleteDeviceFailure(err));
  }
}

export function* DeviceSaga() {
  yield all([
    yield takeLatest(actions.getDeviceAll.type, getDeviceAll, deviceRequest),
    yield takeLatest(actions.getDeviceById.type, getDeviceById, deviceRequest),
    yield takeLatest(actions.createDevice.type, createDevice, deviceRequest),
    yield takeLatest(actions.updateDevice.type, updateDevice, deviceRequest),
    yield takeLatest(actions.deleteDevice.type, deleteDevice, deviceRequest),
  ]);
}
