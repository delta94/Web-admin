import { createSlice } from 'store/core/@reduxjs/toolkit';

export interface DepartmentState {
  loading?: boolean;
  departments?: any;
  error?: any;
  success?: any;
}

export const initialState: DepartmentState = {
  loading: false,
  departments: {},
  error: {},
  success: {},
};

const MedicineSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getAllDepartment(state) {
      state.loading = true;
    },

    getAllDepartmentSuccess(state, action) {
      state.loading = false;
      state.departments = action.payload;
    },

    getAllDepartmentFailure(state, action) {
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
      state.success = {};
    },

    resetAll(state) {
      state.departments = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = MedicineSlice;
