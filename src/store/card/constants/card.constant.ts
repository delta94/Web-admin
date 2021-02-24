export const RESPONSE_CONSTANT = {
  EXPORT_CARD_SUCCESS: 'EXPORT_CARD_SUCCESS',
  EXPORT_CARD_FAIL: 'EXPORT_CARD_FAIL',
  REGISTER_CARD_SUCCESS: 'REGISTER_CARD_SUCCESS',
  REGISTER_CARD_FAIL: 'REGISTER_CARD_FAIL',
  USE_CARD_SUCCESS: 'USE_CARD_SUCCESS',
  USE_CARD_FAIL: 'USE_CARD_FAIL',
  FORMAT_CARD_SUCCESS: 'FORMAT_CARD_SUCCESS',
  FORMAT_CARD_FAIL: 'FORMAT_CARD_FAIL',
  RETURN_PAYMENT_SUCCESS: 'RETURN_PAYMENT_SUCCESS',
  RETURN_PAYMENT_FAIL: 'RETURN_PAYMENT_FAIL',
  CANCEL_PAYMENT_SUCCESS: 'CANCEL_PAYMENT_SUCCESS',
  CANCEL_PAYMENT_FAIL: 'CANCEL_PAYMENT_FAIL',
  BALANCE_SUCCESS: 'BALANCE_SUCCESS',
  BALANCE_FAIL: 'BALANCE_FAIL',
  NOT_FOUND_WITH_PATIENT: 'NOT_FOUND_WITH_PATIENT',
  PATIENT_NOT_REGISTER_CARD: 'PATIENT_NOT_REGISTER_CARD',
  NOT_FOUND_WITH_ID: 'NOT_FOUND_WITH_ID',
  EXIST_CARD: 'EXIST_CARD',
  CANCEL_DEAL_SUCCESS: 'CANCEL_DEAL_SUCCESS',
  HISTORY_SEARCH_FAIL: 'HISTORY_SEARCH_FAIL',
  SELECT_TYPE_PAYMEN: 'SELECT_TYPE_PAYMEN',
  ENTER_OR_SELECT_VALUE: 'ENTER_OR_SELECT_VALUE',
};

export const RESPONSE_MESSAGE = {
  EXPORT_CARD_SUCCESS: 'Xuất file thành công',
  EXPORT_CARD_FAIL: 'Xuất file thất bại',
  REGISTER_CARD_SUCCESS: 'Gán thẻ cho bệnh nhân thành công',
  REGISTER_CARD_FAIL: 'Gán thẻ cho bệnh nhân thất Bại',
  USE_CARD_SUCCESS: 'Thẻ có thể sử dụng',
  USE_CARD_FAIL: 'Thẻ đã được gán cho bệnh nhân khác',
  FORMAT_CARD_SUCCESS: 'Thẻ đúng định dạng',
  FORMAT_CARD_FAIL: 'Thẻ không đúng định dạng',
  RETURN_PAYMENT_SUCCESS: 'Thực hiện trả thẻ thành công',
  RETURN_PAYMENT_FAIL: 'Thực hiện trả thẻ thất bại',
  CANCEL_PAYMENT_SUCCESS: 'Huỷ giao dịch thành công',
  CANCEL_PAYMENT_FAIL: 'Huỷ giao dịch thất bại',
  BALANCE_SUCCESS: '',
  BALANCE_FAIL: 'Không thể trả thẻ khi chưa thực hiện tất toán',
  EXIST_CARD: 'Thẻ đã được gán cho bệnh nhân khác',
  PATIENT_NOT_REGISTER_CARD: 'Bệnh nhân chưa đăng ký thẻ',
  CANCEL_DEAL_SUCCESS: 'Hủy giao dịch thành công',
  HISTORY_SEARCH_FAIL: 'Vui lòng nhập thông tin để tìm kiếm',
  SELECT_TYPE_PAYMEN: 'Vui lòng chọn phương thức nạp tiền',
  ENTER_OR_SELECT_VALUE: 'Vui lòng nhập hoặc chọn mệnh giá tiền',
};

export const columns = [
  { id: 'no', label: '#', minWidth: 30 },
  { id: 'type', label: 'Chức năng', minWidth: 120 },
  {
    id: 'tekmedi_card_number',
    label: 'Mã thẻ',
    minWidth: 140,
    align: 'center',
  },
  { id: 'code', label: 'Mã bệnh nhân', minWidth: 140 },
  { id: 'name', label: 'Tên bệnh nhân', minWidth: 350 },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'id_card',
    label: 'CMND',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'time',
    label: 'Ngày giờ',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'manipulation',
    label: 'Thao tác',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Số tiền giao dịch',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'before_value',
    label: 'Số tiền trước khi giao dịch',
    minWidth: 220,
    align: 'right',
  },
  {
    id: 'after_value',
    label: 'Số tiền sau khi giao dịch',
    minWidth: 200,
    align: 'right',
  },
];

export const columnsHistoryCard = [
  {
    id: 'actions',
    label: 'Chức năng',
    minWidth: 130,
    align: 'center',
  },
  {
    id: 'tekmedi_card_number',
    label: 'Mã thẻ',
    minWidth: 140,
    align: 'center',
  },
  { id: 'code', label: 'Mã bệnh nhân', minWidth: 140 },
  { id: 'name', label: 'Tên bệnh nhân', minWidth: 300 },
  {
    id: 'gender',
    label: 'Giới tính',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'birthday',
    label: 'Ngày sinh',
    minWidth: 120,
    align: 'center',
  },
  {
    id: 'id_card',
    label: 'CMND',
    minWidth: 100,
    align: 'right',
  },
  {
    id: 'time',
    label: 'Ngày giờ',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'employee_name',
    label: 'Nhân viên',
    minWidth: 300,
    align: 'right',
  },
  {
    id: 'manipulation',
    label: 'Thao tác',
    minWidth: 200,
    align: 'right',
  },
  {
    id: 'price',
    label: 'Số tiền giao dịch',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'before_value',
    label: 'Số tiền trước khi giao dịch',
    minWidth: 220,
    align: 'right',
  },
  {
    id: 'after_value',
    label: 'Số tiền sau khi giao dịch',
    minWidth: 200,
    align: 'right',
  },
];

export const listPriceCharge: any[] = [
  {
    value: 100000,
    title: 100000,
  },
  {
    value: 500000,
    title: 500000,
  },
  {
    value: 1000000,
    title: 1000000,
  },
  {
    value: 1500000,
    title: 1500000,
  },
  {
    value: 2000000,
    title: 2000000,
  },
  {
    value: 2500000,
    title: 2500000,
  },
];

export const defaultHistoryCardTypes = [
  { value: 1, label: 'Ghi thẻ' },
  { value: 2, label: 'Nạp tiền' },
  { value: 3, label: 'Trả thẻ' },
  { value: 4, label: 'Mất thẻ phát/không phát mới' },
  { value: 7, label: 'Thanh toán tiền tạm ứng' },
  { value: 8, label: 'Hoàn tiền' },
  { value: 9, label: 'Thanh toán tiền dịch vụ' },
  { value: 10, label: 'Tất toán' },
  { value: 11, label: 'Phí phát thẻ mới' },
  { value: 12, label: 'Hủy nạp tiền' },
  { value: 13, label: 'Rút tiền' },
];

export enum CardTypes {
  REGISTER = 1,
  RECHARGE = 2,
  RETURN = 3,
  LOST = 4,
  CHARGE = 7,
  REFUND = 8,
  CHARGELIST = 9,
  FINNALYCHARGE = 10,
  CARDFEE = 11,
  CANCEL = 12,
  WITHDRAW = 13,
}
