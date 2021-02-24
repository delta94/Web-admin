/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as _ from 'lodash';
import * as MedicineSlice from 'store/medicine/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch } from 'react-redux';
import { MedicineSaga } from 'store/medicine/shared/saga';
import { useForm } from 'react-hook-form';
import { MedicineHttp } from 'store/medicine/services/medicine.http';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_CONSTANT, RESPONSE_MESSAGE } from 'store/medicine/constants/medicine.constant';
import { DEFAULT_ID } from 'store/common/constants/common.constant';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalAddMedicine
({ open, onClose }) {
  const medicineHttp = new MedicineHttp();
  useInjectReducer({ key: MedicineSlice.sliceKey, reducer: MedicineSlice.reducer });
  useInjectSaga({ key: MedicineSlice.sliceKey, saga: MedicineSaga });
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = medicine => { 
    medicineHttp.checkUniqueCodeMedicine({
      code: medicine.code,
      id: DEFAULT_ID,
    }).then(response => response.data)
    .then(resMedicine => {
      if (AppHelper.checkResponseData(resMedicine)) {
        const result = _.get(resMedicine, 'result');
        if (result) {
          return dispatch(MedicineSlice.actions.setError({
            id: AppHelper.generateUUID() + Date.now(),
            key: RESPONSE_CONSTANT.CHECK_CODE_FAIL,
            message: RESPONSE_MESSAGE.CHECK_CODE_FAIL,
          }));
        }
      dispatch(MedicineSlice.actions.createMedicine(medicine));  
      }
    })
    .catch(error => console.error(error));
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
          <h4 className="modal-title pb-3">Thêm Thuốc-vật tư</h4>
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
                className="form-control"
                name="name"
                ref={register({ required: true })}
                placeholder="Nhập Tên" autoComplete="off" />
                {errors.name && errors.name?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Tên</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="usageScope">
              Phạm vi sử dụng
              </label>
              <input
                id="usageScope"
                type="text"
                className="form-control"
                name="usageScope"
                ref={register({ required: true })}
                placeholder="Nhập Phạm vi sử dụng" autoComplete="off" />
                {errors.usageScope && errors.usageScope?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Phạm vi sử dụng</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="type">
            Loại vật tư
              </label>
              <input
                id="type"
                type="text"
                className="form-control"
                name="type"
                ref={register({ required: true })}
                placeholder="Nhập Loại vật tư" autoComplete="off" />
                {errors.type && errors.type?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Loại vật tư</span>
                ) : null}
          </div>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" ref={register()} name="isActive" defaultChecked={true} /> 
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
