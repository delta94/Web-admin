/* eslint-disable prettier/prettier */
/* --- STATE --- */
export interface PatientAction {
  length: number;
  start: number;
}
export interface BalanceAction {
  length: number;
  start: number;
}
export enum PatientErrorType {
  RESPONSE_ERROR = 1,
}

export interface PatientModel {
  birthday?: string;
  birthday_year_only?: boolean;
  code?: string;
  district_id?: string;
  district_name?: string;
  first_name?: string;
  gender?: string;
  health_insurance_expired_date?: string;
  health_insurance_first_place?: string;
  health_insurance_first_place_code?: string;
  health_insurance_issued_date?: string;
  health_insurance_number?: string;
  ic_issued_date?: string;
  ic_issued_place?: string;
  ic_number?: string;
  is_active?: string;
  last_name?: string;
  phone?: string;
  province_id?: string;
  province_name?: string;
  tekmedi_uid?: string;
  ward_id?: string;
  ward_name?: string;
  id?: string;
}

export class PatientInfo implements PatientModel {
  birthday?: string;
  birthday_year_only?: boolean;
  code?: string;
  district_id?: string;
  district_name?: string;
  first_name?: string;
  gender?: string;
  health_insurance_expired_date?: string;
  health_insurance_first_place?: string;
  health_insurance_first_place_code?: string;
  health_insurance_issued_date?: string;
  health_insurance_number?: string;
  ic_issued_date?: string;
  ic_issued_place?: string;
  ic_number?: string;
  is_active?: string;
  last_name?: string;
  phone?: string;
  province_id?: string;
  province_name?: string;
  tekmedi_uid?: string;
  ward_id?: string;
  ward_name?: string;
  id?: string;

  constructor(patientInfo) {
    this.birthday = patientInfo.birthday;
    this.birthday_year_only = patientInfo.birthday_year_only;
    this.code = patientInfo.code;
    this.id = patientInfo.id;
    this.first_name = patientInfo.first_name;
    this.gender = patientInfo.gender;
    this.health_insurance_expired_date =
      patientInfo.health_insurance_expired_date;
    this.health_insurance_first_place = patientInfo.health_insurance_first_place;
    this.health_insurance_first_place_code =
      patientInfo.health_insurance_first_place_code;
    this.health_insurance_issued_date = patientInfo.health_insurance_issued_date;
    this.health_insurance_number = patientInfo.health_insurance_number;
    this.ic_issued_date = patientInfo.identity_card_number_issued_date;
    this.ic_issued_place = patientInfo.identity_card_number_issued_place;
    this.ic_number = patientInfo.identity_card_number;
    this.is_active = patientInfo.is_active;
    this.last_name = patientInfo.last_name;
    this.phone = patientInfo.phone;
    this.tekmedi_uid = patientInfo.tekmedi_id
      ? patientInfo.tekmedi_id
      : patientInfo.tekmedi_uid;
    this.province_id = patientInfo.province_id;
    this.province_name = patientInfo.province_name;
    this.district_id = patientInfo.district_id;
    this.district_name = patientInfo.district_name;
    this.ward_id = patientInfo.ward_id;
    this.ward_name = patientInfo.ward_name;
  }
}
