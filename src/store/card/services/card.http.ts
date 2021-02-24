/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  CardApiRoutes,
  defaultColumnsFilterCard,
} from '../constants/http.constant';
import * as _ from 'lodash';
interface HistoryCardFilter {
  draw: number;
  columns: any[];
  order: any[];
  search: {
    value: string;
    regex: boolean;
  };
  start: number;
  length: number;
  patient_code: string;
  patient_name: string;
  types?: any[];
}

export class CardHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private convertHistoryCardParams = ({
    page,
    rowsPerPage,
    patientCode,
    patientName,
    types,
  }: any): HistoryCardFilter => {
    let requestBody: HistoryCardFilter = {
      draw: 5,
      columns: defaultColumnsFilterCard,
      order: [],
      search: {
        value: '',
        regex: false,
      },
      start: page * rowsPerPage,
      length: rowsPerPage,
      patient_code: patientCode,
      patient_name: patientName,
    };
    if (types.length) {
      return {
        ...requestBody,
        types,
      };
    }
    return requestBody;
  };

  getDataCardHistory = (requestBody: any): Promise<any> => {
    const body: HistoryCardFilter | any = this.convertHistoryCardParams(
      requestBody,
    );
    if (body.types) {
      return this.request.post(
        CardApiRoutes.CARD_HISTORY.GET_CARD_HISTORY_WITH_TYPE,
        body,
      );
    }
    return this.request.post(CardApiRoutes.CARD_HISTORY.GET_CARD_HISTORY, body);
  };

  getCardHistoryById = (id: string): Promise<any> => {
    return this.request.get(
      CardApiRoutes.CARD_HISTORY.GET_BY_CARD_ID + `?id=${id}`,
    );
  };

  getDataCardStatistical = ({
    startDate,
    endDate,
    page,
    rowsPerPage,
    userId,
  }): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD_HISTORY.GET_LIST_CARD, {
      draw: 5,
      columns: defaultColumnsFilterCard,
      order: [],
      start: page * rowsPerPage,
      length: rowsPerPage,
      search: {
        value: '',
        regex: false,
      },
      start_date: startDate,
      end_date: endDate,
      employee_Id: userId,
    });
  };

  exportListCard = ({ userName, userId, endDate, startDate }): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD_HISTORY.EXPORT_CARD, {
      employee_Id: userId,
      employee_name: userName,
      end_date: endDate,
      start_date: startDate,
    });
  };

  validateCard = (cardNumber): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD.VALIDATE + cardNumber);
  };

  getByCardNumber = (cardNumber): Promise<any> => {
    return this.request.get(CardApiRoutes.CARD.GET_BY_CARD_NUMBER + cardNumber);
  };

  registerCardPayment = ({ cardNumber, userId, patientCode }): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD.REGISTER_CARD_PAYMENT, {
      tekmedi_card_number: cardNumber,
      employee_Id: userId,
      patient_code: patientCode,
    });
  };

  addPaymentToCard = ({
    cardNumber,
    userId,
    patientCode,
    price,
    paymentType,
  }) => {
    return this.request.post(CardApiRoutes.CARD.ADD_PAYMENT, {
      price,
      tekmedi_card_number: cardNumber,
      employee_Id: userId,
      patient_code: patientCode,
      payment_type: paymentType,
    });
  };

  returnCard = ({ userId, cardNumber }): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD.RETURN_CARD, {
      tekmedi_card_number: cardNumber,
      employee_Id: userId,
    });
  };

  lostCard = ({ userId, cardNumber, newCardnumber, patientCode }) => {
    return this.request.post(CardApiRoutes.CARD.LOST_CARD, {
      current_tekmedi_card_number: cardNumber,
      employee_id: userId,
      new_tekmedi_card_number: newCardnumber,
      patient_code: patientCode,
    });
  };

  getWithDrawCard = ({ userId, cardNumber, price, patientCode }) => {
    return this.request.post(CardApiRoutes.CARD.GET_WITH_DRAW, {
      price,
      tekmedi_card_number: cardNumber,
      employee_id: userId,
      patient_code: patientCode,
    });
  };

  getIdPrinter = (id: any): Promise<any> => {
    return this.request.get(
      CardApiRoutes.CARD_HISTORY.PRINTER_HISTORY + '?id=' + id,
    );
  };

  postCancelDeal = (id: any): Promise<any> => {
    return this.request.post(CardApiRoutes.CARD_HISTORY.CANCEL_DEAL + '/' + id);
  };

  getListValueExtend = (): Promise<any> => {
    return this.request.get(CardApiRoutes.LIST_VALUE_EXTEND);
  };
}
