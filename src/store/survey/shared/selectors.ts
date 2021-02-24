/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'store/core/types';
import { initialState } from './slice';

const selectSurveyState = (state: RootState) => state.survey || initialState;

export const selectError = createSelector(
  [selectSurveyState],
  surveyState => surveyState.error,
);

export const selectSuccess = createSelector(
  [selectSurveyState],
  surveyState => surveyState.success,
);

export const selectLoading = createSelector(
  [selectSurveyState],
  surveyState => surveyState.loading,
);

export const selectSurveys = createSelector(
  [selectSurveyState],
  surveyState => surveyState.surveys,
);

export const selectSurvey = createSelector(
  [selectSurveyState],
  surveyState => surveyState.survey,
);
