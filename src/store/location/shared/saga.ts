import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { LocationHttp } from '../services/location.http';
const locationRequest = new LocationHttp();

export function* getLocationsAll(api) {
  const response = yield call(api.getLocationsAll);
  try {
    if (response.ok) {
      yield put(actions.getLocationsAllSuccess(response.data.result));
    } else {
      yield put(actions.getLocationsAllFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getLocationsAllFailure(err));
  }
}

export function* LocationSaga() {
  yield all([
    yield takeLatest(
      actions.getLocationsAll.type,
      getLocationsAll,
      locationRequest,
    ),
  ]);
}
