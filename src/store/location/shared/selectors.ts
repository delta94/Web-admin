/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectLocationState = (state: RootState) =>
  state.location || initialState;

export const selectLoading = createSelector(
  [selectLocationState],
  locationSate => locationSate.loading,
);

export const selectError = createSelector(
  [selectLocationState],
  locationSate => locationSate.error,
);

export const selectSuccess = createSelector(
  [selectLocationState],
  locationSate => locationSate.success,
);

export const selectLocations = createSelector(
  [selectLocationState],
  locationSate => locationSate.locations,
);
