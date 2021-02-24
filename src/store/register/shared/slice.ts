/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';
export interface RegisterState {
  loading: boolean;
  error: any;
  success: any;
  patients: any;
  queues: any;
  queuesCLS: any;
  queueTables: any;
  queueTableType: any;
  queueTableNumber: any;
  queueTableCall: any;
  queueTableCheckin: any;
  queueTablePaids: any;
  queueTablePaidCall: any;
  queueTablePaidNumber: any;
  queueRooms: any;
  queueEyesTables: any;
  queueEyesTablesCall: any;
}

export const initialState: RegisterState = {
  loading: false,
  error: null,
  success: null,
  patients: {},
  queues: {},
  queueTables: {},
  queueTableType: {},
  queueTableNumber: {},
  queueTableCall: {},
  queueTableCheckin: {},
  queueTablePaids: {},
  queueTablePaidCall: {},
  queueTablePaidNumber: {},
  queueRooms: {},
  queuesCLS: {},
  queueEyesTables: {},
  queueEyesTablesCall: {},
};

const RegisterFormSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    registerQueuePatient(state, action) {
      state.loading = true;
    },

    registerQueuePatientSuccess(state, action) {
      state.patients = action.payload;
      state.loading = false;
    },

    registerQueuePatientFailure(state, action) {
      state.loading = false;
    },

    registerQueueCall(state, action) {
      state.loading = true;
    },

    registerQueueCallSuccess(state, action) {
      state.queues = action.payload;
      state.loading = false;
    },

    registerQueueCallFailure(state, action) {
      state.loading = false;
    },

    registerQueueCLSCall(state, action) {
      state.loading = true;
    },

    registerQueueCLSCallSuccess(state, action) {
      state.loading = false;
      state.queuesCLS = action.payload;
    },

    registerQueueCLSCallFailure(state, action) {
      state.loading = false;
    },

    registerQueueTableCall(state, action) {
      state.loading = true;
    },

    registerQueueTableCallSuccess(state, action) {
      state.queueTableNumber = action.payload;
      state.loading = false;
    },

    registerQueueTableCallFailure(state, action) {
      state.loading = false;
    },

    registerQueueTableType(state, action) {
      state.loading = true;
    },

    registerQueueTableTypeSuccess(state, action) {
      state.queueTableType = action.payload;
      state.loading = false;
    },

    registerQueueTableTypeFailure(state, action) {
      state.loading = false;
    },

    registerQueueTableNumber(state, action) {
      state.loading = true;
    },

    registerQueueTableNumberSuccess(state, action) {
      state.queueTableNumber = action.payload;
      state.loading = false;
    },

    registerQueueTableNumberFailure(state, action) {
      state.loading = false;
    },

    registerQueueTableAll(state, action) {
      state.loading = true;
    },

    registerQueueTableAllSuccess(state, action) {
      state.queueTables = action.payload;
      state.loading = false;
    },

    registerQueueTableAllFailure(state, action) {
      state.loading = false;
    },

    registerQueueTableCheckin(state, action) {
      state.loading = true;
    },

    registerQueueTableCheckinSuccess(state, action) {
      state.queueTableCheckin = action.payload;
      state.loading = false;
    },

    registerQueueTableCheckinFailure(state, action) {
      state.loading = false;
    },

    registerQueueTablePaidCall(state, action) {
      state.loading = true;
    },

    registerQueueTablePaidCallSuccess(state, action) {
      state.queueTablePaidCall = action.payload;
      state.loading = false;
    },

    registerQueueTablePaidCallFailure(state, action) {
      state.loading = false;
    },

    registerQueueTablePaidNumber(state, action) {
      state.loading = true;
    },

    registerQueueTablePaidNumberSuccess(state, action) {
      state.queueTablePaidNumber = action.payload;
      state.loading = false;
    },

    registerQueueTablePaidNumberFailure(state, action) {
      state.loading = false;
    },

    registerQueueRoom(state, action) {
      state.loading = true;
    },

    registerQueueRoomSuccess(state, action) {
      state.queueRooms = action.payload;
      state.loading = false;
    },

    registerQueueRoomFailure(state, action) {
      state.loading = false;
    },

    registerQueueCLSLast(state, action) {
      state.loading = true;
    },

    registerQueueCLSLastSuccess(state, action) {
      state.queuesCLS = action.payload;
      state.loading = false;
    },

    registerQueueCLSLastFailure(state, action) {
      state.loading = false;
    },

    registerQueueEyeTableAll(state, action) {
      state.loading = true;
    },

    registerQueueEyeTableAllSuccess(state, action) {
      state.queueEyesTables = action.payload;
      state.loading = false;
    },

    registerQueueEyeTableAllFailure(state, action) {
      state.loading = false;
    },

    registerQueueEyeTableCall(state, action) {
      state.loading = true;
    },

    registerQueueEyeTableCallSuccess(state, action) {
      state.queueEyesTablesCall = action.payload;
      state.loading = false;
    },

    registerQueueEyeTableCallFailure(state, action) {
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

    resetAll(state) {
      state.error = {};
      state.success = {};
      state.patients = {};
      state.queues = {};
      state.queueTables = {};
      state.queueTableType = {};
      state.queueTableNumber = {};
      state.queueTableCall = {};
      state.queueTableCheckin = {};
      state.queueTablePaids = {};
      state.queueTablePaidCall = {};
      state.queueTablePaidNumber = {};
      state.queueRooms = {};
      state.queuesCLS = {};
      state.queueEyesTables = {};
      state.queueEyesTablesCall = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = RegisterFormSlice;
