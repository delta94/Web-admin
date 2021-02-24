import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { RoomHttp } from '../services/room.http';
const roomRequest = new RoomHttp();

export function* getRoomAll(api) {
  const response = yield call(api.getRoomAll);
  try {
    if (response.ok) {
      yield put(actions.getRoomAllSuccess(response.data.result.data));
    } else {
      yield put(actions.getRoomAllFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getRoomAllFailure(err));
  }
}

export function* RoomSaga() {
  yield all([
    yield takeLatest(actions.getRoomAll.type, getRoomAll, roomRequest),
  ]);
}
