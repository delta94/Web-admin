export const PatientApiRoutes = {
  PATIENT: {
    GET_PATIENT_WITH_CODE: '/api/Patient/code',
    GET_PATIENT_WITH_QR_CODE: '/api/Patient/qrcode',
    GET_LIST_PATIENT: '/api/Patient/all',
    GET_BY_TYPE: '/api/patient/type',
    GET_BY_HEALTH_ID: '/api/patient',
    GET_BY_CARD_NUMBER: '/api/patient/get-by-card-number',
    DELETE_PATIENT: '/api/Patient',
    CHANGE_STATUS: '/api/Patient/change-active',
    FIND_PATIENT_BY_ID: '/api/Patient/find',
    CHECK_UNIQUE_CODE: '/api/Patient/check-code-unique',
    CREATE_PATIENT: '/api/Patient/add',
    UPDATE_PATIENT: '/api/Patient/update',
    EXPORT_LIST_PATIENT: '/api/Patient/export',
    GET_BALANCE_PATIENT: '/api/Patient/balance',
    EXPORT_LIST_BALANCE_PATIENT: '/api/Patient/export-balance',
    ADD_TEMP_PATIENT: '/api/TempPatient',
  },
};

export const RESPONSE_CONSTANT = {
  FIND_BY_CODE_SUCCESS: 'FIND_BY_CODE_SUCCESS',
  FIND_BY_CODE_FAIL: 'FIND_BY_CODE_FAIL',
  PATIENT_CODE_CAN_USE_SUCCESS: 'PATIENT_CODE_CAN_USE_SUCCESS',
  PATIENT_CODE_CAN_USE_FAIL: 'PATIENT_CODE_CAN_USE_FAIL',
  CREATE_PATIENT_SUCCESS: 'CREATE_PATIENT_SUCCESS',
  CREATE_PATIENT_FAIL: 'CREATE_PATIENT_FAIL',
  UPDATE_PATIENT_SUCCESS: 'UPDATE_PATIENT_SUCCESS',
  UPDATE_PATIENT_FAIL: 'UPDATE_PATIENT_FAIL',
  CHANGE_PATIENT_STATUS_SUCCESS: 'CHANGE_PATIENT_STATUS_SUCCESS',
  CHANGE_PATIENT_STATUS_FAIL: 'CHANGE_PATIENT_STATUS_FAIL',
  DELETE_PATIENT_SUCCESS: 'DELETE_PATIENT_SUCCESS',
  DELETE_PATIENT_FAIL: 'DELETE_PATIENT_FAIL',
  EXPORT_PATIENT_SUCCESS: 'EXPORT_PATIENT_SUCCESS',
  EXPORT_PATIENT_FAIL: 'EXPORT_PATIENT_FAIL',
  EXPORT_PATIENT_BALANCE_SUCCESS: 'EXPORT_PATIENT_BALANCE_SUCCESS',
  EXPORT_PATIENT_BALANCE_FAIL: 'EXPORT_PATIENT_BALANCE_FAIL',
  PATIENT_CODE_EXIST_SUCCESS: 'PATIENT_CODE_EXIST_SUCCESS',
  PATIENT_CODE_EXIST_FAIL: 'PATIENT_CODE_EXIST_FAIL',
  PATIENT_EXIST_CARD: 'PATIENT_EXIST_CARD',
  KEY_UP_HEALTH_CODE: 'KEY_UP_HEALTH_CODE',
  KEY_UP_PATIENT_CODE: 'KEY_UP_PATIENT_CODE',
  EMPTY_PATIENT_INFO: 'EMPTY_PATIENT_INFO',
  SELECT_PATIENT_TYPE: 'SELECT_PATIENT_TYPE',
  REGISTER_PATIENT_SUCCESS: 'REGISTER_PATIENT_SUCCESS',
  REGISTER_PATIENT_FAIL: 'REGISTER_PATIENT_FAIL',
  GET_PATIENT_QR_CODE_SUCCESS: 'GET_PATIENT_QR_CODE_SUCCESS',
  GET_PATIENT_QR_CODE_FAIL: 'GET_PATIENT_QR_CODE_FAIL',
  CHECK_FINALLY_FAIL: 'CHECK_FINALLY_FAIL',
};

