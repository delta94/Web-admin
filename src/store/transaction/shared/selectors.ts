/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectTransactionState = (state: RootState) =>
  state.transaction || initialState;

export const selectDataPaidWaiting = createSelector(
  [selectTransactionState],
  transaction => transaction.dataPaidWaiting,
);
export const selectLoading = createSelector(
  [selectTransactionState],
  transaction => transaction.loading,
);
export const selectDataListTransaction = createSelector(
  [selectTransactionState],
  transation => transation.dataListTranSaction,
);
export const selectDataListTransactionDetail = createSelector(
  [selectTransactionState],
  transactionDetail => transactionDetail.dataTransactionDetail,
);
export const selecDataListTransactionDetailModal = createSelector(
  [selectTransactionState],
  transactionDetailModal => transactionDetailModal.dataTransactionDetailModal,
);
export const selectError = createSelector(
  [selectTransactionState],
  transaction => transaction.error,
);
export const selectDataTransaction = createSelector(
  [selectTransactionState],
  transaction => transaction.dataTransaction,
);
