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
  FIND_BY_CODE_SUCCESS: 'T??m b???nh nh??n th??nh c??ng',
  FIND_BY_CODE_FAIL: 'M?? b???nh nh??n kh??ng t???n t???i',
  GET_PATIENT_QR_CODE_FAIL: 'Kh??ng c?? th??ng tin b???nh nh??n',
  PATIENT_CODE_CAN_USE_SUCCESS: 'M?? b???nh nh??n c?? th??? s??? d???ng',
  PATIENT_CODE_CAN_USE_FAIL: 'M?? b???nh nh??n kh??ng t???n t???i',
  CREATE_PATIENT_SUCCESS: 'Th??m b???nh nh??n th??nh c??ng',
  UPDATE_PATIENT_SUCCESS: 'C???p nh???t th??ng tin b???nh nh??n th??nh c??ng',
  CHANGE_PATIENT_STATUS_SUCCESS: 'Thay ?????i tr???ng th??i th??nh c??ng',
  DELETE_PATIENT_SUCCESS: 'X??a b???nh nh??n th??nh c??ng',
  EXPORT_PATIENT_SUCCESS: 'Xu???t danh s??ch b???nh nh??n th??nh c??ng',
  EXPORT_PATIENT_BALANCE_SUCCESS:
    'Xu???t danh s??ch th???ng k?? s??? d?? b???nh nh??n th??nh c??ng',

  PATIENT_CODE_EXIST:
    'M?? b???nh nh??n ???? t???n t???i trong h??? th???ng. Vui l??ng th??? l???i !',
  CREATE_PATIENT_FAIL: 'Th??m b???nh nh??n th???t b???i',
  UPDATE_PATIENT_FAIL: 'C???p nh???t th??ng tin b???nh nh??n th???t b???i',
  CHANGE_PATIENT_STATUS_FAIL: 'Thay ?????i tr???ng th??i th???t b???i',
  DELETE_PATIENT_FAIL: 'X??a b???nh nh??n th???t b???i',
  EXPORT_PATIENT_FAIL: 'Xu???t danh s??ch b???nh nh??n th???t b???i',
  EXPORT_PATIENT_BALANCE_FAIL:
    'Xu???t danh s??ch th???ng k?? s??? d?? b???nh nh??n th???t b???i',
  PATIENT_CODE_EXIST_FAIL:
    'M?? b???nh nh??n ???? t???n t???i trong h??? th???ng. Vui l??ng th??? l???i !',
  PATIENT_EXIST_CARD: 'B???nh nh??n ???? ???????c ghi th???',
  KEY_UP_HEALTH_CODE: 'Vui l??ng nh???p m?? BHYT',
  KEY_UP_PATIENT_CODE: 'Vui l??ng nh???p m?? b???nh nh??n',
  EMPTY_PATIENT_INFO: 'Kh??ng c?? th??ng tin b???nh nh??n',
  SELECT_PATIENT_TYPE: 'Ch???n lo???i ?????i t?????ng ??u ti??n',
  REGISTER_PATIENT_SUCCESS: '????ng k?? b???nh nh??n ??u ti??n th??nh c??ng',
  REGISTER_PATIENT_FAIL: '????ng k?? b???nh nh??n ??u ti??n th???t b???i',
  CHECK_FINALLY_FAIL: 'Kh??ng th??? tr??? th??? khi b???nh nh??n ch??a th???c hi???n t???t to??n',
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
  { id: 'tekmedi_card_number', label: 'M?? th???', minWidth: 120 },
  { id: 'tekmedi_id', label: 'Tekmedi UID', minWidth: 170 },
  { id: 'code', label: 'M?? b???nh nh??n', minWidth: 150 },
  { id: 'full_name', label: 'H??? v?? t??n', minWidth: 200 },
  {
    id: 'gender',
    label: 'Gi???i t??nh',
    minWidth: 120,
  },
  {
    id: 'birthday',
    label: 'Ng??y sinh',
    minWidth: 120,
  },
  {
    id: 'province_name',
    label: 'T???nh/TP',
    minWidth: 170,
  },
  {
    id: 'district_name',
    label: 'Qu???n/Huy???n',
    minWidth: 200,
  },
  {
    id: 'ward_name',
    label: 'Ph?????ng/x??/th??? tr???n',
    minWidth: 200,
  },
  {
    id: 'identity_card_number',
    label: 'CMND',
    minWidth: 100,
  },
  {
    id: 'identity_card_number_issued_date',
    label: 'Ng??y c???p',
    minWidth: 150,
  },
  {
    id: 'identity_card_number_issued_place',
    label: 'N??i c???p',
    minWidth: 120,
  },
  {
    id: 'phone',
    label: 'S??? ??i???n tho???i',
    minWidth: 140,
  },
  {
    id: 'payment_amount',
    label: 'S??? ti???n ???? n???p',
    minWidth: 170,
  },
  {
    id: 'top_up_amount',
    label: 'S??? ti???n ???? tr???',
    minWidth: 170,
  },
  {
    id: 'balance',
    label: 'S??? ti???n trong th???',
    minWidth: 170,
  },
  {
    id: 'health_insurance_number',
    label: 'M?? BHYT',
    minWidth: 170,
  },
  {
    id: 'health_insurance_first_place_code',
    label: 'M?? ????n v???',
    minWidth: 170,
  },
  {
    id: 'health_insurance_first_place',
    label: 'T??n ????n v???',
    minWidth: 170,
  },
  {
    id: 'health_insurance_issued_date',
    label: 'Ng??y b???t ?????u',
    minWidth: 170,
  },
  {
    id: 'health_insurance_expired_date',
    label: 'Ng??y k???t th??c',
    minWidth: 170,
  },
  {
    id: 'is_active',
    label: 'Tr???ng Th??i',
    minWidth: 130,
  },
  {
    id: 'actions',
    label: 'Ch???c n??ng',
    minWidth: 170,
  },
];