export const RESPONSE_MESSAGE = {
  FIND_BY_CODE_SUCCESS: 'Tìm bệnh nhân thành công',
  FIND_BY_CODE_FAIL: 'Mã bệnh nhân không tồn tại',
  GET_PATIENT_QR_CODE_FAIL: 'Không có thông tin bệnh nhân',
  PATIENT_CODE_CAN_USE_SUCCESS: 'Mã bệnh nhân có thể sử dụng',
  PATIENT_CODE_CAN_USE_FAIL: 'Mã bệnh nhân không tồn tại',
  CREATE_PATIENT_SUCCESS: 'Thêm bệnh nhân thành công',
  UPDATE_PATIENT_SUCCESS: 'Cập nhật thông tin bệnh nhân thành công',
  CHANGE_PATIENT_STATUS_SUCCESS: 'Thay đổi trạng thái thành công',
  DELETE_PATIENT_SUCCESS: 'Xóa bệnh nhân thành công',
  EXPORT_PATIENT_SUCCESS: 'Xuất danh sách bệnh nhân thành công',
  EXPORT_PATIENT_BALANCE_SUCCESS:
    'Xuất danh sách thống kê số dư bệnh nhân thành công',

  PATIENT_CODE_EXIST:
    'Mã bệnh nhân đã tồn tại trong hệ thống. Vui lòng thử lại !',
  CREATE_PATIENT_FAIL: 'Thêm bệnh nhân thất bại',
  UPDATE_PATIENT_FAIL: 'Cập nhật thông tin bệnh nhân thất bại',
  CHANGE_PATIENT_STATUS_FAIL: 'Thay đổi trạng thái thất bại',
  DELETE_PATIENT_FAIL: 'Xóa bệnh nhân thất bại',
  EXPORT_PATIENT_FAIL: 'Xuất danh sách bệnh nhân thất bại',
  EXPORT_PATIENT_BALANCE_FAIL:
    'Xuất danh sách thống kê số dư bệnh nhân thất bại',
  PATIENT_CODE_EXIST_FAIL:
    'Mã bệnh nhân đã tồn tại trong hệ thống. Vui lòng thử lại !',
  PATIENT_EXIST_CARD: 'Bệnh nhân đã được ghi thẻ',
  KEY_UP_HEALTH_CODE: 'Vui lòng nhập mã BHYT',
  KEY_UP_PATIENT_CODE: 'Vui lòng nhập mã bệnh nhân',
  EMPTY_PATIENT_INFO: 'Không có thông tin bệnh nhân',
  SELECT_PATIENT_TYPE: 'Chọn loại đối tượng ưu tiên',
  REGISTER_PATIENT_SUCCESS: 'Đăng ký bệnh nhân ưu tiên thành công',
  REGISTER_PATIENT_FAIL: 'Đăng ký bệnh nhân ưu tiên thất bại',
  CHECK_FINALLY_FAIL: 'Không thể trả thẻ khi bệnh nhân chưa thực hiện tất toán',
};

