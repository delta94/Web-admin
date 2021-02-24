/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import * as _ from 'lodash';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import propTypes from 'prop-types';
import { DialogKey } from 'store/patient/constants/http.constant';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    paddingBottom: 0,
    '& h2': {
      fontSize: '1.3rem !important',
      fontWeight: 'bold',
    },
  },
});

enum ButtonTitle {
  CANCEL = 'Hủy',
  DELETE = 'Xóa',
  UPDATE = 'Cập Nhật',
  SAVE = 'Xác Nhận',
}

interface ModalProps {
  title: string;
  keyConfirm: string;
  open: boolean;
  onClose: () => void;
  confirmMethod: () => any;
  rejectMethod?: any;
  other?: any;
}

const setConfirmTitle = (keyConfirm: string): ButtonTitle => {
  switch (keyConfirm) {
    case DialogKey.DELETE_PATIENT:
      return ButtonTitle.DELETE;
    case DialogKey.CHANGE_STATUS_PATIENT:
      return ButtonTitle.UPDATE;
    default:
      return ButtonTitle.SAVE;
  }
};

export const ModalConfirm = ({
  title,
  keyConfirm,
  open,
  onClose,
  confirmMethod,
  other = {},
  rejectMethod,
}: ModalProps) => {
  const classes = useStyles();
  const [confirm, setConfirm] = useState(false);
  const [buttonTitle, setButtonTitle] = useState(setConfirmTitle(keyConfirm));

  const handleClose = () => {
    setConfirm(false);
    onClose();
  };
  const onConfirm = () => {
    setConfirm(true);
    onClose();
  };

  const onExited = () => {
    if (confirm) {
      return confirmMethod();
    }
    if (rejectMethod) {
      rejectMethod();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      onExited={onExited}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={true}
    >
      <DialogTitle classes={classes}>{'Thông báo xác nhận'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {title} {!_.isEmpty(other) ? other.bodyText : ''}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="secondary"
          classes={{ root: 'btn-default btn-danger' }}
        >
          {'Đóng'}
        </Button>
        <Button
          onClick={onConfirm}
          color="primary"
          classes={{ root: 'btn-default btn-primary' }}
        >
          {buttonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalConfirm.propTypes = {
  title: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  confirmMethod: propTypes.func.isRequired,
  keyConfirm: propTypes.string.isRequired,
};
