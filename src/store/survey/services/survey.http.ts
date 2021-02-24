/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { SurveyApiRoutes } from '../constants/survey.constant';
import * as _ from 'lodash';

export class SurveyHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public getAllSurvey = (): Promise<any> => {
    return this.request.get(SurveyApiRoutes.GET_ALL_SURVEY);
  };

  public createUpdateSurvey = (survey: any): Promise<any> => {
    return this.request.post(SurveyApiRoutes.CREATE_UPDATE_SURVEY, survey);
  };
}
