/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import * as _ from 'lodash';
import { QueueApiRoute } from '../constants/queue.constant';

export interface QueueModel {
  deptCode: string;
  patientCode: string;
  areaCode: string;
  date: Date;
}

export interface QueueRoomModel extends QueueModel {
  employeeId: string;
  reason: string;
}

export class QueueHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private configRequestQueue = (queue: QueueModel) => {
    return {
      department_code: queue.deptCode,
      patient_code: queue.patientCode,
      area_code: queue.areaCode,
      date: queue.date,
    };
  };

  private configRequestQueueRoom = (queueRoom: QueueRoomModel): any => {
    return {
      department_code: queueRoom.deptCode,
      employee_id: queueRoom.employeeId,
      reason: queueRoom.reason,
      date: queueRoom.date,
    };
  };

  public getAllQueuePatientRoom = (queue: QueueModel): Promise<any> => {
    return this.request.post(QueueApiRoute.GET_ALL_QUEUE_PATIENT_ROOM, {
      ...this.configRequestQueue(queue),
    });
  };

  public exportQueuePatientRoom = (queue: QueueModel): Promise<any> => {
    return this.request.post(QueueApiRoute.EXPORT_QUEUE_PATIENT_ROOM, {
      ...this.configRequestQueue(queue),
    });
  };

  public removeQueuePatientRoom = (queueRoom: QueueRoomModel): Promise<any> => {
    return this.request.post(QueueApiRoute.REMOVE_QUEUE_PATIENT_ROOM, {
      ...this.configRequestQueueRoom(queueRoom),
    });
  };

  public getQueueByPatientCode = (patientCode: string): Promise<any> => {
    return this.request.get(
      QueueApiRoute.GET_QUEUE_BY_PATIENT_CODE + '/' + patientCode,
    );
  };

  public registerPatientPriority = (patient: any): Promise<any> => {
    return this.request.post(QueueApiRoute.REGISTER_PRIORITY_PATIENT, {
      patient_code: patient.code,
      requested_date: new Date(),
      type: patient.patientType,
      first_name: patient.firstName,
      last_name: patient.lastName,
      gender: patient.gender,
      birthday: patient.birthDay,
      province_id: patient.provinceId,
      district_id: patient.distId,
      ward_id: patient.wardId,
      street: patient.street,
    });
  };

  public getAllSTT = (filter: any): Promise<any> => {
    return this.request.post(QueueApiRoute.GET_ALL_STT, {
      department_code: filter.deptCode,
      patient_code: filter.patientCode,
      patient_name: filter.patientName,
      area_code: '',
      start_date: new Date(filter.startDate.setHours(0, 0, 0, 0)).toISOString(),
      end_date: new Date(filter.endDate.setHours(23, 0, 0, 0)).toISOString(),
      draw: 1,
      start: filter.page * filter.rowsPerPage,
      length: filter.rowsPerPage,
    });
  };

  public registerSTT = (registerInfo: any): Promise<any> => {
    return this.request.post(QueueApiRoute.REGISTER_STT, {
      hospital_code: registerInfo.hospitalCode,
      department_code: registerInfo.deptCode,
      patient_code: registerInfo.patientCode,
      first_name: registerInfo.firstName,
      last_name: registerInfo.lastName,
      birthday: registerInfo.birthDay,
      gender: registerInfo.gender,
      province_id: registerInfo.province_id,
      district_id: registerInfo.dist_id,
      ward_id: registerInfo.ward_id,
      street: registerInfo.street,
      phone: registerInfo.phone,
      registered_date: new Date(),
    });
  };

  public exportSTT = (filter: any): Promise<any> => {
    return this.request.post(QueueApiRoute.EXPORT_STT, {
      department_code: filter.deptCode,
      patient_code: filter.patientCode,
      patient_name: filter.patientName,
      area_code: '',
      start_date: new Date(filter.startDate.setHours(0, 0, 0, 0)).toISOString(),
      end_date: new Date(filter.endDate.setHours(23, 0, 0, 0)).toISOString(),
      draw: 1,
      start: filter.page * filter.rowsPerPage,
      length: filter.rowsPerPage,
    });
  };
}
