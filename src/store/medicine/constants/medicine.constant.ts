export const MedicineApiRoutes = {
  GET_ALL: '/api/Medicine/all',
  GET_BY_ID: '/api/Medicine/find',
  CREATE: '/api/Medicine/add',
  CHANGE_STATUS: '/api/Medicine/change-active',
  UPDATE: '/api/Medicine/update',
  DELETE: '/api/Medicine/delete',
  CHECK_UNIQUE_CODE: '/api/Medicine/check-code-unique',
};

export const RESPONSE_CONSTANT = {
  CHANGE_STATUS_MEDICINE_SUCCESS: 'CHANGE_STATUS_MEDICINE_SUCCESS',
  CHANGE_STATUS_MEDICINE_FAIL: 'CHANGE_STATUS_MEDICINE_FAIL',
  CHECK_CODE_SUCCESS: 'CHECK_CODE_SUCCESS',
  CHECK_CODE_FAIL: 'CHECK_CODE_FAIL',
  DELETE_MEDICINE_SUCCESS: 'DELETE_MEDICINE_SUCCESS',
  DELETE_MEDICINE_FAIL: 'DELETE_MEDICINE_FAIL',
  CREATE_MEDICINE_SUCCESS: 'CREATE_MEDICINE_SUCCESS',
  CREATE_MEDICINE_FAIL: 'CREATE_MEDICINE_FAIL',
  UPDATE_MEDICINE_SUCCESS: 'UPDATE_MEDICINE_SUCCESS',
  UPDATE_MEDICINE_FAIL: 'UPDATE_MEDICINE_TYPE_FAIL',
};

export const RESPONSE_MESSAGE = {
  CHANGE_STATUS_MEDICINE_SUCCESS: 'Thay đổi trạng thái Thuốc-Vật Tư thành công',
  CHANGE_STATUS_MEDICINE_FAIL: 'Thay đổi trạng thái Thuốc-Vật Tư thất bại',
  CHECK_CODE_SUCCESS: 'Mã Thuốc-Vật Tư Có Thể Sử Dụng',
  CHECK_CODE_FAIL: 'Mã Thuốc-Vật Tư Đã Tồn Tại',
  DELETE_MEDICINE_SUCCESS: 'Xoá Thuốc-Vật Tư thành công',
  DELETE_MEDICINE_FAIL: 'Xoá Thuốc-Vật Tư thất bại',
  CREATE_MEDICINE_SUCCESS: 'Tạo mới Thuốc-Vật Tư thành công',
  CREATE_MEDICINE_FAIL: 'Tạo mới Thuốc-Vật Tư thất bại',
  UPDATE_MEDICINE_SUCCESS: 'Cập nhật Thuốc-Vật Tư thành công',
  UPDATE_MEDICINE_FAIL: 'Cập nhật Thuốc-Vật Tư thất bại',
};

export const tableMedicine: any[] = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'code', label: 'Mã', minWidth: 120 },
  { id: 'name', label: 'Tên', minWidth: 120 },
  { id: 'usage_scope', label: 'Phạm vi sử dụng', minWidth: 150 },
  { id: 'type', label: 'Loại vật tư', minWidth: 150 },
  { id: 'data_type', label: 'Loại', minWidth: 120 },
  { id: 'actions', label: 'Chức năng', minWidth: 170 },
];
