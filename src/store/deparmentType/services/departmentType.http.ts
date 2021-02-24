import { SettingManageType } from 'store/setting/constants/setting.constant';
import { SettingHttp } from 'store/setting/services/setting.http';

export class DepartmentTypeHttp extends SettingHttp {
  public getAllDepartmentType = (): Promise<any> => {
    return new SettingHttp().getAllManageType(SettingManageType.DepartmentType);
  };
}
