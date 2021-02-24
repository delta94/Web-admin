/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/reception.constant';
export interface ReceptionState {
  loading: boolean;
  error: any;
  success: any;
  receptions: any;
  reception: any;
  reasons: any;
}

export const initialState: ReceptionState = {
  loading: false,
  error: null,
  success: {},
  receptions: {},
  reception: {},
  reasons: {},
};

const ReceptionFormSlice = createSlice({
  name: 'reception',
  initialState,
  reducers: {
    getReceptionByPatientCode(state, action) {
      state.loading = true;
    },

    getReceptionByPatientCodeSuccess(state, action) {
      state.reception = action.payload;
      state.loading = false;
    },

    getReceptionByPatientCodeFailure(state, action) {
      state.loading = false;
    },

    getAllReception(state, action) {
      state.loading = true;
    },

    getAllReceptionSuccess(state, action) {
      state.receptions = action.payload;
      state.loading = false;
    },

    getAllReceptionFailure(state, action) {
      state.loading = false;
    },

    exportReception(state, action) {
      state.loading = true;
    },

    exportReceptionSuccess(state, action) {
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.SUCCESS.EXPORT_RECEPTION_SUCCESS,
        message: RESPONSE_MESSAGE.SUCCESS.EXPORT_RECEPTION_SUCCESS,
        data: action.payload,
      };
      state.loading = false;
    },

    exportReceptionFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    changeFinished(state, action) {
      state.loading = true;
    },

    changeFinishedSuccess(state, action) {
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.SUCCESS.CHANGE_FINISHED_SUCCESS,
        message: RESPONSE_MESSAGE.SUCCESS.CHANGE_FINISHED_SUCCESS,
      };
      state.loading = false;
    },

    changeFinishedFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getAllReason(state, action) {
      state.loading = true;
    },

    getAllReasonSuccess(state, action) {
      state.reasons = action.payload;
      state.loading = false;
    },

    getAllReasonFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    checkFinally(state, action) {
      state.loading = true;
    },

    checkFinallySuccess(state, action) {
      state.success = action.payload;
      state.loading = false;
    },

    checkFinallyFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
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
      state.receptions = {};
      state.reception = {};
      state.reasons = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = ReceptionFormSlice;
