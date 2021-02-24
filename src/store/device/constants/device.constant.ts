export const DeviceApiRoutes = {
  GET_ALL_DEVICE: '/api/Device/all',
  GET_BY_ID: '/api/Device',
  CREATE_DEVICE: '/api/Device/add',
  UPDATE_DEVICE: '/api/Device/update',
  DELETE_DEVICE: '/api/Device/delete',
};

export const RESPONSE_CONSTANT = {
  CREATE_DEVICE_SUCCESS: 'CREATE_DEVICE_SUCCESS',
  CREATE_DEVICE_FAIL: 'CREATE_DEVICE_FAIL',
  UPDATE_DEVICE_SUCCESS: 'UPDATE_DEVICE_SUCCESS',
  UPDATE_DEVICE_FAIL: 'UPDATE_DEVICE_FAIL',
  DELETE_DEVICE_SUCCESS: 'DELETE_DEVICE_SUCCESS',
  DELETE_DEVICE_FAIL: 'DELETE_DEVICE_FAIL',
};

export const RESPONSE_MESSAGE = {
  CREATE_DEVICE_SUCCESS: 'Tạo mới thông tin thiết bị thành công',
  CREATE_DEVICE_FAIL: 'Tạo mới thông tin thiết bị thất bại',
  UPDATE_DEVICE_SUCCESS: 'Cập nhật thông tin thiết Bị thành công',
  UPDATE_DEVICE_FAIL: 'Cập nhật thông tin thiết Bị thất bại',
  DELETE_DEVICE_SUCCESS: 'Xoá thông tin thiết bị thành công',
  DELETE_DEVICE_FAIL: 'Xoá thông tin thiết bị thất bại',
};

export const tableDevice: any[] = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'name', label: 'Tên', minWidth: 120 },
  { id: 'code', label: 'Mã', minWidth: 120 },
  { id: 'ip', label: 'IP', minWidth: 120 },
  { id: 'type', label: 'Loại', minWidth: 120 },
  { id: 'roomName', label: 'Phòng', minWidth: 120 },
  { id: 'actions', label: 'Chức năng', minWidth: 170 },
];

export const defaultFilterDevice = [
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
