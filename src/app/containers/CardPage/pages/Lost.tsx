/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
import {
  useInjectSaga,
  useInjectReducer,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, actions, reducer } from 'store/card/shared/slice';
import { CardFormSaga } from 'store/card/shared/saga';
import { useSnackbar } from 'notistack';
import { PatientHttp } from 'store/patient/services/patient.http';
import { CardHttp } from 'store/card/services/card.http';
import { NotifyService } from 'services/notify.service';
import { CurrencyService } from 'services/currency.service';
import { PatientService } from 'services/patient.service';
import { AppHelper } from 'utils/app.helper';
import { useReactToPrint } from 'react-to-print';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from 'app/components/Loading';
import PrintLostCard from '../components/PrintLostCard';
import * as fromAuth from 'store/auth/shared/selectors';
import * as fromCard from 'store/card/shared/selectors';
import * as PatientConst from 'store/patient/constants/patient.constant';
import * as CardConst from 'store/card/constants/card.constant';
import * as _ from 'lodash';

export function LostPage() {
  useInjectSaga({ key: sliceKey, saga: CardFormSaga });
  useInjectReducer({ key: sliceKey, reducer: reducer });
  const dateUtil = new DateFnsUtils();
  const patientHttp = new PatientHttp();
  const cardHttp = new CardHttp();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const error: any = useSelector(fromCard.selectError);
  const success: any = useSelector(fromCard.selectSuccess);
  const user: any = useSelector<any>(fromAuth.selectUser);
  const [cardCode, setCardCode] = useState<string>('');
  const [newCardCode, setNewCardCode] = useState<string>('');
  const [patientCode, setPatientCode] = useState<string>('');
  const [priceInCard, setPriceInCard] = useState<number>(0);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [loadingSingle, setLoadingSingle] = useState<boolean>(false);
  const [openPrintLostCard, setOpenPrintLostCard] = useState<boolean>(false);
  const [cardLostInfo, setCardLostInfo] = useState<any>();
  const [isCheckSuccess, setIsCheckSuccess] = useState<boolean>(true);
  const [disableNewCardCode, setDisableNewCardCode] = useState<boolean>(true);
  const [isCheckCardCodeError, setIsCheckCardCodeError] = useState<boolean>(
    false,
  );
  const [isCheckCardCodeSuccess, setIsCheckCardCodeSuccess] = useState<boolean>(
    false,
  );
  const [isCheckPatientCodeError, setIsCheckPatientCodeError] = useState<
    boolean
  >(false);
  const [isCheckPatientCodeSuccess, setIsCheckPatientCodeSuccess] = useState<
    boolean
  >(false);
  const patientCodeRef: any = useRef(null);
  const cardNewCodeRef: any = useRef(null);
  let patientDelayRef: any = useRef(null);
  let printRef = useRef<HTMLDivElement>(null);
  let cardDelayRef: any = useRef(null);

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactToPrintContent,
    removeAfterPrint: true,
  });

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  const onChangeCardCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardCode(e.target.value);
  };

  const handleBlurCardCode = () => {
    if (newCardCode !== cardNewCodeRef.current) {
      if (!_.isEmpty(newCardCode)) {
        cardHttp
          .validateCard(newCardCode)
          .then(response => {
            const validCard = response.data;
            if (AppHelper.checkResponseData(validCard)) {
              if (!validCard.result) {
                setIsCheckSuccess(true);
                setIsCheckCardCodeSuccess(false);
                setIsCheckPatientCodeError(true);
                setIsCheckCardCodeError(true);
                cardNewCodeRef.current = newCardCode
                return dispatch(
                  actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: CardConst.RESPONSE_CONSTANT.FORMAT_CARD_FAIL,
                    message: CardConst.RESPONSE_MESSAGE.FORMAT_CARD_FAIL,
                  }),
                );
              }
              cardHttp
                .getByCardNumber(newCardCode)
                .then(cardResponse => cardResponse.data)
                .then(cardInfoByCode => {
                  if (AppHelper.checkResponseData(cardInfoByCode)) {
                    const cardData = _.get(cardInfoByCode, 'result');
                    if (cardData.is_active) {
                      // setPriceInCard(_.get(cardData, 'price'));
                      setIsCheckCardCodeError(true);
                      setIsCheckCardCodeSuccess(false);
                      setIsCheckSuccess(true);
                      cardNewCodeRef.current = newCardCode
                      return dispatch(
                        actions.setError({
                          id: AppHelper.generateUUID() + Date.now(),
                          key: CardConst.RESPONSE_CONSTANT.EXIST_CARD,
                          message: CardConst.RESPONSE_MESSAGE.EXIST_CARD,
                        }),
                      );
                    } else {
                      cardNewCodeRef.current = newCardCode
                      dispatch(
                        actions.setSuccess({
                          id: AppHelper.generateUUID() + Date.now(),
                          key: CardConst.RESPONSE_CONSTANT.USE_CARD_SUCCESS,
                          message: CardConst.RESPONSE_MESSAGE.USE_CARD_SUCCESS,
                        }),
                      );
                      setIsCheckCardCodeSuccess(true);
                      setIsCheckCardCodeError(false);
                      setIsCheckSuccess(false);
                      
                    }
                  } else {
                    dispatch(
                      actions.setSuccess({
                        id: AppHelper.generateUUID() + Date.now(),
                        key: CardConst.RESPONSE_CONSTANT.USE_CARD_SUCCESS,
                        message: CardConst.RESPONSE_MESSAGE.USE_CARD_SUCCESS,
                      }),
                    );
                    setIsCheckCardCodeSuccess(true);
                    setIsCheckCardCodeError(false);
                    setIsCheckSuccess(false);
                    cardNewCodeRef.current = newCardCode
                  }
                })
                .catch(error => console.log(error));
            }
          })
          .catch(error => console.log(error));
      } else {
        cardNewCodeRef.current = newCardCode
        setIsCheckSuccess(false);
        setNewCardCode('');
        setIsCheckCardCodeError(false);
        setIsCheckCardCodeSuccess(false);
      }
    }
  };

  const enterCardCode = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
  const onChangePatientCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCardCode('');
    setDisableNewCardCode(true);
    setIsCheckCardCodeSuccess(false);
    setIsCheckCardCodeError(false);
    setIsCheckSuccess(true);
    setPatientCode(e.target.value);
  };

  const handleBlurPatientCode = () => {
    if (patientCode !== patientCodeRef.current) {
      if (!_.isEmpty(patientCode)) {
        patientHttp
          .getPatientWithCode(patientCode)
          .then(response => response.data)
          .then(patientInfo => {
            if (AppHelper.checkResponseData(patientInfo)) {
              const responseResult = _.get(patientInfo, 'result');
              PatientService.checkAndCallPatientAddress(
                responseResult,
                setPatientInfo,
              );
              setIsCheckPatientCodeSuccess(true);
              patientCodeRef.current = patientCode;
              const cardCode = _.get(patientInfo, 'result.tekmedi_card_number');
              if (!_.isEmpty(cardCode)) {
                setCardCode(cardCode);
                patientHttp
                  .getPatientWithCardCode(cardCode)
                  .then(response => response.data)
                  .then(patientInfo => {
                    if (AppHelper.checkResponseData(patientInfo)) {
                      const price = _.get(patientInfo, 'result.price');
                      setDisableNewCardCode(false);
                      setPriceInCard(price);
                      setIsCheckSuccess(false);
                    }
                  })
                  .catch(error => console.log(error));
              } else {
                setPriceInCard(0);
                setCardCode('');
                setIsCheckPatientCodeError(true);
                setIsCheckPatientCodeSuccess(false);
                setPatientInfo({});
                setIsCheckSuccess(true);
                setDisableNewCardCode(true);
                dispatch(
                  actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: CardConst.RESPONSE_CONSTANT.PATIENT_NOT_REGISTER_CARD,
                    message:
                      CardConst.RESPONSE_MESSAGE.PATIENT_NOT_REGISTER_CARD,
                  }),
                );
                patientCodeRef.currnent = patientCode;
              }
              setLoadingSingle(false);
            } else {
              dispatch(
                actions.setError({
                  id: AppHelper.generateUUID() + Date.now(),
                  key: PatientConst.RESPONSE_CONSTANT.FIND_BY_CODE_FAIL,
                  message: PatientConst.RESPONSE_MESSAGE.FIND_BY_CODE_FAIL,
                }),
              );
              setDisableNewCardCode(true);
              setIsCheckSuccess(true);
              setCardCode('');
              setIsCheckPatientCodeError(true);
              setIsCheckPatientCodeSuccess(false);
              setPriceInCard(0);
              setPatientInfo({});
              setLoadingSingle(false);
              patientCodeRef.current = patientCode;
            }
          })
          .catch(error => setLoadingSingle(false));
      } else {
        setDisableNewCardCode(true);
        setCardCode('');
        setPriceInCard(0);
        setPatientInfo({});
        setIsCheckSuccess(true);
        setIsCheckPatientCodeError(false);
        setIsCheckPatientCodeSuccess(false);
        patientCodeRef.current = patientCode;
      }
    }
  };

  const enterPatientCode = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };
 
  const resetData = () => {
    setPatientCode('');
    setPriceInCard(0);
    setPatientInfo({});
    setIsCheckPatientCodeError(false);
    setIsCheckPatientCodeSuccess(false);
    cardNewCodeRef.current = newCardCode
  };

  const resetAllData = () => {
    resetData();
    setCardCode('');
    setNewCardCode('');
    setIsCheckCardCodeError(false);
    setIsCheckCardCodeSuccess(false);
    setIsCheckSuccess(true);
    setDisableNewCardCode(true);
    patientCodeRef.current = patientCode;
  };

  const lostCard = (): void => {
    if (_.isEmpty(user) || AppHelper.checkEmptyString(cardCode)) return;
    const requestParams = {
      userId: user.id,
      cardNumber: cardCode,
      newCardnumber: newCardCode,
      patientCode: patientInfo.code,
    };
    setLoadingSingle(true);
    cardHttp
      .lostCard(requestParams)
      .then(response => response.data)
      .then(cardInfo => {
        setLoadingSingle(false);
        if (AppHelper.checkResponseData(cardInfo)) {
          setCardLostInfo(cardInfo.result);
          setOpenPrintLostCard(true);
          handlePrint!();
        } else {
          dispatch(
            actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: CardConst.RESPONSE_CONSTANT.RETURN_PAYMENT_FAIL,
              message: cardInfo.message,
            }),
          );
        }
      })
      .catch(error => {
        console.error(error);
        setLoadingSingle(false);
      })
      .finally(() => resetAllData());
  };

  return (
    <div className="row">
      {openPrintLostCard && !_.isEmpty(cardLostInfo) ? (
        <div className="d-none">
          <PrintLostCard card={cardLostInfo} ref={printRef} />
        </div>
      ) : null}
      {loadingSingle ? <AppLoading loading={true} /> : null}
      <div className="col-sm-12">
        <div className=" col-sm-12">
          <div className="card card-box">
            <div className="card-head">
              <header>Mất Thẻ</header>
              <button
                id="panel-button2"
                className="mdl-button mdl-js-button mdl-button--icon pull-right"
                data-upgraded=",MaterialButton"
              >
                <i className="material-icons">more_vert</i>
              </button>
              <div className="mdl-menu__container is-upgraded">
                <div className="mdl-menu__outline mdl-menu--bottom-right"></div>
                <ul
                  className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                  data-mdl-for="panel-button2"
                  data-upgraded=",MaterialMenu,MaterialRipple"
                >
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">assistant_photo</i>Action
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple"></span>
                    </span>
                  </li>
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">print</i>Another action
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple"></span>
                    </span>
                  </li>
                  <li
                    className="mdl-menu__item mdl-js-ripple-effect"
                    tabIndex={-1}
                    data-upgraded=",MaterialRipple"
                  >
                    <i className="material-icons">favorite</i>Something else
                    here
                    <span className="mdl-menu__item-ripple-container">
                      <span className="mdl-ripple"></span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className=" col-sm-6">
                  <div className="card card-topline-aqua">
                    <div className="card-body ">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Mã thẻ
                            </label>
                            <input
                              disabled
                              type="text"
                              className="form-control"
                              placeholder="Mã thẻ"
                              value={cardCode}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Mã bệnh nhân
                            </label>
                            <input
                              ref={patientCodeRef}
                              type="text"
                              className="form-control"
                              placeholder="Mã bệnh nhân"
                              value={patientCode}
                              onChange={onChangePatientCode}
                              onBlur={handleBlurPatientCode}
                              // onFocus={() => setPatientCode('')}
                              onKeyPress={enterPatientCode}
                              style={{
                                borderColor: isCheckPatientCodeSuccess
                                  ? '#339900'
                                  : isCheckPatientCodeError
                                  ? 'red'
                                  : '#ccc',
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Họ và tên
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Họ và tên"
                              disabled
                              defaultValue={
                                !_.isEmpty(patientInfo)
                                  ? `${patientInfo.last_name} ${patientInfo.first_name}`
                                  : ''
                              }
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Ngày sinh
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Ngày sinh"
                              disabled
                              defaultValue={
                                !_.isEmpty(patientInfo)
                                  ? dateUtil.format(
                                      new Date(patientInfo.birthday),
                                      DEFAULT_FORMAT_DATE,
                                    )
                                  : ''
                              }
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              CMND
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Chứng minh nhân dân"
                              disabled
                              defaultValue={
                                !_.isEmpty(patientInfo)
                                  ? patientInfo.identityCardNumber
                                  : ''
                              }
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit">
                              Giới tính{' '}
                            </label>
                            <div className="col-sm-9 px-0">
                              <select
                                disabled
                                name="gender"
                                className="form-control"
                                style={{ height: '34px' }}
                                value={
                                  !_.isEmpty(patientInfo)
                                    ? patientInfo.gender === 'Nam'
                                      ? 1
                                      : 0
                                    : -1
                                }
                              >
                                <option value="-1">Giới tính</option>
                                <option value="1">Nam</option>
                                <option value="0">Nữ</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Địa chỉ
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Địa chỉ"
                              disabled
                              defaultValue={
                                !_.isEmpty(patientInfo)
                                  ? patientInfo.address
                                  : ''
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12 col-md-6">
                  <div className="card card-topline-aqua">
                    <div className="card-body ">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Tiền
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Tiền"
                              disabled={true}
                              value={CurrencyService.formatCurrency(
                                priceInCard,
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Mã thẻ mới
                            </label>
                            <input
                              disabled={disableNewCardCode}
                              ref={cardNewCodeRef}
                              type="text"
                              className="form-control"
                              placeholder="Mã thẻ"
                              value={newCardCode}
                              onChange={onChangeCardCode}
                              onBlur={handleBlurCardCode}
                              onKeyPress={enterCardCode}
                              maxLength={12}
                              // onFocus={() => setNewCardCode('')}
                              style={{
                                borderColor: isCheckCardCodeError
                                  ? 'red'
                                  : isCheckCardCodeSuccess
                                  ? '#339900'
                                  : '#ccc',
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Phí mất thẻ
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Phí mất thẻ"
                              disabled={true}
                              value={CurrencyService.formatCurrency(50000)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row float-right mr-1">
                    <button
                      id="SaveBtn"
                      className="btn btn-primary btn-lg savebtn"
                      onClick={() => lostCard()}
                      disabled={isCheckSuccess}
                    >
                      Lưu
                    </button>
                    <button
                      id="CancelBtn"
                      className="btn btn-secondary btn-lg ml-2"
                      onClick={() => resetAllData()}
                    >
                      HỦY
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
