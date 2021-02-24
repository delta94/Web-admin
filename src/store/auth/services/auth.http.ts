/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils/request';
import {
  AuthApiRoutes,
  defaultGetListPersonnel,
} from '../constants/auth.constant';
import {
  APP_CONSTANT,
  DEFAULT_ID,
} from 'store/common/constants/common.constant';
import * as _ from 'lodash';
export class AuthHttp {
  request: any;
  endPoint: any;
  constructor(endPoint = APP_CONSTANT.API.AUTH) {
    this.request = new HttpRequest(endPoint).request;
    this.endPoint = endPoint;
  }

  login = ({ username, password }): Promise<any> => {
    return this.request.post(AuthApiRoutes.LOGIN, {
      username,
      password,
    });
  };

  getListUser = (filter: any): Promise<any> => {
    let requestBody: any = {};
    if (!_.isEmpty(filter)) {
      const { start, length, search } = filter;
      requestBody = {
        draw: 1,
        order: [],
        start: start * length,
        length,
        search,
        columns: defaultGetListPersonnel,
      };
    }
    return this.request.post(AuthApiRoutes.GET_LIST_USER, requestBody);
  };

  getUserByIdToken = (userId: string): Promise<any> => {
    return this.request.get(AuthApiRoutes.GET_USER_BY_TOKEN + '?id=' + userId);
  };

  getUserById = (id: string): Promise<any> => {
    return this.request.get(AuthApiRoutes.FIND_USER_BY_ID + '?id=' + id);
  };

  addRole = (role: any): Promise<any> => {
    return this.request.post(AuthApiRoutes.ADD_ROLE, role);
  };

  deleteRole = (roleId: any): Promise<any> => {
    return this.request.post(AuthApiRoutes.DELETE_ROLE + '/' + roleId);
  };

  getListRole = (): Promise<any> => {
    return this.request.get(AuthApiRoutes.GET_LIST_ROLE);
  };

  updatePermissionInRole = ({ roleId, listPermit }): Promise<any> => {
    return this.request.post(
      AuthApiRoutes.UPDATE_PERMISSION_IN_ROLE + '/' + roleId,
      {
        PermissionIds: listPermit,
      },
    );
  };

  updateUsersInRole = ({ roleId, listUser }): Promise<any> => {
    return this.request.post(AuthApiRoutes.UPDATE_USER_IN_ROLE + '/' + roleId, {
      UserIds: listUser,
    });
  };

  getListPermission = (): Promise<any> => {
    return this.request.get(AuthApiRoutes.GET_LIST_PERMISSION);
  };

  createPersonnel = (personnelInfo: any): Promise<any> => {
    return this.request.post(AuthApiRoutes.CREATE_PERSONNEL, personnelInfo);
  };

  checkUserNamePersonnel = ({ id, userName }): Promise<any> => {
    return this.request.post(AuthApiRoutes.CHECK_USER_NAME_PERSONNEL, {
      Id: DEFAULT_ID,
      UserName: userName,
    });
  };

  checkCodePersonnel = ({ id, code }): Promise<any> => {
    return this.request.post(AuthApiRoutes.CHECK_CODE_PERSONNEL, {
      Id: id,
      Code: code,
    });
  };

  deletePersonnel = (id: string): Promise<any> => {
    return this.request.post(`${AuthApiRoutes.DELETE_PERSONNEL}/${id}`);
  };

  changeActivePersonnel = ({ id, isActive }): Promise<any> => {
    return this.request.post(AuthApiRoutes.CHANGE_ACTIVE, {
      Id: id,
      IsActive: isActive,
    });
  };

  updatePersonnel = (personal): Promise<any> => {
    return this.request.post(
      AuthApiRoutes.UPDATE_PERSONNEL + '?id=' + personal.id,
      personal,
    );
  };

  checkPassWord = ({ userName, passWord }): Promise<any> => {
    return this.request.post(AuthApiRoutes.CHECK_PASSWORD, {
      Password: passWord,
      UserName: userName,
    });
  };

  updateProfileUser = (user: any): Promise<any> => {
    return this.request.post(
      AuthApiRoutes.UPDATE_PROFILE_USER + '/' + user.id,
      user,
    );
  };
}
