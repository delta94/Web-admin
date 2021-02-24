/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dialog, DialogContent } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { selectUser } from 'store/auth/shared/selectors';
import { ReceptionSaga } from 'store/reception/shared/saga';
import { actions, reducer, sliceKey } from 'store/reception/shared/slice';
import * as _ from 'lodash';
import { selectSuccess } from 'store/reception/shared/selectors';
export function ModalChecked({ open, onClose, idReason, isFinished }) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: ReceptionSaga });
  const [reason, setReason] = useState<any>('');
  const success: any = useSelector(selectSuccess);
  const user: any = useSelector(selectUser);
  const dispatch = useDispatch();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (!_.isEmpty(success)) {
      closeModal();
    }
  }, [success]);

  const closeModal = () => {
    onClose();
  };
  const handleChangeInput = e => {
    setReason(e.target.value);
  };
  const handleAccess = () => {
    if (!_.isEmpty(user) && !_.isEmpty(reason)) {
      setError(false);
      const requestParams = {
        isFinished: !isFinished,
        reason: reason,
        employeeId: user.id,
        id: idReason,
      };
      dispatch(actions.changeFinished(requestParams));
      setError(false);
    } else {
      setError(true);
    }
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onClose}
      disableBackdropClick={true}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <div className="container-modal">
          <div className="title border-bottom mb-3">
            <h3>Thông báo xác nhận</h3>
          </div>
          <div className="form-group">
            <label>Nhập lý do thay đổi</label>
            <input
              type="text"
              className="form-control"
              placeholder="Lý do thay đổi"
              value={reason}
              onChange={handleChangeInput}
            />
            {error && (
              <span style={{ color: '#fb0606' }}>Vui lòng nhập lý do</span>
            )}
          </div>
          <div className="container-modal-footer d-flex justify-content-end mt-4">
            <div className="form-group mr-1">
              <button
                className="btn btn-secondary"
                onClick={() => closeModal()}
              >
                HỦY BỎ
              </button>
            </div>
            <div className="form-group">
              <button
                className="btn btn-success"
                onClick={() => handleAccess()}
              >
                ĐỒNG Ý
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
