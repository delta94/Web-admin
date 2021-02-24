/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/auth.constant';
import { AppHelper } from 'utils/app.helper';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: any;
  success: any;
  user: any;
  users: any;
  roles: any;
  token: string;
  permissions: any;
  isEditingRole: any;
  userFind: any;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  success: {},
  user: {},
  token: '',
  users: {},
  roles: {},
  permissions: {},
  isEditingRole: {},
  userFind: {},
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.loading = true;
    },

    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.LOGIN_SUCCESS,
        message: RESPONSE_MESSAGE.LOGIN_SUCCESS,
      };
      state.token = action.payload.token;
    },

    loginFail(state, action) {
      state.loading = false;
      state.user = {};
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.LOGIN_FAIL,
        message: action.payload,
      };
      state.token = '';
      state.isAuthenticated = false;
    },

    getUserByIdToken(state, action) {
      state.loading = true;
    },
    getUserByIdTokenSucess(state, action) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.GET_USER_BY_ID_SUCCESS,
        message: RESPONSE_MESSAGE.GET_USER_BY_ID_SUCCESS,
      };
      state.token = action.payload.token;
    },
    getUserByIdTokenFail(state, action) {
      state.loading = false;
      state.user = {};
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.GET_USER_BY_ID_FAIL,
        message: action.payload,
      };
      state.token = '';
      state.isAuthenticated = false;
    },

    getUserById(state, action) {
      state.loading = true;
    },

    getUserByIdSuccess(state, action) {
      state.loading = false;
      state.userFind = action.payload;
    },

    getUserByIdFail(state, action) {
      state.loading = false;
      state.userFind = {};
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.GET_USER_BY_ID_FAIL,
        message: action.payload,
      };
    },

    getListUser(state, action) {
      state.loading = true;
    },

    getListUserSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },

    getListUserFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getListRole(state) {
      state.loading = true;
    },

    getListRoleSuccess(state, action) {
      state.loading = false;
      state.roles = action.payload;
    },

    getListRoleFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addRole(state, action) {
      state.loading = true;
    },

    addRoleSuccess(state, action) {
      state.loading = false;
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.ADD_ROLE_SUCCESS,
        message: RESPONSE_MESSAGE.ADD_ROLE_SUCCESS,
      };
    },

    addRoleFail(state, action) {
      state.loading = false;
    },

    deleteRole(state, action) {
      state.loading = true;
    },

    deleteRoleSuccess(state, action) {
      state.loading = false;
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_ROLE_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_ROLE_SUCCESS,
      };
    },

    deleteRoleFail(state, action) {
      state.loading = false;
    },

    updatePermissionInRole(state, action) {
      state.loading = true;
    },

    updatePermissionInRoleSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_ROLE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_ROLE_SUCCESS,
      };
    },

    updatePermissionInRoleFail(state, action) {
      state.loading = false;
    },

    updateUsersInRole(state, action) {
      state.loading = true;
    },

    updateUsersInRoleSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_ROLE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_ROLE_SUCCESS,
      };
    },

    updateUsersInRoleFail(state, action) {
      state.loading = false;
    },

    getListPermission(state) {
      state.loading = true;
    },

    getListPermissionSuccess(state, action) {
      state.loading = false;
      state.permissions = action.payload;
    },

    getListPermissionFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    logout(state) {
      state.loading = false;
      state.user = {};
      state.token = '';
      state.isAuthenticated = false;
    },

    setEditRole(state, action) {
      state.isEditingRole = action.payload;
    },

    deletePersonnel(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    deletePersonnelSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_PERSONNEL_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_MESSAGE_SUCCESS,
      };
    },

    deletePersonnelFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },

    changeActivePersonnel(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    changeActivePersonnelSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_ACTIVE_SUCCESS,
        message: RESPONSE_MESSAGE.CHANGE_ACTIVE_SUCCESS,
      };
    },

    changeActivePersonnelFail(state, action: any) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_ACTIVE_FAIL,
        message: RESPONSE_MESSAGE.CHANGE_ACTIVE_MESSAGE_FAIL,
      };
    },

    createPersonnel(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    createPersonnelSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_PERSONNEL_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_PERSONNEL_SUCCESS,
      };
    },

    createPersonnelFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },

    updatePersonnel(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    updatePersonnelSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PERSONNEL_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_PERSONNEL_SUCCESS,
      };
      state.user = action.payload;
    },

    updatePersonnelFail(state, action: any) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PERSONNEL_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_PERSONNEL_FAIL,
      };
    },

    updateProfileUser(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    updateProfileUserSuccess(state, action: any) {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PROFILE_USER_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_PROFILE_USER_SUCCESS,
      };
      state.token = action.payload.token;
    },

    updateProfileUserFail(state, action: any) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PROFILE_USER_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_PROFILE_USER_FAIL,
      };
    },

    checkPassWord(state, action: any) {
      state.loading = true;
      state.error = null;
    },

    checkPassWordSuccess(state, action: any) {
      state.loading = false;
    },

    checkPassWordFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },

    clearEditRole(state) {
      state.isEditingRole = {};
    },

    clearSuccess(state) {
      state.success = {};
    },

    clearError(state) {
      state.error = {};
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuccess(state, action) {
      state.success = action.payload;
    },

    clearData(state) {
      state.userFind = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = AuthSlice;
