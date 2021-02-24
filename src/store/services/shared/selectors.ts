/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectServiceState = (state: RootState) => state.services || initialState;

export const selectListServices = createSelector(
  [selectServiceState],
  state => state.services,
);

export const selectLoading = createSelector(
  [selectServiceState],
  state => state.loading,
);

export const selectError = createSelector(
  [selectServiceState],
  state => state.error,
);

export const selectSuccess = createSelector(
  [selectServiceState],
  state => state.success,
);
