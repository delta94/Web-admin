/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectQueueState = (state: RootState) => state.queue || initialState;

export const selectError = createSelector(
  [selectQueueState],
  queueState => queueState.error,
);

export const selectSuccess = createSelector(
  [selectQueueState],
  queueState => queueState.success,
);

export const selectLoading = createSelector(
  [selectQueueState],
  queueState => queueState.loading,
);

export const selectQueues = createSelector(
  [selectQueueState],
  queueState => queueState.queues,
);

export const selectQueue = createSelector(
  [selectQueueState],
  queueState => queueState.queue,
);

export const selectSTT = createSelector(
  [selectQueueState],
  queueState => queueState.stt,
);
