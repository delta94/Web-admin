import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { PharmacyApiRoute } from '../constants/pharmarcy.constant';

export class PharmacyHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  public getAllPharmacy = (): Promise<any> => {
    return this.request.get(PharmacyApiRoute.GET_ALL);
  };

  public getPharmacyById = (id: string) => {
    return this.request.get(PharmacyApiRoute.GET_BY_ID + '?id=' + id);
  };

  public changePharmacyActive = ({ id, isActive }): Promise<any> => {
    return this.request.post(PharmacyApiRoute.CHANGE_STATUS, {
      id,
      is_active: isActive ? !isActive : true,
    });
  };

  public createPharmacy = ({
    code,
    isActive,
    name,
    stores,
    type,
  }): Promise<any> => {
    return this.request.post(PharmacyApiRoute.CREATE, {
      code,
      name,
      stores,
      type,
      is_active: isActive,
    });
  };

  public updatePharmacy = ({
    code,
    isActive,
    name,
    stores,
    type,
    id,
  }): Promise<any> => {
    return this.request.post(PharmacyApiRoute.UPDATE + '?id=' + id, {
      code,
      name,
      stores,
      type,
      is_active: isActive,
    });
  };

  public deletePharmacy = ({ id }): Promise<any> => {
    return this.request.post(PharmacyApiRoute.DELETE + '?id=' + id);
  };

  public checkUniqueCodePharmacy = ({ id, code }): Promise<any> => {
    return this.request.post(PharmacyApiRoute.CHECK_UNIQUE_CODE, {
      code,
      id,
    });
  };
}
