/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as _ from 'lodash';
import * as AuthSlice from 'store/auth/shared/slice';
import * as Settinglice from 'store/setting/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch } from 'react-redux';
import { SettingSaga } from 'store/setting/shared/saga';
import { AuthSaga } from 'store/auth/shared/saga';
import { useForm } from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalAddRole({ open, onClose }) {
  useInjectReducer({ key: Settinglice.sliceKey, reducer: Settinglice.reducer });
  useInjectSaga({ key: Settinglice.sliceKey, saga: SettingSaga });
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = role => {  
    dispatch(AuthSlice.actions.addRole(role));
    onClose();
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="modal-title pb-3">Thêm Quyền truy cập</h4>
          <div className="form-group">
            <label htmlFor="code">
                Mã
              </label>
              <input
                id="code"
                type="text"
                className="form-control Code"
                name="code"
                ref={register({ required: true })}
                placeholder="Mã" autoComplete="off" />
                {errors.code && errors.code?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập mã</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="name">
              Tên
              </label>
              <input
                id="name"
                type="text"
                className="form-control name"
                name="name"
                ref={register({ required: true })}
                placeholder="Nhập Tên" autoComplete="off" />
                {errors.name && errors.name?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Tên</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="description">
              Mô tả
              </label>
              <textarea
                id="description"
                className="form-control description"
                name="description"
                ref={register({ required: true })}
                placeholder="Mô tả" autoComplete="off" />
                {errors.description && errors.description?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Mô tả</span>
                ) : null}
          </div>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" ref={register()} name="is_active" defaultChecked={true} /> 
              Hoạt động
            </label>
          </div>
          <div className="form-group d-flex justify-content-end">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button type="submit" className="btn btn-primary ml-2">Lưu</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
