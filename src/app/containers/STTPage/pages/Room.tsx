/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/scope */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import * as RoomSlice from 'store/room/shared/slice';
import * as RoomSelector from 'store/room/shared/selectors';
import * as RegisterSlice from 'store/register/shared/slice';
import * as RegisterSelector from 'store/register/shared/selectors';
import * as _ from 'lodash';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  CssTextField,
  useStylesDatepicker,
} from 'store/room/constants/http.constant';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { RoomSaga } from 'store/room/shared/saga';
import { RegisterSaga } from 'store/register/shared/saga';
import { useDispatch, useSelector } from 'react-redux';
import {
  LocalStorageService,
  LocalStorageKey,
} from 'services/localStorage.service';
import { RegisterHttp } from 'store/register/services/register.http';
import moment from 'moment';
import AppLoading from 'app/components/Loading';
import Autocomplete from '@material-ui/lab/Autocomplete';
import logo from 'img/logo-removebg-preview.png';
import DateFnsUtils from '@date-io/date-fns';

enum PatientType {
  NORMAL = 'NORMAL',
  PRIORITY = 'PRIORITY',
  CLS = 'CLS',
}

const DEFAULT_TIMER = 10;

export function Room() {
  useInjectReducer({ key: RoomSlice.sliceKey, reducer: RoomSlice.reducer });
  useInjectSaga({ key: RoomSlice.sliceKey, saga: RoomSaga });

  useInjectReducer({
    key: RegisterSlice.sliceKey,
    reducer: RegisterSlice.reducer,
  });
  useInjectSaga({ key: RegisterSlice.sliceKey, saga: RegisterSaga });
  const dataRoomAll: any = useSelector<any>(RoomSelector.selectRooms);
  const loading: any = useSelector<any>(RoomSelector.selectLoading);
  const queueRoom: any = useSelector<any>(RegisterSelector.selectQueueRooms);
  const queueCLS: any = useSelector<any>(RegisterSelector.selectQueuesCLS);
  const dispatch = useDispatch();
  const localStorage = new LocalStorageService();
  const registerHttp = new RegisterHttp();
  const datepickerClass = useStylesDatepicker();
  const [room, setRoom] = useState<any>();
  const [date, setDate] = useState<any>(moment.utc(new Date()).startOf('day'));
  const [isOpenScreenRoom, setIsOpenScreenRoom] = useState<boolean>(false);
  const [callMode, setCallMode] = useState<boolean>(true);
  const [isSave, setIsSave] = useState<boolean>(false);
  const [selectNormal, setSelectNormal] = useState<any>(5);
  const [selectCLS, setSelectCLS] = useState<any>(1);
  const [selectPriority, setSelectPriority] = useState<any>(1);
  const [disablePriority, setDisablePriority] = useState<any>(false);
  const [disableNormal, setDisableNormal] = useState<any>(false);
  const [disableCLS, setDisableCLS] = useState<any>(false);
  const [secondPriority, setSecondPriority] = useState<number>(DEFAULT_TIMER);
  const [secondNormal, setSecondNormal] = useState<any>(DEFAULT_TIMER);
  const [secondCLS, setSecondCLS] = useState<any>(DEFAULT_TIMER);
  const reCallRef = useRef<any>(null);

  useEffect(() => {
    dispatch(RoomSlice.actions.getRoomAll());
    const localCache = JSON.parse(
      `${localStorage.getItem(LocalStorageKey.room)}`,
    );
    if (localCache) {
      const { room, date } = localCache;
      setIsOpenScreenRoom(true);
      setRoom(room);
      dispatch(
        RegisterSlice.actions.registerQueueRoom({
          date,
          room: room.code,
        }),
      );
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(room)) {
      if (reCallRef.current) {
        clearInterval(reCallRef.current);
      }
      reCallRef.current = setInterval(() => {
        dispatch(
          RegisterSlice.actions.registerQueueRoom({
            date,
            room: room.code,
          }),
        );
        dispatch(
          RegisterSlice.actions.registerQueueCLSLast({
            date,
            room: room.code,
          }),
        );
      }, 30000);
    }
    return () => {
      clearInterval(reCallRef.current);
    };
  }, [room]);

  useEffect(() => {
    let intervalPriority: any = null;
    if (disablePriority) {
      intervalPriority = setInterval(() => {
        setSecondPriority(secondPriority => secondPriority - 1);
      }, 1000);
      if (intervalPriority && secondPriority === 0) {
        clearInterval(intervalPriority);
        setSecondPriority(DEFAULT_TIMER);
        setDisablePriority(false);
      }
    }
    return () => {
      clearInterval(intervalPriority);
    };
  }, [disablePriority, secondPriority]);

  useEffect(() => {
    let intervalCLS: any = null;
    if (disableCLS) {
      intervalCLS = setInterval(() => {
        setSecondCLS(secondCLS => secondCLS - 1);
      }, 1000);
      if (intervalCLS && secondCLS === 0) {
        clearInterval(intervalCLS);
        setSecondCLS(DEFAULT_TIMER);
        setDisableCLS(false);
      }
    }
    return () => {
      clearInterval(intervalCLS);
    };
  }, [disableCLS, secondCLS]);

  useEffect(() => {
    let intervalNormal: any = null;
    if (disableNormal) {
      intervalNormal = setInterval(() => {
        setSecondNormal(secondNormal => secondNormal - 1);
      }, 1000);
      if (secondNormal === 0 && intervalNormal) {
        clearInterval(intervalNormal);
        setSecondNormal(DEFAULT_TIMER);
        setDisableNormal(false);
      }
    }
    return () => {
      clearInterval(intervalNormal);
    };
  }, [disableNormal, secondNormal]);

  const onChangeDate = (date: any): void => setDate(date);

  const handleClickCallLast = (): void => {
    if (_.isEmpty(room)) return;
    dispatch(
      RegisterSlice.actions.registerQueueRoom({
        date,
        room: room.code,
      }),
    );
    setIsOpenScreenRoom(true);
    if (isSave) {
      localStorage.setItem({
        key: LocalStorageKey.room,
        value: JSON.stringify({ room, date }),
      });
    }
  };

  const changeRoom = room => {
    if (!_.isEmpty(room)) {
      setRoom(room);
    }
  };

  const saveSetting = e => setIsSave(e.target.checked);

  const handleChangeNormal = e => setSelectNormal(e.target.value);
  const handleChangePriority = e => setSelectPriority(e.target.value);
  const handleChangeCLS = e => setSelectCLS(e.target.value);

  const changViewResult = () => {
    dispatch(
      RegisterSlice.actions.registerQueueCLSLast({
        date,
        room: room.code,
      }),
    );
    setCallMode(false);
  };

  const callResultCLS = () => {
    setDisableCLS(true);
    registerHttp
      .registerQueueCLSCall({
        room: room.code,
        number: selectCLS,
      })
      .then(response => response.data)
      .then(res => {
        dispatch(
          RegisterSlice.actions.registerQueueCLSLast({
            date,
            room: room.code,
          }),
        );
      })
      .catch(err => console.log(err));
  };

  const callPatient = (type: PatientType) => {
    let request: any = {
      room: room.code,
    };
    if (type === PatientType.NORMAL) {
      request = {
        ...request,
        number: selectNormal,
        type: 0,
      };
      setDisableNormal(true);
    } else if (type === PatientType.PRIORITY) {
      request = {
        ...request,
        number: selectPriority,
        type: 1,
      };
      setDisablePriority(true);
    }
    registerHttp
      .registerQueueCall(request)
      .then(response => response.data)
      .then(res => {
        dispatch(
          RegisterSlice.actions.registerQueueRoom({
            date,
            room: room.code,
          }),
        );
      })
      .catch(err => console.log(err));
  };

  const onCloseIsOpenScreenRoom = (): void => {
    setIsOpenScreenRoom(false);
    dispatch(RegisterSlice.actions.resetAll());
    localStorage.removeItem(LocalStorageKey.room);
    setCallMode(true);
    if (reCallRef.current) {
      clearInterval(reCallRef.current);
    }
  };

  return (
    <div id="home">
      {loading && <AppLoading loading={loading} />}
      <div
        className="room"
        style={{ display: !isOpenScreenRoom ? '' : 'none' }}
      >
        <div className="container-room container">
          <div>
            <span className="login101-form-title p-b-26">
              <b>HỆ THỐNG TEKMEDI.BTC</b>
            </span>
            <span className="login101-form-title p-b-48">
              <img alt="logo" className="h-10 w-10 imgClass" src={logo} />
            </span>

            <div
              className="wrap-input101 validate-input"
              data-validate="Valid email is: a@b.c"
            >
              <div>
                <label>MÃ PHÒNG</label>
              </div>
              <div style={{ width: '100%' }}>
                <Autocomplete
                  options={
                    !_.isEmpty(dataRoomAll) && dataRoomAll.length
                      ? dataRoomAll
                      : []
                  }
                  style={{ height: '39px' }}
                  getOptionLabel={(option: any) =>
                    option.description + ' - ' + option.code
                  }
                  renderInput={(params: any) => {
                    return (
                      <CssTextField
                        style={{ background: 'white', fontSize: '16px' }}
                        {...params}
                        variant="outlined"
                        name="room"
                        placeholder="Nhập tên phòng khám"
                      />
                    );
                  }}
                  onChange={(event, value) => changeRoom(value)}
                />
              </div>
            </div>
            <div
              className="wrap-input101 mt-5"
              style={{ marginBottom: '.1rem' }}
            >
              <div className="form-group">
                <label>NGÀY</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant={'inline'}
                    className={datepickerClass.textField}
                    autoOk={true}
                    inputVariant="outlined"
                    orientation="landscape"
                    format="dd/MM/yyyy"
                    margin="normal"
                    value={date}
                    onChange={onChangeDate}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="wrap-input101 validate-input">
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
                  onClick={() => handleClickCallLast()}
                >
                  Bắt đầu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="call">
        {isOpenScreenRoom && (
          <div className="limiter">
            <div className="btn-cancel f-rigth">
              <button
                className="btn btn-primary"
                onClick={() => onCloseIsOpenScreenRoom()}
              >
                kết thúc
              </button>
            </div>
            <div className="container-login101 container w-800">
              <span className="login101-form-title">
                <img alt="logo" className="h-2 w-2 imgClass" src={logo} />
                <b>HỆ THỐNG TEKMEDI.BTC</b>
              </span>
              <div className="content__title">
                <h1 className="room_name mb-2">
                  {!_.isEmpty(room) ? room.description + ' ' + room.code : ''}
                </h1>
                <h2 className="room_date text-center ">
                  Ngày: {moment(date).format('DD-MM-YYYY').toString()}
                </h2>
              </div>
            </div>
            <div className="container-login101 container w-800 pt-3">
              <div className="btn-left" style={{ width: '50%' }}>
                <button
                  className={
                    callMode
                      ? 'btn form-control btn-font btn-success'
                      : 'btn form-control btn-font'
                  }
                  onClick={() => setCallMode(true)}
                >
                  Khám Bệnh
                </button>
              </div>
              <div className="btn-center" style={{ width: '50%' }}>
                <button
                  className={
                    !callMode
                      ? 'btn form-control btn-font btn-success'
                      : 'btn form-control btn-font'
                  }
                  onClick={() => changViewResult()}
                >
                  Đọc Kết Quả CLS
                </button>
              </div>
            </div>
            <div className="container-call-number login100-form validate-form number-call">
              <div
                className="row d-flex justify-content-center"
                style={{ paddingTop: '50px' }}
              >
                {callMode ? (
                  <>
                    <div className="col-md-2 m-0 text-center bd-l-3">
                      <div className="title-left">
                        <h3>GỌI ĐẾN SỐ</h3>
                      </div>
                      <div className="items-left title-left">
                        <h3 className="mg-items m-0" style={{ lineHeight: 1 }}>
                          {!_.isEmpty(queueRoom)
                            ? queueRoom.priority_number
                            : '-'}
                        </h3>
                      </div>
                      <div className="type-left title-left">
                        <h3>BỆNH NHÂN ƯU TIÊN</h3>
                      </div>
                    </div>
                    <div className="col-md-2 m-0 text-center">
                      <div className="title-right">
                        <h3>GỌI ĐẾN SỐ</h3>
                      </div>
                      <div className="items-right title-right">
                        <h3 className="mg-items m-0" style={{ lineHeight: 1 }}>
                          {!_.isEmpty(queueRoom)
                            ? queueRoom.normal_number
                            : '-'}
                        </h3>
                      </div>
                      <div className="type-right title-right">
                        <h3>BỆNH NHÂN THƯỜNG</h3>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="col-md-12 mt-50 text-center">
                    <div className="title-left">
                      <h3 className="mg-5 m-0">GỌI ĐẾN SỐ</h3>
                    </div>
                    <div className="items-left title-left">
                      <h3 className="mg-items">
                        {!_.isEmpty(queueCLS) ? queueCLS.current_number : '-'}
                      </h3>
                    </div>
                    <div className="type-left title-left">
                      <h3 className="mg-5 m-0">BỆNH NHÂN ĐỌC KQ CLS</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {callMode ? (
              <div className="container-table mt-5">
                <div className="row">
                  <div className="col-md-4">
                    <div className="table-left ">
                      <div className="table-left-header text-center  ">
                        <div className="table-left-title d-inline-block">
                          <h3 className="font-stye text-color-red">
                            SỐ BỆNH NHÂN 1 LẦN GỌI
                          </h3>
                        </div>
                        <div className="form-group d-inline-block">
                          <select
                            name=""
                            id=""
                            className="form-control ml-5"
                            value={selectPriority}
                            onChange={handleChangePriority}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                      </div>
                      <div className="table-left-body">
                        <div className="btn-left form-group">
                          <button
                            className="btn btn-danger form-control btn-font"
                            onClick={() => callPatient(PatientType.PRIORITY)}
                            disabled={disablePriority}
                            style={disablePriority ? { cursor: 'default' } : {}}
                          >
                            GỌI BỆNH NHÂN ƯU TIÊN{' '}
                            {disablePriority && secondPriority}
                          </button>
                        </div>
                        <div className="table-content my-custom-scrollbar">
                          <table className="table table-sm table-hover">
                            <thead>
                              <tr>
                                <th scope="col">SỐ THỨ TỰ</th>
                                <th scope="col">HỌ VÀ TÊN</th>
                                <th scope="col">TUỔI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!_.isEmpty(queueRoom) &&
                              queueRoom.priority_patients.length
                                ? queueRoom.priority_patients.map(
                                    (item, index) => (
                                      <tr key={index}>
                                        <td scope="row">{item.queue_number}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                      </tr>
                                    ),
                                  )
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="table-center">
                      <div className="table-center-header text-center">
                        <div className="table-center-title d-inline-block">
                          <h3 className="font-stye">SỐ BỆNH NHÂN 1 LẦN GỌI</h3>
                        </div>
                        <div className="form-group d-inline-block">
                          <select
                            name=""
                            id=""
                            className="form-control ml-5"
                            value={selectNormal}
                            onChange={handleChangeNormal}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                      <div className="table-center-body">
                        <div className="btn-center form-group">
                          <button
                            className="btn btn-primary form-control btn-font"
                            onClick={() => callPatient(PatientType.NORMAL)}
                            disabled={disableNormal}
                            style={disableNormal ? { cursor: 'default' } : {}}
                          >
                            GỌI BỆNH NHÂN THƯỜNG {disableNormal && secondNormal}
                          </button>
                        </div>
                        <div className="table-content my-custom-scrollbar">
                          <table className="table table-sm table-hover">
                            <thead>
                              <tr>
                                <th scope="col">SỐ THỨ TỰ</th>
                                <th scope="col">HỌ VÀ TÊN</th>
                                <th scope="col">TUỔI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!_.isEmpty(queueRoom) &&
                              queueRoom.normal_patients.length
                                ? queueRoom.normal_patients.map((item, idx) => (
                                    <tr key={idx}>
                                      <td scope="row">{item.queue_number}</td>
                                      <td>{item.name}</td>
                                      <td>{item.age}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="table-right">
                      <div className="table-right-header text-center">
                        <div
                          className="table-right-title"
                          style={{ marginBottom: '3px' }}
                        >
                          <h3 className="font-stye text-color-info">
                            DANH SÁCH BỆNH NHÂN ĐÃ GỌI
                          </h3>
                        </div>
                      </div>
                      <div className="table-right-body">
                        <div className="table-right-body-banner text-center ">
                          <h3
                            className="btn-font"
                            style={{ marginTop: '15px' }}
                          >
                            THÔNG TIN BỆNH NHÂN ĐÃ GỌI
                          </h3>
                        </div>
                        <div className="table-content my-custom-scrollbar">
                          <table className="table table-sm table-hover table-fixed">
                            <thead>
                              <tr>
                                <th scope="col">STT</th>
                                <th scope="col">LOẠI</th>
                                <th scope="col">HỌ VÀ TÊN</th>
                                <th scope="col">TUỔI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!_.isEmpty(queueRoom) &&
                              queueRoom.last_patients.length
                                ? queueRoom.last_patients.map((item, index) => (
                                    <tr
                                      key={index}
                                      className={
                                        item.type !== 0
                                          ? 'table-danger'
                                          : 'table-primary'
                                      }
                                    >
                                      <td scope="row">{item.queue_number}</td>
                                      <td style={{ fontSize: '12px' }}>
                                        {item.type !== 0 ? 'ƯU TIÊN' : 'THƯỜNG'}
                                      </td>
                                      <td>{item.name}</td>
                                      <td>{item.age}</td>
                                    </tr>
                                  ))
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-table mt-5">
                <div className="row">
                  <div className="col-md-4 offset-md-2">
                    <div className="table-center">
                      <div className="table-center-header text-center">
                        <div className="table-center-title d-inline-block">
                          <h3 className="font-stye">SỐ BỆNH NHÂN 1 LẦN GỌI</h3>
                        </div>
                        <div className="form-group d-inline-block">
                          <select
                            name=""
                            id=""
                            className="form-control ml-5"
                            value={selectCLS}
                            onChange={handleChangeCLS}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                      <div className="table-center-body">
                        <div className="btn-center form-group">
                          <button
                            className="btn btn-primary form-control btn-font"
                            onClick={() => callResultCLS()}
                            disabled={disableCLS}
                            style={disableCLS ? { cursor: 'default' } : {}}
                          >
                            GỌI BỆNH NHÂN {disableCLS && secondCLS}
                          </button>
                        </div>
                        <div className="table-content my-custom-scrollbar">
                          <table className="table table-sm table-hover">
                            <thead>
                              <tr>
                                <th scope="col">SỐ THỨ TỰ</th>
                                <th scope="col">HỌ VÀ TÊN</th>
                                <th scope="col">TUỔI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!_.isEmpty(queueCLS) &&
                              queueCLS.in_queue_patients.length
                                ? queueCLS.in_queue_patients.map(
                                    (item, idx) => (
                                      <tr key={idx}>
                                        <td scope="row">{item.queue_number}</td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                      </tr>
                                    ),
                                  )
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="table-right">
                      <div className="table-right-header text-center">
                        <div
                          className="table-right-title"
                          style={{ marginBottom: '3px' }}
                        >
                          <h3 className="font-stye text-color-info">
                            SỐ BỆNH NHÂN ĐÃ GỌI
                          </h3>
                        </div>
                      </div>
                      <div className="table-right-body">
                        <div className="table-right-body-banner text-center ">
                          <h3
                            className="btn-font"
                            style={{ marginTop: '15px', cursor: 'default' }}
                          >
                            THÔNG TIN BỆNH NHÂN ĐÃ GỌI
                          </h3>
                        </div>
                        <div className="table-content my-custom-scrollbar">
                          <table className="table table-sm table-hover table-fixed">
                            <thead>
                              <tr>
                                <th scope="col">STT</th>
                                <th scope="col">LOẠI</th>
                                <th scope="col">HỌ VÀ TÊN</th>
                                <th scope="col">TUỔI</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!_.isEmpty(queueCLS) &&
                              queueCLS.last_queue_patients.length
                                ? queueCLS.last_queue_patients.map(
                                    (item, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          item.type !== 0
                                            ? 'table-danger'
                                            : 'table-primary'
                                        }
                                      >
                                        <td scope="row">{item.queue_number}</td>
                                        <td style={{ fontSize: '12px' }}>
                                          {item.type !== 0
                                            ? 'ƯU TIÊN'
                                            : 'THƯỜNG'}
                                        </td>
                                        <td>{item.name}</td>
                                        <td>{item.age}</td>
                                      </tr>
                                    ),
                                  )
                                : null}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
