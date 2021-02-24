import { SettingManageType } from 'store/setting/constants/setting.constant';
import { SettingHttp } from 'store/setting/services/setting.http';

export class DepartmentHttp extends SettingHttp {
  public getAllDepartment = (): Promise<any> => {
    return new SettingHttp().getAllManageType(SettingManageType.Department);
  };
}