export const defaultGetListPatient = [
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
  {
    data: 'tekmedi_card_number',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'tekmedi_uid',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'full_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'gender',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'birthday',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'province_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'district_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'ward_name',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'ic_number',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'ic_issued_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'ic_issued_place',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'phone',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'top_up_amount',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'payment_amount',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'balance',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'health_insurance_number',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'health_insurance_first_place_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'health_insurance_first_place',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'health_insurance_issued_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'health_insurance_expired_date',
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

export const defaultExportListPatient = {
  employeeId: '',
  employeeName: '',
  draw: 0,
  start: 0,
  length: 0,
  order: [
    {
      column: 0,
      dir: '',
    },
  ],
  columns: [
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
  ],
  search: {
    value: '',
    regex: true,
  },
};

export const defaultCreatePatientId = {
  Id: '00000000-0000-0000-0000-000000000000',
};

export const columnsListPatient = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'tekmedi_card_number', label: 'Mã thẻ', minWidth: 120 },
  { id: 'tekmedi_id', label: 'Tekmedi UID', minWidth: 170 },
  { id: 'code', label: 'Mã bệnh nhân', minWidth: 150 },
  { id: 'full_name', label: 'Họ và tên', minWidth: 200 },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 120,
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 120,
  },
  {
    id: 'province_name',
    label: 'Tỉnh/TP',
    minWidth: 170,
  },
  {
    id: 'district_name',
    label: 'Quận/Huyện',
    minWidth: 200,
  },
  {
    id: 'ward_name',
    label: 'Phường/xã/thị trấn',
    minWidth: 200,
  },
  {
    id: 'identity_card_number',
    label: 'CMND',
    minWidth: 100,
  },
  {
    id: 'identity_card_number_issued_date',
    label: 'Ngày cấp',
    minWidth: 150,
  },
  {
    id: 'identity_card_number_issued_place',
    label: 'Nơi cấp',
    minWidth: 120,
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    minWidth: 140,
  },
  {
    id: 'payment_amount',
    label: 'Số tiền đã nạp',
    minWidth: 170,
  },
  {
    id: 'top_up_amount',
    label: 'Số tiền đã trừ',
    minWidth: 170,
  },
  {
    id: 'balance',
    label: 'Số tiền trong thẻ',
    minWidth: 170,
  },
  {
    id: 'health_insurance_number',
    label: 'Mã BHYT',
    minWidth: 170,
  },
  {
    id: 'health_insurance_first_place_code',
    label: 'Mã đơn vị',
    minWidth: 170,
  },
  {
    id: 'health_insurance_first_place',
    label: 'Tên đơn vị',
    minWidth: 170,
  },
  {
    id: 'health_insurance_issued_date',
    label: 'Ngày bắt đầu',
    minWidth: 170,
  },
  {
    id: 'health_insurance_expired_date',
    label: 'Ngày kết thúc',
    minWidth: 170,
  },
  {
    id: 'is_active',
    label: 'Trạng Thái',
    minWidth: 130,
  },
  {
    id: 'actions',
    label: 'Chức năng',
    minWidth: 170,
  },
];

export const columnsListPatientBalance = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'tekmedi_card_number', label: 'Mã thẻ', minWidth: 120 },
  { id: 'tekmedi_id', label: 'Tekmedi UID', minWidth: 170 },
  { id: 'code', label: 'Mã bệnh nhân', minWidth: 150 },
  { id: 'full_name', label: 'Họ và tên', minWidth: 200 },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 85,
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 120,
  },
  {
    id: 'identity_card_number',
    label: 'CMND',
    minWidth: 100,
  },
  {
    id: 'phone',
    label: 'Số điện thoại',
    minWidth: 120,
  },
  {
    id: 'top_up_amount',
    label: 'Số tiền đã nạp',
    minWidth: 170,
  },
  {
    id: 'payment_amount',
    label: 'Số tiền đã trừ',
    minWidth: 170,
  },
  {
    id: 'balance',
    label: 'Số tiền trong thẻ',
    minWidth: 170,
  },
];

export const PatientPriorityTypes = [
  { valueType: 'CC', label: 'Ưu Tiên CC', value: 'Ưu Tiên CC' },
  { valueType: 'CK', label: 'Ưu Tiên CK', value: 'Ưu Tiên CK' },
  { valueType: 'KC', label: 'Ưu Tiên KC', value: 'Ưu Tiên KC' },
  { valueType: '06', label: 'Ưu Tiên 06', value: 'Ưu Tiên 06' },
  { valueType: '80', label: 'Ưu Tiên 80', value: 'Ưu Tiên 80' },
  { valueType: 'KT', label: 'Ưu Tiên KT', value: 'Ưu Tiên KT' },
  { valueType: 'BN', label: 'Ưu Tiên BN', value: 'Ưu Tiên BN' },
  { valueType: 'GT', label: 'Ưu Tiên GT', value: 'Ưu Tiên GT' },
];
