import {
  PatientApiRoutes,
  defaultGetListPatient,
  defaultCreatePatientId,
  defaultExportListPatient,
} from '../constants/patient.constant';
import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';

export class PatientHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  getPatientWithCode = (code: string): Promise<any> => {
    return this.request.get(
      PatientApiRoutes.PATIENT.GET_PATIENT_WITH_CODE + '/' + code,
    );
  };

  getPatientWithType = ({ patientCode, requestDate }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.GET_BY_TYPE, {
      patient_code: patientCode.trim(' '),
      request_date: requestDate,
    });
  };

  getPatientWithCardCode = (cardCode: string): Promise<any> => {
    return this.request.get(
      PatientApiRoutes.PATIENT.GET_BY_CARD_NUMBER + '/' + cardCode,
    );
  };

  getPatientWithHealthId = (healthId: string): Promise<any> => {
    return this.request.get(
      PatientApiRoutes.PATIENT.GET_BY_HEALTH_ID + '/' + healthId,
    );
  };

  getListPatient = ({ length, start, search }): Promise<any> => {
    const requestBody = {
      draw: 1,
      order: [],
      start: start * length,
      length,
      search,
      columns: defaultGetListPatient,
    };
    return this.request.post(
      PatientApiRoutes.PATIENT.GET_LIST_PATIENT,
      requestBody,
    );
  };

  deletePatient = (id: string): Promise<any> => {
    return this.request.post(
      `${PatientApiRoutes.PATIENT.DELETE_PATIENT}?id=${id}`,
    );
  };

  changePatientStatus = ({ id, is_active }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.CHANGE_STATUS, {
      id,
      is_active: !is_active,
    });
  };

  findPatientWithId = (id: string): Promise<any> => {
    return this.request.get(
      `${PatientApiRoutes.PATIENT.FIND_PATIENT_BY_ID}?id=${id}`,
    );
  };

  checkUniquePatientCode = ({ code }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.CHECK_UNIQUE_CODE, {
      code,
      ...defaultCreatePatientId,
    });
  };

  createPatient = (patientInfo: any): Promise<any> => {
    return this.request.post(
      PatientApiRoutes.PATIENT.CREATE_PATIENT,
      patientInfo,
    );
  };

  updatePatient = (patientInfo: any): Promise<any> => {
    return this.request.post(
      PatientApiRoutes.PATIENT.UPDATE_PATIENT + '/' + patientInfo.id,
      patientInfo,
    );
  };

  exportListPatient = ({ startDate, endDate }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.EXPORT_LIST_PATIENT, {
      startDate,
      endDate,
      ...defaultExportListPatient,
    });
  };

  getPatientBalance = ({
    startDate,
    endDate,
    userId,
    page,
    rowsPerPage,
  }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.GET_BALANCE_PATIENT, {
      draw: 5,
      start: page * rowsPerPage,
      length: rowsPerPage,
      search: {
        regex: false,
        value: '',
      },
      employee_id: userId,
      end_date: endDate,
      order: [],
      start_date: startDate,
      columns: defaultGetListPatient,
    });
  };

  exportPatientBalance = ({
    userid,
    userName,
    startDate,
    endDate,
  }): Promise<any> => {
    return this.request.post(
      PatientApiRoutes.PATIENT.EXPORT_LIST_BALANCE_PATIENT,
      {
        employee_id: userid,
        employee_name: userName,
        end_date: endDate,
        start_date: startDate,
      },
    );
  };

  getPatientWithQRCode = (code: string): Promise<any> => {
    return this.request.post(
      PatientApiRoutes.PATIENT.GET_PATIENT_WITH_QR_CODE,
      { code },
    );
  };

  addTempPatient = ({
    firstName,
    lastName,
    gender,
    birthDay,
    wardId,
    provinceId,
    distId,
    patientType,
  }): Promise<any> => {
    return this.request.post(PatientApiRoutes.PATIENT.ADD_TEMP_PATIENT, {
      type: patientType,
      first_name: firstName,
      last_name: lastName,
      ward_id: wardId,
      province_id: provinceId,
      district_id: distId,
      gender,
      birthday: birthDay,
      phone: '',
      tekmediCardNumber: '',
      healthInsuranceNumber: '',
      healthInsuranceExpiredDate: '',
      healthInsuranceFirstPlaceCode: '',
      healthInsuranceFirstPlace: '',
      healthInsuranceIssuedDate: '',
    });
  };
}
