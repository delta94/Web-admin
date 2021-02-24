import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  TransactionApiRoutes,
  deffaulGetListTranSaction,
} from '../constants/http.constant';

export class TransactionHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }
  getListTranSaction = ({
    startDate,
    endDate,
    patientCode,
    patientName,
    rowsPerPage,
    page,
    status,
  }): Promise<any> => {
    return this.request.post(
      TransactionApiRoutes.TRANSACTION.GET_LIST_TRANSACTION,
      {
        draw: 1,
        columns: deffaulGetListTranSaction,
        start: page * rowsPerPage,
        length: rowsPerPage,
        search: {
          value: '',
          regex: false,
        },
        order: [],
        patient_code: patientCode,
        patient_name: patientName,
        start_date: startDate,
        end_date: endDate,
        status: status,
      },
    );
  };
  getListTransactionDetail = ({
    patientCode,
    registeredCode,
    registeredDate,
  }): Promise<any> => {
    return this.request.post(
      TransactionApiRoutes.TRANSACTION.TRANSACTION_DETAIL
        .GET_LIST_TRANSACTION_DETAIL,
      {
        patient_code: patientCode,
        registered_code: registeredCode,
        registered_date: registeredDate,
      },
    );
  };
  getListTransactionDetailModal = (id: any): Promise<any> => {
    return this.request.get(
      TransactionApiRoutes.TRANSACTION.TRANSACTION_DETAIL.GET_ID_MODAL_DETAIL +
        '/' +
        id,
    );
  };

  public statisRequest = (): Promise<any> => {
    return new Promise((resolve, reject) => resolve('Success'));
  };
}
