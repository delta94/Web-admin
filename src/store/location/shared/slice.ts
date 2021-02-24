/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';

export interface LocationState {
  loading: boolean;
  error: any;
  success: any;
  locations: any;
}

export const initialState: LocationState = {
  loading: false,
  error: null,
  success: {},
  locations: [],
};

const LocationFormSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getLocationsAll(state) {
      state.loading = true;
      state.error = null;
    },

    getLocationsAllSuccess(state, action: any) {
      state.loading = false;
      state.locations = action.payload;
    },

    getLocationsAllFailure(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = LocationFormSlice;
