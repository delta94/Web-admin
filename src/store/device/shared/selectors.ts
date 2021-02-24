/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectSettingState = (state: RootState) => state.device || initialState;

export const selectError = createSelector(
  [selectSettingState],
  deviceState => deviceState.error,
);

export const selectSuccess = createSelector(
  [selectSettingState],
  deviceState => deviceState.success,
);

export const selectLoading = createSelector(
  [selectSettingState],
  deviceState => deviceState.loading,
);

export const selectDevices = createSelector(
  [selectSettingState],
  deviceState => deviceState.devices,
);

export const selectDevice = createSelector(
  [selectSettingState],
  deviceState => deviceState.device,
);
