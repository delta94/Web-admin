/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectCardState = (state: RootState) => state.card || initialState;

export const selectDataCardHistory = createSelector(
  [selectCardState],
  card => card.dataCardHistory,
);

export const selectLoading = createSelector(
  [selectCardState],
  card => card.loading,
);

export const selectError = createSelector(
  [selectCardState],
  card => card.error,
);

export const selectSuccess = createSelector(
  [selectCardState],
  card => card.success,
);

export const selectDataListValueExtend = createSelector(
  [selectCardState],
  card => card.dataValueExtend,
);

export const selectDataCardStatistical = createSelector(
  [selectCardState],
  card => card.dataCardStatistical,
);

export const selectDataPrinterHistory = createSelector(
  [selectCardState],
  card => card.dataPrinterHistory,
);
