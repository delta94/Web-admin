/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable react-hooks/exhaustive-deps
import DateFnsUtils from '@date-io/date-fns';
import {
  Checkbox,
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
} from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import AppLoading from 'app/components/Loading';
import TableHeaderSor from 'app/components/TableHeaderSort';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { columnsListReception } from 'store/reception/constants/reception.constant';
import { ReceptionSaga } from 'store/reception/shared/saga';
import {
  selectLoading,
  selectReceptions,
  selectSuccess,
} from 'store/reception/shared/selectors';
import { actions, reducer, sliceKey } from 'store/reception/shared/slice';
import { AppHelper, Order } from 'utils/app.helper';
import moment from 'moment';
import { RESPONSE_CONSTANT } from 'store/reception/constants/reception.constant';
import { ButtonToolTip } from 'store/report/constants/report.constant';
import { ModalChecked } from '../components/ModalChecked';
import { ModalReceptionDetail } from '../components/ModalReceptionDetail';
import { useSnackbar } from 'notistack';
import { NotifyService } from 'services/notify.service';
import * as _ from 'lodash';
import { useStyles } from 'store/transaction/constants/transaction.constant';

const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
      marginTop: '10px',
    },
  }),
);
export function Reception() {
  const classes = useStyles();
  const datePickerClasses = useStylesDatepicker();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: ReceptionSaga });
  const [isOpenDisplay, setIsOpenDisplay] = useState<boolean>(false);
  const [isCloseTable, setIsCloseTable] = useState<boolean>(false);
  const { register, handleSubmit, errors, getValues } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const [endDate, setDateEnd] = useState(new Date());
  const [startDate, setDateStart] = useState(new Date());
  const loading: any = useSelector(selectLoading);
  const success: any = useSelector(selectSuccess);
  const dataListReceptionAll: any = useSelector(selectReceptions);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('full_name');
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const [isModalChecked, setIsModalChecked] = useState<boolean>(false);
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [idReason, setIdReason] = useState<any>('');
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [filterReception, setFilterReception] = useState<any>({
    startDate: moment.utc(startDate).startOf('day'),
    endDate: moment.utc(endDate).endOf('day'),
    page: 0,
    rowsPerPage: 10,
    patientCode: '',
    patientName: '',
    type: '',
  });
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [filterReception]);
  };

  useEffectOnMount(() => {
    dispatch(actions.getAllReception(filterReception));
  });
  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.SUCCESS.CHANGE_FINISHED_SUCCESS) {
        setFilterReception({
          startDate: moment.utc(startDate).startOf('day'),
          endDate: moment.utc(endDate).endOf('day'),
          page: 0,
          rowsPerPage: 10,
          patientCode: getValues('patientCode'),
          patientName:  getValues('patientName'),
          type: getValues('type'),
        });
      } else if (
        success.key === RESPONSE_CONSTANT.SUCCESS.EXPORT_RECEPTION_SUCCESS
      ) {
        AppHelper.createDownloadFile({
          file_path: success.data.file_path,
          file_name: success.data.file_name,
        });
      }
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  const exportFileReception = () => {
    dispatch(actions.exportReception(filterReception));
  };
  const memoReception: any = useMemo(() => {
    const { data = [], recordsTotal } = dataListReceptionAll;
    return { data, recordsTotal };
  }, [dataListReceptionAll]);
  const validateReception = () =>
    dataListReceptionAll.data &&
    Object.entries(dataListReceptionAll.data).length
      ? true
      : false;
  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const handleChangeStartDate = date => {
    setDateStart(new Date(date));
  };
  const handleChangeEndDate = date => {
    setDateEnd(new Date(date));
  };
  const setNewFilter = newFilter => setFilterReception(newFilter);
  const handleChangePage = (e: unknown, page: number) => {
    let changePage = Object.assign({}, filterReception, { page });
    setNewFilter(changePage);
  };
  const handleChangeRowsPerpage = e => {
    let changeRowPage = Object.assign({}, filterReception, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setNewFilter(changeRowPage);
  };
  const handleChangeChecked = () => {
    setIsModalChecked(true);
  };

  const handleRefresh = () => {
    setFilterReception({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 10,
      patientCode: '',
      patientName: '',
      type: '',
    });
  };
  const handleClickChecked = row => {
    setIdReason(row.id);
    setIsFinished(row.is_finished);
  };
  const closeModalTransactionDetail = () => {
    setIsModalChecked(false);
  };
  const handleOpenModalDetail = row => {
    dispatch(actions.getAllReason(row.id));
    setIsOpenModalDetail(true);
  };
  const closeModalDetail = () => {
    setIsOpenModalDetail(false);
  };
  const onSubmit = () => {
    setFilterReception({
      ..._.cloneDeep(filterReception),
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      type: getValues('type'),
      patientCode: getValues('patientCode'),
      patientName: getValues('patientName'),
      page: 0,
      rowsPerPage: 10,
    });
  };
  const renderColumns = () => (
    <TableHeaderSor
      classes={classes}
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      columns={columnsListReception}
    />
  );
  const renderNavBar = () => {
    return (
      <div className="row mb-5">
        <div className="col-md-8 d-flex align-items-center">
          <form className="row" onSubmit={handleSubmit(onSubmit)}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className="col-ms-12 col-md-3">
                <div className="btn-group">
                  <KeyboardDatePicker
                    variant="inline"
                    format={DEFAULT_FORMAT_DATE}
                    margin="normal"
                    label="Từ ngày"
                    value={startDate}
                    maxDate={new Date()}
                    className={datePickerClasses.textField}
                    onChange={handleChangeStartDate}
                  ></KeyboardDatePicker>
                </div>
              </div>
              <div className="col-ms-12 col-md-3">
                <div className="btn-group">
                  <KeyboardDatePicker
                    variant="inline"
                    format={DEFAULT_FORMAT_DATE}
                    margin="normal"
                    label="Đến ngày"
                    value={endDate}
                    maxDate={new Date()}
                    className={datePickerClasses.textField}
                    onChange={handleChangeEndDate}
                  ></KeyboardDatePicker>
                </div>
              </div>
            </MuiPickersUtilsProvider>
            <div className="col-ms-12 col-md-3">
              <div className="btn-group mt-4">
                <button className="btn btn-primary" type="submit">
                  TÌM KIẾM <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            <div className="col-ms-12 col-md-3"></div>
            <div className="col-ms-12 col-md-2">
              <div className="btn-group">
                <label>Mã bệnh nhân</label>
                <input
                  type="text"
                  className="form-control"
                  name="patientCode"
                  ref={register({
                    required: false,
                    maxLength: 50,
                    pattern: {
                      value: AppHelper.removeSpaceStartEnd(),
                      message: 'Vui lòng xóa khoảng trắng',
                    },
                  })}
                />
                {errors.patientCode?.message && (
                  <span style={{ color: '#fb0606' }}>
                    {errors.patientCode?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-ms-12 col-md-2">
              <div className="btn-group">
                <label>Tên bệnh nhân</label>
                <input
                  type="text"
                  className="form-control"
                  name="patientName"
                  ref={register({
                    required: false,
                    maxLength: 50,
                    pattern: {
                      value: AppHelper.removeSpaceStartEnd(),
                      message: 'Vui lòng xóa khoảng trắng',
                    },
                  })}
                />
                {errors.patientName?.message && (
                  <span style={{ color: '#fb0606' }}>
                    {errors.patientName?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="col-ms-12 col-md-2">
              <div className="btn-group">
                <label>Trạng thái</label>
                <select
                  name="type"
                  className="form-control"
                  ref={register({ required: false })}
                >
                  <option value="">Tất cả</option>
                  <option value={0}>Mới</option>
                  <option value={1}>Tạm ứng</option>
                  <option value={2}>Tất toán</option>
                  <option value={3}>Đã hủy</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div className="col-ms-12 col-md-2"></div>
        <div className="col-ms-12 col-md-2">
          <div className="btn-group mt-4">
            <button
              className="btn btn-success"
              onClick={() => exportFileReception()}
            >
              XUẤT FILE <i className="fa fa-upload"></i>
            </button>
          </div>
        </div>
      </div>
    );
  };
  const renderTable = () => {
    if (validateReception()) {
      const tableData: any[] = AppHelper.stableSort(
        memoReception.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={index}>
            {columnsListReception.map((column, idx) => {
              const value = row[column.id];
              if (column.id === '#') {
                const { page, rowsPerPage } = filterReception;
                return (
                  <TableCell key={idx} className={classes.td}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                );
              } else if (
                column.id === 'birthday' ||
                column.id === 'registered_date' ||
                column.id === 'created_date'
              ) {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : '-'}
                  </TableCell>
                );
              } else if (column.id === 'is_finished') {
                if (value) {
                  return (
                    <TableCell key={idx} className={classes.td}>
                      <Checkbox
                        title="Trạng Thái"
                        checked={value}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                        onChange={handleChangeChecked}
                        onClick={() => handleClickChecked(row)}
                      />
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={idx} className={classes.td}>
                      <Checkbox
                      checked={value}
                        title="Trạng Thái"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                        color="primary"
                        onChange={() => handleChangeChecked()}
                        onClick={() => handleClickChecked(row)}
                      />
                    </TableCell>
                  );
                }
              } else if (column.id === 'type') {
                if (value === 0) {
                  return (
                    <TableCell key={idx} className={classes.Green}>
                      {value === 0 ? 'Mới' : '-'}
                    </TableCell>
                  );
                } else if (value === 1) {
                  return (
                    <TableCell key={idx} className={classes.red}>
                      {value === 1 ? 'Tạm ứng' : '-'}
                    </TableCell>
                  );
                } else if (value === 2) {
                  return (
                    <TableCell key={idx} className={classes.Blue}>
                      {value === 2 ? 'Tất toán' : '-'}
                    </TableCell>
                  );
                }
              } else if (column.id === 'detail') {
                return (
                  <TableCell key={idx} className={classes.btn}>
                    <Tooltip
                      title={ButtonToolTip.INFOR}
                      enterDelay={500}
                      leaveDelay={200}
                    >
                      <button
                        className="btn btn-info btn-xs"
                        onClick={() => handleOpenModalDetail(row)}
                      >
                        <i className="fa fa-eye"></i>
                      </button>
                    </Tooltip>
                  </TableCell>
                );
              } else {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value ? value : '-'}
                  </TableCell>
                );
              }
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
            colSpan={columnsListReception.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderPagination = () => {
    if (validateReception()) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 70, 100]}
          component="div"
          count={memoReception.recordsTotal}
          rowsPerPage={filterReception ? filterReception.rowsPerPage : 10}
          page={filterReception ? filterReception.page : 0}
          labelRowsPerPage="Hiển Thị"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerpage}
        />
      );
    }
  };
  return (
    <div className="row" style={{ display: isCloseTable ? 'none' : 'block' }}>
      <div className="col-md-12">
        <div className="tabbable-line">
          <ul className="nav customtab nav-tabs" role="tablist"></ul>
          <div className="tab-content">
            <div className="tab-pane active fontawesome-demo" id="tab1">
              <div className="row">
                <div className="col-md-12">
                  <div className="card card-topline-red">
                    <div className="card-head">
                      <header></header>
                      <div className="tools">
                        <a
                          className="fa fa-repeat btn-color box-refresh"
                          onClick={handleRefresh}
                        ></a>
                        <a
                          className={
                            isOpenDisplay
                              ? 't-collapse btn-color fa fa-chevron-down'
                              : 't-collapse btn-color fa fa-chevron-up'
                          }
                          onClick={handleOpenDisplay}
                        ></a>
                        <a
                          className="t-close btn-color fa fa-times"
                          onClick={handleCloseTable}
                        ></a>
                      </div>
                    </div>
                    <div
                      className="card-body"
                      style={{ display: isOpenDisplay ? 'none' : 'block' }}
                    >
                      {renderNavBar()}
                      <Paper className={classes.root}>
                        {loading ? <AppLoading loading={true} /> : null}
                        <TableContainer className={classes.container}>
                          <Table stickyHeader aria-label="sticky table">
                            <TableHead>{renderColumns()}</TableHead>
                            <TableBody>{renderTable()}</TableBody>
                          </Table>
                        </TableContainer>
                        {renderPagination()}
                      </Paper>
                      {isModalChecked ? (
                        <ModalChecked
                          open={true}
                          onClose={closeModalTransactionDetail}
                          idReason={idReason}
                          isFinished={isFinished}
                        />
                      ) : null}
                      {isOpenModalDetail ? (
                        <ModalReceptionDetail
                          open={true}
                          onClose={closeModalDetail}
                        />
                      ) : null}
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
