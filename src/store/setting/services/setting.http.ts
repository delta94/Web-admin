/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  SettingApiRoutes,
  SettingManageType,
} from '../constants/setting.constant';
import * as _ from 'lodash';

interface ManageTypeModel {
  id?: string;
  description: string;
  code?: string;
  isActive?: boolean;
  isSystem?: boolean;
  settingTypeId?: string;
  listValueId?: string;
  manageType: SettingManageType;
}

interface OnlyManageType {
  id: string;
  manageType: SettingManageType;
  code?: string;
}
export class SettingHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private configApiRouteWithManageType = (manageType: SettingManageType) => {
    if (
      manageType === SettingManageType.Service ||
      manageType === SettingManageType.Department
    ) {
      return true;
    }
    return false;
  };

  protected modifyRequestBody = (manageTypeInfo: ManageTypeModel): any => {
    let requestBody: any = {
      code: manageTypeInfo.code,
      description: manageTypeInfo.description,
      display_order: 0,
      is_active: manageTypeInfo.isActive,
      is_system: manageTypeInfo.isSystem,
      list_value_type_id: manageTypeInfo.settingTypeId,
      list_value_id: manageTypeInfo.listValueId
        ? manageTypeInfo.listValueId
        : undefined,
    };
    let id = _.get(manageTypeInfo, 'id');
    if (id) {
      requestBody = {
        ...requestBody,
        id,
      };
    } else {
      requestBody = {
        ...requestBody,
        type: 'TEK',
      };
    }
    return requestBody;
  };

  public getAllManageType = (manageType: SettingManageType): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.GET_ALL_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.GET_ALL_MANAGE_TYPE;
    }
    return this.request.get(apiUrl + '/' + manageType);
  };

  public getManageType = (manageType: SettingManageType): Promise<any> => {
    return this.request.get(
      SettingApiRoutes.MANAGE_TYPE.GET_MANAGE_TYPE_BY_CODE + '/' + manageType,
    );
  };

  public changeManageTypeActive = ({
    id,
    isActive,
    manageType,
  }): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CHANGE_ACTIVE_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CHANGE_ACTIVE_MANAGE_TYPE;
    }
    return this.request.post(apiUrl, {
      id,
      is_active: isActive ? !isActive : true,
    });
  };

  public createManageType = (manageTypeInfo: ManageTypeModel): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(manageTypeInfo.manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CREATE_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CREATE_MANAGE_TYPE;
    }
    return this.request.post(apiUrl, this.modifyRequestBody(manageTypeInfo));
  };

  public updateManageType = (manageTypeInfo: ManageTypeModel): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(manageTypeInfo.manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.UPDATE_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.UPDATE_MANAGE_TYPE;
    }
    return this.request.post(apiUrl, this.modifyRequestBody(manageTypeInfo));
  };

  public deleteManageType = (deletetType: OnlyManageType): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(deletetType.manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.DELETE_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.DELETE_MANAGE_TYPE;
    }
    return this.request.post(apiUrl + '/' + deletetType.id);
  };

  public checkUniqueCode = (checkType: OnlyManageType): Promise<any> => {
    let apiUrl: string = '';
    if (this.configApiRouteWithManageType(checkType.manageType)) {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CHECK_UNIQUE_EXTEND_MANAGE_TYPE;
    } else {
      apiUrl = SettingApiRoutes.MANAGE_TYPE.CHECK_UNIQUE_MANAGE_TYPE;
    }
    return this.request.post(apiUrl, {
      Code: checkType.code,
      Id: checkType.id,
    });
  };
}
