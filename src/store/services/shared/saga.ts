import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { ServicesHttp } from '../services/service.http';
const servicesHttp = new ServicesHttp();

export function* getAllServices(api, action) {
  const response = yield call(api.getAllServices, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllServicesSuccess(response.data.result.data));
    } else {
      yield put(actions.getAllServicesFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllServicesFailure(err));
  }
}

export function* ServicesSaga() {
  yield all([
    yield takeLatest(actions.getAllServices.type, getAllServices, servicesHttp),
  ]);
}
