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

export function ModalUpdateTitle({ open, onClose }) {
  const settingHttp = new SettingHttp();
  useInjectReducer({ key: Settinglice.sliceKey, reducer: Settinglice.reducer });
  useInjectSaga({ key: Settinglice.sliceKey, saga: SettingSaga });
  const titleType = useSelector(SettingSelector.selectSettingType);
  const initTitle = useSelector(SettingSelector.selectSettingTemp);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = title => { 
    if ((title.code !== initTitle.code)) {
      return settingHttp.checkUniqueCode({
        code: title.code,
        id: titleType.id,
        manageType: SettingManageType.Title,
      }).then(response => response.data)
      .then(responseTitle => {
        if (AppHelper.checkResponseData(responseTitle)) {
          const result = _.get(responseTitle, 'result');
          if (result) {
            return dispatch(Settinglice.actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.TITLE.CHECK_CODE_FAIL,
              message: RESPONSE_MESSAGE.TITLE.CHECK_CODE_FAIL,
            }));
          }
          updateTitle(title);
        }
      })
      .catch(error => console.error(error));
    }
    updateTitle(title);
  }

  const updateTitle = (title) => {
    const {code, description, isActive, isSystem } = title;
    dispatch(Settinglice.actions.updateManageType({
      code,
      description,
      isActive,
      isSystem,
      id: initTitle.id,
      settingTypeId: titleType.id,
      manageType: SettingManageType.Title
    }));
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
        {
          !_.isEmpty(initTitle) ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h4 className="modal-title pb-3">Cập Nhật Thông Tin Chức Danh</h4>
              <div className="form-group">
                <label htmlFor="code">
                    Mã
                  </label>
                  <input
                    id="code"
                    type="text"
                    className="form-control Code"
                    name="code"
                    defaultValue={initTitle.code}
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
                    defaultValue={initTitle.description}
                    ref={register({ required: true })}
                    placeholder="Nhập Tên" autoComplete="off" />
                    {errors.description && errors.description?.type === 'required' ? (
                      <span style={{ color: ' #fb0606' }}>Vui lòng nhập Tên</span>
                    ) : null}
              </div>
              <div className="form-group">
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    ref={register()}
                    name="isActive"
                    defaultChecked={initTitle.is_active} /> 
                  Hoạt động
                </label>
                <label className="checkbox-inline">
                  <input
                    type="checkbox"
                    ref={register()}
                    name="isSystem"
                    defaultChecked={initTitle.is_system} /> 
                  Hệ thống
                </label>
              </div>
              <div className="form-group d-flex justify-content-end">
                <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
                <button type="submit" className="btn btn-primary ml-2">Lưu</button>
              </div>
            </form>
          ) : null
        }
      </DialogContent>
    </Dialog>
  );
}
