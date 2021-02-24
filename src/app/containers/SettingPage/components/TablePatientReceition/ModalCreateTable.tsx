/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import * as _ from 'lodash';
import * as TableSlice from 'store/table/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch } from 'react-redux';
import { TableSaga } from 'store/table/shared/saga';
import { useForm } from 'react-hook-form';
import { deviceTypes, tableTypes } from 'store/table/constants/table.constant';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalCreateTable({ open, onClose }) {
  useInjectReducer({ key: TableSlice.sliceKey, reducer: TableSlice.reducer });
  useInjectSaga({ key: TableSlice.sliceKey, saga: TableSaga });
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(TableSlice.actions.clearTableInfo());
    }
  }, []);


  const onSubmit = data => {  
    dispatch(TableSlice.actions.createTable(data));
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
          <h4 className="modal-title">Thêm Mới thông tin bàn tiếp nhận</h4>
          <div className="form-group">
            <label htmlFor="name">
                Tên
              </label>
              <input
                id="name"
                type="text"
                className="form-control Name"
                name="name"
                ref={register({ required: true })}
                placeholder="Tên" autoComplete="off" />
                {errors.name && errors.name?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập tên</span>
                ) : null}
          </div>
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
            <label htmlFor="device">
                Thiết bị
              </label>
              <input
                id="device"
                type="text"
                name="deviceCode"
                ref={register({ required: true })}
                className="form-control DeviceCode"
                placeholder="Thiết bị" autoComplete="off" />
                {errors.deviceCode && errors.deviceCode?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn thiết bị</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="table-type">
              Loại Loại bàn
            </label>
            <select
              id="table-type"
              className="form-control"
              name="type"
              ref={register({ required: true })}
              >
                <option value="">Loại bàn</option>
                { tableTypes.map(({ value, label }) => (
                  <option key={value} value={value}>{ label }</option>
                ))}
              </select>
              {errors.type && errors.type?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại bàn</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="table">
              Loại thiết bị
            </label>
            <select id="table"
              className="form-control"
              name="deviceType"
              ref={register({ required: true })}
              >
            <option value="">Loại Thiết Bị</option>
              { deviceTypes.map(({ value, label }) => (
                <option key={value} value={value}>{ label }</option>
              ))}
            </select>
            {errors.device_type && errors.device_type?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại thiết Bị</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="pc-ip">
              PC IP
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="PC IP"
              name="computerIP"
              ref={register({ required: true })}
            />
             {errors.computerIP && errors.computerIP?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng nhập PC IP</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="table">
              Mã Khu
            </label>
            <select id="table" className="form-control DeviceType" autoComplete="off" 
              name="areaCode"
              ref={register({ required: true })}>
              <option value="">Mã Khu</option>
              <option value="B">Khu B</option>
              <option value="D">Khu D</option>
            </select>
            {errors.areaCode && errors.areaCode?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại mã khu</span>
              ) : null}
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
