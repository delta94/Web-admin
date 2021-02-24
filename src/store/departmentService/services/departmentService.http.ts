import { HttpRequest } from 'utils//request';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  DeptServiceApiRoutes,
  DeptServiceModelService,
} from '../constants/departmentService.constant';

export interface DeptServiceModel {
  deptId?: string;
  roomId?: string;
  examId?: string;
  serviceId?: string;
  usageTypeId?: string;
  typeId?: string;
  deptDesc?: string;
  roomDesc?: string;
  examDesc?: string;
  serviceDesc?: string;
  usageTypeDesc?: string;
  typeDesc?: string;
  page: number;
  rowsPerPage: number;
  isActive?: boolean;
  id?: string;
}

export class DepartmentServiceHttp {
  request: any;
  constructor(endPoint = APP_CONSTANT.API.ENDPOINT) {
    this.request = new HttpRequest(endPoint).request;
  }

  private mappingRequestBody = (deptService: DeptServiceModel) => {
    return {
      department_id: deptService.deptId,
      service_id: deptService.serviceId,
      room_id: deptService.roomId,
      examination_id: deptService.examId,
      usage_type: deptService.usageTypeId,
      is_active: deptService.isActive,
    };
  };

  public getAllDeptService = (filter: DeptServiceModel): Promise<any> => {
    const { page, rowsPerPage } = filter;
    return this.request.post(DeptServiceApiRoutes.GET_ALL, {
      columns: DeptServiceModelService,
      order: [],
      search: {
        value: '',
        regex: false,
      },
      start: page * rowsPerPage,
      length: rowsPerPage,
      ...this.mappingRequestBody(filter),
      type: filter.typeId,
    });
  };

  public getDeptServiceWithId = (id: string): Promise<any> => {
    return this.request.get(DeptServiceApiRoutes.GET_BY_ID + '/' + id);
  };

  public changeDeptServiceActive = ({ id, isActive }): Promise<any> => {
    return this.request.post(DeptServiceApiRoutes.CHANGE_STATUS, {
      id,
      is_active: isActive ? !isActive : true,
    });
  };

  public deleteDeptService = (id: string): Promise<any> => {
    return this.request.post(DeptServiceApiRoutes.DELETE + '/' + id);
  };

  public createDeptService = (deptService: DeptServiceModel): Promise<any> => {
    return this.request.post(
      DeptServiceApiRoutes.CREATE,
      this.mappingRequestBody(deptService),
    );
  };

  public updateDeptService = (deptService: DeptServiceModel): Promise<any> => {
    return this.request.post(
      DeptServiceApiRoutes.UPDATE + '/' + deptService.id,
      this.mappingRequestBody(deptService),
    );
  };

  public checkUniqueCodeDeptService = (
    filter: DeptServiceModel,
  ): Promise<any> => {
    return this.request.post(
      DeptServiceApiRoutes.CHECK_UNIQUE_CODE,
      this.mappingRequestBody(filter),
    );
  };

  public exportDeptService = (filter: DeptServiceModel): Promise<any> => {
    return this.request.post(
      DeptServiceApiRoutes.EXPORT,
      this.mappingRequestBody(filter),
    );
  };

  public importDeptService = (file: File): Promise<any> => {
    const formData: FormData = new FormData();
    formData.append('excelFile', file);
    return this.request.post(DeptServiceApiRoutes.IMPORT, formData);
  };
}
