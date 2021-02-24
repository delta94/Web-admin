/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/device.constant';
import { AppHelper } from 'utils/app.helper';

export interface DeviceState {
  cacheDeviceData?: any;
  cacheSetting?: any;
  loading?: boolean;
  success?: any;
  error?: any;
  devices?: any;
  device: any;
}

export const initialState: DeviceState = {
  cacheDeviceData: null,
  loading: false,
  success: null,
  error: null,
  devices: {},
  device: {},
};

const deviceFormSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    getDeviceAll(state, action) {
      state.loading = true;
    },

    getDeviceAllSuccess(state, action) {
      state.devices = action.payload;
      state.loading = false;
    },

    getDeviceAllFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getDeviceById(state, action) {
      state.loading = true;
    },

    getDeviceByIdSuccess(state, action) {
      state.device = action.payload;
      state.loading = false;
    },

    getDeviceByIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createDevice(state, action) {
      state.loading = true;
    },

    createDeviceSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_DEVICE_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_DEVICE_SUCCESS,
      };
    },

    createDeviceFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_DEVICE_FAIL,
        message: RESPONSE_MESSAGE.CREATE_DEVICE_FAIL,
      };
    },

    updateDevice(state, action) {
      state.loading = true;
    },

    updateDeviceSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_DEVICE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_DEVICE_SUCCESS,
      };
    },

    updateDeviceFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_DEVICE_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_DEVICE_FAIL,
      };
    },

    deleteDevice(state, action) {
      state.loading = true;
    },

    deleteDeviceSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_DEVICE_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_DEVICE_SUCCESS,
      };
    },

    deleteDeviceFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_DEVICE_FAIL,
        message: RESPONSE_MESSAGE.DELETE_DEVICE_FAIL,
      };
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuccess(state, action) {
      state.success = action.payload;
    },

    clearError(state) {
      state.error = {};
    },

    clearSuccess(state) {
      state.success = {};
    },

    resetAll(state) {
      state.cacheDeviceData = null;
      state.loading = false;
      state.success = null;
      state.error = null;
      state.devices = {};
    }
  }

});

export const { actions, reducer, name: sliceKey } = deviceFormSlice;