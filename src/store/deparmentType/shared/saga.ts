import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { DepartmentTypeHttp } from '../services/departmentType.http';
const departmentTypeHttp = new DepartmentTypeHttp();

export function* getAllDepartmentType(api, action) {
  const response = yield call(api.getAllDepartmentType, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllDepartmentTypeSuccess(response.data.result.data));
    } else {
      yield put(actions.getAllDepartmentTypeFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllDepartmentTypeFailure(err));
  }
}

export function* DepartmentTypeSaga() {
  yield all([
    yield takeLatest(
      actions.getAllDepartmentType.type,
      getAllDepartmentType,
      departmentTypeHttp,
    ),
  ]);
}
