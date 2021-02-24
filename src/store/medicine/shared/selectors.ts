/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const medicine = (state: RootState) => state.medicine || initialState;

export const selectMedicines = createSelector(
  [medicine],
  medicineState => medicineState.medicines,
);

export const selectMedicine = createSelector(
  [medicine],
  medicineState => medicineState.medicine,
);

export const selectLoading = createSelector(
  [medicine],
  medicineState => medicineState.loading,
);

export const selectError = createSelector(
  [medicine],
  medicineState => medicineState.error,
);

export const selectSuccess = createSelector(
  [medicine],
  medicineState => medicineState.success,
);
