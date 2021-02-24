/* --- STATE --- */
export interface ReportFormState {
  dataAdminStatistical: object | any;
  dataTransaction: object | any;
  dataSurvey: object | any;
  error?: AdminStatisticalErrorType | null;
  loading: boolean;
}

export interface AdminStatisticalAction {
  length: number;
  start: number;
  StartDate: Date;
  EndDate: Date;
}
export interface TransactionAction {
  length: number;
  start: number;
  PatientCode: string;
  PatientName: string;
  StartDate: Date;
  EndDate: Date;
}

export enum AdminStatisticalErrorType {
  RESPONSE_ERROR = 1,
  // USER_NOT_FOUND = 2,
  // USERNAME_EMPTY = 3,
  // USER_HAS_NO_REPO = 4,
  // GITHUB_RATE_LIMIT = 5,
}
/* 
  If you want to use 'ContainerState' keyword everywhere in your feature folder, 
  instead of the 'HomePageState' keyword.
*/
export type ContainerState = ReportFormState;
