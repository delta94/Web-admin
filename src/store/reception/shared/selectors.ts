/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectRecepttionState = (state: RootState) =>
  state.reception || initialState;

export const selectError = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.error,
);

export const selectSuccess = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.success,
);

export const selectLoading = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.loading,
);

export const selectReceptions = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.receptions,
);

export const selectReceptionInfo = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.reception,
);

export const selectReasons = createSelector(
  [selectRecepttionState],
  receptionState => receptionState.reasons,
);
