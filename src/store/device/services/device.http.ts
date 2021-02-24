/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import * as _ from 'lodash';
import {
  DeviceApiRoutes,
  defaultFilterDevice,
} from '../constants/device.constant';

export interface FilterDevice {
  page: number;
  rowsPerPage: number;
}

export interface DeviceModel {
  id?: string;
  name: string;
  code: string;
  type: string;
  ip: string;
  roomId: string;
}

export class DeviceHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private configRequestBody = (device: DeviceModel) => {
    let body = {
      name: device.name,
      code: device.code,
      type: device.type,
      ip: device.ip,
      room_id: device.roomId,
    };
    if (device.id) {
      return {
        ...body,
        id: device.id,
      };
    }
    return body;
  };

  public getDeviceAll = (filter: FilterDevice): Promise<any> => {
    return this.request.post(DeviceApiRoutes.GET_ALL_DEVICE, {
      draw: 0,
      start: filter.page * filter.rowsPerPage,
      length: filter.rowsPerPage,
      order: [
        {
          column: 0,
          dir: '',
        },
      ],
      columns: defaultFilterDevice,
      search: {
        value: '',
        regex: true,
      },
    });
  };

  public getDeviceById = (id: string): Promise<any> => {
    return this.request.get(DeviceApiRoutes.GET_BY_ID + '/' + id);
  };

  public createDevice = (device: DeviceModel): Promise<any> => {
    return this.request.post(DeviceApiRoutes.CREATE_DEVICE, {
      ...this.configRequestBody(device),
    });
  };

  public updateDevice = (device: any): Promise<any> => {
    return this.request.post(
      DeviceApiRoutes.UPDATE_DEVICE + '/' + device.id,
      device,
    );
  };

  public deleteDevice = (id: string): Promise<any> => {
    return this.request.post(DeviceApiRoutes.DELETE_DEVICE + '/' + id);
  };
}
