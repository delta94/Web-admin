/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from 'store/queue/constants/queue.constant';
export interface QueueState {
  loading: boolean;
  error: any;
  success: any;
  queues: any;
  queue: any;
  stt: any;
}

export const initialState: QueueState = {
  loading: false,
  error: null,
  success: {},
  queues: [],
  queue: {},
  stt: {},
};

const QueueFormSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    getAllQueuePatientRoom(state, action) {
      state.loading = true;
    },

    getAllQueuePatientRoomSuccess(state, action) {
      state.loading = false;
      state.queues = action.payload;
    },

    getAllQueuePatientRoomFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    exportQueuePatientRoom(state, action) {
      state.loading = true;
    },

    exportQueuePatientRoomSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },

    exportQueuePatientRoomFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    removeQueuePatientRoom(state, action) {
      state.loading = true;
    },

    removeQueuePatientRoomSuccess(state, action) {
      state.loading = false;
      state.success = action.payload;
    },

    removeQueuePatientRoomFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getQueueByPatientCode(state, action) {
      state.loading = true;
    },

    getQueueByPatientCodeSuccess(state, action) {
      state.loading = false;
      state.queue = action.payload;
    },

    getQueueByPatientCodeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getAllSTT(state, action) {
      state.loading = true;
    },

    getAllSTTSuccess(state, action) {
      state.loading = false;
      state.stt = action.payload;
    },

    getAllSTTFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    registerSTT(state, action) {
      state.loading = true;
    },

    registerSTTSuccess(state, action) {
      state.loading = false;
    },

    registerSTTFailure(state, action) {
      state.loading = false;
    },

    exportSTT(state, action) {
      state.loading = true;
    },

    exportSTTSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_STT_SUCCESS,
        message: RESPONSE_MESSAGE.EXPORT_STT_SUCCESS,
        data: action.payload,
      };
    },

    exportSTTFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_STT_FAIL,
        message: RESPONSE_MESSAGE.EXPORT_STT_FAIL,
      };
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
      state.queues = [];
      state.queue = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = QueueFormSlice;
