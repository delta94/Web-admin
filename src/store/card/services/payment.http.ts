/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { CardApiRoutes } from '../constants/http.constant';

export class PaymentHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  checkPaymentStatusFinnalyCard = ({
    patientCode,
    requestDate,
  }): Promise<any> => {
    return this.request.post(CardApiRoutes.PAYMENT.CHECK_STATUS_FINNALY, {
      Patient_Code: patientCode,
      Requested_Date: requestDate,
    });
  };

  cancelPayment = (id: string): Promise<any> => {
    return this.request.post(CardApiRoutes.PAYMENT.CANCEL_PAYMENT + id);
  };
}
