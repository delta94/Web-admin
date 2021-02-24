/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  AuditlogApiRoutes,
  defaultFilter,
} from '../constants/auditlog.constant';
import * as _ from 'lodash';

export interface FilterAuditlog {
  page: number;
  rowsPerPage: number;
  startDate?: Date;
  endDate?: Date;
  patientCode: string;
}

export class AuditLogHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public getAllAuditLog = () => {
    return this.request.get(AuditlogApiRoutes.GET_ALL);
  };

  public filterAuditLog = (filter: FilterAuditlog) => {
    const { page, rowsPerPage } = filter;
    return this.request.post(AuditlogApiRoutes.FILTER_ALL, {
      draw: 2,
      columns: defaultFilter,
      order: [],
      start: page * rowsPerPage,
      length: rowsPerPage,
      search: {
        value: '',
        regex: false,
      },
      start_date: filter.startDate,
      end_date: filter.endDate,
      patient_code: filter.patientCode,
    });
  };
}
