/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import * as PatientSlice from 'store/patient/shared/slice';
import * as fromPatientSelector from 'store/patient/shared/selectors';
import * as LocationSelectors from 'store/location/shared/selectors';
import * as _ from 'lodash';
import { PatientSaga } from 'store/patient/shared/saga';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { LocationTypes } from 'store/patient/constants/http.constant';
import { DEFAULT_FORMAT_INPUT_DATE } from 'store/common/constants/common.constant';
import { PatientModel } from 'store/patient/shared/types';
import { PatientService } from 'services/patient.service';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DateFnsUtils from '@date-io/date-fns';
import '../../PersonnelPage/Modal.css';

export function ModalUpdatePatient({ open, onClose }) {
  useInjectReducer({ key: PatientSlice.sliceKey, reducer: PatientSlice.reducer });
  useInjectSaga({ key: PatientSlice.sliceKey, saga: PatientSaga });
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const locations: any[] = useSelector(LocationSelectors.selectLocations);
  const patientData: any = useSelector(fromPatientSelector.selectDataPatient);
  const [patientInfo, setPatientInfo] = useState<any>({});
  const [dists, setDists] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  useEffect(() => {
    function setDefaultAddress() {
      if (!PatientService.validAddressWithName(patientData)) {
        setPatientInfo(patientData);
      }else {
        if (patientData.province_name) {
          const patientProvince = locations.find(loc => loc.province_name === patientData.province_name);
          if (patientProvince) {
            setDists(patientProvince.districts);
            if (patientData.district_name) {
              const patientDist = patientProvince.districts.find(loc => loc.district_name === patientData.district_name);
              if (patientDist) {
                setWards(patientDist.wards);
                if (patientData.ward_name) {
                  const patientWard = patientDist.wards.find(loc => loc.ward_name === patientData.ward_name);
                  if (patientWard) {
                    const defaultPatientAddress = PatientService.setAddressPatientWithLocationName(
                      patientData,
                      locations,
                      patientProvince.districts,
                      patientDist.wards,
                    );
                    setPatientInfo(defaultPatientAddress);
                  }
                }
              }
            }
          }
        }
      }
    }
    if (!_.isEmpty(patientData)) {
      setDefaultAddress();
    }
  }, [patientData]);

  useEffect(() => {
    return () => {
      dispatch(PatientSlice.actions.clearPatientInfo());
    }
  }, []);

  const onSubmit = form => {
    const editPatientData = Object.assign({}, form, {
      code: patientInfo.code,
      tekmedi_id: patientInfo.tekmedi_id,
      tekmedi_card_number: patientInfo.tekmedi_card_number,
      id: patientInfo.id,
    });
    const submitData: PatientModel = PatientService.setAddressPatientData(
      editPatientData,
      locations,
      dists,
      wards,
    );
    dispatch(PatientSlice.actions.updatePatient(submitData));
  };

  const selectLocationControl = (e, locationType) => {
    const selectValue = +e.target.value;
    if (locationType === LocationTypes.PROVINCE) {
      setWards([]);
      const selectProvince = PatientService.filterProvince(
        locations,
        selectValue,
      );
      if (selectProvince) {
        setDists(selectProvince.districts);
      }
    } else if (locationType === LocationTypes.DIST) {
      const selectDist = PatientService.filterDist(dists, selectValue);
      if (selectDist) {
        setWards(selectDist.wards);
      }
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={onClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {
            !_.isEmpty(patientInfo) && (
              <div className="row">
                <div className="form-group col-md-12">
                  <h3 className="m-0">C???p Nh???t Th??ng Tin B???nh Nh??n</h3>
                </div>
                <div className="form-group col-md-6">
                  <label>M?? th???</label>
                  <input
                    placeholder="M?? th???"
                    type="text"
                    className="form-control"
                    name="tekmedi_card_number"
                    disabled
                    ref={register()}
                    defaultValue={patientInfo.tekmedi_card_number}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Tekmedi UID</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tekmedi UID"
                    name="tekmedi_id"
                    disabled
                    ref={register()}
                    defaultValue={patientInfo.tekmedi_id}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>M?? b???nh nh??n</label>
                  <input
                    type="text"
                    className="form-control"
                    name="code"
                    disabled
                    placeholder="M?? b???nh nh??n"
                    ref={register({ required: true })}
                    defaultValue={patientInfo.code}
                  />
                  {errors.code && errors.code?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng nh???p m?? b???nh nh??n</span>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label>H???</label>
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    placeholder="H???"
                    defaultValue={patientInfo.last_name}
                    ref={register({ required: true })}
                  />
                  {errors.last_name && errors.last_name?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng nh???p h??? v?? t??n</span>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label>T??n</label>
                  <input
                    type="text"
                    className="form-control form-margin"
                    name="first_name"
                    placeholder="T??n"
                    defaultValue={patientInfo.first_name}
                    ref={register({ required: true })}
                  />
                  {errors.first_name && errors.first_name?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng nh???p h??? v?? t??n</span>
                  ) : null}
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">Gi???i t??nh</label>
                  <select
                    name="gender"
                    className="form-control"
                    placeholder="Ch???n gi???i t??nh"
                    defaultValue={patientInfo.gender}
                    ref={register({ required: true })}
                  >
                    <option value="">Ch???n gi???i t??nh</option>
                    <option value="Nam">Nam</option>
                    <option value="N???">N???</option>
                  </select>
                  {errors.gender && errors.gender?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng ch???n gi???i t??nh</span>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="input">Ng??y sinh</label>
                  <input
                    type="date"
                    className="form-control"
                    name="birthday"
                    ref={register({ required: true })}
                    defaultValue={dateUtil.format(
                      new Date(patientInfo.birthday),
                      DEFAULT_FORMAT_INPUT_DATE
                    )}
                    placeholder="Ng??y sinh"
                  />
                  {errors.birthday && errors.birthday?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng ch???n ng??y sinh</span>
                  ) : null}
                </div>
                <div className="form-group col-md-3">
                  <div className="form-check form-check-edit">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="i-year"
                      name="birthday_year_only"
                      defaultValue={patientInfo.birthday_year_only}
                      ref={register()}
                      style={{ marginTop: '6px' }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="i-year"
                      style={{ paddingLeft: '20px' }}
                    >
                      {' '}
                      Ch??? c?? n??m sinh
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">T???nh/Th??nh ph???</label>
                  <select
                    className="form-control"
                    name="province_id"
                    ref={register({ required: true })}
                    defaultValue={patientInfo.province_id}
                    onChange={e => selectLocationControl(e, LocationTypes.PROVINCE)}
                  >
                    <option value="">Ch???n t???nh</option>
                    {locations?.length
                      ? locations.map((loc: any) => {
                          return (
                            <option
                              value={loc.province_code}
                              key={loc.province_code}
                            >
                              {loc.province_name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  {errors.province_id && errors.province_id?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng ch???n t???nh/th??nh ph???</span>
                  ) : null}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">Qu???n/Huy???n</label>
                  <select
                    className="form-control"
                    name="district_id"
                    ref={register({ required: true })}
                    defaultValue={patientInfo.district_id}
                    onChange={e => selectLocationControl(e, LocationTypes.DIST)}
                  >
                    <option value="">Ch???n qu???n</option>
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
                  {errors.district_id && errors.district_id?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng ch???n qu???n/huy???n</span>
                  ) : null}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">Ph?????ng/X??/Th??? tr???n</label>
                  <select
                    className="form-control"
                    name="ward_id"
                    ref={register({ required: true })}
                    defaultValue={patientInfo.ward_id}
                  >
                    <option value="">Ch???n ph?????ng x??</option>
                    {wards?.length
                      ? wards.map((ward: any) => {
                          return (
                            <option value={ward.ward_code} key={ward.ward_code}>
                              {ward.ward_name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  {errors.ward_id && errors.ward_id?.type === 'required' ? (
                    <span style={{ color: ' #fb0606' }}>Vui l??ng ch???n ph?????ng/x??/th??? tr???n</span>
                  ) : null}
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">CMND</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="S??? CMND"
                    name="identity_card_number"
                    defaultValue={patientInfo.identity_card_number}
                    ref={register()}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">Ng??y c???p</label>
                  <input
                    type="date"
                    className="form-control"
                    ref={register()}
                    name="identity_card_number_issued_date"
                    defaultValue={
                      patientInfo.identity_card_number_issued_date ? dateUtil.format(
                      new Date(patientInfo.identity_card_number_issued_date),
                      DEFAULT_FORMAT_INPUT_DATE
                    ) : ''}
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="input">N??i c???p</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="N??i c???p CMND"
                    defaultValue={patientInfo.identity_card_number_issued_place}
                    ref={register()}
                    name="identity_card_number_issued_place"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">S??? ??i???n tho???i</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="S??? ??i???n tho???i"
                    defaultValue={patientInfo.phone}
                    ref={register()}
                    name="phone"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">M?? BHYT</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="M?? b???o hi???m y t???"
                    ref={register()}
                    defaultValue={patientInfo.health_insurance_number}
                    name="health_insurance_number"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">M?? ????n v???</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="M?? ????n v???"
                    ref={register()}
                    defaultValue={patientInfo.health_insurance_first_place_code}
                    name="health_insurance_first_place_code"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">T??n ????n v???</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="T??n ????n v???"
                    ref={register()}
                    name="health_insurance_first_place"
                    defaultValue={patientInfo.health_insurance_first_place}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">Ng??y b???t ?????u</label>
                  <input
                    type="date"
                    className="form-control"
                    ref={register()}
                    name="health_insurance_issued_date"
                    defaultValue={patientInfo.health_insurance_issued_date ? dateUtil.format(
                      new Date(patientInfo.health_insurance_issued_date),
                      DEFAULT_FORMAT_INPUT_DATE
                    ) : ''}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="input">Ng??y k???t th??c</label>
                  <input
                    type="date"
                    className="form-control"
                    ref={register()}
                    name="health_insurance_expired_date"
                    defaultValue={patientInfo.health_insurance_expired_date ? dateUtil.format(
                      new Date(patientInfo.health_insurance_expired_date),
                      DEFAULT_FORMAT_INPUT_DATE
                    ) : ''}
                  />
                </div>
                <div className="form-group col-md-6">
                  <div className="form-check pl-0">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      style={{ marginTop: '6px' }}
                      ref={register()}
                      name="is_active"
                      defaultChecked={patientInfo.is_active}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="i-actions"
                      style={{ paddingLeft: '20px' }}
                    >
                      Ho???t d???ng
                    </label>
                  </div>
                </div>
                <div className="form-group col-md-6 d-flex justify-content-end">
                  <input
                    type="button"
                    onClick={onClose}
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
            )
          }
        </form>
      </DialogContent>
    </Dialog>
  );
}
