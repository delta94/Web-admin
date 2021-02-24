import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  defaultGetListHistoryTekmediCard,
  ReportApiRoutes,
} from '../constants/http.constant';
export class ReportHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  getListHistoryTekmediCard = ({
    startDate,
    endDate,
    userId,
    rowsPerPage,
    page,
  }): Promise<any> => {
    return this.request.post(ReportApiRoutes.TEKMEDI_CARD.GET_LIST_HISTORY, {
      draw: 1,
      columns: defaultGetListHistoryTekmediCard,
      start: page * rowsPerPage,
      length: rowsPerPage,
      search: {
        value: '',
        regex: false,
      },
      employee_id: userId,
      end_date: endDate,
      order: [],
      start_date: startDate,
    });
  };
  getIdPrinterDeal = (id: string): Promise<any> => {
    return this.request.get(
      `${ReportApiRoutes.TEKMEDI_CARD.PRINT_DEAL}?id=${id}`,
    );
  };
  postCancelDeal = (id: string): Promise<any> => {
    return this.request.post(
      `${ReportApiRoutes.TEKMEDI_CARD.CANCEL_DEAL}/${id}`,
    );
  };
  exportFileHistoryCard = ({ userId, userName, startDate, endDate }) => {
    return this.request.post(ReportApiRoutes.TEKMEDI_CARD.EXPORT_FILE, {
      employee_id: userId,
      employee_name: userName,
      start_date: startDate,
      end_date: endDate,
    });
  };
}
