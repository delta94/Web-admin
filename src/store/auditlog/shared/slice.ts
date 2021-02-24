/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_CONSTANT, RESPONSE_MESSAGE } from '../constants/auditlog.constant';
export interface AuditlogState {
  loading?: boolean;
  success?: any;
  error?: any;
  auditlogs?: any;
}

export const initialState: AuditlogState = {
  loading: false,
  success: null,
  error: null,
  auditlogs: {},
};

const auditlogFormSlice = createSlice({
  name: 'auditlog',
  initialState,
  reducers: {
     getAllAuditLog(state) {
      state.loading = true;
    },

    getAllAuditLogSuccess(state, action) {
      state.auditlogs = action.payload;
      state.loading = false;
    },

    getAllAuditLogFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.GET_AUDITLOG_FAIL,
        message: RESPONSE_MESSAGE.GET_AUDITLOG_FAIL,
      };
      state.loading = false;
    },

    filterAuditLog(state, action) {
      state.loading = true;
    },

    filterAuditLogSuccess(state, action) {
      state.auditlogs = action.payload;
      state.loading = false;
    },

    filterAuditLogFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.FILTER_AUDITLOG_FAIL,
        message: action.payload,
      };
      state.loading = false;
    },

    clearError(state) {
      state.error = {};
    },

    clearSuccess(state) {
      state.success = {};
    },

    resetAll(state) {
      state.loading = false;
      state.success = null;
      state.error = null;
      state.auditlogs = {};
    }
  }
});

export const { actions, reducer, name: sliceKey } = auditlogFormSlice;
