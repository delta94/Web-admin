/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '80vh',
  },
  table: {
    minWidth: '100vw',
    overflowX: 'scroll',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  td_total: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#000',
  },
  td: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
  },
  red: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: 'red',
  },
  Green: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#00CD00',
  },
  Blue: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#3399ff',
  },
  SkyBlue: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#87CEEB',
  },
  Orchid: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#DA70D6',
  },
  Purple4: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#7D26CD',
  },
  Yellow: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#F09C42',
  },
  GreenYellow: {
    fontSize: '1.1rem',
    fontFamily: 'Roboto, sans-serif',
    color: '#FF34B3',
  },
  btn: {
    textAlign: 'center',
  },
});
export const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
      marginTop: '10px',
    },
  }),
);
export const columnListTransaction = [
  { id: 'type', label: 'Chức năng', minWidth: 120 },
  { id: 'tekmedi_card_number', label: 'Mã thẻ', minWidth: 150 },
  { id: 'patient_code', label: 'Mã bệnh nhân', minWidth: 140 },
  { id: 'registered_number', label: 'Số tiếp nhận', minWidth: 130 },
  { id: 'full_name', label: 'Họ và tên', minWidth: 250 },
  { id: 'gender', label: 'Giới tính', minWidth: 120 },
  { id: 'birthday', label: 'Ngày sinh', minWidth: 120 },
  { id: 'total_money_required', label: 'Tổng tiền yêu cầu', minWidth: 170 },
  { id: 'total_money_hold', label: 'Tổng tiền thực tế', minWidth: 170 },
  { id: 'total_payment', label: 'Tổng tiền tất toán', minWidth: 170 },
  { id: 'created_date', label: 'Ngày giờ', minWidth: 120 },
  { id: 'status', label: 'Trạng thái', minWidth: 120 },
];
export const columnsListTransactionDetail = [
  {
    id: '#',
    label: '#',
    minWidth: 50,
  },
  {
    id: 'id',
    label: 'Mã giao dịch TEK',
    minWidth: 350,
  },
  {
    id: 'registered_code',
    label: 'Số tiếp nhận',
    minWidth: 150,
  },
  {
    id: 'registered_date',
    label: 'Ngày đăng ký',
    minWidth: 150,
  },
  {
    id: 'created_date',
    label: 'Ngày giao dịch',
    minWidth: 200,
  },
  {
    id: 'employee',
    label: 'Nhân viên',
    minWidth: 150,
  },
  {
    id: 'store',
    label: 'Phòng ban',
    minWidth: 120,
  },
  {
    id: 'amount',
    label: 'Số tiền thực tế',
    minWidth: 150,
  },
  {
    id: 'status_name',
    label: 'Trạng thái',
    minWidth: 120,
  },
  {
    id: 'type_name',
    label: 'Loại',
    minWidth: 120,
  },
  {
    id: 'message',
    label: 'Lý do',
    minWidth: 110,
  },
  {
    id: 'function',
    label: 'Chức năng',
    minWidth: 120,
  },
];
export const columnsListModalTransactionDetail = [
  {
    id: '#',
    label: '#',
    minWidth: 70,
  },
  {
    id: 'service_id',
    label: 'Mã dịch vụ / thuốc',
    minWidth: 200,
  },
  {
    id: 'service_name',
    label: 'Tên dịch vụ / thuốc',
    minWidth: 250,
  },
  {
    id: 'amount',
    label: 'Số tiền thực tế',
    minWidth: 150,
  },
];
export enum ButtonToolTip {
  INFOR = 'Xem Thông tin',
}
