/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectCommonState = (state: RootState) => state.common || initialState;

export const selectLoading = createSelector(
  [selectCommonState],
  common => common.loading,
);

export const selectError = createSelector(
  [selectCommonState],
  common => common.error,
);

export const selectSuccess = createSelector(
  [selectCommonState],
  common => common.success,
);

export const selectDefaultSetting = createSelector(
  [selectCommonState],
  common => common.defaultSettings,
);
