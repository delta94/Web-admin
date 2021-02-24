/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from 'app/components/Loading';
import * as PatientSlice from 'store/patient/shared/slice';
import * as PatientSelectors from 'store/patient/shared/selectors';
import * as LocationSlice from 'store/location/shared/slice';
import * as LocationSelectors from 'store/location/shared/selectors';
import * as _ from 'lodash';
import { PatientPriorityTypes } from 'store/patient/constants/patient.constant';
import { PatientSaga } from 'store/patient/shared/saga';
import { LocationSaga } from 'store/location/shared/saga';
import { PatientHttp } from 'store/patient/services/patient.http';
import { QueueHttp } from 'store/queue/services/queue.http';
import { APP_CONSTANT } from 'store/common/constants/common.constant';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAULT_FORMAT_INPUT_DATE } from 'store/common/constants/common.constant';
import { AppHelper } from 'utils/app.helper';
import { PrintPriorityPatient } from '../components/PrintPriorityPatient';
import { useReactToPrint } from 'react-to-print';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import {
  RESPONSE_CONSTANT,
  RESPONSE_MESSAGE,
} from 'store/patient/constants/patient.constant';
import { useForm } from 'react-hook-form';

class PatientModel {
  code: string = '';
  wardId: string = '';
  provinceId: string = '';
  distId: string = '';
  wardName: string = '';
  provinceName: string = '';
  distName: string = '';
  gender: string = '';
  firstName: string = '';
  lastName: string = '';
  fullName: string = '';
  birthDay: string = '';
  street: string = '';
  constructor(userRes: any) {
    this.code = userRes.code ? userRes.code : '';
    this.wardId = userRes.ward_id ? userRes.ward_id : userRes.ward_code;
    this.wardName = userRes.ward_name;
    this.provinceId = userRes.province_id
      ? userRes.province_id
      : userRes.province_code;
    this.provinceName = userRes.province_name;
    this.distId = userRes.district_id
      ? userRes.district_id
      : userRes.district_code;
    this.distName = userRes.district_name;
    this.gender = userRes.gender_name ? userRes.gender : userRes.gender_code;
    this.firstName = userRes.first_name;
    this.lastName = userRes.last_name;
    this.fullName = userRes.full_name;
    this.birthDay = userRes.birthday;
    this.street = userRes.street;
  }
}

const defaultUser = {
  wardId: '',
  provinceId: '',
  distId: '',
  patientType: '',
  name: '',
  gender: '',
  firstName: '',
  lastName: '',
  fullName: '',
  street: '',
  formatBirthDay: '',
};

