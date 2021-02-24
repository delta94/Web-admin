import { call, put, takeLatest, all } from 'redux-saga/effects';
import { actions } from './slice';
import { SurveyHttp } from '../services/survey.http';
const surveyRequest = new SurveyHttp();

export function* getAllSurvey(api) {
  const response = yield call(api.getAllSurvey);
  try {
    if (response.ok) {
      yield put(actions.getAllSurveySuccess(response.data.result));
    } else {
      const { error, problem } = response;
      if (error) {
        yield put(actions.getAllSurveyFailure(error));
      } else {
        yield put(actions.getAllSurveyFailure(problem));
      }
    }
  } catch (err) {
    yield put(actions.getAllSurveyFailure(err));
  }
}

export function* createUpdateSurvey(api, action) {
  const response = yield call(api.createUpdateSurvey, action.payload);
  try {
    if (response.ok) {
      yield put(actions.createUpdateSurveySuccess(response.data.result));
    } else {
      yield put(actions.createUpdateSurveyFailure(response.error));
    }
  } catch (err) {
    yield put(actions.createUpdateSurveyFailure(err));
  }
}

export function* SurveySaga() {
  yield all([
    yield takeLatest(actions.getAllSurvey.type, getAllSurvey, surveyRequest),
    yield takeLatest(
      actions.createUpdateSurvey.type,
      createUpdateSurvey,
      surveyRequest,
    ),
  ]);
}
