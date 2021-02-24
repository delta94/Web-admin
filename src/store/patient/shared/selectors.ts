/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectPatientState = (state: RootState) => state.patient || initialState;

export const selectDataPatient = createSelector(
  [selectPatientState],
  selectState => selectState.dataPatient,
);

export const selectDataListPatient = createSelector(
  [selectPatientState],
  patient => patient.listPatient,
);

export const selectListPatientBalance = createSelector(
  [selectPatientState],
  patient => patient.listPatientBalance,
);

export const selectLoading = createSelector(
  [selectPatientState],
  patient => patient.loading,
);

export const selectError = createSelector(
  [selectPatientState],
  patient => patient.error,
);

export const selectSuccess = createSelector(
  [selectPatientState],
  patient => patient.success,
);

export const selecDownloadFileStorage = createSelector(
  [selectPatientState],
  patient => patient.downloadFileStorage,
);
