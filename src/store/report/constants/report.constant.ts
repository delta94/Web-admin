export const columnListReport = [
  { id: '#', label: '#', minWidth: 70 },
  { id: 'type', label: 'Chức năng', minWidth: 120 },
  { id: 'tekmedi_card_number', label: 'Mã thẻ', minWidth: 150 },
  { id: 'code', label: 'Mã bệnh nhân', minWidth: 150 },
  { id: 'name', label: 'Tên bệnh nhân', minWidth: 200 },
  { id: 'gender', label: 'Giới tính', minWidth: 130 },
  { id: 'birthday', label: 'Ngày sinh', minWidth: 120 },
  { id: 'cmnd', label: 'CMND', minWidth: 100 },
  { id: 'time', label: 'Ngày giờ', minWidth: 120 },
  { id: 'employee_name', label: 'Nhân viên', minWidth: 250 },
  { id: 'manipulation', label: 'Thao tác', minWidth: 200 },
  { id: 'before_value', label: 'Số tiền trước khi giao dịch', minWidth: 230 },
  { id: 'price', label: 'Số tiên giao dịch', minWidth: 200 },
  { id: 'after_value', label: 'Số tiền sau khi giao dịch', minWidth: 200 },
];

export const RESPONSE_CONSTANT = {
  HISTORY_CARD: {
    CANCEL_DEAL_SUCCESS: 'CANCEL_DEAL_SUCCESS',
    CANCEL_DEAL_FAIL: 'CANCEL_DEAL_FAIL',
    EXPORT_FILE_HISTORY_CARD_SUCCESS: 'EXPORT_FILE_HISTORY_CARD',
    EXPORT_FILE_HISTORY_CARD_FAIL: 'EXPORT_FILE_HISTORY_CARD_FAIL',
  },
};

export const RESPONSE_MESSAGE = {
  HISTORY_CARD: {
    CANCEL_DEAL_SUCCESS: 'Hủy giao dịch thành công!',
    CANCEL_DEAL_FAIL: 'Hủy giao dịch thất bại!',
    EXPORT_FILE_HISTORY_CARD_SUCCESS:
      'Xuất danh sách nạp, trả, mất thẻ thành công!',
    EXPORT_FILE_HISTORY_CARD_FAIL: 'Xuất danh sách nạp, trả, mất thẻ thất bại!',
  },
};
export enum ButtonToolTip {
  INFOR = 'Xem Thông tin',
}
