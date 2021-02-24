export const APP_CONSTANT = {
  API: {
    ENDPOINT: process.env.REACT_APP_BASE_API_URL,
    AUTH: process.env.REACT_APP_BASE_API_AUTH,
    WEB: process.env.REACT_APP_API_WEB,
  },
};

export const CommonApiRoute = {
  SETTING: {
    GET_SETTING: '/api/GeneralSetting',
    ADD_UPDATE_SETTING: '/api/GeneralSetting/add-or-update',
  },
};

export const RESPONSE_CONSTANT = {
  CREATE_SETTING_SUCCESSS: 'CREATE_SETTING_SUCCESSS',
  CREATE_SETTING_FAIL: 'CREATE_SETTING_FAIL',
  UPDATE_SETTING_SUCCESSS: 'UPDATE_SETTING_SUCCESSS',
  UPDATE_SETTING_FAIL: 'UPDATE_SETTING_FAIL',
};

export const RESPONSE_MESSAGE = {
  CREATE_SETTING_SUCCESSS: 'Tạo mới Cài đặt chung thành công',
  CREATE_SETTING_FAIL: 'Tạo mới Cài đặt chung thành công',
  UPDATE_SETTING_SUCCESSS: 'Cập nhật Cài đặt chung thành công',
  UPDATE_SETTING_FAIL: 'Cập nhật Cài đặt chung thành công',
};

export const DEFAULT_FORMAT_DATE = 'dd/MM/yyyy';
export const DEFAULT_FORMAT_DATE_TIME = 'dd/MM/yyyy HH:mm:ss';
export const DEFAULT_FORMAT_INPUT_DATE = 'yyyy-MM-dd';
export const DEFAULT_ID = '00000000-0000-0000-0000-000000000000';

export enum Manipulation {
  RECHARGE = 'Nạp tiền',
  REGISTER = 'Ghi thẻ',
  NEW_CARD_ISSUANCE = 'Phí phát thẻ mới',
  DEPOSIT_CANCELED = 'Nạp tiền (đã hủy)',
  LOST_NEW_CARD = 'Mất thẻ phát mới',
  WITHDRAWAL = 'Rút tiền',
  RETURN_THE_CARD = 'Trả thẻ',
  LOST_NOT_NEW_CARD = 'Mất thẻ không phát mới',
}