export const columnsListPatientBalance = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'tekmedi_card_number', label: 'M?? th???', minWidth: 120 },
  { id: 'tekmedi_id', label: 'Tekmedi UID', minWidth: 170 },
  { id: 'code', label: 'M?? b???nh nh??n', minWidth: 150 },
  { id: 'full_name', label: 'H??? v?? t??n', minWidth: 200 },
  {
    id: 'gender',
    label: 'Gi???i t??nh',
    minWidth: 85,
  },
  {
    id: 'birthday',
    label: 'Ng??y sinh',
    minWidth: 120,
  },
  {
    id: 'identity_card_number',
    label: 'CMND',
    minWidth: 100,
  },
  {
    id: 'phone',
    label: 'S??? ??i???n tho???i',
    minWidth: 120,
  },
  {
    id: 'top_up_amount',
    label: 'S??? ti???n ???? n???p',
    minWidth: 170,
  },
  {
    id: 'payment_amount',
    label: 'S??? ti???n ???? tr???',
    minWidth: 170,
  },
  {
    id: 'balance',
    label: 'S??? ti???n trong th???',
    minWidth: 170,
  },
];

export const PatientPriorityTypes = [
  { valueType: 'CC', label: '??u Ti??n CC', value: '??u Ti??n CC' },
  { valueType: 'CK', label: '??u Ti??n CK', value: '??u Ti??n CK' },
  { valueType: 'KC', label: '??u Ti??n KC', value: '??u Ti??n KC' },
  { valueType: '06', label: '??u Ti??n 06', value: '??u Ti??n 06' },
  { valueType: '80', label: '??u Ti??n 80', value: '??u Ti??n 80' },
  { valueType: 'KT', label: '??u Ti??n KT', value: '??u Ti??n KT' },
  { valueType: 'BN', label: '??u Ti??n BN', value: '??u Ti??n BN' },
  { valueType: 'GT', label: '??u Ti??n GT', value: '??u Ti??n GT' },
];
