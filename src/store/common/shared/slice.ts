/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from 'store/core/@reduxjs/toolkit';
import * as _ from 'lodash';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_MESSAGE,
  RESPONSE_CONSTANT,
} from 'store/common/constants/common.constant';
export interface SettingModel {
  logoUrl: string;
  backgroundUrl: string;
  viName: string;
  enName: string;
  slogan: string;
  code: string;
}

export enum DefaultSettingTypes {
  LOGO = 'LOGO',
  BACKGROUND = 'BACKGROUND',
  SLOGAN = 'SLOGAN',
  CODE = 'CODE',
  VINAME = 'VINAME',
  ENNAME = 'ENNAME',
}

export interface CommonState {
  loading: boolean;
  error: any;
  success: any;
  defaultSettings: SettingModel;
}

export const initialState: CommonState = {
  loading: false,
  error: null,
  success: {},
  defaultSettings: {
    logoUrl: '',
    backgroundUrl: '',
    viName: '',
    enName: '',
    slogan: '',
    code: '',
  },
};

/**
 *  Mapper Repsonse Default Setting API to ViewModel
 *  @param setting any
 *  @return {SettingModel}
 */

const mapperSettingModel = (setting: any): SettingModel => {
  return {
    backgroundUrl: _.get(setting, 'background_url'),
    code: _.get(setting, 'hospital_code'),
    enName: _.get(setting, 'hospital_name_english'),
    viName: _.get(setting, 'hospital_name_vietnamese'),
    slogan: _.get(setting, 'hospital_slogan'),
    logoUrl: _.get(setting, 'logo_url'),
  };
};

const CommonFormSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setDefaultSetting(state, action) {
      state.defaultSettings = action.payload;
    },

    getDefaultSetting(state) {
      state.loading = true;
    },

    getDefaultSettingSuccess(state, action) {
      state.loading = false;
      state.defaultSettings = mapperSettingModel(action.payload);
    },

    getDefaultSettingFailure(state, action) {
      state.loading = false;
    },

    createSettingSetting(state) {
      state.loading = true;
    },

    createSettingSettingSuccess(state, action) {
      state.loading = false;
      state.defaultSettings = action.payload;
    },

    createSettingSettingFailure(state, action) {
      state.loading = false;
    },

    updateSetting(state, action) {
      state.loading = true;
    },

    updateSettingSuccess(state, action) {
      state.loading = false;
      state.defaultSettings = ReducerHelper.recoverUploadSetting(
        action.payload,
      );
      state.success = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_SETTING_SUCCESSS,
        message: RESPONSE_MESSAGE.UPDATE_SETTING_SUCCESSS,
      };
    },

    updateSettingFailure(state, action) {
      state.loading = false;
      state.error = {
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.UPDATE_SETTING_FAIL,
        message: RESPONSE_MESSAGE.UPDATE_SETTING_FAIL,
      };
    },

    clearError(state) {
      state.error = {};
    },

    clearSuccess(state) {
      state.success = {};
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = CommonFormSlice;

export class ReducerHelper {
  /**
   * Uploaded New Setting
   * @param {newSetting}
   * @returns { SettingModel }
   */
  static recoverUploadSetting(newSetting: any): SettingModel {
    const { logoUrl, backgroundUrl, viName, enName, slogan, code } = newSetting;
    const newLogo = AppHelper.formalUrlUploads(
      AppHelper.getFileUploadName(logoUrl),
    );
    const newBackground = AppHelper.formalUrlUploads(
      AppHelper.getFileUploadName(backgroundUrl),
    );
    return {
      viName,
      enName,
      slogan,
      code,
      logoUrl: newLogo,
      backgroundUrl: newBackground,
    };
  }
}
