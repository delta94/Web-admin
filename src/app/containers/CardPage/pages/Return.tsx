/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/card/shared/slice';
import { CardFormSaga } from 'store/card/shared/saga';
import { useSnackbar } from 'notistack';
import { PatientHttp } from 'store/patient/services/patient.http';
import { CardHttp } from 'store/card/services/card.http';
import { NotifyService } from 'services/notify.service';
import { CurrencyService } from 'services/currency.service';
import { PatientService } from '../../../../services/patient.service';
import { AppHelper } from 'utils/app.helper';
import { ModalConfirm } from '../../../components/Modal/Confirm';
import { useReactToPrint } from 'react-to-print';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from '../../../components/Loading';
import PrintReturn from '../components/PrintReturn';
import * as fromAuth from 'store/auth/shared/selectors';
import * as fromCard from 'store/card/shared/selectors';
import * as PatientConst from 'store/patient/constants/patient.constant';
import * as CardConst from 'store/card/constants/card.constant';
import * as _ from 'lodash';
import { ReceptionHttp } from 'store/reception/services/reception.http';

export function ReturnPage() {
  useInjectSaga({ key: sliceKey, saga: CardFormSaga });
  const dateUtil = new DateFnsUtils();
  const patienHttpSevice = new PatientHttp();
  const cardHttpService = new CardHttp();
  const receptionSevice = new ReceptionHttp();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const error: any = useSelector(fromCard.selectError);
  const success: any = useSelector(fromCard.selectSuccess);
  const user: any = useSelector<any>(fromAuth.selectUser);

  const [cardCode, setCardCode] = useState<string>('');
  const [patientCode, setPatientCode] = useState<string>('');
  const [priceInCard, setPriceInCard] = useState<number>(0);
  const [priceSelect, setPriceSelect] = useState<any>(0);
  const [isValidCard, setIsValidCode] = useState<boolean>(false);
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [loadingSingle, setLoadingSingle] = useState<boolean>(false);
  const [openPrintReturn, setOpenPrintReturn] = useState<boolean>(false);
  const [openConfirmReturnPayment, setOpenConfirmReturnPayment] = useState<
    boolean
  >(false);
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
  const [isCheckSuccess, setIsCheckSuccess] = useState<boolean>(true);
  const [cardInfo, setCardInfo] = useState<any>();
  const cardCodeRef: any = useRef(null);
  const patientCodeRef: any = useRef(null);
  let cardDelayRef: any = useRef(null);
  let patientDelayRef: any = useRef(null);
  let printRef = useRef<HTMLDivElement>(null);

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

  const handleChangeCardCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatientCode('');
    setIsCheckPatientCodeSuccess(false);
    setIsCheckPatientCodeError(false);
    setCardCode(e.target.value);
  };

  const handleBlurCardCode = () => {
    if (cardCode !== cardCodeRef.current) {
      if (!_.isEmpty(cardCode)) {
        cardHttpService
          .validateCard(cardCode)
          .then(response => {
            const validCard = response.data;
            if (AppHelper.checkResponseData(validCard)) {
              setIsValidCode(validCard.result);
              if (!validCard.result) {
                setPriceInCard(0);
                setPatientInfo({});
                setPatientCode('');
                setPriceSelect(0);
                setIsCheckCardCodeError(true);
                setIsCheckPatientCodeSuccess(false);
                setIsCheckPatientCodeError(false);
                cardCodeRef.current = cardCode;
                setIsCheckSuccess(true);
                return dispatch(
                  actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: CardConst.RESPONSE_CONSTANT.FORMAT_CARD_FAIL,
                    message: CardConst.RESPONSE_MESSAGE.FORMAT_CARD_FAIL,
                  }),
                );
              }
              setIsCheckCardCodeError(false);
              setIsCheckCardCodeSuccess(false);
              cardCodeRef.current = cardCode;
              patienHttpSevice
                .getPatientWithCardCode(cardCode)
                .then(response => response.data)
                .then(patientByCode => {
                  if (!AppHelper.checkResponseData(patientByCode)) {
                    setCardCode('');
                    setPatientCode('');
                    setPriceInCard(0);
                    setPatientInfo({});
                    setIsCheckCardCodeError(false);
                    setIsCheckPatientCodeSuccess(false);
                    setIsCheckPatientCodeError(false);
                    setIsCheckSuccess(true);
                    setPriceSelect(0);
                    cardCodeRef.current = cardCode;
                    return dispatch(
                      actions.setError({
                        id: AppHelper.generateUUID() + Date.now(),
                        key: CardConst.RESPONSE_CONSTANT.NOT_FOUND_WITH_ID,
                        message: _.get(patientByCode, 'message'),
                      }),
                    );
                  }
                  setIsCheckCardCodeError(false);
                  setIsCheckCardCodeSuccess(true);
                  const price = _.get(patientByCode, 'result.price');
                  setPriceInCard(price);
                  cardCodeRef.current = cardCode;
                  const patientCode = _.get(patientByCode, 'result.code');
                  const responseResult = _.get(patientByCode, 'result');
                  PatientService.checkAndCallPatientAddress(
                    responseResult,
                    setPatientInfo,
                  );
                  if (!_.isEmpty(patientCode)) {
                    setIsCheckPatientCodeSuccess(true);
                    setIsCheckSuccess(false);
                    setPatientCode(patientCode);
                  }
                })
                .catch(error => console.log(error));
            }
            cardCodeRef.current = cardCode;
            setIsCheckSuccess(true);
            setIsCheckCardCodeError(false);
            setIsCheckCardCodeSuccess(false);
          })
          .catch(error => console.log(error));
      } else {
        cardCodeRef.current = cardCode;
        setIsCheckSuccess(true);
        setPatientCode('');
        setPriceInCard(0);
        setPriceSelect(0);
        setPatientInfo({});
        setIsCheckCardCodeError(false);
        setIsCheckCardCodeSuccess(false);
        setIsCheckPatientCodeSuccess(false);
        setIsCheckPatientCodeError(false);
      }
    }
  };

  const enterCardCode = e => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const onChangePatientCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCode('');
    setIsCheckCardCodeSuccess(false);
    setIsCheckCardCodeError(false);
    setPatientCode(e.target.value);
  };

  const handleBlurPatientCode = () => {
    if (patientCode !== patientCodeRef.current) {
      if (!_.isEmpty(patientCode)) {
        patienHttpSevice
          .getPatientWithCode(patientCode)
          .then(response => response.data)
          .then(patientInfo => {
            if (AppHelper.checkResponseData(patientInfo)) {
              const responseResult = _.get(patientInfo, 'result');
              PatientService.checkAndCallPatientAddress(
                responseResult,
                setPatientInfo,
              );
              patientCodeRef.current = patientCode;
              setIsCheckPatientCodeSuccess(true);
              const cardCode = _.get(patientInfo, 'result.tekmedi_card_number');
              if (!_.isEmpty(cardCode)) {
                setCardCode(cardCode);
                patienHttpSevice
                  .getPatientWithCardCode(cardCode)
                  .then(response => response.data)
                  .then(patientInfo => {
                    if (AppHelper.checkResponseData(patientInfo)) {
                      const price = _.get(patientInfo, 'result.price');
                      setIsCheckSuccess(false);
                      setPriceInCard(price);
                      setIsCheckCardCodeSuccess(true);
                      setIsCheckCardCodeError(false);
                    }
                  })
                  .catch(error => console.log(error));
              } else {
                patientCodeRef.current = patientCode;
                setPriceInCard(0);
                setPriceSelect(0);
                setCardCode('');
                setIsCheckPatientCodeError(true);
                setIsCheckPatientCodeSuccess(false);
                setIsCheckCardCodeSuccess(false);
                setIsCheckCardCodeError(false);
                setPatientInfo({});
                setIsCheckSuccess(true);
                dispatch(
                  actions.setError({
                    id: AppHelper.generateUUID() + Date.now(),
                    key: CardConst.RESPONSE_CONSTANT.PATIENT_NOT_REGISTER_CARD,
                    message:
                      CardConst.RESPONSE_MESSAGE.PATIENT_NOT_REGISTER_CARD,
                  }),
                );
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
              patientCodeRef.current = patientCode;
              setIsCheckSuccess(true);
              setCardCode('');
              setIsCheckPatientCodeError(true);
              setIsCheckPatientCodeSuccess(false);
              setIsCheckCardCodeSuccess(false);
              setPriceInCard(0);
              setPriceSelect(0);
              setPatientInfo({});
              setLoadingSingle(false);
            }
          })
          .catch(error => setLoadingSingle(false));
      } else {
        patientCodeRef.current = patientCode;
        setCardCode('');
        setPriceSelect(0);
        setPriceInCard(0);
        setPatientInfo({});
        setIsCheckSuccess(true);
        setIsCheckPatientCodeError(false);
        setIsCheckPatientCodeSuccess(false);
        setIsCheckCardCodeSuccess(false);
        setIsCheckCardCodeError(false);
      }
    }
  };

  const enterPatientCode = (e: any) => {
    if (e.key === 'Enter') {
      e.target.blur();
    }
  };

  const closeConfirm = (): void => {
    setOpenConfirmReturnPayment(false);
  };

  const resetData = () => {
    cardCodeRef.current = '';
    setPatientCode('');
    setPriceInCard(0);
    setPatientInfo({});
    setIsCheckPatientCodeError(false);
    setIsCheckPatientCodeSuccess(false);
  };

  const resetAllData = () => {
    patientCodeRef.current = '';
    resetData();
    setCardCode('');
    setPriceSelect(0);
    setIsCheckCardCodeError(false);
    setIsCheckCardCodeSuccess(false);
    setIsCheckSuccess(true);
  };

  const returnCard = (): void => {
    if (_.isEmpty(user)) return;
    const paramFinally = {
      patientCode: patientCode,
      date: new Date(),
    };
    receptionSevice
      .checkFinally(paramFinally)
      .then(response => response.data)
      .then(checkfinal => {
        if (AppHelper.checkResponseData(checkfinal)) {
          const responseResult = _.get(checkfinal, 'result');
          if (responseResult) {
            const params = {
              cardNumber: cardCode,
              userId: user.id,
            };
            setLoadingSingle(true);
            cardHttpService
              .returnCard(params)
              .then(response => response.data)
              .then(cardInfo => {
                setLoadingSingle(false);
                if (AppHelper.checkResponseData(cardInfo)) {
                  setCardInfo(cardInfo.result);
                  setOpenPrintReturn(true);
                  resetAllData();
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
              });
          } else {
            dispatch(
              actions.setError({
                id: AppHelper.generateUUID() + Date.now(),
                key: PatientConst.RESPONSE_CONSTANT.CHECK_FINALLY_FAIL,
                message: PatientConst.RESPONSE_MESSAGE.CHECK_FINALLY_FAIL,
              }),
            );
            resetAllData();
          }
        }
      });
  };

  return (
    <div className="row">
      <ModalConfirm
        title={'Bạn có chắc chắn muốn trả thẻ không?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openConfirmReturnPayment}
        onClose={() => closeConfirm()}
        confirmMethod={() => returnCard()}
      />
      {openPrintReturn && !_.isEmpty(cardInfo) ? (
        <div className="d-none">
          <PrintReturn card={cardInfo} ref={printRef} />
        </div>
      ) : null}
      {loadingSingle ? <AppLoading loading={true} /> : null}
      <div className="col-md-12">
        <div className="tabbable-line">
          <ul className="nav customtab nav-tabs" role="tablist"></ul>
          <div className="tab-content">
            <div className="tab-pane active fontawesome-demo" id="tab1">
              <div className="row">
                <div className="col-sm-12">
                  <div className=" col-sm-12">
                    <div className="card card-box">
                      <div className="card-head">
                        <header>Trả Thẻ</header>
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
                              <i className="material-icons">assistant_photo</i>
                              Action
                              <span className="mdl-menu__item-ripple-container">
                                <span className="mdl-ripple"></span>
                              </span>
                            </li>
                            <li
                              className="mdl-menu__item mdl-js-ripple-effect"
                              tabIndex={-1}
                              data-upgraded=",MaterialRipple"
                            >
                              <i className="material-icons">print</i>Another
                              action
                              <span className="mdl-menu__item-ripple-container">
                                <span className="mdl-ripple"></span>
                              </span>
                            </li>
                            <li
                              className="mdl-menu__item mdl-js-ripple-effect"
                              tabIndex={-1}
                              data-upgraded=",MaterialRipple"
                            >
                              <i className="material-icons">favorite</i>
                              Something else here
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
                                        type="text"
                                        className="form-control"
                                        placeholder="Mã thẻ"
                                        value={cardCode}
                                        onChange={handleChangeCardCode}
                                        ref={cardCodeRef}
                                        onBlur={handleBlurCardCode}
                                        onKeyPress={enterCardCode}
                                        // onFocus={() => setCardCode('')}
                                        maxLength={12}
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
                                </div>
                              </div>
                            </div>
                            <div className="row float-right mr-1">
                              <button
                                id="SaveBtn"
                                className="btn btn-primary btn-lg savebtn"
                                onClick={() =>
                                  setOpenConfirmReturnPayment(true)
                                }
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
