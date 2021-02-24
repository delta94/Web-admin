/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalUploadFile({ title, content, onClose, open, onSave }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableBackdropClick={true}
      TransitionComponent={Transition}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="upload-logo"
              lang="vi"
            />
            <label className="custom-file-label" htmlFor="upload-logo">
              Chọn file hình logo mới{' '}
            </label>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          classes={{ root: 'btn-default btn-danger' }}
        >
          Huỷ
        </Button>
        <Button
          onClick={onSave}
          color="primary"
          classes={{ root: 'btn-default btn-primary' }}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
