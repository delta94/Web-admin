import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/medicine.constant';

export interface MedicineState {
  loading?: boolean;
  error?: any;
  success?: any;
  medicines?: any;
  medicine?: any;
}

export const initialState: MedicineState = {
  loading: false,
  error: {},
  success: {},
  medicines: {},
  medicine: {},
};

const DeptServiceSlice = createSlice({
  name: 'medicine',
  initialState,
  reducers: {
    getAllMedicine(state) {
      state.loading = true;
    },

    getAllMedicineSuccess(state, action) {
      state.medicines = action.payload;
      state.loading = false;
    },

    getAllMedicineFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getMedicineById(state, action) {
      state.loading = true;
    },

    getMedicineByIdSuccess(state, action) {
      state.medicine = action.payload;
      state.loading = false;
    },

    getMedicineByIdFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    getMedicine(state, action) {
      state.loading = true;
    },

    getMedicineSuccess(state, action) {
      state.medicine = action.payload;
      state.loading = false;
    },

    getMedicineFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    createMedicine(state, action) {
      state.loading = true;
    },

    createMedicineSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CREATE_MEDICINE_SUCCESS,
        message: RESPONSE_MESSAGE.CREATE_MEDICINE_SUCCESS,
      };
    },

    createMedicineFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },

    deleteMedicine(state, action) {
      state.loading = true;
    },

    deleteMedicineSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_MEDICINE_SUCCESS,
        message: RESPONSE_MESSAGE.DELETE_MEDICINE_SUCCESS,
      };
    },

    deleteMedicineFailure(state, action) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.DELETE_MEDICINE_FAIL,
        message: RESPONSE_MESSAGE.DELETE_MEDICINE_FAIL,
      };
      state.loading = false;
    },

    updateMedicine(state, action) {
      state.loading = true;
    },

    updateMedicineSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_MEDICINE_SUCCESS,
        message: RESPONSE_MESSAGE.UPDATE_MEDICINE_SUCCESS,
      };
    },

    updateMedicineFailure(state, action: any) {
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_MEDICINE_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_MEDICINE_FAIL,
      };
      state.loading = false;
    },

    changeMedicineActive(state, action) {
      state.loading = true;
    },

    changeMedicineActiveSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_STATUS_MEDICINE_SUCCESS,
        message: RESPONSE_MESSAGE.CHANGE_STATUS_MEDICINE_SUCCESS,
      };
    },

    changeMedicineActiveFailure(state, action) {
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CHANGE_STATUS_MEDICINE_FAIL,
        message: RESPONSE_MESSAGE.CHANGE_STATUS_MEDICINE_FAIL,
      };
      state.loading = false;
    },

    clearMedicine(state) {
      state.medicine = {};
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
      state.medicines = {};
      state.medicine = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = DeptServiceSlice;
