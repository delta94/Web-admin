/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectAuditlogState = (state: RootState) =>
  state.auditlog || initialState;

export const selectError = createSelector(
  [selectAuditlogState],
  auditlog => auditlog.error,
);

export const selectSuccess = createSelector(
  [selectAuditlogState],
  auditlog => auditlog.success,
);

export const selectLoading = createSelector(
  [selectAuditlogState],
  auditlog => auditlog.loading,
);

export const selectAuditlogs = createSelector(
  [selectAuditlogState],
  auditlog => auditlog.auditlogs,
);
