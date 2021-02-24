/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as _ from 'lodash';
import * as Settinglice from 'store/setting/shared/slice';
import * as DeviceSlice from 'store/device/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { SettingSaga } from 'store/setting/shared/saga';
import { DeviceSaga } from 'store/device/shared/saga';
import { useForm } from 'react-hook-form';
import { selectRooms } from 'store/room/shared/selectors';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalAddDevice({ open, onClose }) {
  useInjectReducer({ key: Settinglice.sliceKey, reducer: Settinglice.reducer });
  useInjectSaga({ key: Settinglice.sliceKey, saga: SettingSaga });
  useInjectReducer({ key: DeviceSlice.sliceKey, reducer: DeviceSlice.reducer });
  useInjectSaga({ key: DeviceSlice.sliceKey, saga: DeviceSaga });

  const rooms = useSelector(selectRooms);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = device => {  
    dispatch(DeviceSlice.actions.createDevice(device));
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
          <h4 className="modal-title pb-3">Thêm Mới Thiết Bị </h4>
          <div className="form-group">
            <label htmlFor="name">
            Phòng
              </label>
                <select
                  name="roomId"
                  id="groupService"
                  className="form-control"
                  ref={register({ required: true })}
                >
                  <option value="">Vui lòng chọn phòng...</option>
                  {
                    !_.isEmpty(rooms) && rooms.length
                      ? rooms.map(room => (
                        <option key={room.id} value={room.id}>{ room.description }</option>
                      ))
                      : null
                  }
                </select>
                {errors.roomId && errors.roomId?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng chọn phòng</span>
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
            <label htmlFor="ip">
              IP
              </label>
              <input
                id="ip"
                type="text"
                className="form-control"
                name="ip"
                ref={register({ required: true })}
                placeholder="Nhập IP" autoComplete="off" />
                {errors.ip && errors.ip?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Ip thiết bị</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="type">
              Loại Thiết Bị
              </label>
              <input
                id="type"
                type="text"
                className="form-control"
                name="type"
                ref={register({ required: true })}
                placeholder="Nhập loại thiết bị" autoComplete="off" />
                {errors.type && errors.type?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập loại thiết bị</span>
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
