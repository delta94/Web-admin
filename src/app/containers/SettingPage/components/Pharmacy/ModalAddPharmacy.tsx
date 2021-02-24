/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as _ from 'lodash';
import * as Pharmacylice from 'store/pharmacy/shared/slice';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch } from 'react-redux';
import { PharmacySaga } from 'store/pharmacy/shared/saga';
import { useForm } from 'react-hook-form';
import { PharmacyHttp } from 'store/pharmacy/services/pharmarcy.http';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_CONSTANT, RESPONSE_MESSAGE } from 'store/pharmacy/constants/pharmarcy.constant';
import { DEFAULT_ID } from 'store/common/constants/common.constant';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalAddPharmacy
({ open, onClose }) {
  const pharmacyHttp = new PharmacyHttp();
  useInjectReducer({ key: Pharmacylice.sliceKey, reducer: Pharmacylice.reducer });
  useInjectSaga({ key: Pharmacylice.sliceKey, saga: PharmacySaga });
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = pharmacy => { 
    pharmacyHttp.checkUniqueCodePharmacy({
      code: pharmacy.code,
      id: DEFAULT_ID,
    }).then(response => response.data)
    .then(resPharmacy => {
      if (AppHelper.checkResponseData(resPharmacy)) {
        const result = _.get(resPharmacy, 'result');
        if (result) {
          return dispatch(Pharmacylice.actions.setError({
            id: AppHelper.generateUUID() + Date.now(),
            key: RESPONSE_CONSTANT.CHECK_CODE_FAIL,
            message: RESPONSE_MESSAGE.CHECK_CODE_FAIL,
          }));
        }
      dispatch(Pharmacylice.actions.createPharmacy(pharmacy));  
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
          <h4 className="modal-title pb-3">Thêm Nhà thuốc</h4>
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
            <label htmlFor="type">
            Loại
              </label>
              <input
                id="type"
                type="text"
                className="form-control"
                name="type"
                ref={register({ required: true })}
                placeholder="Nhập Loại" autoComplete="off" />
                {errors.type && errors.type?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Loại</span>
                ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="stores">
              Quầy thuốc
              </label>
              <input
                id="stores"
                type="text"
                className="form-control"
                name="stores"
                ref={register({ required: true })}
                placeholder="Nhập Quầy thuốc" autoComplete="off" />
                {errors.stores && errors.stores?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Quầy thuốc</span>
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
