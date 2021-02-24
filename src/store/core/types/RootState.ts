/* eslint-disable @typescript-eslint/no-unused-vars */

import { ReportState } from 'store/report/shared/slice';
import { TransactionState } from 'store/transaction/shared/slice';
import { CardState } from 'store/card/shared/slice';
import { PatientState } from 'store/patient/shared/slice';
import { SettingState } from 'store/setting/shared/slice';
import { AuthState } from 'store/auth/shared/slice';
import { CommonState } from 'store/common/shared/slice';
import { ServiceState } from 'store/services/shared/slice';
import { DepartmentState } from 'store/department/shared/slice';
import { DepartmentTypeState } from 'store/deparmentType/shared/slice';
import { DepartmentServiceState } from 'store/departmentService/shared/slice';
import { MedicineState } from 'store/medicine/shared/slice';
import { PharmacyState } from 'store/pharmacy/shared/slice';
import { DeviceState } from 'store/device/shared/slice';
import { AuditlogState } from 'store/auditlog/shared/slice';
import { TableState } from 'store/table/shared/slice';
import { SurveyState } from 'store/survey/shared/slice';
import { RoomState } from 'store/room/shared/slice';
import { LocationState } from 'store/location/shared/slice';
import { QueueState } from 'store/queue/shared/slice';
import { ReceptionState } from 'store/reception/shared/slice';
import { RegisterState } from 'store/register/shared/slice';
export interface RootState {
  patient?: PatientState;
  transaction?: TransactionState;
  report?: ReportState;
  card?: CardState;
  setting?: SettingState;
  auth: AuthState;
  common: CommonState;
  services?: ServiceState;
  departments?: DepartmentState;
  departmentType?: DepartmentTypeState;
  departmentService?: DepartmentServiceState;
  medicine?: MedicineState;
  pharmacy?: PharmacyState;
  device?: DeviceState;
  auditlog?: AuditlogState;
  table?: TableState;
  survey?: SurveyState;
  room?: RoomState;
  location?: LocationState;
  queue?: QueueState;
  reception?: ReceptionState;
  register?: RegisterState;
}
