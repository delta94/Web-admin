import { HttpRequest } from 'utils/request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import { RoomApiRoutes } from '../constants/room.constants';
export class RoomHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  getRoomAll = () => {
    return this.request.get(RoomApiRoutes.GET_ALL);
  };
}
