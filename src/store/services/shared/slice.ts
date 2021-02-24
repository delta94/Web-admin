import { createSlice } from 'store/core/@reduxjs/toolkit';
export interface ServiceState {
  loading?: boolean;
  services?: any;
  error?: any;
  success?: any;
}

export const initialState: ServiceState = {
  loading: false,
  services: {},
  error: {},
  success: {},
};

const ServiceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    getAllServices(state) {
      state.loading = true;
    },

    getAllServicesSuccess(state, action) {
      state.loading = false;
      state.services = action.payload;
    },

    getAllServicesFailure(state, action) {
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
      state.services = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = ServiceSlice;
