import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/departmentService.constant';

export interface DepartmentServiceState {
  loading?: boolean;
  deptServices?: any;
  deptService?: any;
  error?: any;
  success?: any;
  importFiles: any;
}

export const initialState: DepartmentServiceState = {
  loading: false,
  deptServices: {},
  deptService: {},
  error: {},
  success: {},
  importFiles: {},
};

const DeptServiceSlice = createSlice({
  name: 'departmentService',
  initialState,
  reducers: {
    getAllDeptService(state, action) {
      state.loading = true;
    },

    getAllDeptServiceSuccess(state, action) {
      state.deptServices = action.payload;
      state.loading = false;
    },

    getAllDeptServiceFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getDeptServiceWithId(state, action) {
      state.loading = true;
    },

    getDeptServiceWithIdSuccess(state, action) {
      state.deptService = action.payload;
      state.loading = false;
    },

    getDeptServiceWithIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    changeDeptServiceActive(state, action) {
      state.loading = true;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_STATUS_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.CHANGE_STATUS_DEPT_SERVICE_SUCCESS,
      };
    },

    changeDeptServiceActiveSuccess(state, action) {
      state.loading = false;
    },

    changeDeptServiceActiveFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createDeptService(state, action) {
      state.loading = true;
    },

    createDeptServiceSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_DEPT_SERVICE_SUCCESS,
      };
    },

    createDeptServiceFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    updateDeptService(state, action) {
      state.loading = true;
    },

    updateDeptServiceSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_DEPT_SERVICE_SUCCESS,
      };
    },

    updateDeptServiceFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    deleteDeptService(state, action) {
      state.loading = true;
    },

    deleteDeptServiceSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_DEPT_SERVICE_SUCCESS,
      };
    },

    deleteDeptServiceFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    exportDeptService(state, action) {
      state.loading = true;
    },

    exportDeptServiceSuccess(state, action) {
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.EXPORT_DEPT_SERVICE_SUCCESS,
        data: action.payload,
      };
      state.loading = false;
    },

    exportDeptServiceFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_DEPT_SERVICE_SUCCESS,
        message: action.payload,
      };
      state.loading = false;
    },

    importDeptService(state, action) {
      state.loading = true;
    },

    importDeptServiceSuccess(state, action) {
      state.importFiles = action.payload;
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.IMPORT_DEPT_SERVICE_SUCCESS,
        message: RESPONSE_MESSAGE.IMPORT_DEPT_SERVICE_SUCCESS,
      };
    },

    importDeptServiceFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.IMPORT_DEPT_SERVICE_FAIL,
        message: action.payload,
      };
      state.loading = false;
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
      state.error = {};
    },

    clearImportFile(state) {
      state.importFiles = {};
    },

    clearDeptService(state) {
      state.deptService = {};
    },

    resetAll(state) {
      state.loading = false;
      state.deptServices = {};
      state.deptService = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = DeptServiceSlice;
