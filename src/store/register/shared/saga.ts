import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { RegisterHttp } from '../services/register.http';
const registerRequest = new RegisterHttp();

export function* registerQueuePatient(api, action) {
  const response = yield call(api.registerQueuePatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueuePatientSuccess(response.data.result));
    } else {
      yield put(actions.registerQueuePatientFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueuePatientFailure(err));
  }
}

export function* registerQueueCall(api, action) {
  const response = yield call(api.registerQueueCall, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueCallSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueCallFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueCallFailure(err));
  }
}

export function* registerQueueCLSCall(api, action) {
  const response = yield call(api.registerQueueCLSCall, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueCLSCallSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueCLSCallFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueCLSCallFailure(err));
  }
}

export function* registerQueueTableCall(api, action) {
  const response = yield call(api.registerQueueTableCall, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueTableCallSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueTableCallFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.registerQueueTableCallFailure(err));
  }
}

export function* registerQueueTableType(api, action) {
  const response = yield call(api.registerQueueTableType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueTableTypeSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueTableTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTableTypeFailure(err));
  }
}

export function* registerQueueTableNumber(api, action) {
  const response = yield call(api.registerQueueTableNumber, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueTableNumberSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueTableNumberFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTableNumberFailure(err));
  }
}

export function* registerQueueTableAll(api, action) {
  const response = yield call(api.registerQueueTableAll, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueTableAllSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueTableAllFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTableAllFailure(err));
  }
}

export function* registerQueueTableCheckin(api, action) {
  const response = yield call(api.registerQueueTableCheckin, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueTableCheckinSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueTableCheckinFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTableCheckinFailure(err));
  }
}

export function* registerQueueTablePaidCall(api, action) {
  const response = yield call(api.registerQueueTablePaidCall, action.payload);
  try {
    if (response.ok) {
      yield put(
        actions.registerQueueTablePaidCallSuccess(response.data.result),
      );
    } else {
      yield put(actions.registerQueueTablePaidCallFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTablePaidCallFailure(err));
  }
}

export function* registerQueueTablePaidNumber(api, action) {
  const response = yield call(api.registerQueueTablePaidNumber, action.payload);
  try {
    if (response.ok) {
      yield put(
        actions.registerQueueTablePaidNumberSuccess(response.data.result),
      );
    } else {
      yield put(actions.registerQueueTablePaidNumberFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueTablePaidNumberFailure(err));
  }
}

export function* registerQueueRoom(api, action) {
  const response = yield call(api.registerQueueRoom, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueRoomSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueRoomFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueRoomFailure(err));
  }
}

export function* registerQueueCLSLast(api, action) {
  const response = yield call(api.registerQueueCLSLast, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueCLSLastSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueCLSLastFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueCLSLastFailure(err));
  }
}

export function* registerQueueEyeTableAll(api, action) {
  const response = yield call(api.registerQueueEyeTableAll, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueEyeTableAllSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueEyeTableAllFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueEyeTableAllFailure(err));
  }
}

export function* registerQueueEyeTableCall(api, action) {
  const response = yield call(api.registerQueueEyeTableCall, action.payload);
  try {
    if (response.ok) {
      yield put(actions.registerQueueEyeTableCallSuccess(response.data.result));
    } else {
      yield put(actions.registerQueueEyeTableCallFailure(response.error));
    }
  } catch (err) {
    yield put(actions.registerQueueEyeTableCallFailure(err));
  }
}

export function* RegisterSaga() {
  yield all([
    yield takeLatest(
      actions.registerQueuePatient.type,
      registerQueuePatient,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueCall.type,
      registerQueueCall,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTableCall.type,
      registerQueueTableCall,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTableType.type,
      registerQueueTableType,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTableNumber.type,
      registerQueueTableNumber,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTableAll.type,
      registerQueueTableAll,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTableCheckin.type,
      registerQueueTableCheckin,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTablePaidCall.type,
      registerQueueTablePaidCall,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueTablePaidNumber.type,
      registerQueueTablePaidNumber,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueRoom.type,
      registerQueueRoom,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueEyeTableAll.type,
      registerQueueEyeTableAll,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueEyeTableCall.type,
      registerQueueEyeTableCall,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueCLSCall.type,
      registerQueueCLSCall,
      registerRequest,
    ),
    yield takeLatest(
      actions.registerQueueCLSLast.type,
      registerQueueCLSLast,
      registerRequest,
    ),
  ]);
}
