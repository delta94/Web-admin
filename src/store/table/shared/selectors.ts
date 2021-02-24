/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectTableState = (state: RootState) => state.table || initialState;

export const selectError = createSelector(
  [selectTableState],
  tableState => tableState.error,
);

export const selectSuccess = createSelector(
  [selectTableState],
  tableState => tableState.success,
);

export const selectLoading = createSelector(
  [selectTableState],
  tableState => tableState.loading,
);

export const selectTable = createSelector(
  [selectTableState],
  tableState => tableState.tables,
);

export const selectTableInfo = createSelector(
  [selectTableState],
  tableState => tableState.tableInfo,
);

export const selectListTableCallAble = createSelector(
  [selectTableState],
  tableState => tableState.listTableCallAble,
);
