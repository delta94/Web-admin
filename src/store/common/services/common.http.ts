/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils/request';
import { APP_CONSTANT, CommonApiRoute } from '../constants/common.constant';
import { SettingModel } from '../shared/slice';
import * as _ from 'lodash';
export class CommonHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public getDefaultSetting = (): Promise<any> => {
    return this.request.get(CommonApiRoute.SETTING.GET_SETTING);
  };

  public createSetting = (setting: any) => {
    return this.request.post(
      CommonApiRoute.SETTING.ADD_UPDATE_SETTING,
      setting,
    );
  };

  public updateSetting = ({
    viName,
    enName,
    slogan,
    code,
    logoUrl,
    backgroundUrl,
  }: SettingModel) => {
    const settingForm = new FormData();
    settingForm.append('HospitalNameVietnamese', viName);
    settingForm.append('HospitalNameEnglish', enName);
    settingForm.append('HospitalSlogan', slogan);
    settingForm.append('HospitalCode', code);
    settingForm.append('Logo', logoUrl[0]);
    settingForm.append('Background', backgroundUrl[0]);

    return this.request.post(
      CommonApiRoute.SETTING.ADD_UPDATE_SETTING,
      settingForm,
    );
  };
}
