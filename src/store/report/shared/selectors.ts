/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectReportState = (state: RootState) => state.report || initialState;

export const selectDataAdminStatistical = createSelector(
  [selectReportState],
  report => report.dataAdminStatistical,
);
export const selectDataTransaction = createSelector(
  [selectReportState],
  report => report.dataTransaction,
);
export const selectDataSurvey = createSelector(
  [selectReportState],
  report => report.dataSurvey,
);
export const selectDataListHistoryTekCard = createSelector(
  [selectReportState],
  report => report.dataListHistoryTekmediCard,
);
export const selectDataPrintHistory = createSelector(
  [selectReportState],
  report => report.dataPrinterHistory,
);
export const selectSuccessCancel = createSelector(
  [selectReportState],
  report => report.success,
);
export const selectDataListTransaction = createSelector(
  [selectReportState],
  transation => transation.dataListTranSaction,
);
export const selectDataListTransactionDetail = createSelector(
  [selectReportState],
  transactionDetail => transactionDetail.dataTransactionDetail,
);
export const selecDataListTransactionDetailModal = createSelector(
  [selectReportState],
  transactionDetailModal => transactionDetailModal.dataTransactionDetailModal,
);
export const selectLoading = createSelector(
  [selectReportState],
  report => report.loading,
);

export const selectError = createSelector(
  [selectReportState],
  report => report.error,
);
