import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { MedicineHttp } from '../services/medicine.http';
const medicineHttp = new MedicineHttp();

export function* getAllMedicine(api) {
  const response = yield call(api.getAllMedicine);
  try {
    if (response.ok) {
      yield put(actions.getAllMedicineSuccess(response.data.result));
    } else {
      yield put(actions.getAllMedicineFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllMedicineFailure(err));
  }
}

export function* getMedicineById(api, action) {
  const response = yield call(api.getMedicineById, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getMedicineByIdSuccess(response.data.result));
    } else {
      yield put(actions.getMedicineByIdFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getMedicineByIdFailure(err));
  }
}

export function* getMedicine(api, action) {
  const response = yield call(api.getMedicine, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getMedicineSuccess(response.data.result));
    } else {
      yield put(actions.getMedicineFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getMedicineFailure(err));
  }
}

export function* changeMedicineActive(api, action) {
  const response = yield call(api.changeMedicineActive, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changeMedicineActiveSuccess(action.payload));
    } else {
      yield put(actions.changeMedicineActiveFailure(response.error));
    }
  } catch (err) {
    yield put(actions.changeMedicineActiveFailure(err));
  }
}

export function* createMedicine(api, action) {
  const response = yield call(api.createMedicine, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createMedicineSuccess(action.payload));
    } else {
      yield put(actions.createMedicineFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createMedicineFailure(err));
  }
}

export function* deleteMedicine(api, action) {
  const response = yield call(api.deleteMedicine, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteMedicineSuccess(action.payload));
    } else {
      yield put(actions.deleteMedicineFailure(response.error));
    }
  } catch (err) {
    yield put(actions.deleteMedicineFailure(err));
  }
}

export function* updateMedicine(api, action) {
  const response = yield call(api.updateMedicine, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateMedicineSuccess(action.payload));
    } else {
      yield put(
        actions.updateMedicineFailure({
          ...response,
          manageType: action.payload.manageType,
        }),
      );
    }
  } catch (err) {
    yield put(actions.updateMedicineFailure(err));
  }
}

export function* MedicineSaga() {
  yield all([
    yield takeLatest(actions.getAllMedicine.type, getAllMedicine, medicineHttp),
    yield takeLatest(
      actions.getMedicineById.type,
      getMedicineById,
      medicineHttp,
    ),
    yield takeLatest(actions.createMedicine.type, createMedicine, medicineHttp),
    yield takeLatest(actions.updateMedicine.type, updateMedicine, medicineHttp),
    yield takeLatest(actions.deleteMedicine.type, deleteMedicine, medicineHttp),
    yield takeLatest(actions.getMedicine.type, getMedicine, medicineHttp),
    yield takeLatest(
      actions.changeMedicineActive.type,
      changeMedicineActive,
      medicineHttp,
    ),
  ]);
}
