import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_MESSAGE,
  RESPONSE_CONSTANT,
} from '../constants/patient.constant';
export interface PatientState {
  dataPatient: any;
  listPatient: any;
  listPatientBalance: any | any;
  error?: any | null;
  loading: boolean;
  success: any;
  downloadFileStorage: any;
}

export const initialState: PatientState = {
  dataPatient: {},
  listPatientBalance: {},
  loading: false,
  error: null,
  listPatient: {},
  success: {},
  downloadFileStorage: {},
};

const PatientFormSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    getPatientWithCode(state, actions: any) {
      state.loading = true;
    },

    getPatientWithCodeSuccess(state, action: any) {
      state.loading = false;
      state.dataPatient = action.payload;
    },

    getPatientWithCodeFailure(state, action: any) {
      state.error = action.payload;
      state.dataPatient = {};
      state.loading = false;
    },

    getPatientWithType(state, actions: any) {
      state.loading = true;
    },

    getPatientWithTypeSuccess(state, action: any) {
      state.loading = false;
      state.dataPatient = action.payload;
    },

    getPatientWithTypeFailure(state, action: any) {
      state.error = action.payload;
      state.dataPatient = {};
      state.loading = false;
    },

    getPatientWithHealthId(state, actions: any) {
      state.loading = true;
    },

    getPatientWithHealthIdSuccess(state, action: any) {
      state.loading = false;
      state.dataPatient = action.payload;
    },

    getPatientWithHealthIdFailure(state, action: any) {
      state.error = action.payload;
      state.dataPatient = {};
      state.loading = false;
    },

    getListPatient(state, actions: any) {
      state.loading = true;
      state.error = null;
    },

    getListPatientSuccess(state, action) {
      state.loading = false;
      state.listPatient = action.payload;
      state.error = null;
    },

    getListPatientFailure(state, action) {
      state.error = action.payload;
      state.listPatient = [];
      state.loading = false;
    },

    exportListPatient(state, action) {
      state.loading = true;
      state.error = {};
      state.success = null;
    },

    exportListPatientSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_PATIENT_SUCCESS,
        message: RESPONSE_MESSAGE.EXPORT_PATIENT_SUCCESS,
        data: action.payload,
      };
    },

    exportListPatientFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },

    findPatientWithId(state, action: any) {
      state.loading = true;
    },

    findPatientWithIdSuccess(state, action: any) {
      state.loading = false;
      state.dataPatient = action.payload;
      state.error = null;
    },

    findPatientWithIdFailure(state, action: any) {
      state.loading = false;
      state.dataPatient = {};
      state.error = action.payload;
    },

    createPatient(state, action: any) {
      state.loading = true;
      state.error = null;
      state.success = {};
    },

    createPatientSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_PATIENT_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_PATIENT_SUCCESS,
      };
      state.error = null;
    },

    createPatientFailure(state, action: any) {
      state.loading = false;
      state.error = action.payload;
      state.success = {};
    },

    changePatientStatus(state, action) {
      state.loading = true;
    },

    changePatientStatusSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_PATIENT_STATUS_SUCCESS,
        message: RESPONSE_MESSAGE.CHANGE_PATIENT_STATUS_SUCCESS,
      };
      state.error = null;
    },

    changePatientStatusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updatePatient(state, action) {
      state.loading = true;
      state.error = null;
      state.success = {};
    },

    updatePatientSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_PATIENT_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_PATIENT_SUCCESS,
      };
      state.error = null;
    },

    updatePatientFailure(state, action) {
      state.loading = false;
    },

    deletePatient(state, action) {
      state.loading = true;
    },

    deletePatientSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_PATIENT_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_PATIENT_SUCCESS,
      };
      state.error = null;
    },

    deletePatientFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getPatientBalance(state, actions: any) {
      state.loading = true;
      state.error = null;
    },

    getPatientBalanceSuccess(state, action: any) {
      state.loading = false;
      state.listPatientBalance = action.payload;
    },
    getPatientBalanceFailure(state, action: any) {
      state.error = action.payload;
      state.loading = false;
    },

    exportPatientBalance(state, actions: any) {
      state.loading = true;
    },

    exportPatientBalanceSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_PATIENT_BALANCE_SUCCESS,
        message: RESPONSE_MESSAGE.EXPORT_PATIENT_BALANCE_SUCCESS,
        data: action.payload,
      };
    },

    exportPatientBalanceFailure(state, action: any) {
      state.loading = false;
    },

    clearPatientInfo(state) {
      state.dataPatient = {};
    },

    clearListPatient(state) {
      state.listPatient = [];
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
      state.dataPatient = {};
      state.listPatientBalance = {};
      state.error = null;
      state.listPatient = {};
      state.success = null;
      state.downloadFileStorage = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = PatientFormSlice;
