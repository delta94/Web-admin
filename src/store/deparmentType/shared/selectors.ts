/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectPatientState = (state: RootState) =>
  state.departmentType || initialState;

export const selectListDeptType = createSelector(
  [selectPatientState],
  deptType => deptType.departmentTypes,
);

export const selectLoading = createSelector(
  [selectPatientState],
  deptType => deptType.loading,
);

export const selectError = createSelector(
  [selectPatientState],
  deptType => deptType.error,
);

export const selectSuccess = createSelector(
  [selectPatientState],
  deptType => deptType.success,
);
