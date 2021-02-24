import { createSlice } from 'store/core/@reduxjs/toolkit';

export interface DepartmentTypeState {
  loading?: boolean;
  departmentTypes?: any;
  error?: any;
  success?: any;
}

export const initialState: DepartmentTypeState = {
  loading: false,
  departmentTypes: {},
  error: {},
  success: {},
};

export const DepartmentTypeSlice = createSlice({
  name: 'departmentType',
  initialState,
  reducers: {
    getAllDepartmentType(state) {
      state.loading = true;
    },

    getAllDepartmentTypeSuccess(state, action) {
      state.loading = false;
      state.departmentTypes = action.payload;
    },

    getAllDepartmentTypeFailure(state, action) {
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
      state.departmentTypes = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = DepartmentTypeSlice;
