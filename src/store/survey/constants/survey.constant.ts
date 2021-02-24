import * as _ from 'lodash';

export const SurveyApiRoutes = {
  GET_ALL_SURVEY: '/api/Survey',
  CREATE_UPDATE_SURVEY: '/api/Survey',
};

export const RESPONSE_CONSTANT = {
  GET_SURVEY_SUCESS: 'GET_SURVEY_SUCESS',
  GET_SURVEY_FAIL: 'GET_SURVEY_FAIL',
  FILTER_SURVEY_SUCESS: 'FILTER_SURVEY_SUCESS',
  FILTER_SURVEY_FAIL: 'FILTER_SURVEY_FAIL',
};

export const RESPONSE_MESSAGE = {
  GET_SURVEY_SUCESS: 'Lấy danh sách khảo sát thành công',
  GET_SURVEY_FAIL: 'Lấy danh sách khảo sát thất bại',
  FILTER_SURVEY_SUCESS: 'Lấy danh sách khảo sát thành công',
  FILTER_SURVEY_FAIL: 'Lấy danh sách khảo sát  thất bại',
};

export interface SurveyResult {
  ans_1: string;
  ans_2: string;
}

export interface SurveyResponse {
  documents: any[];
  id: string;
  is_active: boolean;
  is_deleted: boolean;
  result: SurveyResult;
  user: string;
}

export class SurveyModel {
  documents: any[];
  user: string;
  isActive: boolean;
  ansOne: string;
  ansTwo: string;
  constructor(survey: SurveyResponse) {
    this.documents = survey.documents.length
      ? _.get(_.head(survey.documents), 'url')
      : '';
    this.user = survey.user;
    this.isActive = survey.is_active;
    this.ansOne = survey.result.ans_1;
    this.ansTwo = survey.result.ans_2;
  }
}

export const tableSurvey: any[] = [
  { id: 'no', label: '#', minWidth: 50, align: 'left' },
  { id: 'ansOne', label: 'Câu 1', minWidth: 50, align: 'center' },
  { id: 'ansTwo', label: 'Câu 2', minWidth: 50, align: 'center' },
  { id: 'user', label: 'User', minWidth: 100, align: 'center' },
  { id: 'isActive', label: 'Trạng thái', minWidth: 100, align: 'center' },
  { id: 'documents', label: 'Hình ảnh', minWidth: 200, align: 'center' },
];