export function PriorityPatient() {
  useInjectReducer({
    key: PatientSlice.sliceKey,
    reducer: PatientSlice.reducer,
  });
  useInjectSaga({ key: PatientSlice.sliceKey, saga: PatientSaga });
  useInjectReducer({
    key: LocationSlice.sliceKey,
    reducer: LocationSlice.reducer,
  });
  useInjectSaga({ key: LocationSlice.sliceKey, saga: LocationSaga });
  const dateUtil = new DateFnsUtils();
  const webHttp = new PatientHttp(APP_CONSTANT.API.WEB);
  const http = new PatientHttp();
  const queueHttp = new QueueHttp();
  const requestDate: Date = new Date();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { register, errors, handleSubmit } = useForm();
  const notifyController = new NotifyService(enqueueSnackbar);
  const [patientCode, setPatientCode] = useState<string>('');
  const [healthId, setHealthId] = useState<string>('');
  const [queue, setQueue] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [, setOpenPrint] = useState<boolean>(false);
  const error: any = useSelector(PatientSelectors.selectError);
  const success: any = useSelector(PatientSelectors.selectSuccess);
  const locations: any[] = useSelector(LocationSelectors.selectLocations);
  let printRef = useRef<HTMLDivElement>(null);
  const [dists, setDists] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [user, setUser] = useState<any>(defaultUser);
  const [userPrint, setUserPrint] = useState<any>({});
  const [disabled, setDisabled] = useState<boolean>(false);
  const [typeLabelPrint, setTypeLablePrint] = useState<any>(null);

  useEffect(() => {
    dispatch(LocationSlice.actions.getLocationsAll());
    return () => {
      PatientSlice.actions.clearError();
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setWaringNotify();
      dispatch(PatientSlice.actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(PatientSlice.actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (user.provinceId !== '') {
      const locationSelect = locations.find(
        loc => loc.province_code === user.provinceId,
      );
      if (locationSelect) {
        const dists = locationSelect.districts;
        setDists(dists);
        if (user.distId !== '') {
          const dist = dists.find(dist => dist.district_code === user.distId);
          if (dist) {
            const ward = dist.wards;
            setWards(ward);
          }
        }
      }
    }
  }, [user]);

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactToPrintContent,
    removeAfterPrint: true,
  });

  const changePatienCode = e => setPatientCode(e.target.value);

  const changeHealthId = e => setHealthId(e.target.value);

  const changePatientType = e => {
    const _patientType = e.target.value;
    setUser({
      ...user,
      patientType: _patientType,
    });
    const typeSelect: any = PatientPriorityTypes.find(
      type => type.valueType === _patientType,
    );
    if (typeSelect) {
      setTypeLablePrint(typeSelect);
    }
  };

  const changeProvince = e => {
    setDists([]);
    setWards([]);
    setUser({
      ...user,
      provinceId: e.target.value,
    });
  };

  const changeDist = e => {
    const distId = e.target.value;
    setUser({
      ...user,
      distId,
    });
    const distSelect = dists.find(dist => dist.district_code === distId);
    if (distSelect) {
      setWards(distSelect.wards);
    }
  };

  const changeWard = e => {
    setUser({
      ...user,
      wardId: e.target.value,
    });
  };

  const changeGender = e => {
    setUser({
      ...user,
      gender: e.target.value,
    });
  };

  const changeName = e => {
    const fullName = e.target.value;
    setUser({
      ...user,
      fullName,
    });
  };

  const changeStreet = e => {
    setUser({
      ...user,
      street: e.target.value,
    });
  };

  const changeBirthDay = e => {
    setUser({
      ...user,
      birthDay: e.target.value,
    });
  };

  const resetState = () => {
    setPatientCode('');
    setHealthId('');
    setDisabled(false);
    setUser(defaultUser);
    setDists([]);
    setWards([]);
  };

  const searchWithCode = e => {
    e.preventDefault();
    setUser(defaultUser);
    setHealthId('');
    if (patientCode === '') {
      return dispatch(
        PatientSlice.actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          key: RESPONSE_CONSTANT.KEY_UP_PATIENT_CODE,
          message: RESPONSE_MESSAGE.KEY_UP_PATIENT_CODE,
        }),
      );
    }
    setLoading(true);
    http
      .getPatientWithType({
        patientCode,
        requestDate,
      })
      .then(response => response.data)
      .then(responseData => {
        if (AppHelper.checkResponseData(responseData)) {
          formatUser(_.get(responseData, 'result'));
        } else {
          setLoading(false);
          dispatch(
            PatientSlice.actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.GET_PATIENT_QR_CODE_FAIL,
              message: RESPONSE_MESSAGE.GET_PATIENT_QR_CODE_FAIL,
            }),
          );
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const searchWithHealthId = e => {
    e.preventDefault();
    setUser(defaultUser);
    setPatientCode('');
    if (healthId === '') {
      return dispatch(
        PatientSlice.actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          key: RESPONSE_CONSTANT.GET_PATIENT_QR_CODE_FAIL,
          message: RESPONSE_MESSAGE.GET_PATIENT_QR_CODE_FAIL,
        }),
      );
    }
    setLoading(true);
    webHttp
      .getPatientWithQRCode(healthId)
      .then(response => response.data)
      .then(responseData => {
        if (AppHelper.checkResponseData(responseData)) {
          formatUser(_.get(responseData, 'result'));
        } else {
          dispatch(
            PatientSlice.actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.GET_PATIENT_QR_CODE_FAIL,
              message: RESPONSE_MESSAGE.GET_PATIENT_QR_CODE_FAIL,
            }),
          );
        }
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  const formatUser = userRes => {
    const user = new PatientModel(userRes);
    setUser({
      ...user,
      patientType: '',
    });
  };

  const callError = () => {
    dispatch(
      PatientSlice.actions.setError({
        id: AppHelper.generateUUID() + Date.now(),
        key: RESPONSE_CONSTANT.REGISTER_PATIENT_FAIL,
        message: RESPONSE_MESSAGE.REGISTER_PATIENT_FAIL,
      }),
    );
  };

  const submitRegister = (e: unknown) => {
    if (patientCode !== '') {
      submitPriorityWithCode();
    } else {
      submitPriorityWithQR();
    }
  };

  const submitPriorityWithCode = () => {
    setLoading(true);
    queueHttp
      .registerPatientPriority(user)
      .then(res => res.data)
      .then(response => {
        if (AppHelper.checkResponseData(response)) {
          dispatch(
            PatientSlice.actions.setSuccess({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.REGISTER_PATIENT_SUCCESS,
              message: RESPONSE_MESSAGE.REGISTER_PATIENT_SUCCESS,
            }),
          );
          setQueue(_.get(response, 'result.queue_number'));
          setUserPrint(user);
          setOpenPrint(true);
          handlePrint!();
        } else {
          callError();
        }
        setLoading(false);
        resetState();
      })
      .catch(err => {
        setLoading(false);
        callError();
      });
  };

  const submitPriorityWithQR = () => {
    const { firstName, lastName } = AppHelper.getFirstLastName(user.fullName);
    webHttp
      .addTempPatient({
        ...user,
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
      })
      .then(res => res.data)
      .then(response => {
        if (AppHelper.checkResponseData(response)) {
          dispatch(
            PatientSlice.actions.setSuccess({
              id: AppHelper.generateUUID() + Date.now(),
              key: RESPONSE_CONSTANT.REGISTER_PATIENT_SUCCESS,
              message: RESPONSE_MESSAGE.REGISTER_PATIENT_SUCCESS,
            }),
          );
          const result = _.get(response, 'result');
          setQueue(result.data);
          setUserPrint(result);
          setOpenPrint(true);
          handlePrint!();
          resetState();
        } else {
          callError();
        }
        setLoading(false);
      })
      .catch(error => {});
  };

  return (
    <div className="container-fluid">
      {loading && <AppLoading loading={true} />}
      <div className="d-none">
        <PrintPriorityPatient
          patient={userPrint}
          queue={queue}
          type={typeLabelPrint}
          ref={printRef}
        />
      </div>
      <div className="row">
        <div className="col-sm-12 text-center">
          <h2 className="font-weight-bold">THÔNG TIN BỆNH NHÂN</h2>
        </div>
        <div className="col-sm-12">
          <div className="card card-topline-aqua" style={{ height: '100%' }}>
            <div className="card-body">
              <div className="row">
                <form
                  className="col-6"
                  style={{ paddingRight: '30px' }}
                  onSubmit={searchWithHealthId}
                >
                  <div className="form-group d-flex align-items-center">
                    <label
                      className="col-sm-3 control-label text-edit mb-0"
                      style={{ marginRight: '5px' }}
                    >
                      Mã BHYT
                    </label>
                    <input
                      style={{ width: '50%' }}
                      placeholder="Nhập mã BHYT"
                      autoComplete="off"
                      className="form-control"
                      value={healthId}
                      onChange={changeHealthId}
                    />
                    <button
                      className="btn btn-primary btn-sm mb-0 ml-auto"
                      type="submit"
                    >
                      Tìm Theo BHYT
                    </button>
                  </div>
                </form>
                <form
                  className="col-6"
                  style={{ paddingRight: '30px' }}
                  onSubmit={searchWithCode}
                >
                  <div className="form-group d-flex align-items-center">
                    <label
                      className="col-sm-3 control-label text-edit mb-0"
                      style={{ marginRight: '5px' }}
                    >
                      Mã bệnh nhân
                    </label>
                    <input
                      style={{ width: '40%' }}
                      placeholder="Nhập Mã bệnh nhân"
                      autoComplete="off"
                      className="form-control"
                      value={patientCode}
                      onChange={changePatienCode}
                    />
                    <button
                      className="btn btn-primary btn-sm mb-0 ml-auto"
                      type="submit"
                    >
                      Tìm Theo Mã bệnh nhân
                    </button>
                  </div>
                </form>
                <form
                  className="col-12"
                  onSubmit={handleSubmit(submitRegister)}
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Họ và tên</label>
                        <div className="col-sm-9 pl-0">
                          <input
                            type="text"
                            disabled={disabled}
                            placeholder="Họ và tên"
                            className="form-control"
                            value={user.fullName}
                            name="full_name"
                            onChange={changeName}
                            ref={register({
                              required: !disabled,
                            })}
                          />
                          {errors.full_name &&
                          errors.full_name?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng nhập họ và tên
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Giới tính</label>
                        <div className="col-sm-9 pl-0">
                          <select
                            name="gender"
                            disabled={disabled}
                            className="form-control"
                            placeholder="Chọn giới tính"
                            value={user.gender}
                            onChange={changeGender}
                            ref={register({
                              required: !disabled,
                            })}
                          >
                            <option value="">Chọn giới tính</option>
                            <option value="1">Nam</option>
                            <option value="0">Nữ</option>
                          </select>
                          {errors.gender &&
                          errors.gender?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng chọn giới tính
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Tỉnh/Thành phố</label>
                        <div className="col-sm-9 pl-0">
                          <select
                            name="province_id"
                            disabled={disabled}
                            className="form-control"
                            value={
                              !_.isNil(user.provinceId) ? user.provinceId : ''
                            }
                            onChange={changeProvince}
                            ref={register({
                              required: !disabled,
                            })}
                          >
                            <option value="">Tỉnh/Thành phố</option>
                            {locations.map((province, idx) => (
                              <option value={province.province_code} key={idx}>
                                {province.province_name}
                              </option>
                            ))}
                          </select>
                          {errors.province_id &&
                          errors.province_id?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng chọn tỉnh/thành phố
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Quận/Huyện</label>
                        <div className="col-sm-9 pl-0">
                          <select
                            name="dist_id"
                            className="form-control"
                            disabled={disabled}
                            value={!_.isNil(user.distId) ? user.distId : ''}
                            onChange={changeDist}
                            ref={register({
                              required: !disabled,
                            })}
                          >
                            <option value="">Chọn quận</option>
                            {dists.length
                              ? dists.map((dist: any) => {
                                  return (
                                    <option
                                      key={dist.district_code}
                                      value={dist.district_code}
                                    >
                                      {dist.district_name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                          {errors.dist_id &&
                          errors.dist_id?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng chọn quận
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Phường/Xã</label>
                        <div className="col-sm-9 pl-0">
                          <select
                            className="form-control"
                            name="ward_id"
                            disabled={disabled}
                            value={!_.isNil(user.wardId) ? user.wardId : ''}
                            onChange={changeWard}
                            ref={register({
                              required: !disabled,
                            })}
                          >
                            <option value="">Chọn phường xã</option>
                            {wards?.length
                              ? wards.map((ward: any) => {
                                  return (
                                    <option
                                      value={ward.ward_code}
                                      key={ward.ward_code}
                                    >
                                      {ward.ward_name}
                                    </option>
                                  );
                                })
                              : null}
                          </select>
                          {errors.ward_id &&
                          errors.ward_id?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng chọn phường xã
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3 control-label text-edit mb-0">
                          Đường/Thôn/Ấp
                        </label>
                        <div className="col-sm-9 pl-0">
                          <input
                            placeholder="Đường/Thôn/Ấp"
                            autoComplete="off"
                            disabled={disabled}
                            className="form-control"
                            name="street"
                            value={user.street}
                            onChange={changeStreet}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-6 form-group d-flex">
                      <label className="col-sm-3">Đối tượng</label>
                      <div className="col-sm-9 pl-0">
                        <select
                          placeholder="Đối tượng"
                          autoComplete="off"
                          className="form-control"
                          name="patient_type"
                          value={user.patientType}
                          onChange={changePatientType}
                          ref={register({
                            required: true,
                          })}
                        >
                          <option value="">Chọn loại đối tượng ưu tiên</option>
                          {PatientPriorityTypes.map(type => (
                            <option key={type.value} value={type.valueType}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                        {errors.patient_type &&
                        errors.patient_type?.type === 'required' ? (
                          <span style={{ color: ' #fb0606' }}>
                            Vui lòng chọn loại đối tượng ưu tiên
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group d-flex">
                        <label className="col-sm-3">Ngày sinh</label>
                        <div className="col-sm-9 pl-0">
                          <input
                            name="birthday"
                            type="date"
                            disabled={disabled}
                            className="form-control"
                            placeholder="Ngày sinh"
                            max={dateUtil.format(
                              new Date(),
                              DEFAULT_FORMAT_INPUT_DATE,
                            )}
                            ref={register({
                              required: !disabled,
                            })}
                            value={
                              !_.isEmpty(user.birthDay)
                                ? dateUtil.format(
                                    new Date(user.birthDay),
                                    DEFAULT_FORMAT_INPUT_DATE,
                                  )
                                : ''
                            }
                            onChange={changeBirthDay}
                          />
                          {errors.birthday &&
                          errors.birthday?.type === 'required' ? (
                            <span style={{ color: ' #fb0606' }}>
                              Vui lòng chọn ngày sinh
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 text-center mt-5">
                      <button
                        className="btn btn-danger mr-4 w-25"
                        type="submit"
                      >
                        ĐĂNG KÝ Số thứ tự Ưu Tiên
                      </button>
                      <button
                        className="btn btn-primary"
                        type="button"
                        onClick={resetState}
                      >
                        Huỷ
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
