/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectPatientState = (state: RootState) =>
  state.departments || initialState;

export const selectListDept = createSelector(
  [selectPatientState],
  dept => dept.departments,
);

export const selectLoading = createSelector(
  [selectPatientState],
  dept => dept.loading,
);

export const selectError = createSelector(
  [selectPatientState],
  dept => dept.error,
);

export const selectSuccess = createSelector(
  [selectPatientState],
  dept => dept.success,
);
