/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import { RESPONSE_CONSTANT } from '../constants/card.constant';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_MESSAGE } from '../constants/card.constant';
export interface CardState {
  dataCardHistory?: any;
  dataCardStatistical?: any;
  dataPrinterHistory?: any;
  dataValueExtend?: any;
  loading?: boolean;
  error?: any;
  cardInfo?: any;
  success?: any;
}

export const initialState: CardState = {
  dataCardHistory: {},
  dataCardStatistical: {},
  dataPrinterHistory: {},
  dataValueExtend: {},
  loading: false,
  error: null,
  cardInfo: {},
  success: {},
};

const CardFormSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getDataCardHistory(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getDataCardHistorySuccess(state, action: any) {
      state.loading = false;
      state.dataCardHistory = action.payload;
    },
    getDataCardHistoryFailure(state, action: any) {
      state.error = action.payload;
      state.loading = false;
    },
    getCardStatistical(state, action) {
      state.error = null;
      state.loading = true;
    },
    getCardStatisticalSuccess(state, action) {
      state.dataCardStatistical = action.payload;
      state.loading = false;
    },
    getCardStatisticalFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    registerCardPayment(state, action) {
      state.loading = true;
    },
    registerCardPaymentSuccess(state, action) {
      state.loading = false;
    },
    registerCardPaymentFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    cancelPayment(state, action) {
      state.loading = true;
    },
    cancelPaymentSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CANCEL_PAYMENT_SUCCESS,
        message: RESPONSE_MESSAGE.CANCEL_PAYMENT_SUCCESS,
      };
    },
    cancelPaymentFail(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CANCEL_PAYMENT_FAIL,
        message: RESPONSE_MESSAGE.CANCEL_PAYMENT_FAIL,
      };
    },
    exportListCard(state, action) {
      state.loading = true;
    },
    exportListCardSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.EXPORT_CARD_SUCCESS,
        data: action.payload,
        message: RESPONSE_MESSAGE.EXPORT_CARD_SUCCESS,
      };
    },
    exportListCardFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getIdPrinter(state, action) {
      state.loading = true;
      state.error = null;
    },
    getIdPrinterSuccess(state, action) {
      state.loading = false;
      state.dataPrinterHistory = action.payload;
    },
    getIdPrinterFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    postCancelDeal(state, action) {
      state.loading = true;
      state.error = null;
    },
    postCancelDealSuccess(state, action) {
      state.loading = false;
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.CANCEL_DEAL_SUCCESS,
        message: RESPONSE_MESSAGE.CANCEL_DEAL_SUCCESS,
      };
    },
    postCancelDealFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    getListValueExtend(state) {
      state.loading = true;
      state.error = null;
    },
    getListValueExtendSuccess(state, action) {
      state.loading = false;
      state.dataValueExtend = action.payload;
    },
    getListValueExtendFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearSuccess(state) {
      state.success = {};
    },
    clearError(state) {
      state.error = null;
    },
    clearDataPrint(state) {
      state.dataPrinterHistory = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = CardFormSlice;
