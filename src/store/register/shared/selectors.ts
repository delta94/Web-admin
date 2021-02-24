/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectRegisterState = (state: RootState) =>
  state.register || initialState;

export const selectError = createSelector(
  [selectRegisterState],
  regsiterState => regsiterState.error,
);

export const selectSuccess = createSelector(
  [selectRegisterState],
  regsiterState => regsiterState.success,
);

export const selectLoading = createSelector(
  [selectRegisterState],
  regsiterState => regsiterState.loading,
);

export const selectPatients = createSelector(
  [selectRegisterState],
  registerState => registerState.patients,
);

export const selectQueues = createSelector(
  [selectRegisterState],
  registerState => registerState.queues,
);

export const selectQueuesCLS = createSelector(
  [selectRegisterState],
  registerState => registerState.queuesCLS,
);

export const selectQueueTables = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTables,
);

export const selectQueueTableType = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTableType,
);

export const selectQueueTableNumber = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTableNumber,
);

export const selectQueueTableCall = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTableCall,
);

export const selectqueueTableCheckin = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTableCheckin,
);

export const selectQueueTablePaids = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTablePaids,
);

export const selectQueueTablePaidCall = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTablePaidCall,
);

export const selectQueueTablePaidNumber = createSelector(
  [selectRegisterState],
  registerState => registerState.queueTablePaidNumber,
);

export const selectQueueRooms = createSelector(
  [selectRegisterState],
  registerState => registerState.queueRooms,
);

export const selectQueueCLS = createSelector(
  [selectRegisterState],
  registerState => registerState.queuesCLS,
);

export const selectQueueEyesTables = createSelector(
  [selectRegisterState],
  registerState => registerState.queueEyesTables,
);

export const selectQueueEyesTablesCall = createSelector(
  [selectRegisterState],
  registerState => registerState.queueEyesTablesCall,
);
