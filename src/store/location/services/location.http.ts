import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { LocationApiRoute } from '../constants/location.constants';

export class LocationHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  getLocationsAll = () => {
    return this.request.get(LocationApiRoute.GET_ALL);
  };

  getAddressByCode = ({ provinceId, distId, wardid }) => {
    return this.request.get(
      `${LocationApiRoute.GET_ADDRESS}/${provinceId}/${distId}/${wardid}`,
    );
  };
}
