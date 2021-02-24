/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect, InputHTMLAttributes } from 'react';
import * as CommonSelector from 'store/common/shared/selectors';
import * as CommonSlice from 'store/common/shared/slice';
import * as _ from 'lodash';
import { CommonSaga } from 'store/common/shared/saga';
import { useSelector, useDispatch } from 'react-redux';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useForm } from 'react-hook-form';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import AppLoading from 'app/components/Loading';

export function DefaultSetting() {
  useInjectReducer({
    key: CommonSlice.sliceKey,
    reducer: CommonSlice.reducer,
  });
  useInjectSaga({
    key: CommonSlice.sliceKey,
    saga: CommonSaga,
  });
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, register, errors, setValue } = useForm();
  const notifyController = new NotifyService(enqueueSnackbar);
  const dispatch = useDispatch();
  const loading = useSelector(CommonSelector.selectLoading);
  const defaultSetting = useSelector(CommonSelector.selectDefaultSetting);
  const success = useSelector(CommonSelector.selectSuccess);
  const error = useSelector(CommonSelector.selectError);
  const [logoUpload, setLogoUpload] = useState<any>(null);
  const [backgroundUpload, setBackgroundUpload] = useState<any>(null);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(CommonSlice.actions.clearSuccess());
      resetState();
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setSuccessNotify();
      dispatch(CommonSlice.actions.clearError());
    }
  }, [error]);

  const changeSetting = (e, type: CommonSlice.DefaultSettingTypes) => {
    let updateSetting: CommonSlice.SettingModel = _.clone(defaultSetting);
    const newValUpdate: string = e.target.value;
    if (type === CommonSlice.DefaultSettingTypes.VINAME) {
      updateSetting.viName = newValUpdate;
    } else if (type === CommonSlice.DefaultSettingTypes.ENNAME) {
      updateSetting.enName = newValUpdate;
    } else if (type === CommonSlice.DefaultSettingTypes.CODE) {
      updateSetting.code = newValUpdate;
    } else if (type === CommonSlice.DefaultSettingTypes.SLOGAN) {
      updateSetting.slogan = newValUpdate;
    }
    dispatch(CommonSlice.actions.setDefaultSetting(updateSetting));
  }

  const resetState = () => {
    setLogoUpload(null);
    setBackgroundUpload(null);
    setValue('logoUrl', null);
    setValue('backgroundUrl', null);
  }

  const changeLogo = e => setLogoUpload(e.target.files[0]);

  const changeBackground = e => setBackgroundUpload(e.target.files[0]);

  const submitEditSetting = setting => {
    dispatch(CommonSlice.actions.updateSetting(setting));
  };

  return (
    <div className="row">
      <form className="col-md-12" onSubmit={handleSubmit(submitEditSetting)}>
        {loading ? <AppLoading loading={true} /> : null}
        <React.Fragment>
          <div className="profile-content">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-head card-topline-aqua">
                    <header>Thông tin cài đặt</header>
                  </div>
                  <div className="card-body no-padding height-9">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="offset-md-1 col-md-10">
                          <div className="row">
                            <div className="col-sm-12">
                              <div className="form-group row d-flex align-items-center">
                                <label
                                  htmlFor="logo"
                                  className="col-sm-3 control-label font-weight-bold"
                                >
                                  Logo bệnh viện
                                  <span className="d-block font-weight-normal" style={{ color: '#888' }}>Kích thướt ảnh tối thiểu 300 x 300 pixels</span>
                                </label>
                                <div className="col-md-5">
                                  <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="logo" name="logoUrl" ref={register({required: true})} onChange={changeLogo} />
                                    <label className="custom-file-label" htmlFor="logo">{ logoUpload ? logoUpload.name : 'Chọn file logo'}</label>
                                    {errors.logoUrl && errors.logoUrl?.type === 'required' && (
                                      <span style={{ color: ' #fb0606' }}>Vui lòng chọn file logo </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-3 offset-md-1">
                                  <img src={defaultSetting?.logoUrl} alt="" className="img-responsive" width="120" />
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-12">
                              <div className="form-group row d-flex align-items-center">
                                <label
                                  htmlFor="logo"
                                  className="col-sm-3 control-label font-weight-bold"
                                >
                                  Ảnh nền bệnh viện
                                  <span className="d-block font-weight-normal" style={{ color: '#888' }}>Kích thướt ảnh tối thiểu 1360 x 540 pixels</span>
                                </label>
                                <div className="col-md-5">
                                  <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="background" name="backgroundUrl" ref={register({required: true})} onChange={changeBackground} />
                                    <label className="custom-file-label" htmlFor="background">{ backgroundUpload ? backgroundUpload.name : 'Chọn file ảnh nền'}</label>
                                    {errors.backgroundUrl && errors.backgroundUrl?.type === 'required' && (
                                      <span style={{ color: ' #fb0606' }}>Vui lòng chọn file ảnh nền </span>
                                    )}
                                  </div>
                                </div>
                                <div className="col-md-3 offset-md-1">
                                  <img src={defaultSetting?.backgroundUrl} alt="" className="img-responsive" width="120" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="col-sm-12">
                              <div className="form-group row">
                                <label
                                  htmlFor="viName"
                                  className="col-sm-3 control-label font-weight-bold"
                                >
                                  Tên Tiếng Việt
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="viName"
                                    name="viName"
                                    value={defaultSetting?.viName}
                                    onChange={e => changeSetting(e, CommonSlice.DefaultSettingTypes.VINAME)}
                                    ref={register({required: true})}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group row">
                                <label
                                  htmlFor="enName"
                                  className="col-sm-3 control-label font-weight-bold text-edit"
                                >
                                  Tên Tiếng Anh
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control text-edit"
                                    id="enName"
                                    name="enName"
                                    value={defaultSetting?.enName}
                                    onChange={e => changeSetting(e, CommonSlice.DefaultSettingTypes.ENNAME)}
                                    ref={register({required: true})}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group row">
                                <label
                                  htmlFor="code"
                                  className="col-sm-3 control-label font-weight-bold"
                                >
                                  Mã Bệnh Viện
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    name="code"
                                    value={defaultSetting?.code}
                                    onChange={e => changeSetting(e, CommonSlice.DefaultSettingTypes.CODE)}
                                    ref={register({required: true})}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12">
                              <div className="form-group row">
                                <label
                                  htmlFor="slogan"
                                  className="col-sm-3 control-label font-weight-bold"
                                >
                                  Slogan
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="slogan"
                                    name="slogan"
                                    value={defaultSetting?.slogan}
                                    onChange={e => changeSetting(e, CommonSlice.DefaultSettingTypes.SLOGAN)}
                                    ref={register({required: true})}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-12 text-center mt-3">
                              <button
                                className="btn btn-primary btn-lg"
                                type="submit"
                              >
                                Cập Nhật
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </form>
    </div>
  );
}
