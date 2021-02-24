/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from 'react';
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
import { PatientService } from 'services/patient.service';
import { AppHelper } from 'utils/app.helper';
import { PriceButton } from '../components/PriceButton';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { useReactToPrint } from 'react-to-print';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from 'app/components/Loading';
import PrintCharge from '../components/PrintCharge';
import NumberFormat from 'react-number-format';
import * as fromAuth from 'store/auth/shared/selectors';
import * as fromCard from 'store/card/shared/selectors';
import * as CardConst from 'store/card/constants/card.constant';
import * as PatientConst from 'store/patient/constants/patient.constant';
import * as _ from 'lodash';
import { selectDataListValueExtend } from 'store/card/shared/selectors';

export function RegisterPage() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: CardFormSaga });
  const dateUtil = new DateFnsUtils();
  const patienHttp = new PatientHttp();
  const cardHttp = new CardHttp();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const error: any = useSelector(fromCard.selectError);
  const success: any = useSelector(fromCard.selectSuccess);
  const user: any = useSelector<any>(fromAuth.selectUser);
  const dataListValueExtend: any = useSelector(selectDataListValueExtend);
  const [disable, setDisable] = useState<boolean>(true);
  const [disablePayment, setDisablePayment] = useState<boolean>(false);
  const [isValidCard, setIsValidCode] = useState<boolean>(false);
  const [isSaveSuccess, setIsSaveSuccess] = useState<boolean>(false);
  const [isCheckPatientCodeError, setIsCheckPatientCodeError] = useState<
    boolean
  >(false);
  const [isCheckPatientCodeSucces, setIsCheckPatientCodeSucces] = useState<
    boolean
  >(false);
  const [patientCode, setPatientCode] = useState<string>('');
  const [patientInfo, setPatientInfo] = useState<any>(null);
  const [priceSelect, setPriceSelect] = useState<any>(0);
  const [cardCode, setCardCode] = useState<string>('');
  const [priceInCard, setPriceInCard] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>('');
  const [loadingSingle, setLoadingSingle] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openConfirmAddPayment, setOpenConfirmAddPayment] = useState<boolean>(
    false,
  );
  const [isCheckPriceSelectNull, setIsCheckPriceSelectNull] = useState<boolean>(
    false,
  );
  const [isBorderRed, setIsBorderRed] = useState<boolean>(false);
  const [isBorderColorSuccess, setIsBorderColorSuccess] = useState<boolean>(
    false,
  );
  const [openPrintCharge, setOpenPrintCharge] = useState<boolean>(false);
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [isCheckIcon, setIsCheckIcon] = useState<boolean>(false);
  const [disableType, setDisableType] = useState<boolean>(true);
  let printRef = useRef<HTMLDivElement>(null);
  const patientRef: any = useRef(null);
  const cardCodeRef: any = useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactToPrintContent,
    removeAfterPrint: true,
  });

  useEffect(() => {
    const newCardCode = _.get(patientInfo, 'tekmedi_card_number');
    if (!_.isEmpty(patientInfo)) {
      if (!_.isEmpty(newCardCode)) {
        setIsBorderRed(true);
        setIsValidCode(false);
        dispatch(
          actions.setError({
            id: AppHelper.generateUUID() + Date.now(),
            key: PatientConst.RESPONSE_CONSTANT.PATIENT_EXIST_CARD,
            message: PatientConst.RESPONSE_MESSAGE.PATIENT_EXIST_CARD,
          }),
        );
        const cardByCode: Promise<any> = cardHttp.getByCardNumber(newCardCode);
        cardByCode
          .then(response => response.data)
          .then(data => {
            if (AppHelper.checkResponseData(data)) {
              const resultResponse = data.result;
              setPriceInCard(resultResponse.price);
            }
          })
          .catch(error => console.error(error));
        setDisable(true);
        setCardCode(newCardCode);
      } else {
        setDisable(false);
        setIsBorderRed(false);
      }
    } else {
      setIsBorderRed(false);
      resetCardInfo();
    }
  }, [patientInfo]);
  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === CardConst.RESPONSE_CONSTANT.REGISTER_CARD_SUCCESS) {
        setIsValidCode(false);
      }
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  const handleBlurPatientCode = () => {
    if (patientCode !== patientRef.current) {
      if (!_.isEmpty(patientCode)) {
        setCardCode('');
        setIsBorderColorSuccess(false);
        setIsBorderRed(false);
        setIsValidCode(false);
        cardCodeRef.current = cardCode;
        patienHttp
          .getPatientWithCode(patientCode)
          .then(response => response.data)
          .then((response: any) => {
            if (AppHelper.checkResponseData(response)) {
              setIsCheckPatientCodeError(false);
              setIsCheckPatientCodeSucces(true);
              patientRef.current = patientCode;
              const responseResult = _.get(response, 'result');
              PatientService.checkAndCallPatientAddress(
                responseResult,
                setPatientInfo,
              );
            } else {
              setIsCheckPatientCodeError(true);
              setIsCheckPatientCodeSucces(false);
              setIsBorderColorSuccess(false);
              setIsValidCode(false);
              dispatch(
                actions.setError({
                  id: AppHelper.generateUUID() + Date.now(),
                  key: PatientConst.RESPONSE_CONSTANT.FIND_BY_CODE_FAIL,
                  message: PatientConst.RESPONSE_MESSAGE.FIND_BY_CODE_FAIL,
                }),
              );
              patientRef.current = patientCode;
              setPatientInfo({});
            }
            setLoadingSingle(false);
          })
          .catch(error => {
            setPatientInfo({});
            setLoadingSingle(false);
          });
      } else {
        setPatientInfo({});
        setIsBorderColorSuccess(false);
        setIsBorderRed(false);
        setIsCheckPatientCodeSucces(false);
        setIsCheckPatientCodeError(false);
        patientRef.current = patientCode;
      }
    }
  };
  const onChangeValueInputPatientCode = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPatientCode(e.target.value);
  };
  const resetCardInfo = (): void => {
    setDisable(true);
    setCardCode('');
    setPriceInCard(0);
    cardCodeRef.current = '';
  };
  const handleResetPriceSelect = (): void => {
    if (priceSelect === 0) {
      setPriceSelect('');
    }
  };
  const resetAllData = (): void => {
    patientRef.current = '';
    resetCardInfo();
    setPatientInfo({});
    setDisablePayment(false);
    setPatientCode('');
    setIsValidCode(false);
    setIsBorderColorSuccess(false);
    setPriceSelect(0);
    setIsSaveSuccess(false);
    setIsCheckPatientCodeError(false);
    setIsCheckPatientCodeSucces(false);
    setIsCheckPriceSelectNull(false);
    setDisableType(true);
  };
  const selectPrice = (price: any): void => {
    setIsCheckPriceSelectNull(false);
    setPriceSelect(price.value);
  };
  const onChangePrice = ({ value }): void => {
    setPriceSelect(+value);
  };
  const onChangeInputCardCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardCode(e.target.value);
  };
  const handleBlurCardCode = () => {
    if (cardCode !== cardCodeRef.current) {
      if (!_.isEmpty(cardCode)) {
        const validateCard: Promise<any> = cardHttp.validateCard(cardCode);
        validateCard.then(response => {
          const validCard = response.data;
          if (AppHelper.checkResponseData(validCard)) {
            setIsBorderRed(false);
            if (!validCard.result) {
              setIsBorderRed(true);
              setPriceInCard(0);
              setIsValidCode(validCard.result);
              cardCodeRef.current = cardCode;
              return dispatch(
                actions.setError({
                  id: AppHelper.generateUUID() + Date.now(),
                  key: CardConst.RESPONSE_CONSTANT.FORMAT_CARD_FAIL,
                  message: CardConst.RESPONSE_MESSAGE.FORMAT_CARD_FAIL,
                }),
              );
            }
            cardHttp
              .getByCardNumber(cardCode)
              .then(response => response.data)
              .then(cardInfo => {
                if (AppHelper.checkResponseData(cardInfo)) {
                  const cardData = _.get(cardInfo, 'result');
                  if (cardData.is_active) {
                    setPriceInCard(_.get(cardData, 'price'));
                    setIsBorderRed(true);
                    setIsBorderColorSuccess(false);
                    setIsValidCode(!validCard.result);
                    cardCodeRef.current = cardCode;
                    return dispatch(
                      actions.setError({
                        id: AppHelper.generateUUID() + Date.now(),
                        key: CardConst.RESPONSE_CONSTANT.EXIST_CARD,
                        message: CardConst.RESPONSE_MESSAGE.EXIST_CARD,
                      }),
                    );
                  } else {
                    setPriceInCard(0);
                    setIsBorderRed(false);
                    setIsBorderColorSuccess(true);
                    setIsValidCode(validCard.result);
                    cardCodeRef.current = cardCode;
                    dispatch(
                      actions.setSuccess({
                        id: AppHelper.generateUUID() + Date.now(),
                        key: CardConst.RESPONSE_CONSTANT.USE_CARD_SUCCESS,
                        message: CardConst.RESPONSE_MESSAGE.USE_CARD_SUCCESS,
                      }),
                    );
                  }
                } else {
                  setIsValidCode(validCard.result);
                  setPriceInCard(0);
                  setIsBorderRed(false);
                  setIsBorderColorSuccess(true);
                  cardCodeRef.current = cardCode;
                  dispatch(
                    actions.setSuccess({
                      id: AppHelper.generateUUID() + Date.now(),
                      key: CardConst.RESPONSE_CONSTANT.USE_CARD_SUCCESS,
                      message: CardConst.RESPONSE_MESSAGE.USE_CARD_SUCCESS,
                    }),
                  );
                }
              })
              .catch(error => console.log(error));
          }
        });
      } else {
        setIsValidCode(false);
        setPriceInCard(0);
        setIsBorderColorSuccess(false);
        setIsBorderRed(false);
        cardCodeRef.current = cardCode;
      }
    }
  };
  const saveCardToPatient = (): void => {
    const requestParams = {
      cardNumber: cardCode,
      userId: user.id,
      patientCode: patientInfo.code,
    };
    setLoadingSingle(true);
    const registerCard = cardHttp.registerCardPayment(requestParams);
    registerCard
      .then(response => response.data)
      .then(cardInfo => {
        if (AppHelper.checkResponseData(cardInfo)) {
          setIsSaveSuccess(true);
          setIsCheckPatientCodeSucces(false);
          setIsBorderColorSuccess(false);
          setDisable(true);
          setIsValidCode(true);
          setLoadingSingle(false);
          setOpenConfirm(true);
        }
      })
      .catch(error => {
        setLoadingSingle(false);
      });
  };

  const openConfirmAddPaymentClick = (): void => {
    if (paymentType === '') {
      dispatch(
        actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          key: CardConst.RESPONSE_CONSTANT.SELECT_TYPE_PAYMEN,
          message: CardConst.RESPONSE_MESSAGE.SELECT_TYPE_PAYMEN,
        }),
      );
    } else if (priceSelect === 0) {
      dispatch(
        actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          key: CardConst.RESPONSE_CONSTANT.ENTER_OR_SELECT_VALUE,
          message: CardConst.RESPONSE_MESSAGE.ENTER_OR_SELECT_VALUE,
        }),
      );
      setIsCheckPriceSelectNull(true);
    } else {
      setOpenConfirmAddPayment(true);
    }
  };

  const closeConfirm = (): void => {
    setOpenConfirm(false);
    setOpenConfirmAddPayment(false);
  };
  const typeCash = id => {
    setPaymentType(id);
    setDisableType(false);
  };
  const addPaymentToCard = (): void => {
    const requestParams: any = {
      cardNumber: cardCode,
      userId: user.id,
      patientCode: patientInfo.code,
      price: priceSelect,
      paymentType: paymentType,
    };
    setLoadingSingle(true);
    cardHttp
      .addPaymentToCard(requestParams)
      .then(response => response.data)
      .then(paymentInfo => {
        if (AppHelper.checkResponseData(paymentInfo)) {
          setPaymentInfo(paymentInfo.result);
          setLoadingSingle(false);
          setOpenPrintCharge(true);
          handlePrint!();
          resetAllData();
        }
      })
      .catch(err => {
        setLoadingSingle(false);
      });
  };
  const enterPatientCode = event => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };
  const enterCardCode = event => {
    if (event.key === 'Enter') {
      event.target.blur();
    }
  };

  const confirmMethodRecharge = () => {
    dispatch(actions.getListValueExtend());
    setDisablePayment(true);
  };

  return (
    <div className="row">
      {openPrintCharge && !_.isEmpty(paymentInfo) ? (
        <div className="d-none">
          <PrintCharge payment={paymentInfo} ref={printRef} />
        </div>
      ) : null}
      {loadingSingle ? <AppLoading loading={true} /> : null}
      <ModalConfirm
        title={
          'Gán thẻ cho bệnh nhân thành công. Bạn có muốn nạp tiền vào thẻ không ?'
        }
        keyConfirm={''}
        open={openConfirm}
        onClose={() => closeConfirm()}
        confirmMethod={() => confirmMethodRecharge()}
        rejectMethod={() => resetAllData()}
      />
      <ModalConfirm
        title={
          'Bạn có chắc chắn muốn nạp số tiền ' +
          CurrencyService.formatCurrency(priceSelect) +
          ' không?'
        }
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openConfirmAddPayment}
        onClose={() => closeConfirm()}
        confirmMethod={() => addPaymentToCard()}
      />
      <div className="col-sm-12">
        <div className=" col-sm-12">
          <div className="card card-box">
            <div className="card-head">
              <div className="container">
                <div className="row">
                  <div className="col-sm-6">
                    <header>Ghi thẻ</header>
                  </div>
                  <div className="col-sm-6">
                    <header style={{ marginLeft: '11%' }}>
                      Thông tin bệnh nhân
                    </header>
                  </div>
                </div>
              </div>
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
                  data-mdl-
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
            <div className="card-body " id="PaymentForm">
              <div className="row">
                <div className=" col-sm-6">
                  <div className="card  card-topline-aqua">
                    <div className="card-body ">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group d-flex align-items-center">
                            <label className="col-sm-3 control-label text-edit mb-0">
                              Mã bệnh nhân
                            </label>
                            <input
                              ref={patientRef}
                              type="text"
                              title="Mã bệnh nhân"
                              name="patientCode"
                              placeholder="Mã bệnh nhân"
                              id="patientCode"
                              disabled={isSaveSuccess}
                              onChange={onChangeValueInputPatientCode}
                              onBlur={handleBlurPatientCode}
                              className="form-control"
                              autoComplete="off"
                              value={patientCode}
                              style={{
                                borderColor: isCheckPatientCodeError
                                  ? 'red'
                                  : isCheckPatientCodeSucces
                                  ? '#339900'
                                  : '#ccc',
                              }}
                              onKeyPress={enterPatientCode}
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
                <div className=" col-sm-6">
                  <div className="card  card-topline-aqua">
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
                              disabled={disable}
                              value={cardCode ? cardCode : ''}
                              onChange={onChangeInputCardCode}
                              onBlur={handleBlurCardCode}
                              // onFocus={() => setCardCode('')}
                              style={{
                                borderColor: isBorderRed
                                  ? 'red'
                                  : isBorderColorSuccess
                                  ? '#339900'
                                  : '#ccc',
                              }}
                              maxLength={12}
                              ref={cardCodeRef}
                              onKeyPress={enterCardCode}
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div
                            className="form-group d-flex align-items-center"
                            style={{ marginBottom: '0px' }}
                          >
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
                  <div
                    className="row col-sm-12"
                    style={{
                      paddingRight: '0px',
                      marginRight: '0px !important',
                      display: disablePayment ? 'inline-block' : 'none',
                    }}
                  >
                    <div
                      className="card card-topline-aqua"
                      style={{ marginRight: '-15px', marginTop: '0px' }}
                    >
                      <div className="card-body ">
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group row">
                              <label className="col-sm-12 control-label text-edit">
                                Phương thức nạp tiền
                              </label>
                            </div>
                          </div>
                          <div className=" col-sm-12 mb-2">
                            <div className="row">
                              {!_.isEmpty(dataListValueExtend)
                                ? dataListValueExtend.data.map(
                                    (item, index) => (
                                      <div
                                        className="col-sm-6 edit__icon"
                                        key={index}
                                      >
                                        <button
                                          style={{
                                            backgroundColor: '#e9ecef',
                                            width: '100%',
                                            height: '90%',
                                            borderRadius: '4px',
                                            border: '1px solid #ccc',
                                            textTransform: 'none',
                                            fontWeight: 'normal',
                                            letterSpacing: '1.1px',
                                          }}
                                          className="btn btn-lg btn-recharge"
                                          type="button"
                                          onClick={() => typeCash(item.id)}
                                        >
                                          {item.description}
                                        </button>
                                      </div>
                                    ),
                                  )
                                : null}
                            </div>
                          </div>

                          <div className="col-sm-12">
                            <div className="form-group row ">
                              <label className="col-sm-12 control-label text-edit">
                                Nạp tiền
                              </label>
                              {CardConst.listPriceCharge.map((price, id) => (
                                <PriceButton
                                  key={id}
                                  price={price}
                                  disable={disableType}
                                  onClick={selectPrice}
                                />
                              ))}
                              <div className="col-sm-12">
                                <NumberFormat
                                  thousandSeparator={'.'}
                                  decimalSeparator={','}
                                  suffix={' ₫'}
                                  style={{
                                    height: '50px',
                                    borderColor: isCheckPriceSelectNull
                                      ? 'red'
                                      : '#ccc',
                                  }}
                                  className="form-control text-left recharge"
                                  placeholder="Nhập số tiền"
                                  value={priceSelect}
                                  disabled={disableType}
                                  onValueChange={value => onChangePrice(value)}
                                  onFocus={() => handleResetPriceSelect()}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row float-right mr-1">
                    {disablePayment ? (
                      <button
                        id="RechargeBtn"
                        className="btn btn-success btn-lg recharge"
                        // disabled={!disablePayment}
                        onClick={() => openConfirmAddPaymentClick()}
                      >
                        Nạp tiền
                      </button>
                    ) : (
                      <button
                        id="SaveBtn"
                        className="btn btn-primary btn-lg ml-2 savebtn"
                        disabled={!isValidCard}
                        onClick={saveCardToPatient}
                      >
                        Lưu
                      </button>
                    )}

                    <button
                      id="CancelBtn"
                      className="btn btn-secondary btn-lg ml-2"
                      onClick={resetAllData}
                    >
                      Hủy
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
