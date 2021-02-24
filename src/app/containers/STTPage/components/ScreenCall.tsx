/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import * as RegSelector from 'store/register/shared/selectors';
import * as _ from 'lodash';
import * as RegisterSlice from 'store/register/shared/slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { RegisterSaga } from 'store/register/shared/saga';
import propTypes from 'prop-types';
import logo from 'img/logo-removebg-preview.png';
interface ScreenCall {
  closeIsOpenScreenCall: () => void;
}
export const ScreenCall = ({ closeIsOpenScreenCall }: ScreenCall) => {
  useInjectReducer({
    key: RegisterSlice.sliceKey,
    reducer: RegisterSlice.reducer,
  });
  useInjectSaga({ key: RegisterSlice.sliceKey, saga: RegisterSaga });
  const tableType: any = useSelector<any>(RegSelector.selectQueueTableType);
  const tableNumber: any = useSelector<any>(RegSelector.selectQueueTableNumber);
  let initialSeconds: number = 10;
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isClickCall, setIsClickCall] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isClickCall) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          setIsClickCall(false);
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const handleClickCall = () => {
    setIsClickCall(true);
    dispatch(
      RegisterSlice.actions.registerQueueTableCall({
        table: _.get(tableType, 'table'),
        limit: 5,
      }),
    );
    setSeconds(initialSeconds);
  };

  return (
    <React.Fragment>
      <div className="btn-cancel" style={{ float: 'right' }}>
        <button
          className={
            !_.isEmpty(tableType)
              ? tableType.type === 0
                ? 'btn btn-primary'
                : 'btn btn-danger'
              : ''
          }
          onClick={() => closeIsOpenScreenCall()}
        >
          Kết thúc
        </button>
      </div>
      <div className="screen-call">
        <div className="limiter1">
          <div className="container-login101 container">
            <span className="login101-form-title p-b-26">
              <b>HỆ THỐNG TEKMEDI.BTC</b>
            </span>
            <span className="login101-form-title p-b-48">
              <img alt="logo" className="h-10 w-10 imgClass" src={logo} />
            </span>
          </div>
          <div className="container-fluid screen-call-container">
            <div className="row">
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">MÃ BÀN NHẬN BỆNH</h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">
                  {!_.isEmpty(tableType) ? tableType.table : ''}
                </h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">LOẠI</h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">
                  {!_.isEmpty(tableType)
                    ? tableType.type === 0
                      ? 'THƯỜNG'
                      : 'ƯU TIÊN'
                    : ''}
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">SỐ THỨ TỰ TỪ</h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">
                  {!_.isEmpty(tableNumber)
                    ? tableNumber.from === -1
                      ? '0'
                      : tableNumber.from
                    : ''}
                </h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">SỐ THỨ TỰ ĐẾN</h3>
              </div>
              <div className="col-md-3 text-center">
                <h3 className="font-weight-bold">
                  {!_.isEmpty(tableNumber)
                    ? tableNumber.to === -1
                      ? '0'
                      : tableNumber.to
                    : ''}
                </h3>
              </div>
            </div>
            <div className="btn-call">
              <button
                className={
                  !_.isEmpty(tableType)
                    ? tableType.type === 0
                      ? 'btn btn-primary'
                      : 'btn btn-danger'
                    : ''
                }
                onClick={() => handleClickCall()}
                disabled={isClickCall ? true : false}
              >
                GỌI SỐ TIẾP THEO {isClickCall ? seconds : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ScreenCall.prototype = {
  closeIsOpenScreenCall: propTypes.func.isRequired,
};
