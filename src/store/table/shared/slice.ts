import { createSlice } from 'store/core/@reduxjs/toolkit';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/table.constant';
import { AppHelper } from 'utils/app.helper';

export interface TableState {
  tableInfo?: any;
  loading?: boolean;
  success?: any;
  error?: any;
  tables?: any;
  listTableCallAble: any;
}

export const initialState: TableState = {
  tableInfo: null,
  loading: false,
  success: null,
  error: null,
  tables: {},
  listTableCallAble: {},
};

const tableFormSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    getTableAll(state, action) {
      state.loading = true;
    },

    getTableAllSuccess(state, action) {
      state.tables = action.payload;
      state.loading = false;
    },

    getTableAllFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getTableWithId(state, action) {
      state.loading = true;
    },

    getTableWithIdSuccess(state, action) {
      state.tableInfo = action.payload;
      state.loading = false;
    },

    getTableWithIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createTable(state, action) {
      state.loading = true;
    },

    createTableSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_TABLE_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_TABLE_SUCCESS,
      };
    },

    createTableFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_TABLE_FAIL,
        message: RESPONSE_MESSAGE.CREATE_TABLE_FAIL,
      };
    },

    updateTable(state, action) {
      state.loading = true;
    },

    updateTableSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_TABLE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_TABLE_SUCCESS,
      };
    },

    updateTableFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_TABLE_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_TABLE_FAIL,
      };
    },

    deleteTable(state, action) {
      state.loading = true;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_TABLE_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_TABLE_SUCCESS,
      };
    },

    deleteTableSuccess(state, action) {
      state.loading = false;
    },

    deleteTableFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_TABLE_FAIL,
        message: RESPONSE_MESSAGE.DELETE_TABLE_FAIL,
      };
    },

    callTableAble(state) {
      state.loading = true;
    },

    callTableAbleSuccess(state, action) {
      state.listTableCallAble = action.payload;
      state.loading = false;
    },

    callTableAbleFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    clearTableInfo(state) {
      state.tableInfo = null;
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
      state.tables = {};
      state.tableInfo = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = tableFormSlice;
