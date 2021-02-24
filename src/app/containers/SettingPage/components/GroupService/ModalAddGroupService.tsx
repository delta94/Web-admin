/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as _ from 'lodash';
import * as Settinglice from 'store/setting/shared/slice';
import * as SettingSelector from 'store/setting/shared/selectors';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { SettingSaga } from 'store/setting/shared/saga';
import { useForm } from 'react-hook-form';
import { SettingHttp } from 'store/setting/services/setting.http';
import { AppHelper } from 'utils/app.helper';
import { RESPONSE_CONSTANT, RESPONSE_MESSAGE, SettingManageType } from 'store/setting/constants/setting.constant';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

export function ModalAddGroupService({ open, onClose }) {
  const settingHttp = new SettingHttp();
  useInjectReducer({ key: Settinglice.sliceKey, reducer: Settinglice.reducer });
  useInjectSaga({ key: Settinglice.sliceKey, saga: SettingSaga });
  const settingType = useSelector(SettingSelector.selectSettingType);

  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = setting => { 
    const {code, description, isActive, isSystem } = setting;
    settingHttp.checkUniqueCode({
      code: setting.code,
      id: settingType.id,
      manageType: SettingManageType.Group,
    }).then(response => response.data)
    .then(responseSetting => {
      if (AppHelper.checkResponseData(responseSetting)) {
        const result = _.get(responseSetting, 'result');
        if (result) {
          return dispatch(Settinglice.actions.setError({
            id: AppHelper.generateUUID() + Date.now(),
            key: RESPONSE_CONSTANT.GROUP_SERVICE.CHECK_CODE_FAIL,
            message: RESPONSE_MESSAGE.GROUP_SERVICE.CHECK_CODE_FAIL,
          }));
        }
        dispatch(Settinglice.actions.createManageType({
          code,
          description,
          isActive,
          isSystem,
          settingTypeId: settingType.id,
          manageType: SettingManageType.Group
        }));
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
          <h4 className="modal-title pb-3">Thêm Nhóm Dịch Vụ</h4>
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
                name="description"
                ref={register({ required: true })}
                placeholder="Nhập Tên" autoComplete="off" />
                {errors.description && errors.description?.type === 'required' ? (
                  <span style={{ color: ' #fb0606' }}>Vui lòng nhập Tên</span>
                ) : null}
          </div>
          <div className="form-group">
            <label className="checkbox-inline">
              <input type="checkbox" ref={register()} name="isActive" defaultChecked={true} /> 
              Hoạt động
            </label>
            <label className="checkbox-inline">
              <input type="checkbox" ref={register()} name="isSystem" defaultChecked={true} /> 
              Hệ thống
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