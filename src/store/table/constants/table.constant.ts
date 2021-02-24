export const TableApiRoutes = {
  GET_ALL_TABLE: '/api/Table/all',
  GET_BY_ID: '/api/Table',
  CREATE_TABLE: '/api/Table/add',
  UPDATE_TABLE: '/api/Table/update',
  DELETE_TABLE: '/api/Table/delete',
  CALL_TABLE: '/api/Table/callable/all',
};

export const RESPONSE_CONSTANT = {
  CREATE_TABLE_SUCCESS: 'CREATE_TABLE_SUCCESS',
  CREATE_TABLE_FAIL: 'CREATE_TABLE_FAIL',
  UPDATE_TABLE_SUCCESS: 'UPDATE_TABLE_SUCCESS',
  UPDATE_TABLE_FAIL: 'UPDATE_TABLE_FAIL',
  DELETE_TABLE_SUCCESS: 'DELETE_TABLE_SUCCESS',
  DELETE_TABLE_FAIL: 'DELETE_TABLE_FAIL',
};

export const RESPONSE_MESSAGE = {
  CREATE_TABLE_SUCCESS: 'Tạo Mới Thông Tin Bàn Tiếp Nhận Thành Công',
  CREATE_TABLE_FAIL: 'Tạo Mới Thông Tin Bàn Tiếp Nhận Thất Bại',
  UPDATE_TABLE_SUCCESS: 'Cập Nhật Thông Tin Bàn Tiếp Nhận Thành Công',
  UPDATE_TABLE_FAIL: 'Cập Nhật Thông Tin Bàn Tiếp Nhận Thất Bại',
  DELETE_TABLE_SUCCESS: 'Xoá Thông Tin Bàn Tiếp Nhận Thành Công',
  DELETE_TABLE_FAIL: 'Xoá Thông Tin Bàn Tiếp Nhận Thất Bại',
};

export const tablePatientReceiption: any[] = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'name', label: 'Tên', minWidth: 120 },
  { id: 'code', label: 'Mã', minWidth: 120 },
  { id: 'device_code', label: 'Thiết bị', minWidth: 120 },
  { id: 'type', label: 'Loại bàn', minWidth: 120 },
  { id: 'device_type', label: 'Loại thiết bị', minWidth: 120 },
  { id: 'computer_ip', label: 'PC IP', minWidth: 120 },
  { id: 'area_code', label: 'Mã Khu', minWidth: 120 },
  { id: 'department_code', label: 'Mã Phòng', minWidth: 120 },
  { id: 'actions', label: 'Chức năng', minWidth: 170 },
];

export const deviceTypes: any[] = [
  { value: 0, label: 'Bàn' },
  { value: 1, label: 'CPS' },
];

export const tableTypes: any[] = [
  { value: 0, label: 'Thường' },
  { value: 1, label: 'Ưu tiên' },
];

export const defaultFilter = [
  {
    data: '',
    name: '',
    searchable: true,
    orderable: true,
    search: {
      value: '',
      regex: true,
    },
  },
];
