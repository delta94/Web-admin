import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { DepartmentHttp } from '../services/department.http';
const departmentHttp = new DepartmentHttp();

export function* getAllDepartment(api, action) {
  const response = yield call(api.getAllDepartment, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllDepartmentSuccess(response.data.result.data));
    } else {
      yield put(actions.getAllDepartmentFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllDepartmentFailure(err));
  }
}

export function* DepartmentSaga() {
  yield all([
    yield takeLatest(
      actions.getAllDepartment.type,
      getAllDepartment,
      departmentHttp,
    ),
  ]);
}
