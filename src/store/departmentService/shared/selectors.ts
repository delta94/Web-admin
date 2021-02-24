/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const departmentService = (state: RootState) =>
  state.departmentService || initialState;

export const selectListDeptService = createSelector(
  [departmentService],
  state => state.deptServices,
);

export const selectDeptService = createSelector(
  [departmentService],
  state => state.deptService,
);

export const selectLoading = createSelector(
  [departmentService],
  state => state.loading,
);

export const selectError = createSelector(
  [departmentService],
  state => state.error,
);

export const selectSuccess = createSelector(
  [departmentService],
  state => state.success,
);

export const selectImportFiles = createSelector(
  [departmentService],
  state => state.importFiles,
);
