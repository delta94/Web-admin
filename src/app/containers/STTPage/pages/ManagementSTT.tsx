/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import * as QueueSelectors from 'store/queue/shared/selectors';
import * as QueueSlice from 'store/queue/shared/slice';
import * as RoomSelector from 'store/room/shared/selectors';
import * as RoomSlice from 'store/room/shared/slice';
import * as _ from 'lodash';
import { RoomSaga } from 'store/room/shared/saga';
import { QueueSaga } from 'store/queue/shared/saga';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { AppHelper, Order } from 'utils/app.helper';
import { CssTextField } from 'store/room/constants/http.constant';
import { tableManagementStt } from 'store/queue/constants/queue.constant';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import { RESPONSE_CONSTANT } from 'store/queue/constants/queue.constant';
import { RegisterSTTModal } from '../components/RegisterSTTModal';
import Autocomplete from '@material-ui/lab/Autocomplete';
import AppLoading from 'app/components/Loading';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableHeaderSort from 'app/components/TableHeaderSort';
import DateFnsUtils from '@date-io/date-fns';

const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: '500px',
    },
    textField: {
      width: '100%',
    },
  }),
);

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '500px',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const defaultFilter = {
  deptCode: '',
  patientCode: '',
  patientName: '',
  startDate: new Date(),
  endDate: new Date(),
  page: 0,
  rowsPerPage: 10,
};

