export const QueueApiRoute = {
  GET_ALL_QUEUE_PATIENT_ROOM: '/api/QueueNumber/get-patients-room/all',
  EXPORT_QUEUE_PATIENT_ROOM: '/api/QueueNumber/export-patients-room',
  REMOVE_QUEUE_PATIENT_ROOM: '/api/QueueNumber/remove-patients-room',
  GET_QUEUE_BY_PATIENT_CODE: '/api/QueueNumber/get-rooms',
  REGISTER_PRIORITY_PATIENT: '/api/QueueNumber/generate/type',
  REGISTER_STT: '/api/QueueNumber/room/register',
  EXPORT_STT: '/api/QueueNumber/room/export',
  GET_ALL_STT: '/api/QueueNumber/room/all',
};

export const RESPONSE_CONSTANT = {
  EXPORT_STT_SUCCESS: 'EXPORT_STT_SUCCESS',
  EXPORT_STT_FAIL: 'EXPORT_STT_FAIL',
};

export const RESPONSE_MESSAGE = {
  EXPORT_STT_SUCCESS: 'Xuất file số thứ tự thành công',
  EXPORT_STT_FAIL: 'Xuất file số thứ tự thất bại',
};

export const tableManagementStt: any = [
  { id: 'no', label: '#', minWidth: 50 },
  { id: 'created_date', label: 'Ngày tạo', minWidth: 120 },
  { id: 'patient_code', label: 'Mã bệnh nhân', minWidth: 150 },
  { id: 'full_name', label: 'Họ và tên', minWidth: 150 },
  { id: 'phone_number', label: 'Số điện thoại', minWidth: 150 },
  { id: 'birthday', label: 'Ngày sinh', minWidth: 150 },
  { id: 'gender', label: 'Giới tính', minWidth: 150 },
  { id: 'province_name', label: 'Tỉnh/Thành phố', minWidth: 150 },
  { id: 'district_name', label: 'Quận/Huyện', minWidth: 150 },
  { id: 'ward_name', label: 'Phường/Xã', minWidth: 150 },
  {
    id: 'registered_date',
    label: 'Ngày đăng ký khám',
    minWidth: 200,
  },
  { id: 'number', label: 'Số thứ tự', minWidth: 150 },
  { id: 'department_name', label: 'Phòng khám', minWidth: 200 },
];
