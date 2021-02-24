import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { PharmacyHttp } from '../services/pharmarcy.http';
const pharmacyHttp = new PharmacyHttp();

export function* getAllPharmacy(api) {
  const response = yield call(api.getAllPharmacy);
  try {
    if (response.ok) {
      yield put(actions.getAllPharmacySuccess(response.data.result));
    } else {
      yield put(actions.getAllPharmacyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllPharmacyFailure(err));
  }
}

export function* getPharmacyById(api, action) {
  const response = yield call(api.getPharmacyById, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPharmacyByIdSuccess(response.data.result));
    } else {
      yield put(actions.getPharmacyByIdFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getPharmacyByIdFailure(err));
  }
}

export function* getPharmacy(api, action) {
  const response = yield call(api.getPharmacy, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getPharmacySuccess(response.data.result));
    } else {
      yield put(actions.getPharmacyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getPharmacyFailure(err));
  }
}

export function* changePharmacyActive(api, action) {
  const response = yield call(api.changePharmacyActive, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changePharmacyActiveSuccess(action.payload));
    } else {
      yield put(actions.changePharmacyActiveFailure(response.error));
    }
  } catch (err) {
    yield put(actions.changePharmacyActiveFailure(err));
  }
}

export function* createPharmacy(api, action) {
  const response = yield call(api.createPharmacy, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createPharmacySuccess(action.payload));
    } else {
      yield put(actions.createPharmacyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createPharmacyFailure(err));
  }
}

export function* deletePharmacy(api, action) {
  const response = yield call(api.deletePharmacy, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deletePharmacySuccess(action.payload));
    } else {
      yield put(actions.deletePharmacyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.deletePharmacyFailure(err));
  }
}

export function* updatePharmacy(api, action) {
  const response = yield call(api.updatePharmacy, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updatePharmacySuccess(response.data));
    } else {
      yield put(actions.updatePharmacyFailure(response.data));
    }
  } catch (err) {
    yield put(actions.updatePharmacyFailure(err));
  }
}

export function* PharmacySaga() {
  yield all([
    yield takeLatest(actions.getAllPharmacy.type, getAllPharmacy, pharmacyHttp),
    yield takeLatest(
      actions.getPharmacyById.type,
      getPharmacyById,
      pharmacyHttp,
    ),
    yield takeLatest(actions.createPharmacy.type, createPharmacy, pharmacyHttp),
    yield takeLatest(actions.updatePharmacy.type, updatePharmacy, pharmacyHttp),
    yield takeLatest(actions.deletePharmacy.type, deletePharmacy, pharmacyHttp),
    yield takeLatest(actions.getPharmacy.type, getPharmacy, pharmacyHttp),
    yield takeLatest(
      actions.changePharmacyActive.type,
      changePharmacyActive,
      pharmacyHttp,
    ),
  ]);
}
