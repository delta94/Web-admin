export const ReceptionApiRoute = {
  GET_RECEPTION_BY_PATIENT_CODE: '/api/Reception/patient/',
  GET_ALL_RECEPTION: '/api/Reception/get/all',
  EXPORT_RECEPTION: '/api/Reception/export',
  CHANGE_FINISHED: '/api/Reception/change-finished',
  GET_ALL_REASON: '/api/Reception/get-reason/all',
  CHECK_FINALLY: '/api/Reception/check/finally',
};

export const RESPONSE_CONSTANT = {
  SUCCESS: {
    CHANGE_FINISHED_SUCCESS: 'CHANGE_FINISHED_SUCCESS',
    EXPORT_RECEPTION_SUCCESS: 'EXPORT_RECEPTION_SUCCESS',
  },
};

export const RESPONSE_MESSAGE = {
  SUCCESS: {
    CHANGE_FINISHED_SUCCESS: 'Thay đổi trạng thái thành công',
    EXPORT_RECEPTION_SUCCESS: 'Xuất file thành công',
  },
};

export const defaultFilterReception = [
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
    data: 'patient_code',
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
    data: 'registered_code',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'created_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'registered_date',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'type',
    name: '',
    searchable: true,
    orderable: false,
    search: {
      value: '',
      regex: false,
    },
  },
  {
    data: 'is_finished',
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

export const defaultOrderFilterReception = [
  {
    column: 0,
    dir: '',
  },
];

export const columnsListReception = [
  { id: '#', label: '#', minWidth: 70 },
  { id: 'patient_code', label: 'Mã bệnh nhân', minWidth: 150 },
  { id: 'full_name', label: 'Tên bệnh nhân	', minWidth: 250 },
  { id: 'birthday', label: 'Ngày sinh	', minWidth: 120 },
  { id: 'gender', label: 'Giới tính', minWidth: 150 },
  { id: 'registered_code', label: 'Số tiếp nhận', minWidth: 150 },
  { id: 'registered_date', label: 'Ngày đăng ký', minWidth: 200 },
  { id: 'created_date', label: 'Ngày tiếp nhận', minWidth: 200 },
  { id: 'type', label: 'Trạng thái', minWidth: 200 },
  { id: 'is_finished', label: 'Hoàn thành', minWidth: 150 },
  { id: 'detail', label: 'Chi tiết thay đổi', minWidth: 200 },
];

export const columnsListReceptionDetail = [
  { id: '#', label: '#', minWidth: 70 },
  { id: 'reason', label: 'Lý do thay đổi', minWidth: 200 },
  { id: 'updated_date', label: 'Ngày thay đổi', minWidth: 150 },
  { id: 'updated_by', label: 'Người thay đổi', minWidth: 150 },
];

export enum ReceptionStatus {
  ACTIVE = 'Đã Kích Hoạt',
  IN_ACTIVE = 'Chưa Kích Hoạt',
}
export enum ButtonToolTip {
  INFOR = 'Xem Chi Tiết',
}