export function ManagementSTT() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const classes = useStyles();
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  useInjectReducer({ key: RoomSlice.sliceKey, reducer: RoomSlice.reducer });
  useInjectSaga({ key: RoomSlice.sliceKey, saga: RoomSaga });

  useInjectReducer({
    key: QueueSlice.sliceKey,
    reducer: QueueSlice.reducer,
  });
  useInjectSaga({ key: QueueSlice.sliceKey, saga: QueueSaga });
  const dataRoomAll: any = useSelector<any>(RoomSelector.selectRooms);
  const numbersOfStt: any = useSelector<any>(QueueSelectors.selectSTT);
  const loading: any = useSelector<any>(QueueSelectors.selectLoading);
  const success: any = useSelector<any>(QueueSelectors.selectSuccess);
  const error: any = useSelector<any>(QueueSelectors.selectError);
  const datepickerClass = useStylesDatepicker();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('code');
  const [openRegister, setOpenRegister] = useState(false);
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    dispatch(RoomSlice.actions.getRoomAll());
    dispatch(QueueSlice.actions.getAllSTT(defaultFilter));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.EXPORT_STT_SUCCESS) {
        AppHelper.createDownloadFile({
          file_path: success.data.file_path,
          file_name: success.data.file_name,
        });
      }
      dispatch(QueueSlice.actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(QueueSlice.actions.clearError());
    }
  }, [error]);

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const changeStartDate = startDate =>
    setFilter({
      ...filter,
      startDate,
    });

  const changeEndDate = endDate =>
    setFilter({
      ...filter,
      endDate,
    });

  const changeRoom = room => {
    if (_.isEmpty(room)) return;
    setFilter({
      ...filter,
      deptCode: room.code,
    });
  };

  const searchSTT = () => {
    dispatch(QueueSlice.actions.getAllSTT(filter));
  };

  const validateSttList = () =>
    numbersOfStt.data && numbersOfStt.data.length ? true : false;

  const memoSTT: any = useMemo((): any => {
    if (!_.isEmpty(numbersOfStt)) {
      const { data = [], recordsTotal } = numbersOfStt;
      return { data, recordsTotal };
    }
  }, [numbersOfStt]);

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={tableManagementStt}
      />
    );
  };

  const handleChangePage = (event: unknown, page: number) => {
    let changePage = Object.assign({}, filter, { page });
    callNewListStt(changePage);
  };

  const handleChangeRowsPerPage = event => {
    let changeRowPerPage = Object.assign({}, filter, {
      rowsPerPage: +event.target.value,
      page: 0,
    });
    callNewListStt(changeRowPerPage);
  };

  const refreshListStt = () => {
    callNewListStt(defaultFilter);
  };

  const callNewListStt = (newFilter: any) => {
    setFilter(newFilter);
    dispatch(QueueSlice.actions.getAllSTT(newFilter));
  };

  const exportFile = () => {
    dispatch(QueueSlice.actions.exportSTT(filter));
  };

  const renderFilter = () => {
    return (
      <div className="card card-box">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-12">
              <div className="card card-topline-aqua">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3 control-label text-edit mb-0">
                          Mã bệnh nhân
                        </label>
                        <input
                          type="text"
                          title="Mã bệnh nhân"
                          name="patientCode"
                          placeholder="Mã bệnh nhân"
                          id="patientCode"
                          className="form-control"
                          autoComplete="off"
                          value={filter.patientCode}
                          onChange={e => {
                            setFilter({
                              ...filter,
                              patientCode: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3 control-label text-edit mb-0">
                          Tên bệnh nhân
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Tên bệnh nhân"
                          value={filter.patientName}
                          onChange={e => {
                            setFilter({
                              ...filter,
                              patientName: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3">Thời gian bắt đầu</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            variant={'inline'}
                            className={datepickerClass.textField}
                            autoOk={true}
                            inputVariant="outlined"
                            orientation="landscape"
                            format="dd/MM/yyyy"
                            margin="normal"
                            value={filter.startDate}
                            onChange={changeStartDate}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3">Thời gian kết thúc</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardDatePicker
                            variant={'inline'}
                            className={datepickerClass.textField}
                            autoOk={true}
                            inputVariant="outlined"
                            orientation="landscape"
                            format="dd/MM/yyyy"
                            margin="normal"
                            value={filter.endDate}
                            onChange={changeEndDate}
                          />
                        </MuiPickersUtilsProvider>
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group d-flex align-items-center">
                        <label className="col-sm-3 control-label text-edit mb-0">
                          Phòng khám
                        </label>
                        <div className="w-100">
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
                                  style={{
                                    background: 'white',
                                    fontSize: '16px',
                                  }}
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
                    </div>
                    <div className="col-sm-12 col-md-6 d-flex align-items-center">
                      <div className="btn-group ml-2">
                        <button
                          className="btn btn-primary mr-3"
                          onClick={searchSTT}
                        >
                          Tìm kiếm <i className="fa fa-search"></i>
                        </button>
                      </div>
                      <div className="btn-group ml-2" hidden>
                        <button
                          className="btn btn-success mr-3"
                          onClick={() => {
                            setOpenRegister(true);
                          }}
                        >
                          Đăng ký <i className="fa fa-plus"></i>
                        </button>
                      </div>
                      <div className="btn-group ml-2">
                        <button
                          className="btn btn-warning mr-3"
                          onClick={exportFile}
                        >
                          Xuất file <i className="fa fa-file"></i>
                        </button>
                      </div>
                      <div className="btn-group ml-2">
                        <button
                          className="btn btn-info mr-3"
                          onClick={refreshListStt}
                        >
                          Làm mới <i className="fa fa-refresh"></i>
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
    );
  };

  const renderTable = () => {
    if (validateSttList()) {
      const tableData: any[] = AppHelper.stableSort(
        memoSTT.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((stt, idx) => {
        return (
          <TableRow key={stt.id}>
            {tableManagementStt.map(column => {
              const colId = column.id;
              const value = stt[colId];
              if (
                colId === 'created_date' ||
                colId === 'birthday' ||
                colId === 'registered_date'
              ) {
                return (
                  <TableCell key={colId}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : ''}
                  </TableCell>
                );
              } else if (colId === 'no') {
                const { page, rowsPerPage } = filter;
                return (
                  <TableCell key={colId}>
                    {page * rowsPerPage + idx + 1}
                  </TableCell>
                );
              }
              return <TableCell key={colId}>{value}</TableCell>;
            })}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          <TableCell
            className="w-100"
            align="center"
            colSpan={tableManagementStt.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (validateSttList()) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 50, 100, 1000]}
          component="div"
          count={memoSTT.recordsTotal}
          rowsPerPage={filter.rowsPerPage}
          page={filter.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  const closeDialog = () => setOpenRegister(false);

  return (
    <div className="row">
      {openRegister && <RegisterSTTModal open={true} onClose={closeDialog} />}
      <div className="col-12">{renderFilter()}</div>
      <div className="col-12">
        <Paper className={classes.root}>
          {loading ? <AppLoading loading={true} /> : null}
          <TableContainer className={classes.container}>
            <Table stickyHeader>
              <TableHead>{renderColumns()}</TableHead>
              <TableBody>{renderTable()}</TableBody>
            </Table>
          </TableContainer>
          {renderPagination()}
        </Paper>
      </div>
    </div>
  );
}
