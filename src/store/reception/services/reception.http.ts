/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import * as _ from 'lodash';
import {
  ReceptionApiRoute,
  defaultFilterReception,
  defaultOrderFilterReception,
} from '../constants/reception.constant';

export interface ReceptionModel {
  patientCode: string;
  patientName: string;
  type: number;
  startDate: Date;
  endDate: Date;
  page: number;
  rowsPerPage: number;
}

export interface FilterReception extends ReceptionModel {
  search: string;
}

export interface Finished {
  isFinished: boolean;
  reason: string;
  employeeId: string;
  id: string;
}

export type CheckFinally = {
  patientCode: string;
  date: Date;
};

export class ReceptionHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private configRequestBody = (filter: FilterReception) => {
    return {
      patient_code: filter.patientCode,
      patient_name: filter.patientName,
      type: filter.type,
      start_date: filter.startDate,
      end_date: filter.endDate,
      draw: 0,
      start: filter.page * filter.rowsPerPage,
      length: filter.rowsPerPage,
      order: defaultOrderFilterReception,
      columns: defaultFilterReception,
      search: {
        value: filter.search,
        regex: true,
      },
    };
  };

  public getReceptionByPatientCode = (patientCode: string): Promise<any> => {
    return this.request.get(
      ReceptionApiRoute.GET_RECEPTION_BY_PATIENT_CODE + '/' + patientCode,
    );
  };

  public getAllReception = (filter: FilterReception): Promise<any> => {
    return this.request.post(
      ReceptionApiRoute.GET_ALL_RECEPTION,
      this.configRequestBody(filter),
    );
  };

  public exportReception = (filter: FilterReception): Promise<any> => {
    return this.request.post(
      ReceptionApiRoute.EXPORT_RECEPTION,
      this.configRequestBody(filter),
    );
  };

  public changeFinished = (finished: Finished): Promise<any> => {
    return this.request.post(ReceptionApiRoute.CHANGE_FINISHED, {
      is_finished: finished.isFinished,
      reason: finished.reason,
      employee_id: finished.employeeId,
      id: finished.id,
    });
  };

  public getAllReason = (receptiionId: string): Promise<any> => {
    return this.request.get(
      ReceptionApiRoute.GET_ALL_REASON + '/' + receptiionId,
    );
  };

  public checkFinally = ({ patientCode, date }: CheckFinally): Promise<any> => {
    return this.request.post(ReceptionApiRoute.CHECK_FINALLY, {
      patient_code: patientCode,
      requested_date: date,
    });
  };
}
