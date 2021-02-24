/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectRoomState = (state: RootState) => state.room || initialState;

export const selectLoading = createSelector(
  [selectRoomState],
  roomState => roomState.loading,
);

export const selectError = createSelector(
  [selectRoomState],
  roomState => roomState.error,
);

export const selectSuccess = createSelector(
  [selectRoomState],
  roomState => roomState.success,
);

export const selectRooms = createSelector(
  [selectRoomState],
  roomState => roomState.rooms,
);
