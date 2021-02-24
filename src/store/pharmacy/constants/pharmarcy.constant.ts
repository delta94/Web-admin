export const PharmacyApiRoute = {
  GET_ALL: '/api/Pharmacy/all',
  GET_BY_ID: '/api/Pharmacy/find',
  CREATE: '/api/Pharmacy/add',
  CHANGE_STATUS: '/api/Pharmacy/change-active',
  UPDATE: '/api/Pharmacy/update',
  DELETE: '/api/Pharmacy/delete',
  CHECK_UNIQUE_CODE: '/api/Pharmacy/check-code-unique',
};

export const RESPONSE_CONSTANT = {
  CHANGE_STATUS_PHARMACY_SUCCESS: 'CHANGE_STATUS_PHARMACY_SUCCESS',
  CHANGE_STATUS_PHARMACY_FAIL: 'CHANGE_STATUS_PHARMACY_FAIL',
  CHECK_CODE_SUCCESS: 'CHECK_CODE_SUCCESS',
  CHECK_CODE_FAIL: 'CHECK_CODE_FAIL',
  DELETE_PHARMACY_SUCCESS: 'DELETE_PHARMACY_SUCCESS',
  DELETE_PHARMACY_FAIL: 'DELETE_PHARMACY_FAIL',
  CREATE_PHARMACY_SUCCESS: 'CREATE_PHARMACY_SUCCESS',
  CREATE_PHARMACY_FAIL: 'CREATE_PHARMACY_FAIL',
  UPDATE_PHARMACY_SUCCESS: 'UPDATE_PHARMACY_SUCCESS',
  UPDATE_PHARMACY_FAIL: 'UPDATE_PHARMACY_FAIL',
};

export const RESPONSE_MESSAGE = {
  CHANGE_STATUS_PHARMACY_SUCCESS: 'Thay Đổi Trạng Thái Nhà Thuốc Thành Công',
  CHANGE_STATUS_PHARMACY_FAIL: 'Thay Đổi Trạng Thái Nhà Thuốc Thất Bại',
  CHECK_CODE_SUCCESS: 'Mã Nhà Thuốc Có Thể Sử Dụng',
  CHECK_CODE_FAIL: 'Mã Nhà Thuốc Đã Tồn Tại',
  DELETE_PHARMACY_SUCCESS: 'Xoá Nhà Thuốc Thành Công',
  DELETE_PHARMACY_FAIL: 'Xoá Nhà Thuốc Thất Bại',
  CREATE_PHARMACY_SUCCESS: 'Tạo Mới Nhà Thuốc Thành Công',
  CREATE_PHARMACY_FAIL: 'Tạo Mới Nhà Thuốc Thất Bại',
  UPDATE_PHARMACY_SUCCESS: 'Cập Nhật Nhà Thuốc Thành Công',
  UPDATE_PHARMACY_FAIL: 'Cập Nhật Nhà Thuốc Thất Bại',
};

export const tablePharmacy: any[] = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'code', label: 'Mã', minWidth: 120 },
  { id: 'name', label: 'Tên', minWidth: 120 },
  { id: 'type', label: 'Loại', minWidth: 150 },
  { id: 'stores', label: 'Quầy thuốc', minWidth: 120 },
  { id: 'actions', label: 'Chức năng', minWidth: 170 },
];
