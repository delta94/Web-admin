/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const pharmacy = (state: RootState) => state.pharmacy || initialState;

export const selectPharmacies = createSelector(
  [pharmacy],
  pharmacyState => pharmacyState.pharmacies,
);

export const selectPharmacy = createSelector(
  [pharmacy],
  pharmacyState => pharmacyState.pharmacy,
);

export const selectLoading = createSelector(
  [pharmacy],
  pharmacyState => pharmacyState.loading,
);

export const selectError = createSelector(
  [pharmacy],
  pharmacyState => pharmacyState.error,
);

export const selectSuccess = createSelector(
  [pharmacy],
  pharmacyState => pharmacyState.success,
);
