import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/pharmarcy.constant';

export interface PharmacyState {
  loading?: boolean;
  error?: any;
  success?: any;
  pharmacies?: any;
  pharmacy?: any;
}

export const initialState: PharmacyState = {
  loading: false,
  error: {},
  success: {},
  pharmacies: {},
  pharmacy: {},
};

const PharmacySlice = createSlice({
  name: 'pharmacy',
  initialState,
  reducers: {
    getAllPharmacy(state) {
      state.loading = true;
    },

    getAllPharmacySuccess(state, action) {
      state.pharmacies = action.payload;
      state.loading = false;
    },

    getAllPharmacyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getPharmacyById(state, action) {
      state.loading = true;
    },

    getPharmacyByIdSuccess(state, action) {
      state.pharmacy = action.payload;
      state.loading = false;
    },

    getPharmacyByIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getPharmacy(state, action) {
      state.loading = true;
    },

    getPharmacySuccess(state, action) {
      state.pharmacy = action.payload;
      state.loading = false;
    },

    getPharmacyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createPharmacy(state, action) {
      state.loading = true;
    },

    createPharmacySuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_PHARMACY_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_PHARMACY_SUCCESS,
      };
    },

    createPharmacyFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_PHARMACY_FAIL,
        message: RESPONSE_MESSAGE.CREATE_PHARMACY_FAIL,
      };
      state.loading = false;
    },

    deletePharmacy(state, action) {
      state.loading = true;
    },

    deletePharmacySuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_PHARMACY_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_PHARMACY_SUCCESS,
      };
    },

    deletePharmacyFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_PHARMACY_FAIL,
        message: RESPONSE_MESSAGE.DELETE_PHARMACY_FAIL,
      };
      state.loading = false;
    },

    updatePharmacy(state, action) {
      state.loading = true;
    },

    updatePharmacySuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PHARMACY_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_PHARMACY_SUCCESS,
      };
    },

    updatePharmacyFailure(state, action: any) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PHARMACY_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_PHARMACY_FAIL,
      };
      state.loading = false;
    },

    changePharmacyActive(state, action) {
      state.loading = true;
    },

    changePharmacyActiveSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_STATUS_PHARMACY_SUCCESS,
        message: RESPONSE_MESSAGE.CHANGE_STATUS_PHARMACY_SUCCESS,
      };
    },

    changePharmacyActiveFailure(state, action) {
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_STATUS_PHARMACY_FAIL,
        message: RESPONSE_MESSAGE.CHANGE_STATUS_PHARMACY_FAIL,
      };
      state.loading = false;
    },

    clearPharmacy(state) {
      state.pharmacy = {};
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
      state.error = {};
      state.success = {};
      state.pharmacies = {};
      state.pharmacy = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = PharmacySlice;
