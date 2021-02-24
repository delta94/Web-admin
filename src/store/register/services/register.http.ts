/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import * as _ from 'lodash';
import { RegisterApiRoute } from '../constants/register.constant';

export interface Queue {
  room: string;
  limit: number;
  type: number;
}

export interface RoomQueue extends Queue {
  status: number;
}

export class RegisterHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public registerQueuePatient = (roomQueue: RoomQueue): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_PATIENT, roomQueue);
  };

  public registerQueueCall = (queue: Queue): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_CALL, queue);
  };

  public registerQueueCLSCall = ({ room, number }): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_CLS_CALL, {
      room,
      number,
    });
  };

  public registerQueueTableCall = ({ table, limit }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_CALL, {
      Table: table,
      Limit: limit,
    });
  };

  public registerQueueTableType = ({ table, type }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_TYPE, {
      table,
      type,
    });
  };

  public registerQueueTableNumber = ({ table, limit }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_NUMBER, {
      table,
      limit,
    });
  };

  public registerQueueTableAll = ({ deptCode, limit }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_ALL, {
      department_code: deptCode,
      limit,
    });
  };

  public registerQueueTableCheckin = ({
    table,
    patient,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_CHECKIN, {
      table,
      patient,
    });
  };

  public registerQueueTablePaidCall = ({
    table,
    limit,
    ip,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_PAID_CALL, {
      table,
      limit,
      ip,
    });
  };

  public registerQueueTablePaidNumber = ({
    table,
    limit,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_TABLE_PAID_NUMBER, {
      table,
      limit,
    });
  };

  public registerQueueRoom = ({
    room,
    date,
    type,
    status,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_ROOM_LAST, {
      room,
      limit: 10,
      type,
      status,
      date,
    });
  };

  public registerQueueCLSLast = ({ room, limit, date }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_CLS_LAST, {
      room,
      limit: 10,
      date,
    });
  };

  public registerQueueEyeTableAll = ({
    limit,
    deptCode,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_EYE_TABLE_ALL, {
      limit,
      departmentCode: deptCode,
    });
  };

  public registerQueueEyeTableCall = ({
    table,
    limit,
    ip,
  }: any): Promise<any> => {
    return this.request.post(RegisterApiRoute.REG_QUEUE_EYE_TABLE_CALL, {
      table,
      limit,
      ip,
    });
  };
}
