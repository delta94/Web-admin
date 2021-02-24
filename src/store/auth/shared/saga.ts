import { call, put, takeLatest, all } from 'redux-saga/effects';
import { PrivateAuthRoute } from '../services/auth.route';
import { AppRouting } from 'app/routes';

import { actions } from './slice';
import { AuthHttp } from '../services/auth.http';
const authRequest = new AuthHttp();

export function* login(api, action) {
  const response = yield call(api.login, action.payload);
  try {
    if (response.ok) {
      const userInfo = SagaHelper.addUserRoute(response.data.result);
      yield put(actions.loginSuccess(userInfo));
    } else {
      yield put(actions.loginFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.loginFail(response.error));
  }
}

export function* getUserByIdToken(api, action) {
  const response = yield call(api.getUserByIdToken, action.payload);
  try {
    if (response.ok) {
      const userInfo = SagaHelper.addUserRoute(response.data.result);
      yield put(actions.getUserByIdTokenSucess(userInfo));
    } else {
      yield put(actions.getUserByIdTokenFail(response.data));
    }
  } catch (error) {
    yield put(actions.getUserByIdTokenFail(response.error));
  }
}
export function* getUserById(api, action) {
  const response = yield call(api.getUserById, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getUserByIdSuccess(response.data.result));
    } else {
      yield put(actions.getUserByIdFail(response.data));
    }
  } catch (error) {
    yield put(actions.getUserByIdFail(error));
  }
}

export function* getListUser(api, action) {
  const response = yield call(api.getListUser, action.payload);
  try {
    if (response.ok) {
      yield put(actions.getListUserSuccess(response.data));
    } else {
      yield put(actions.getListUserFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.getListUserFail(response.error));
  }
}

export function* addRole(api, action) {
  const response = yield call(api.addRole, action.payload);
  try {
    if (response.ok) {
      yield put(actions.addRoleSuccess(response.data.result));
    } else {
      yield put(actions.addRoleFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.addRoleFail(response.error));
  }
}

export function* deleteRole(api, action) {
  const response = yield call(api.deleteRole, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deleteRoleSuccess(response.data.result));
    } else {
      yield put(actions.deleteRoleFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.deleteRoleFail(response.error));
  }
}

export function* getListRole(api) {
  const response = yield call(api.getListRole);
  try {
    if (response.ok) {
      yield put(actions.getListRoleSuccess(response.data.result));
    } else {
      yield put(actions.getListRoleFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.getListRoleFail(response.error));
  }
}

export function* updatePermissionInRole(api, action) {
  const response = yield call(api.updatePermissionInRole, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updatePermissionInRoleSuccess(response.data.result));
    } else {
      yield put(actions.updatePermissionInRoleFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.updatePermissionInRoleFail(response.error));
  }
}

export function* updateUsersInRole(api, action) {
  const response = yield call(api.updateUsersInRole, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updateUsersInRoleSuccess(response.data.result));
    } else {
      yield put(actions.updateUsersInRoleFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.updateUsersInRoleFail(response.error));
  }
}

export function* getListPermission(api) {
  const response = yield call(api.getListPermission);
  try {
    if (response.ok) {
      yield put(actions.getListPermissionSuccess(response.data.result));
    } else {
      yield put(actions.getListPermissionFail(response.data.message));
    }
  } catch (error) {
    yield put(actions.getListPermissionFail(response.error));
  }
}

export function* deletePersonnel(api, action) {
  const response = yield call(api.deletePersonnel, action.payload);
  try {
    if (response.ok) {
      yield put(actions.deletePersonnelSuccess(response.data));
    } else yield put(actions.deletePersonnelFail(response.error));
  } catch (error) {
    yield put(actions.deletePersonnelFail(error));
  }
}

export function* changeActivePersonnel(api, action) {
  const response = yield call(api.changeActivePersonnel, action.payload);
  try {
    if (response.ok) {
      yield put(actions.changeActivePersonnelSuccess(response.data));
    } else {
      yield put(actions.changeActivePersonnelFail(response.data));
    }
  } catch (error) {
    yield put(actions.changeActivePersonnelFail(error));
  }
}

export function* createPersonnel(api, action) {
  const response = yield call(api.createPersonnel, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createPersonnelSuccess(response.data));
    } else {
      yield put(actions.createPersonnelFail(response.error));
    }
  } catch (error) {
    yield put(actions.createPersonnelFail(error));
  }
}

export function* updatePersonnel(api, action) {
  const response = yield call(api.updatePersonnel, action.payload);
  try {
    if (response.ok) {
      yield put(actions.updatePersonnelSuccess(response.data));
    } else {
      yield put(actions.updatePersonnelFail(response.error));
    }
  } catch (error) {
    yield put(actions.updatePersonnelFail(error));
  }
}

export function* checkPassWord(api, action) {
  const response = yield call(api.checkPassWord, action.payload);
  try {
    if (response.ok) {
      yield put(actions.checkPassWordSuccess(response.data));
    } else {
      yield put(actions.checkPassWordFail(response.error));
    }
  } catch (error) {
    yield put(actions.checkPassWordFail(error));
  }
}

export function* updateProfileUser(api, action) {
  const response = yield call(api.updateProfileUser, action.payload);
  try {
    if (response.ok) {
      const userInfo = SagaHelper.addUserRoute(response.data.result);
      yield put(actions.updateProfileUserSuccess(userInfo));
    } else {
      yield put(actions.updateProfileUserFail(response.error));
    }
  } catch (error) {
    yield put(actions.updateProfileUserFail(error));
  }
}

export function* AuthSaga() {
  yield all([
    yield takeLatest(actions.getUserById.type, getUserById, authRequest),
    yield takeLatest(
      actions.getUserByIdToken.type,
      getUserByIdToken,
      authRequest,
    ),
    yield takeLatest(actions.login.type, login, authRequest),
    yield takeLatest(actions.getListUser.type, getListUser, authRequest),
    yield takeLatest(actions.getListRole.type, getListRole, authRequest),
    yield takeLatest(actions.deleteRole.type, deleteRole, authRequest),
    yield takeLatest(actions.addRole.type, addRole, authRequest),
    yield takeLatest(
      actions.updatePermissionInRole.type,
      updatePermissionInRole,
      authRequest,
    ),
    yield takeLatest(
      actions.updateUsersInRole.type,
      updateUsersInRole,
      authRequest,
    ),
    yield takeLatest(
      actions.getListPermission.type,
      getListPermission,
      authRequest,
    ),
    yield takeLatest(
      actions.deletePersonnel.type,
      deletePersonnel,
      authRequest,
    ),
    yield takeLatest(
      actions.changeActivePersonnel.type,
      changeActivePersonnel,
      authRequest,
    ),
    yield takeLatest(
      actions.createPersonnel.type,
      createPersonnel,
      authRequest,
    ),
    yield takeLatest(
      actions.updatePersonnel.type,
      updatePersonnel,
      authRequest,
    ),
    yield takeLatest(actions.checkPassWord.type, checkPassWord, authRequest),
    yield takeLatest(
      actions.updateProfileUser.type,
      updateProfileUser,
      authRequest,
    ),
  ]);
}

class SagaHelper {
  static addUserRoute(userData: any) {
    const user = userData;
    const authService = new PrivateAuthRoute(user);
    const userInfo: any = {
      ...user,
      userRoutes: authService.seperateRoute(AppRouting),
    };
    return userInfo;
  }
}
