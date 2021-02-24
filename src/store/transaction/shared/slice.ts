/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'store/core/@reduxjs/toolkit';
export interface TransactionState {
  dataListTranSaction: any;
  dataTransaction: any;
  dataTransactionDetail: any;
  dataTransactionDetailModal: any;
  success: any;
  dataPaidWaiting: any;
  loading: boolean;
  error: any;
}
export const initialState: TransactionState = {
  dataListTranSaction: {},
  dataTransaction: {},
  dataTransactionDetail: {},
  dataTransactionDetailModal: {},
  loading: false,
  error: null,
  success: {},
  dataPaidWaiting: {},
};

const paidWaitingFormSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    getDataPaidWaiting(state, actions: any) {
      state.loading = true;
      state.error = null;
    },
    getDataPaidWaitingSuccess(state, action: PayloadAction<object>) {
      state.loading = false;
      state.dataPaidWaiting = action.payload;
    },
    getDataPaidWaitingFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    getListTranSaction(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getListTranSactionSuccess(state, action: any) {
      state.loading = false;
      state.dataListTranSaction = action.payload;
    },
    getListTranSactionFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
    getListTransactionDetail(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getListTransactionDetaiSuccess(state, action: any) {
      state.loading = false;
      state.dataTransactionDetail = action.payload;
    },
    getListTransactionDetaiFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
    getListTransactionDetailModal(state, action: any) {
      state.loading = true;
      state.error = null;
    },
    getListTransactionDetailModalSuccess(state, action: any) {
      state.loading = false;
      state.dataTransactionDetailModal = action.payload.result;
    },
    getListTransactionDetailModalFail(state, action: any) {
      state.loading = false;
      state.error = action.payload;
    },
    clearSuccess(state) {
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = paidWaitingFormSlice;
