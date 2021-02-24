export const DeptServiceApiRoutes = {
  GET_ALL: '/api/DepartmentService/all',
  GET_BY_ID: '/api/DepartmentService/get',
  CREATE: '/api/DepartmentService/add',
  CHANGE_STATUS: '/api/DepartmentService/change-active',
  UPDATE: '/api/DepartmentService/update',
  DELETE: '/api/DepartmentService/delete',
  CHECK_UNIQUE_CODE: '/api/DepartmentService/check-unique',
  EXPORT: '/api/DepartmentService/export',
  IMPORT: '/api/DepartmentService/import',
};

export const RESPONSE_CONSTANT = {
  CHANGE_STATUS_DEPT_SERVICE_SUCCESS: 'CHANGE_STATUS_DEPT_SERVICE_SUCCESS',
  CHANGE_STATUS_DEPT_SERVICE_FAIL: 'CHANGE_STATUS_DEPT_SERVICE_FAIL',
  CHECK_CODE_SUCCESS: 'CHECK_CODE_SUCCESS',
  CHECK_CODE_FAIL: 'CHECK_CODE_FAIL',
  DELETE_DEPT_SERVICE_SUCCESS: 'DELETE_DEPT_SERVICE_SUCCESS',
  DELETE_DEPT_SERVICE_FAIL: 'DELETE_DEPT_SERVICE_FAIL',
  CREATE_DEPT_SERVICE_SUCCESS: 'CREATE_DEPT_SERVICE_SUCCESS',
  CREATE_DEPT_SERVICE_FAIL: 'CREATE_DEPT_SERVICE_FAIL',
  UPDATE_DEPT_SERVICE_SUCCESS: 'UPDATE_DEPT_SERVICE_SUCCESS',
  UPDATE_DEPT_SERVICE_FAIL: 'UPDATE_DEPT_SERVICE_FAIL',
  EXPORT_DEPT_SERVICE_SUCCESS: 'EXPORT_DEPT_SERVICE_SUCCESS',
  EXPORT_DEPT_SERVICE_FAIL: 'EXPORT_DEPT_SERVICE_FAIL',
  IMPORT_DEPT_SERVICE_SUCCESS: 'IMPORT_DEPT_SERVICE_SUCCESS',
  IMPORT_DEPT_SERVICE_FAIL: 'IMPORT_DEPT_SERVICE_FAIL',
};

export const RESPONSE_MESSAGE = {
  CHANGE_STATUS_DEPT_SERVICE_SUCCESS:
    'Thay Đổi Trạng Thái phòng ban - dịch vụ Thành Công',
  CHANGE_STATUS_DEPT_SERVICE_FAIL:
    'Thay Đổi Trạng Thái phòng ban - dịch vụ Thất Bại',
  CHECK_CODE_SUCCESS: 'Mã phòng ban - dịch vụ Có Thể Sử Dụng',
  CHECK_CODE_FAIL: 'Mã phòng ban - dịch vụ Đã Tồn Tại',
  DELETE_DEPT_SERVICE_SUCCESS: 'Xoá phòng ban - dịch vụ Thành Công',
  DELETE_DEPT_SERVICE_FAIL: 'Xoá phòng ban - dịch vụ Thất Bại',
  CREATE_DEPT_SERVICE_SUCCESS: 'Tạo Mới phòng ban - dịch vụ Thành Công',
  CREATE_DEPT_SERVICE_FAIL: 'Tạo Mới phòng ban - dịch vụ Thất Bại',
  UPDATE_DEPT_SERVICE_SUCCESS: 'Cập Nhật phòng ban - dịch vụ Thành Công',
  UPDATE_DEPT_SERVICE_FAIL: 'Cập Nhật phòng ban - dịch vụ Thất Bại',
  EXPORT_DEPT_SERVICE_SUCCESS: 'Xuất file phòng ban - dịch vụ Thành Công',
  EXPORT_DEPT_SERVICE_FAIL: 'Xuất file phòng ban - dịch vụ Thất Bại',
  IMPORT_DEPT_SERVICE_SUCCESS: 'Nhập file phòng ban - dịch vụ Thành Công',
  IMPORT_DEPT_SERVICE_FAIL: 'Nhập file phòng ban - dịch vụ Thất Bại',
};

export const DeptServiceModelService = [
  {
    data: 'id',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'department_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'department_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'room_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'room_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'examination_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'examination_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'service_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'service_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'usage_type',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'id',
    name: '',
    searchable: false,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
];

export const tableDeptService: any[] = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'department_code', label: 'Mã khoa', minWidth: 120 },
  { id: 'department_name', label: 'Tên khoa', minWidth: 150 },
  { id: 'room_code', label: 'Mã phòng thực hiện', minWidth: 200 },
  { id: 'room_name', label: 'Tên phòng thực hiện', minWidth: 200 },
  { id: 'examination_code', label: 'Mã phòng chỉ định', minWidth: 200 },
  { id: 'examination_name', label: 'Tên phòng chỉ định', minWidth: 200 },
  { id: 'service_code', label: 'Mã dịch vụ', minWidth: 150 },
  { id: 'service_name', label: 'Tên dịch vụ', minWidth: 800 },
  { id: 'type', label: 'Loại', minWidth: 120 },
  { id: 'is_active', label: 'Trạng thái', minWidth: 120 },
  { id: 'actions', label: 'Chức năng', minWidth: 180 },
];

export enum FilterKey {
  ROOM = 'ROOM',
  DEPARTMENT = 'DEPARTMENT',
  SERVICE = 'SERVICE',
  USAGE = 'USAGE',
  EXAMINATION = 'EXAMINATION',
  TYPE = 'TYPE',
  DEFAULT = 'DEFAULT',
}

export const optionsDeptType = [
  { id: 0, description: 'Thường' },
  { id: 1, description: 'Dịch vụ' },
  { id: 2, description: 'Nam' },
  { id: 3, description: 'Nữ' },
  { id: 4, description: 'LDLK (N)' },
];

export const optionsCreateBy = [
  { id: '', description: 'Tất cả' },
  { id: 0, description: 'Website' },
  { id: 1, description: 'Đồng bộ HIS' },
  { id: 2, description: 'Excel' },
];
