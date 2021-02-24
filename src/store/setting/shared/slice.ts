/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
  SettingManageType,
  SettingManageKey,
} from '../constants/setting.constant';
import { AppHelper } from 'utils/app.helper';
export interface SettingState {
  cacheSetting?: any;
  loading?: boolean;
  success?: any;
  error?: any;
  settingList: any;
  settingType: any;
}

export const initialState: SettingState = {
  cacheSetting: null,
  loading: false,
  success: null,
  error: null,
  settingList: {},
  settingType: {},
};

const settingFormSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {

    getAllManageType(state, action) {
      state.loading = true;
    },

    getAllManageTypeSuccess(state, action) {
      state.settingList = action.payload;
      state.loading = false;
    },

    getAllManageTypeFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getManageType(state, action) {
      state.loading = true;
    },

    getManageTypeSuccess(state, action) {
      state.settingType = action.payload;
      state.loading = false;
    },

    getManageTypeFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createManageType(state, action) {
      state.loading = true;
    },

    createManageTypeSuccess(state, action: any) {
      state.loading = false;
      state.success = new ReducerHelper().setCreateResponse(action.payload.manageType);
    },

    createManageTypeFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    deleteManageType(state, action) {
      state.loading = true;
    },

    deleteManageTypeSuccess(state, action: any) {
      state.loading = false;
      state.success = new ReducerHelper().setDeleteResponse(action.payload.manageType);
    },

    deleteManageTypeFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    updateManageType(state, action) {
      state.loading = true;
    },

    updateManageTypeSuccess(state, action: any) {
      state.loading = false;
      state.success = new ReducerHelper().setUpdateResponse(action.payload.manageType);
    },

    updateManageTypeFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    changeManageTypeActive(state, action) {
      state.loading = true;
    },

    changeManageTypeActiveSuccess(state, action) {
      state.loading = false;
      state.success = new ReducerHelper().setChangeStatusResponse(
        action.payload.manageType,
      );
    },

    changeManageTypeActiveFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    setTempManageType(state, action) {
      state.cacheSetting = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuccess(state, action) {
      state.success = action.payload;
    },

    clearSuccess(state) {
      state.success = {};
    },

    clearError(state) {
      state.success = {};
    },

    resetAll(state) {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.settingList = {};
      state.settingType = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = settingFormSlice;
class ReducerHelper {
  manageSettingType: any;
  constructor () {
    this.manageSettingType = {
      [SettingManageType.Title]: SettingManageKey.TITLE,
      [SettingManageType.Position]: SettingManageKey.POSITION,
      [SettingManageType.Group]: SettingManageKey.GROUP_SERVICE,
      [SettingManageType.Service]: SettingManageKey.SERVICE,
      [SettingManageType.DepartmentType]: SettingManageKey.DEPARTMENT_TYPE,
      [SettingManageType.Department]: SettingManageKey.DEPARTMENT,
      [SettingManageType.Faculty]: SettingManageKey.FACULTY,
    }
  }
  public setCreateResponse = (manageType: SettingManageType) => {
    let currentType = this.manageSettingType[manageType];
    let response: any = {
      id: AppHelper.generateUUID() + Date.now(),
      key: RESPONSE_CONSTANT[currentType]['CREATE_' + currentType + '_SUCCESS'],
      message: RESPONSE_MESSAGE[currentType]['CREATE_' + currentType + '_SUCCESS'],
    };
    return response;
  }
  public setUpdateResponse = (manageType: SettingManageType) => {
    let currentType = this.manageSettingType[manageType];
    let response: any = {
      id: AppHelper.generateUUID() + Date.now(),
      key: RESPONSE_CONSTANT[currentType]['UPDATE_' + currentType + '_SUCCESS'],
      message: RESPONSE_MESSAGE[currentType]['UPDATE_' + currentType + '_SUCCESS'],
    };
    return response;
  }
  public setUpdateErrorResponse = (manageType: SettingManageType) => {
    let currentType = this.manageSettingType[manageType];
    let response: any = {
      id: AppHelper.generateUUID() + Date.now(),
      key: RESPONSE_CONSTANT[currentType]['UPDATE_' + currentType + '_FAIL'],
      message: RESPONSE_MESSAGE[currentType]['UPDATE_' + currentType + '_FAIL'],
    };
    return response;
  }
  public setDeleteResponse = (manageType: SettingManageType) => {
    let currentType = this.manageSettingType[manageType];
    let response: any = {
      id: AppHelper.generateUUID() + Date.now(),
      key: RESPONSE_CONSTANT[currentType]['DELETE_' + currentType + '_SUCCESS'],
      message: RESPONSE_MESSAGE[currentType]['DELETE_' + currentType + '_SUCCESS'],
    };
    return response;
  }
  public setChangeStatusResponse = (manageType: SettingManageType) => {
    let currentType = this.manageSettingType[manageType];
    let response: any = {
      id: AppHelper.generateUUID() + Date.now(),
      key: RESPONSE_CONSTANT[currentType]['CHANGE_STATUS_' + currentType + '_SUCCESS'],
      message: RESPONSE_MESSAGE[currentType]['CHANGE_STATUS_' + currentType + '_SUCCESS'],
    };
    return response;
  }
}
