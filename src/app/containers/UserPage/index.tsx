/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import * as AuthSelector from 'store/auth/shared/selectors';
import * as AuthSlice from 'store/auth/shared/slice';
import * as _ from 'lodash';
import { AuthSaga } from 'store/auth/shared/saga';
import { useDispatch, useSelector } from 'react-redux';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useForm } from 'react-hook-form';
import { DEFAULT_FORMAT_INPUT_DATE } from 'store/common/constants/common.constant';
import { SettingHttp } from 'store/setting/services/setting.http';
import { SettingManageType } from 'store/setting/constants/setting.constant';
import { AppHelper } from 'utils/app.helper';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from 'store/auth/constants/auth.constant';
import { AuthHttp } from 'store/auth/services/auth.http';
import AppLoading from 'app/components/Loading';
import DateFnsUtils from '@date-io/date-fns';
import defaultAvatar from 'img/avatar-placeholder.jpg';

export function UserPage() {
  useInjectReducer({
    key: AuthSlice.sliceKey,
    reducer: AuthSlice.reducer,
  });
  useInjectSaga({
    key: AuthSlice.sliceKey,
    saga: AuthSaga,
  });

  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const settingHttp = new SettingHttp();
  const personalHttp = new AuthHttp();
  const { register, handleSubmit, getValues, errors, setValue } = useForm();
  const initUser: any = useSelector<any>(AuthSelector.selectUser);
  const loading = useSelector(AuthSelector.selectLoading);
  const [listTitle, setListTitle] = useState<any[]>([]);
  const [listPosition, setListPosition] = useState<any[]>([]);
  const [isValidPass, setIsValidPass] = useState<boolean>(true);
  const success = useSelector(AuthSelector.selectSuccess);
  const passRef = useRef<any>(null);

  useEffect(() => {
    settingHttp
      .getAllManageType(SettingManageType.Title)
      .then(response => response.data)
      .then(titles => {
        if (AppHelper.checkResponseData(titles)) {
          const responseTitles = _.get(titles, 'result.data');
          if (!_.isEmpty(responseTitles)) {
            setListTitle(responseTitles);
          }
        }
      })
      .catch(error => console.log(error));
    settingHttp
      .getAllManageType(SettingManageType.Position)
      .then(response => response.data)
      .then(positions => {
        if (AppHelper.checkResponseData(positions)) {
          const responsePositions = _.get(positions, 'result.data');
          if (!_.isEmpty(responsePositions)) {
            setListPosition(responsePositions);
          }
        }
      })
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      if (success.key === RESPONSE_CONSTANT.UPDATE_PROFILE_USER_SUCCESS) {
        setValue('newPassword', '');
        setValue('oldPassword', '');
        setValue('reNewPassword', '');
      }
    }
  }, [success]);

  const checkPassword = e => {
    const newPassword = e.target.value;
    if (_.isEmpty(newPassword)) return;
    if (passRef.current) {
      clearTimeout(passRef.current);
    }
    passRef.current = setTimeout(() => {
      personalHttp
        .checkPassWord({
          userName: initUser.user_name,
          passWord: newPassword,
        })
        .then(response => response.data)
        .then(checkPass => {
          if (AppHelper.checkResponseData(checkPass)) {
            const isValid = _.get(checkPass, 'result');
            if (isValid) {
              dispatch(
                AuthSlice.actions.setSuccess({
                  id: AppHelper.generateUUID() + Date.now(),
                  key: RESPONSE_CONSTANT.CHECK_PASSWORD_SUCCESS,
                  message: RESPONSE_MESSAGE.CHECK_PASSWORD_SUCCESS,
                }),
              );
              setIsValidPass(true);
            } else {
              dispatch(
                AuthSlice.actions.setError({
                  id: AppHelper.generateUUID() + Date.now(),
                  key: RESPONSE_CONSTANT.CHECK_PASSWORD_FAIL,
                  message: RESPONSE_MESSAGE.CHECK_PASSWORD_FAIL,
                }),
              );
              setIsValidPass(false);
            }
          }
        });
    }, 1000);
  };

  const submitEditUser = submitData => {
    if (!isValidPass) {
      dispatch(
        AuthSlice.actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          message: RESPONSE_MESSAGE.NOTIFICATION_MESSAGE_FAIL_UPDATE_PROFILE,
        }),
      );
      return;
    }

    const id = !_.isEmpty(initUser) ? initUser.id : '';
    const user = {
      Sex: initUser.sex,
      user_name: initUser.user_name,
      full_name: initUser.full_name,
      Code: initUser.code,
      Birthdate: submitData.birthdate,
      Email: submitData.email,
      Password: submitData.newPassword,
      Phone: submitData.phone,
      Position: submitData.position,
      Title: submitData.title,
    };
    dispatch(
      AuthSlice.actions.updateProfileUser({
        ...user,
        id,
      }),
    );
  };
  return (
    <div className="row">
      <form className="col-md-12" onSubmit={handleSubmit(submitEditUser)}>
        {loading ? <AppLoading loading={true} /> : null}
        {!_.isEmpty(initUser) ? (
          <React.Fragment>
            <div className="profile-sidebar">
              <div className="card card-topline-aqua">
                <div className="card-body no-padding height-9">
                  <div className="row">
                    <div className="profile-userpic">
                      <img
                        src={
                          !_.isEmpty(initUser.image_url)
                            ? initUser.image_url
                            : defaultAvatar
                        }
                        className="img-responsive"
                        alt=""
                        id="image"
                      />
                    </div>
                  </div>
                  <div className="profile-usertitle">
                    <div className="profile-usertitle-name" id="namePro">
                      {initUser.full_name}
                    </div>
                    <div className="profile-usertitle-job" id="titlePro"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-content">
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-head card-topline-aqua">
                      <header>Thông tin</header>
                    </div>
                    <div className="card-body no-padding height-9">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Tên đăng nhập
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    readOnly
                                    type="text"
                                    className="form-control text-edit"
                                    placeholder=""
                                    id="user_name"
                                    name="user_name"
                                    disabled
                                    autoComplete="off"
                                    defaultValue={initUser.user_name}
                                    ref={register()}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Mã nhân viên
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    readOnly
                                    type="text"
                                    className="form-control text-edit"
                                    placeholder=""
                                    id="code"
                                    autoComplete="off"
                                    name="code"
                                    defaultValue={initUser.code}
                                    ref={register()}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Họ và tên
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    readOnly
                                    type="text"
                                    className="form-control text-edit"
                                    autoComplete="off"
                                    name="full_name"
                                    defaultValue={initUser.full_name}
                                    ref={register()}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormPassword"
                                  className="col-sm-3 control-label"
                                >
                                  Giới tính
                                </label>
                                <div className="col-sm-9">
                                  <select
                                    className="form-control"
                                    id="sex"
                                    disabled
                                    name="sex"
                                    ref={register()}
                                    defaultValue={initUser.sex}
                                  >
                                    <option value="">Chọn giới tính</option>
                                    <option value="1">Nam</option>
                                    <option value="0">Nữ</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Email
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="email"
                                    className="form-control text-edit"
                                    id="email"
                                    name="email"
                                    ref={register()}
                                    defaultValue={initUser.email}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Ngày sinh
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="date"
                                    className="form-control text-edit"
                                    id="birthdate"
                                    autoComplete="off"
                                    name="birthdate"
                                    ref={register()}
                                    defaultValue={dateUtil.format(
                                      new Date(initUser.birthdate),
                                      DEFAULT_FORMAT_INPUT_DATE,
                                    )}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Số điện thoại
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control text-edit"
                                    id="phone"
                                    name="phone"
                                    ref={register()}
                                    defaultValue={initUser.phone}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Chức danh
                                </label>
                                <div className="col-sm-9">
                                  {!_.isEmpty(initUser) &&
                                  !_.isEmpty(listTitle) ? (
                                    <select
                                      className="form-control"
                                      id="title"
                                      name="title"
                                      autoComplete="off"
                                      defaultValue={initUser.title}
                                      ref={register()}
                                    >
                                      <option value="">Chọn Chức Danh</option>
                                      {listTitle.map(title => {
                                        return (
                                          <option
                                            value={title.id}
                                            key={title.id}
                                          >
                                            {title.description}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Chức vụ
                                </label>
                                <div className="col-sm-9">
                                  {!_.isEmpty(initUser) &&
                                  !_.isEmpty(listPosition) ? (
                                    <select
                                      className="form-control"
                                      id="position"
                                      name="position"
                                      defaultValue={initUser.position}
                                      ref={register()}
                                    >
                                      <option value="">Chọn Chức Danh</option>
                                      {listPosition.map(position => {
                                        return (
                                          <option
                                            value={position.id}
                                            key={position.id}
                                          >
                                            {position.description}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  ) : null}
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
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-head card-topline-aqua">
                      <header>Thay đổi mật khẩu</header>
                    </div>
                    <div className="card-body no-padding height-9">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Mật khẩu cũ
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="password"
                                    className="form-control text-edit"
                                    name="oldPassword"
                                    onChange={checkPassword}
                                    ref={register({ required: true })}
                                    style={{
                                      borderColor: !isValidPass
                                        ? '#fb0606'
                                        : !_.isEmpty(errors.oldPassword)
                                        ? '#fb0606'
                                        : '#ccc',
                                    }}
                                  />
                                  {errors.oldPassword ? (
                                    <span style={{ color: ' #fb0606' }}>
                                      Vui lòng nhập Mật khẩu cũ!
                                    </span>
                                  ) : !isValidPass ? (
                                    <span style={{ color: ' #fb0606' }}>
                                      Mật khẩu cũ không chính xác!
                                    </span>
                                  ) : (
                                    <span style={{ color: ' #ccc' }}></span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Mật khẩu mới
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="password"
                                    className="form-control text-edit"
                                    name="newPassword"
                                    ref={register({
                                      required: true,
                                      validate: {
                                        matchesPreviousPassword: value => {
                                          const { oldPassword } = getValues();
                                          return (
                                            oldPassword !== value ||
                                            'Khẩu mới trùng mật khẩu cũ'
                                          );
                                        },
                                      },
                                    })}
                                    style={{
                                      borderColor: !_.isEmpty(
                                        errors.newPassword,
                                      )
                                        ? '#fb0606'
                                        : '#ccc',
                                    }}
                                  />
                                  {errors.newPassword &&
                                  errors.newPassword?.type === 'required' ? (
                                    <span style={{ color: ' #fb0606' }}>
                                      Vui lòng nhập Mật Khẩu Mới!
                                    </span>
                                  ) : null}
                                  {errors.newPassword &&
                                  errors.newPassword?.type ===
                                    'matchesPreviousPassword' ? (
                                    <span style={{ color: ' #fb0606' }}>
                                      {errors.newPassword.message}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="col-sm-12 m-b-10">
                              <div className="form-group row">
                                <label
                                  htmlFor="horizontalFormEmail"
                                  className="col-sm-3 control-label text-edit"
                                >
                                  Xác nhận mật khẩu
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="password"
                                    className="form-control text-edit"
                                    name="reNewPassword"
                                    ref={register({
                                      required: 'Vui Lòng Xác Nhận Mật Khẩu!',
                                      validate: {
                                        matchesPreviousPassword: value => {
                                          const { newPassword } = getValues();
                                          return (
                                            newPassword === value ||
                                            'Xác Nhận Mật Khẩu Mới Không Trùng Khớp'
                                          );
                                        },
                                      },
                                    })}
                                    style={{
                                      borderColor: !_.isEmpty(
                                        errors.reNewPassword,
                                      )
                                        ? '#fb0606'
                                        : '#ccc',
                                    }}
                                  />
                                  {errors.reNewPassword && (
                                    <span style={{ color: ' #fb0606' }}>
                                      {errors.reNewPassword.message}
                                    </span>
                                  )}
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
              <div className="row justify-content-center">
                <button className="btn btn-primary btn-lg" id="btnSave">
                  Lưu
                </button>
              </div>
            </div>
          </React.Fragment>
        ) : null}
      </form>
    </div>
  );
}
