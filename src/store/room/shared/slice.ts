/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';
export interface RoomState {
  loading: boolean;
  error: any;
  success: any;
  rooms: any;
}

export const initialState: RoomState = {
  loading: false,
  error: null,
  success: {},
  rooms: [],
};

const RoomFormSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    getRoomAll(state) {
      state.loading = true;
      state.error = null;
    },

    getRoomAllSuccess(state, action: any) {
      state.loading = false;
      state.rooms = action.payload;
    },

    getRoomAllFailure(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = RoomFormSlice;
