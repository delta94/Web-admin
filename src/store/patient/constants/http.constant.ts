/* eslint-disable @typescript-eslint/no-unused-vars */
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
    root: {
      width: '100%',
    },
    container: {
      minHeight: 700,
    },
  }),
);

export enum DialogKey {
  DELETE_PATIENT = 'DELETE_PATIENT',
  CHANGE_STATUS_PATIENT = 'CHANGE_STATUS_PATIENT',
  UPDATE_PATIENT = 'UPDATE_PATIENT',
  CREATE_PATIENT = 'CREATE_PATIENT',
}

export enum DilogTitle {
  DELETE_PATIENT = 'Bạn có chắc chắn muốn xóa bệnh nhân này?',
  CHANGE_STATUS_PATIENT = 'Bạn có chắc chắn thay đổi trạng thái?',
}

export enum PatientStatus {
  ACTIVE = 'Đã Kích Hoạt',
  IN_ACTIVE = 'Chưa Kích Hoạt',
}

export enum ButtonToolTip {
  EDIT = 'Chỉnh Sửa',
  DELETE = 'Xóa',
  CHANGE_STATUS = 'Thay Đổi Trạng Thái',
}

export enum LocationTypes {
  PROVINCE = 'PROVINCE',
  DIST = 'DIST',
  WARD = 'WARD',
}
