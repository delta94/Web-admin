/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import * as TableSlice from 'store/table/shared/slice';
import * as SettingSelector from 'store/table/shared/selectors';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { TableSaga } from 'store/table/shared/saga';
import { useForm } from 'react-hook-form';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppLoading from 'app/components/Loading';

export function ModalUpdateTable({ open, onClose }) {
  useInjectReducer({ key: TableSlice.sliceKey, reducer: TableSlice.reducer });
  useInjectSaga({ key: TableSlice.sliceKey, saga: TableSaga });
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const initTable: any = useSelector(SettingSelector.selectTableInfo);
  const [isReadyData, setIsReadyData] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      dispatch(TableSlice.actions.clearTableInfo());
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(initTable)) {
      setIsReadyData(true);
    }else {
      setIsReadyData(false);
    }
  }, [initTable]);

  const onSubmit = table => {  
    dispatch(TableSlice.actions.updateTable({
      table,
      id: initTable.id
    }));
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
        { !isReadyData ? <AppLoading loading={true} /> : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="modal-title">Sửa thông tin bàn tiếp nhận</h4>
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
                defaultValue={initTable.name ? initTable.name : ''}
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
                defaultValue={initTable.code ? initTable.code : ''}
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
                type="text"
                name="device_code"
                ref={register({ required: true })}
                defaultValue={initTable.device_code ? initTable.device_code : ''}
                className="form-control"
                placeholder="Thiết bị" autoComplete="off" />
                {errors.device_code && errors.device_code?.type === 'required' ? (
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
              autoComplete="off"
              name="type"
              ref={register({ required: true })}
                defaultValue={initTable ? initTable.type : ''}
              >
                <option value="">Loại bàn</option>
                <option value="0">Thường</option>
                <option value="1">Ưu tiên</option>
              </select>
              {errors.type && errors.type?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại bàn</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="table">
              Loại thiết bị
            </label>
            <select className="form-control DeviceType" autoComplete="off"
              name="device_type"
              ref={register({ required: true })}
                defaultValue={initTable ? initTable.device_type : ''}
              >
            <option value="">Loại Thiết Bị</option>
              <option value="0">Bàn</option>
              <option value="1">CPS</option>
            </select>
            {errors.device_type && errors.device_type?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại thiết Bị</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="pc-ip">
              PC IP
            </label>
            <input id="pc-ip" type="text" className="form-control DeviceCode" autoComplete="off"
              placeholder="PC IP"
              name="computer_ip"
              ref={register({ required: true })}
                defaultValue={initTable.computer_ip ? initTable.computer_ip : ''}
            />
             {errors.computer_ip && errors.computer_ip?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng nhập PC IP</span>
              ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="table">
              Mã Khu
            </label>
            <select className="form-control DeviceType" autoComplete="off" 
              name="area_code"
              ref={register({ required: true })}
                defaultValue={initTable.area_code ? initTable.area_code : ''}>
              <option value="">Mã Khu</option>
              <option value="B">Khu B</option>
              <option value="D">Khu D</option>
            </select>
            {errors.area_code && errors.area_code?.type === 'required' ? (
                <span style={{ color: ' #fb0606' }}>Vui lòng chọn loại mã khu</span>
              ) : null}
          </div>
          <div className="form-group d-flex justify-content-end">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button type="submit" className="btn btn-primary ml-2">Sửa</button>
          </div>
        </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
