import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { QueueHttp } from '../services/queue.http';
const queueRequest = new QueueHttp();

export function* getAllQueuePatientRoom(api, action) {
  const response = yield call(api.getAllQueuePatientRoom, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllQueuePatientRoomSuccess(response.data.result));
    } else {
      yield put(actions.getAllQueuePatientRoomFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllQueuePatientRoomFailure(err));
  }
}

export function* exportQueuePatientRoom(api, action) {
  const response = yield call(api.exportQueuePatientRoom, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportQueuePatientRoomSuccess(response.data.result));
    } else {
      yield put(actions.exportQueuePatientRoomFailure(response.error));
    }
  } catch (err) {
    yield put(actions.exportQueuePatientRoomFailure(err));
  }
}

export function* removeQueuePatientRoom(api, action) {
  const response = yield call(api.removeQueuePatientRoom, action.payload);
  try {
    if (response.ok) {
      yield put(actions.removeQueuePatientRoomSuccess(response.data.result));
    } else {
      yield put(actions.removeQueuePatientRoomFailure(response.error));
    }
  } catch (err) {
    yield put(actions.removeQueuePatientRoomFailure(err));
  }
}

export function* getQueueByPatientCode(api, action) {
  const response = yield call(api.getQueueByPatientCode, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getQueueByPatientCodeSuccess(response.data.result));
    } else {
      yield put(actions.getQueueByPatientCodeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getQueueByPatientCodeFailure(err));
  }
}

export function* getAllSTT(api, action) {
  const response = yield call(api.getAllSTT, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllSTTSuccess(response.data.result));
    } else {
      yield put(actions.getAllSTTFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllSTTFailure(err));
  }
}

export function* registerSTT(api, action) {
  const response = yield call(api.registerSTT, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerSTTSuccess(response.data.result));
    } else {
      yield put(actions.registerSTTFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerSTTFailure(err));
  }
}

export function* exportSTT(api, action) {
  const response = yield call(api.exportSTT, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportSTTSuccess(response.data.result));
    } else {
      yield put(actions.exportSTTFailure(response.error));
    }
  } catch (err) {
    yield put(actions.exportSTTFailure(err));
  }
}

export function* QueueSaga() {
  yield all([
    yield takeLatest(
      actions.getAllQueuePatientRoom.type,
      getAllQueuePatientRoom,
      queueRequest,
    ),
    yield takeLatest(
      actions.exportQueuePatientRoom.type,
      exportQueuePatientRoom,
      queueRequest,
    ),
    yield takeLatest(
      actions.removeQueuePatientRoom.type,
      removeQueuePatientRoom,
      queueRequest,
    ),
    yield takeLatest(
      actions.getQueueByPatientCode.type,
      getQueueByPatientCode,
      queueRequest,
    ),
    yield takeLatest(actions.getAllSTT.type, getAllSTT, queueRequest),
    yield takeLatest(actions.registerSTT.type, registerSTT, queueRequest),
    yield takeLatest(actions.exportSTT.type, exportSTT, queueRequest),
  ]);
}
