/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { AuthSaga } from 'store/auth/shared/saga';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from 'store/auth/constants/auth.constant';
import { DEFAULT_ID } from 'store/common/constants/common.constant';
import { SettingHttp } from 'store/setting/services/setting.http';
import { SettingManageType } from 'store/setting/constants/setting.constant';
import { AppHelper } from 'utils/app.helper';
import { AuthHttp } from 'store/auth/services/auth.http';
import * as AuthSelectors from 'store/auth/shared/selectors';
import * as AuthSlice from 'store/auth/shared/slice';
import * as _ from 'lodash';
import moment from 'moment';
interface IFormInputs {
  img: string;
  user_login: string;
  code: string;
  user_name: string;
  gender: number;
  birthday: string;
  phone: string;
  title: string;
  position: string;
  email: string;
}

export default function ModalUpdateHRM({ open, onClose }) {
  const settingHttp = new SettingHttp();
  const personalHttp = new AuthHttp();
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  const dispatch = useDispatch();
  const dataFind = useSelector(AuthSelectors.selectUserFind);
  const [isValidCode, setIsValidCode] = useState<boolean>(true);
  const [isValidUser, setIsValidUser] = useState<boolean>(true);
  const [positions, setPositions] = useState<any[]>([]);
  const [titles, setTitles] = useState<any[]>([]);
  const { register, handleSubmit, errors, getValues } = useForm<IFormInputs>();
  const codeRef = useRef<any>(null);
  const userRef = useRef<any>(null);
  useEffect(() => {
    settingHttp
      .getAllManageType(SettingManageType.Title)
      .then(response => response.data)
      .then(titles => {
        if (AppHelper.checkResponseData(titles)) {
          const responseTitles = _.get(titles, 'result.data');
          if (!_.isEmpty(responseTitles)) {
            setTitles(responseTitles);
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
            setPositions(responsePositions);
          }
        }
      })
      .catch(error => console.log(error));
  }, []);

  const checkUser = e => {
    const newUser = e.target.value;
    if (_.isEmpty(newUser)) return;
    if (userRef.current) {
      clearTimeout(userRef.current);
    }
    if (newUser !== dataFind.user_name) {
      userRef.current = setTimeout(() => {
        personalHttp
          .checkUserNamePersonnel({
            id: DEFAULT_ID,
            userName: newUser,
          })
          .then(response => response.data)
          .then(checkUser => {
            if (AppHelper.checkResponseData(checkUser)) {
              const isValid = _.get(checkUser, 'result');
              if (!isValid) {
                dispatch(
                  AuthSlice.actions.setSuccess({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: RESPONSE_CONSTANT.CHECK_USER_NAME_PER_SUCCESS,
                    message: RESPONSE_MESSAGE.CHECK_USER_NAME_PER_SUCCESS,
                  }),
                );
                setIsValidUser(true);
              } else {
                dispatch(
                  AuthSlice.actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: RESPONSE_CONSTANT.CHECK_USER_NAME_PER_FAIL,
                    message: RESPONSE_MESSAGE.CHECK_USER_NAME_PER_FAIL,
                  }),
                );
                setIsValidUser(!isValid);
              }
            }
          });
      }, 500);
    } else if (newUser === dataFind.user_name) {
      setIsValidUser(true);
    }
  };

  const checkCode = e => {
    const newCode = e.target.value;
    if (_.isEmpty(newCode)) return;
    if (codeRef.current) {
      clearTimeout(codeRef.current);
    }
    if (newCode !== dataFind.code) {
      codeRef.current = setTimeout(() => {
        personalHttp
          .checkCodePersonnel({
            id: DEFAULT_ID,
            code: newCode,
          })
          .then(response => response.data)
          .then(checkCode => {
            if (AppHelper.checkResponseData(checkCode)) {
              const isValid = _.get(checkCode, 'result');
              if (!isValid) {
                dispatch(
                  AuthSlice.actions.setSuccess({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: RESPONSE_CONSTANT.CHECK_CODE_PER_SUCCESS,
                    message: RESPONSE_MESSAGE.CHECK_CODE_PER_SUCCESS,
                  }),
                );
                setIsValidCode(true);
              } else {
                dispatch(
                  AuthSlice.actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: RESPONSE_CONSTANT.CHECK_CODE_PER_FAIL,
                    message: RESPONSE_MESSAGE.CHECK_CODE_PER_FAIL,
                  }),
                );
                setIsValidCode(!isValid);
              }
            }
          });
      }, 500);
    } else if (newCode === dataFind.code) {
      setIsValidCode(true);
    }
  };
  const resetData = () => {
    dispatch(AuthSlice.actions.clearData());
  };
  const requestId = {
    id: dataFind.id,
  };
  const onSubmit = (form: IFormInputs) => {
    if (!isValidUser || !isValidCode) {
      dispatch(
        AuthSlice.actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          message: RESPONSE_MESSAGE.NOTIFICATION_MESSAGE_FAIL,
        }),
      );
      return;
    }
    const requestAdd = {
      Birthdate: getValues('birthday'),
      Code: getValues('code'),
      Data_Type: 'TEK',
      Email: getValues('email') || '',
      Full_Name: getValues('user_name'),
      Id: DEFAULT_ID,
      Is_Active: getValues('is_active'),
      Phone: getValues('phone'),
      Position: getValues('position'),
      Title: getValues('title'),
      Sex: getValues('gender'),
      User_Name: getValues('user_login').toLocaleUpperCase(),
    };
    const id = requestId.id;
    dispatch(
      AuthSlice.actions.updatePersonnel({
        ...requestAdd,
        id,
      }),
    );
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'xs'}
      open={open}
      onClose={onClose}
      disableBackdropClick={true}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <div className="modal_updatepersonnel">
          <div className="updatepersonnel_title">
            <h3>C???P NH???T TH??NG TIN NH??N VI??N</h3>
          </div>
          <div className="updatepersonnel_container">
            <form onSubmit={handleSubmit(onSubmit)}>
              {!_.isEmpty(dataFind) && (
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label>H??nh</label>
                    <input
                      type="file"
                      name="img"
                      className="form-control"
                      style={{
                        borderColor:
                          !_.isEmpty(errors) && _.isEmpty(errors.img)
                            ? '#00CC66'
                            : '',
                      }}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <label>T??n ????ng nh???p</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_login"
                      ref={register({ required: true })}
                      onChange={checkUser}
                      style={{
                        borderColor: !_.isEmpty(errors.user_login)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.user_login)
                          ? '#00CC66'
                          : isValidUser === false
                          ? '#fb0606'
                          : '',
                        textTransform: 'uppercase',
                      }}
                      defaultValue={dataFind.user_name}
                    />
                    {errors.user_login &&
                    errors.user_login?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng nh???p t??n ????ng nh???p
                      </span>
                    ) : isValidUser === false ? (
                      <span style={{ color: '#fb0606' }}>
                        T??n ????ng nh???p ???? t???n t???i
                      </span>
                    ) : (
                      <span style={{ color: '#ccc' }}></span>
                    )}
                  </div>
                  <div className="col-md-12 form-group">
                    <label>M?? b???nh nh??n</label>
                    <input
                      onChange={checkCode}
                      type="text"
                      className="form-control"
                      name="code"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.code)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.code)
                          ? '#00CC66'
                          : isValidCode === false
                          ? '#fb0606'
                          : '',
                      }}
                      defaultValue={dataFind.code}
                    />
                    {errors.code && errors.code?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng nh???p m?? nh??n vi??n
                      </span>
                    ) : isValidCode === false ? (
                      <span style={{ color: '#fb0606' }}>
                        M?? nh??n vi??n ???? t???n t???i
                      </span>
                    ) : (
                      <span style={{ color: '#ccc' }}></span>
                    )}
                  </div>
                  <div className="col-md-12 form-group">
                    <label>H??? v?? t??n</label>
                    <input
                      type="text"
                      className="form-control"
                      name="user_name"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.user_name)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.user_name)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={dataFind.full_name}
                    />
                    {errors.user_name &&
                    errors.user_name?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng nh???p h??? v?? t??n nh??n vi??n
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <label>Gi???i t??nh</label>
                    <select
                      className="form-control"
                      name="gender"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.gender)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.gender)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={dataFind.sex}
                    >
                      <option value={0}>Nam</option>
                      <option value={1}>N???</option>
                    </select>
                    {errors.gender && errors.gender?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng ch???n gi???i t??nh
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Ng??y sinh</label>
                    <input
                      type="date"
                      className="form-control"
                      name="birthday"
                      placeholder="Ng??y sinh"
                      ref={register()}
                      style={{
                        borderColor: !_.isEmpty(errors.birthday)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.birthday)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={moment(dataFind.birthdate).format(
                        'YYYY-MM-DD',
                      )}
                    />
                    {errors.birthday && errors.birthday?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng nh???p ng??y sinh
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Email</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      ref={register({ required: true })}
                      style={{
                        borderColor:
                          !_.isEmpty(errors) && _.isEmpty(errors.email)
                            ? '#00CC66'
                            : '',
                      }}
                      defaultValue={dataFind.email}
                    />
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">S??? ??i???n tho???i</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="S??? ??i???n tho???i"
                      name="phone"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.phone)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.phone)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={dataFind.phone}
                    />
                    {errors.phone && errors.phone?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng nh???p s??? ??i???n tho???i
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Ch???c danh</label>
                    <select
                      name="title"
                      className="form-control"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.title)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.title)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={dataFind.title}
                    >
                      <option value="">Vui l??ng ch???n...</option>
                      {!_.isEmpty(titles) &&
                        titles.map((opt, index) => (
                          <option value={opt.id} key={index}>
                            {opt.description}
                          </option>
                        ))}
                    </select>
                    {errors.title && errors.title?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng ch???n ch???c danh
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <label htmlFor="">Ch???c v???</label>
                    <select
                      name="position"
                      className="form-control"
                      ref={register({ required: true })}
                      style={{
                        borderColor: !_.isEmpty(errors.position)
                          ? '#fb0606'
                          : !_.isEmpty(errors) && _.isEmpty(errors.position)
                          ? '#00CC66'
                          : '',
                      }}
                      defaultValue={dataFind.position}
                    >
                      <option value="">Vui l??ng ch???n...</option>
                      {!_.isEmpty(positions) &&
                        positions.map((opt, index) => (
                          <option value={opt.id} key={index}>
                            {opt.description}
                          </option>
                        ))}
                    </select>
                    {errors.position && errors.position?.type === 'required' ? (
                      <span style={{ color: '#fb0606' }}>
                        Vui l??ng ch???n ch???c v???
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="is_active"
                      id="active"
                      ref={register()}
                      defaultChecked={dataFind.is_active}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="active"
                      style={{ paddingLeft: '20px' }}
                    >
                      Ho???t d???ng
                    </label>
                  </div>
                  <div className="form-group col-md-12 d-flex justify-content-end">
                    <input
                      type="button"
                      onClick={() => {
                        onClose();
                        resetData();
                      }}
                      className="btn btn-secondary"
                      value="????ng"
                    />
                    <input
                      type="submit"
                      className="btn btn-primary ml-3"
                      value="L??u thay ?????i"
                    />
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
