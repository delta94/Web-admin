import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { MedicineApiRoutes } from '../constants/medicine.constant';

export class MedicineHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public getAllMedicine = (): Promise<any> => {
    return this.request.get(MedicineApiRoutes.GET_ALL);
  };

  public getMedicineById = (id: string) => {
    return this.request.get(MedicineApiRoutes.GET_BY_ID + '?id=' + id);
  };

  public changeMedicineActive = ({ id, isActive }): Promise<any> => {
    return this.request.post(MedicineApiRoutes.CHANGE_STATUS, {
      id,
      is_active: isActive ? !isActive : true,
    });
  };

  public createMedicine = ({
    code,
    isActive,
    name,
    usageScope,
    type,
  }): Promise<any> => {
    return this.request.post(MedicineApiRoutes.CREATE, {
      code,
      name,
      usage_scope: usageScope,
      is_active: isActive,
      type,
      data_type: 'TEK',
    });
  };

  public updateMedicine = ({
    code,
    isActive,
    name,
    stores,
    type,
    id,
  }): Promise<any> => {
    return this.request.post(MedicineApiRoutes.UPDATE + '?id=' + id, {
      code,
      name,
      stores,
      type,
      is_active: isActive,
    });
  };

  public deleteMedicine = ({ id }): Promise<any> => {
    return this.request.post(MedicineApiRoutes.DELETE + '?id=' + id);
  };

  public checkUniqueCodeMedicine = ({ id, code }): Promise<any> => {
    return this.request.post(MedicineApiRoutes.CHECK_UNIQUE_CODE, {
      code,
      id,
    });
  };
}
