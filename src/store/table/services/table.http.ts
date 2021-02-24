import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { TableApiRoutes, defaultFilter } from '../constants/table.constant';

export interface TableModel {
  code: string;
  name: string;
  type: number;
  deviceCode: string;
  deviceType: string;
  computerIP: string;
  areaCode: string;
}

export class TableHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private converRequestTable = (table: TableModel) => {
    return {
      code: table.code,
      name: table.name,
      type: table.type,
      device_code: table.deviceCode,
      device_type: table.deviceType,
      computer_ip: table.computerIP,
      area_code: table.areaCode,
    };
  };

  public getTableAll = (filter): Promise<any> => {
    return this.request.post(TableApiRoutes.GET_ALL_TABLE, {
      draw: 0,
      start: filter.page * filter.rowsPerPage,
      length: filter.rowsPerPage,
      order: [
        {
          column: 0,
          dir: '',
        },
      ],
      columns: defaultFilter,
      search: {
        value: filter.search,
        regex: true,
      },
    });
  };

  public getTableWithId = (id: string): Promise<any> => {
    return this.request.get(TableApiRoutes.GET_BY_ID + '/' + id);
  };

  public createTable = (table: any): Promise<any> => {
    return this.request.post(
      TableApiRoutes.CREATE_TABLE,
      this.converRequestTable(table),
    );
  };

  public updateTable = ({ table, id }: any): Promise<any> => {
    return this.request.post(TableApiRoutes.UPDATE_TABLE + '/' + id, table);
  };

  public deleteTable = id => {
    return this.request.post(TableApiRoutes.DELETE_TABLE + '/' + id);
  };

  public callTableAble = () => {
    return this.request.get(TableApiRoutes.CALL_TABLE);
  };
}
