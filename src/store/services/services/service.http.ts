import { SettingManageType } from 'store/setting/constants/setting.constant';
import { SettingHttp } from 'store/setting/services/setting.http';

export class ServicesHttp extends SettingHttp {
  public getAllServices = (): Promise<any> => {
    return new SettingHttp().getAllManageType(SettingManageType.Service);
  };
}
