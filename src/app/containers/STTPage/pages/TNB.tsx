/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import * as TableSlice from 'store/table/shared/slice';
import * as TableSelector from 'store/table/shared/selectors';
import * as RegisterSlice from 'store/register/shared/slice';
import * as RegisterSelector from 'store/register/shared/selectors';
import * as _ from 'lodash';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { TableSaga } from 'store/table/shared/saga';
import { RegisterSaga } from 'store/register/shared/saga';
import { useDispatch, useSelector } from 'react-redux';
import { ScreenCall } from '../components/ScreenCall';
import {
  LocalStorageService,
  LocalStorageKey,
} from 'services/localStorage.service';
import { AppHelper } from 'utils/app.helper';
import logo from 'img/logo-removebg-preview.png';
import AppLoading from 'app/components/Loading';

export function TNB() {
  const localStorage = new LocalStorageService();
  useInjectReducer({ key: TableSlice.sliceKey, reducer: TableSlice.reducer });
  useInjectSaga({ key: TableSlice.sliceKey, saga: TableSaga });

  useInjectReducer({
    key: RegisterSlice.sliceKey,
    reducer: RegisterSlice.reducer,
  });
  useInjectSaga({ key: RegisterSlice.sliceKey, saga: RegisterSaga });

  const dispatch = useDispatch();

  const tables: any = useSelector<any>(TableSelector.selectTable);
  const loading: any = useSelector(TableSelector.selectLoading);
  const tableType = useSelector<any>(RegisterSelector.selectQueueTableType);
  const tableNumber = useSelector<any>(RegisterSelector.selectQueueTableNumber);
  const [patientReceptionDesk, setPatientReceptionDesk] = useState<string>('');
  const [screenType, setScreenType] = useState<string>('0');
  const [isOpenScreenCall, setIsOpenScreenCall] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

  useEffect(() => {
    const table = localStorage.getItem(LocalStorageKey.tnb);
    const type = localStorage.getItem(LocalStorageKey.screenType);
    if (table && type) {
      dispatch(
        RegisterSlice.actions.registerQueueTableType({
          table,
          type,
        }),
      );
      dispatch(
        RegisterSlice.actions.registerQueueTableNumber({
          table,
          limit: 5,
        }),
      );
      setIsOpenScreenCall(true);
    } else {
      setIsOpenScreenCall(false);
    }
    dispatch(TableSlice.actions.resetAll());
    dispatch(
      TableSlice.actions.getTableAll({
        page: 0,
        rowsPerPage: 100,
        search: '',
      }),
    );
  }, []);

  useEffect(() => {
    if (!_.isEmpty(tableType)) {
      dispatch(
        RegisterSlice.actions.registerQueueTableNumber({
          table: _.get(tableType, 'table'),
          limit: 5,
        }),
      );
    }
    if (isSave && !_.isEmpty(tableType)) {
    }
  }, [tableType, isSave]);

  useEffect(() => {
    if (!_.isEmpty(tableNumber)) {
      setIsOpenScreenCall(true);
    }
  }, [tableNumber]);

  const saveSetting = e => setIsSave(e.target.checked);

  const handleChangePatientReceptionDesk = (e: any): void => {
    setPatientReceptionDesk(e.target.value);
  };

  const handleChangeScreenType = (e: any): void => {
    setScreenType(e.target.value);
  };

  const handleClick = (): void => {
    if (_.isEmpty(patientReceptionDesk)) return;
    const screenInfo = {
      table: patientReceptionDesk,
      type: screenType,
    };
    dispatch(RegisterSlice.actions.registerQueueTableType(screenInfo));
    if (isSave) {
      localStorage
        .setItem({
          key: LocalStorageKey.tnb,
          value: patientReceptionDesk,
        })
        .setItem({
          key: LocalStorageKey.screenType,
          value: screenType,
        });
    }
  };
  const closeIsOpenScreenCall = (): void => {
    setIsOpenScreenCall(false);
    dispatch(RegisterSlice.actions.resetAll());
    localStorage
      .removeItem(LocalStorageKey.tnb)
      .removeItem(LocalStorageKey.screenType);
  };
  return (
    <React.Fragment>
      <div id="home">
        {loading && <AppLoading loading={loading} />}
        {!isOpenScreenCall ? (
          <div className="limiter1">
            <div className="container-login101 container">
              <div>
                <span className="login101-form-title p-b-26">
                  <b>HỆ THỐNG TEKMEDI.BTC</b>
                </span>
                <span className="login101-form-title p-b-48">
                  <img alt="logo" className="h-10 w-10 imgClass" src={logo} />
                </span>
                <div className="wrap-input101">
                  <div className="form-group">
                    <label>BÀN NHẬN BỆNH</label>
                    <select
                      className="form-control edit__input"
                      id="TableSelect"
                      autoComplete="off"
                      value={patientReceptionDesk}
                      onChange={handleChangePatientReceptionDesk}
                    >
                      <option value="">Chọn phòng</option>
                      {!_.isEmpty(tables) &&
                        AppHelper.sortColection(tables.data, ['name']).map(
                          (item, index) => (
                            <option value={item.code} key={index}>
                              {item.name}
                            </option>
                          ),
                        )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>LOẠI MÀN HÌNH</label>
                    <select
                      className="form-control edit__input"
                      id="Type"
                      autoComplete="off"
                      value={screenType}
                      onChange={handleChangeScreenType}
                    >
                      <option value="0">BỆNH NHÂN THƯỜNG</option>
                      <option value="1">ƯU TIÊN</option>
                    </select>
                  </div>
                  <div className="form-check float-right">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isSave}
                      onChange={saveSetting}
                      style={{ marginTop: '.5rem' }}
                    />
                    <label
                      className="form-check-label ml-1 mb-5"
                      style={{ fontWeight: 400 }}
                    >
                      Lưu cài đặt
                    </label>
                  </div>
                </div>
                <div className="container-login101-form-btn">
                  <div className="wrap-login101-form-btn">
                    <div className="login101-form-bgbtn"></div>
                    <button
                      className="login101-form-btn"
                      style={{ background: 'red' }}
                      onClick={handleClick}
                    >
                      BẮT ĐẦU
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="screen block">
            {isOpenScreenCall && (
              <ScreenCall closeIsOpenScreenCall={closeIsOpenScreenCall} />
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
