/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from '../constants/report.constant';
export interface ReportState {
  dataListHistoryTekmediCard: any;
  dataListTranSaction: any;
  dataPrinterHistory: any;
  dataAdminStatistical: any;
  dataTransaction: any;
  dataTransactionDetail: any;
  dataTransactionDetailModal: any;
  dataSurvey: any;
  loading: boolean;
  error: any | null;
  success: any;
}

export const initialState: ReportState = {
  dataListHistoryTekmediCard: {},
  dataListTranSaction: {},
  dataPrinterHistory: {},
  dataAdminStatistical: {},
  dataTransaction: {},
  dataSurvey: {},
  dataTransactionDetail: {},
  dataTransactionDetailModal: {},
  loading: false,
  error: null,
  success: {},
};

const reportFormSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getListHistoryTekmediCard(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getListHistoryTekmediCardSuccess(state, action: any) {
      state.dataListHistoryTekmediCard = action.payload;
      state.loading = false;
    },
    getListHistoryTekmediCardFail(state, action: any) {
      state.loading = false;
      state.dataListHistoryTekmediCard = {};
      state.error = action.payload;
    },
    getIdPrinterDeal(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getIdPrinterDealSuccess(state, action: any) {
      state.dataPrinterHistory = action.payload;
      state.loading = false;
    },
    getIdPrinterDealFail(state, action: any) {
      state.error = action.payload;
      state.loading = false;
    },
    postCancelDeal(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    postCancelDealSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.HISTORY_CARD.CANCEL_DEAL_SUCCESS,
        message: RESPONSE_MESSAGE.HISTORY_CARD.CANCEL_DEAL_SUCCESS,
      };
    },
    postCancelDealFail(state, action: any) {
      state.loading = false;
    },
    exportFileHistoryCard(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    exportFileHistoryCardSuccess(state, action: any) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.HISTORY_CARD.EXPORT_FILE_HISTORY_CARD_SUCCESS,
        message: RESPONSE_MESSAGE.HISTORY_CARD.EXPORT_FILE_HISTORY_CARD_SUCCESS,
        data: action.payload,
      };
    },
    exportFileHistoryCardFail(state, action: any) {
      state.loading = false;
    },
    getDataAdminStatistical(state, actions: any) {
      state.loading = true;
      state.error = null;
    },
    getDataAdminStatisticalSuccess(state, action) {
      state.loading = false;
      state.dataAdminStatistical = action.payload;
    },
    getDataAdminStatisticalFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    getDataSurvey(state) {
      state.loading = true;
      state.error = null;
    },
    getDataSurveySuccess(state, action) {
      state.loading = false;
      state.dataSurvey = action.payload;
    },
    getDataSurveyFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearSuccess(state) {
      state.success = {};
    },
    clearDataprint(state) {
      state.dataPrinterHistory = null;
    },
  },
});

export const { actions, reducer, name: sliceKey } = reportFormSlice;
