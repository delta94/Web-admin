import { createSlice } from 'store/core/@reduxjs/toolkit';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_CONSTANT } from '../constants/survey.constant';

export interface SurveyState {
  surveys: any;
  survey: any;
  loading: boolean;
  success: any;
  error: any;
}

export const initialState: SurveyState = {
  surveys: {},
  survey: {},
  loading: false,
  success: null,
  error: null,
};

const SurveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    getAllSurvey(state) {
      state.loading = true;
    },

    getAllSurveySuccess(state, action) {
      state.loading = false;
      state.surveys = action.payload;
    },

    getAllSurveyFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.GET_SURVEY_FAIL,
        message: action.payload,
      };
    },

    createUpdateSurvey(state, action) {
      state.loading = true;
    },

    createUpdateSurveySuccess(state, action) {
      state.loading = false;
      state.survey = action.payload;
    },

    createUpdateSurveyFailure(state, action) {
      state.loading = false;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuccess(state, action) {
      state.success = action.payload;
    },

    clearSuccess(state) {
      state.success = {};
    },

    clearError(state) {
      state.error = {};
    },

    resetAll(state) {
      state.surveys = {};
      state.survey = {};
      state.error = {};
      state.success = {};
    },
  },
});

export const { actions, reducer, name: sliceKey } = SurveySlice;
