import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { PatientHttp } from '../services/patient.http';
const httpRequest = new PatientHttp();

export function* getPatientWithCode(api, action) {
  const response = yield call(api.getPatientWithCode, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPatientWithCodeSuccess(response.data.result));
    } else {
      yield put(actions.getPatientWithCodeFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getPatientWithCodeFailure(err));
  }
}

export function* getPatientWithType(api, action) {
  const response = yield call(api.getPatientWithType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPatientWithTypeSuccess(response.data.result));
    } else {
      yield put(actions.getPatientWithTypeFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getPatientWithTypeFailure(err));
  }
}

export function* getPatientWithHealthId(api, action) {
  const response = yield call(api.getPatientWithHealthId, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPatientWithHealthIdSuccess(response.data.result));
    } else {
      yield put(actions.getPatientWithHealthIdFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getPatientWithHealthIdFailure(err));
  }
}

export function* getListPatient(api, action) {
  const response = yield call(api.getListPatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getListPatientSuccess(response.data));
    } else {
      yield put(actions.getListPatientFailure(response.data));
    }
  } catch (err) {
    yield put(actions.getListPatientFailure(err));
  }
}

export function* getPatientBalance(api, action) {
  const response = yield call(api.getPatientBalance, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPatientBalanceSuccess(response.data));
    } else {
      yield put(actions.getPatientBalanceFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.getPatientBalanceFailure(err));
  }
}

export function* deletePatient(api, action) {
  const response = yield call(api.deletePatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deletePatientSuccess(response.data.result));
    } else {
      yield put(actions.deletePatientFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.deletePatientFailure(err));
  }
}

export function* changePatientStatus(api, action) {
  const response: any = yield call(api.changePatientStatus, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changePatientStatusSuccess(response.data.result));
    } else {
      yield put(actions.changePatientStatusFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.changePatientStatusFailure(err));
  }
}

export function* updatePatient(api, action) {
  const response: any = yield call(api.updatePatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updatePatientSuccess(response.data.result));
    } else {
      yield put(actions.updatePatientFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.updatePatientFailure(err));
  }
}

export function* findPatientWithId(api, action) {
  const response = yield call(api.findPatientWithId, action.payload);
  try {
    if (response.ok) {
      yield put(actions.findPatientWithIdSuccess(response.data.result));
    } else {
      yield put(actions.findPatientWithIdFailure(response.data));
    }
  } catch (err) {
    yield put(actions.findPatientWithIdFailure(err));
  }
}

export function* createPatient(api, action) {
  const response = yield call(api.createPatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createPatientSuccess(response.data.result));
    } else {
      yield put(actions.createPatientFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.createPatientFailure(err));
  }
}

export function* exportListPatient(api, action) {
  const response = yield call(api.exportListPatient, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportListPatientSuccess(response.data.result));
    } else {
      yield put(actions.exportListPatientFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.exportListPatientFailure(err));
  }
}

export function* exportPatientBalance(api, action) {
  const response = yield call(api.exportPatientBalance, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportPatientBalanceSuccess(response.data.result));
    } else {
      yield put(actions.exportPatientBalanceFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.exportPatientBalanceFailure(err));
  }
}

export function* PatientSaga() {
  yield all([
    yield takeLatest(
      actions.getPatientWithCode.type,
      getPatientWithCode,
      httpRequest,
    ),
    yield takeLatest(
      actions.getPatientWithType.type,
      getPatientWithType,
      httpRequest,
    ),
    yield takeLatest(
      actions.getPatientWithHealthId.type,
      getPatientWithHealthId,
      httpRequest,
    ),
    yield takeLatest(actions.getListPatient.type, getListPatient, httpRequest),
    yield takeLatest(
      actions.getPatientBalance.type,
      getPatientBalance,
      httpRequest,
    ),
    yield takeLatest(actions.deletePatient.type, deletePatient, httpRequest),
    yield takeLatest(actions.updatePatient.type, updatePatient, httpRequest),
    yield takeLatest(
      actions.changePatientStatus.type,
      changePatientStatus,
      httpRequest,
    ),
    yield takeLatest(
      actions.findPatientWithId.type,
      findPatientWithId,
      httpRequest,
    ),
    yield takeLatest(actions.createPatient.type, createPatient, httpRequest),
    yield takeLatest(
      actions.exportListPatient.type,
      exportListPatient,
      httpRequest,
    ),
    yield takeLatest(
      actions.exportPatientBalance.type,
      exportPatientBalance,
      httpRequest,
    ),
  ]);
}
