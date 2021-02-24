import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { DepartmentServiceHttp } from '../services/departmentService.http';
const deptServiceHttp = new DepartmentServiceHttp();

export function* getAllDeptService(api, action) {
  const response = yield call(api.getAllDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getAllDeptServiceSuccess(response.data));
    } else {
      yield put(actions.getAllDeptServiceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getAllDeptServiceFailure(err));
  }
}

export function* getDeptServiceWithId(api, action) {
  const response = yield call(api.getDeptServiceWithId, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getDeptServiceWithIdSuccess(response.data.result));
    } else {
      yield put(actions.getDeptServiceWithIdFailure(response.error));
    }
  } catch (err) {
    yield put(actions.getDeptServiceWithIdFailure(err));
  }
}

export function* changeDeptServiceActive(api, action) {
  const response = yield call(api.changeDeptServiceActive, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changeDeptServiceActiveSuccess(response.data));
    } else {
      yield put(actions.changeDeptServiceActiveFailure(response.error));
    }
  } catch (err) {
    yield put(actions.changeDeptServiceActiveFailure(err));
  }
}

export function* createDeptService(api, action) {
  const response = yield call(api.createDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createDeptServiceSuccess(response.data));
    } else {
      yield put(actions.createDeptServiceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createDeptServiceFailure(err));
  }
}

export function* updateDeptService(api, action) {
  const response = yield call(api.updateDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateDeptServiceSuccess(response.data));
    } else {
      yield put(actions.updateDeptServiceFailure(response.error));
    }
  } catch (err) {
    yield put(actions.updateDeptServiceFailure(err));
  }
}

export function* deleteDeptService(api, action) {
  const response = yield call(api.deleteDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteDeptServiceSuccess(response.data.result));
    } else {
      yield put(actions.deleteDeptServiceFailure(response.data));
    }
  } catch (err) {
    yield put(actions.deleteDeptServiceFailure(err));
  }
}

export function* exportDeptService(api, action) {
  const response = yield call(api.exportDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.exportDeptServiceSuccess(response.data.result));
    } else {
      const { data, problem } = response;
      if (data) {
        yield put(actions.exportDeptServiceFailure(data.error));
      } else {
        yield put(actions.exportDeptServiceFailure(problem));
      }
    }
  } catch (err) {
    yield put(actions.exportDeptServiceFailure(err));
  }
}

export function* importDeptService(api, action) {
  const response = yield call(api.importDeptService, action.payload);
  try {
    if (response.ok) {
      yield put(actions.importDeptServiceSuccess(response.data.result));
    } else {
      yield put(actions.importDeptServiceFailure(response.data.message));
    }
  } catch (err) {
    yield put(actions.importDeptServiceFailure(err));
  }
}

export function* DepartmentServiceSaga() {
  yield all([
    yield takeLatest(
      actions.getAllDeptService.type,
      getAllDeptService,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.getDeptServiceWithId.type,
      getDeptServiceWithId,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.createDeptService.type,
      createDeptService,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.updateDeptService.type,
      updateDeptService,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.changeDeptServiceActive.type,
      changeDeptServiceActive,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.deleteDeptService.type,
      deleteDeptService,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.exportDeptService.type,
      exportDeptService,
      deptServiceHttp,
    ),
    yield takeLatest(
      actions.importDeptService.type,
      importDeptService,
      deptServiceHttp,
    ),
  ]);
}
