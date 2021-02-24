/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import * as _ from 'lodash';
import 'react-datepicker/dist/react-datepicker.css';
import { sliceKey, reducer, actions } from 'store/transaction/shared/slice';
import { Link } from 'react-router-dom';
import {
  selectDataTransaction,
  selectLoading,
  selectError,
  selectDataListTransaction,
} from 'store/transaction/shared/selectors';
import {
  Tooltip,
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
import { columnListTransaction, useStyles, useStylesDatepicker } from 'store/transaction/constants/transaction.constant';
import { AppHelper, Order } from 'utils/app.helper';
import TableHeaderSor from 'app/components/TableHeaderSort';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { CurrencyService } from 'services/currency.service';
import AppLoading from 'app/components/Loading';
import { useForm } from 'react-hook-form';
import { PaidWaitingFormSaga } from 'store/transaction/shared/saga';
interface FormIputs {
  status: string;
  patientCode: string;
  patientName: string;
}
export function Transaction() {
  const classes = useStyles();
  const datePickerClasses = useStylesDatepicker();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: PaidWaitingFormSaga });
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDisplay, setIsOpenDisplay] = useState<boolean>(false);
  const [isCloseTable, setIsCloseTable] = useState<boolean>(false);
  const dataListTransaction: any = useSelector(selectDataListTransaction);
  const loading: any = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('tekmedi_card_number');
  const [endDate, setDateEnd] = useState(new Date());
  const [startDate, setDateStart] = useState(new Date());
  const { register, handleSubmit, getValues, errors } = useForm<FormIputs>();
  const [filterTransation, setFilterTransation] = useState<any>({
    startDate: moment.utc(startDate).startOf('day'),
    endDate: moment.utc(endDate).endOf('day'),
    page: 0,
    rowsPerPage: 10,
    patientCode: '',
    patientName: '',
    status: '0',
  });
  const memoTransaction: any = useMemo(() => {
    const { data = [], recordsTotal } = dataListTransaction;
    return { data, recordsTotal };
  }, [dataListTransaction]);

  const validateTransaction = () =>
    dataListTransaction.data && Object.entries(dataListTransaction.data).length
      ? true
      : false;
  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, [filterTransation]);
  };
  useEffectOnMount(() => {
    dispatch(actions.getListTranSaction(filterTransation));
  });

  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const setNewFilter = newFilter => {
    setFilterTransation(newFilter);
  };
  const handleChangePage = (e: unknown, page: number) => {
    let changePage = Object.assign({}, filterTransation, { page });
    setNewFilter(changePage);
  };
  const handleChangeRowsPerpage = e => {
    let changeRowPage = Object.assign({}, filterTransation, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setNewFilter(changeRowPage);
  };
  const handleOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const handleRefresh = () => {
    setFilterTransation({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 10,
      patientCode: '',
      patientName: '',
      status: '0',
    });
  };
  const handleChangeStartDate = date => {
    setDateStart(new Date(date));
  };
  const handleChangeEndDate = date => {
    setDateEnd(new Date(date));
  };
  const onSubmit = e => {
    setFilterTransation({
      ..._.cloneDeep(filterTransation),
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      status: getValues('status'),
      patientCode: getValues('patientCode'),
      patientName: getValues('patientName'),
      page: 0,
      rowsPerPage: 10,
    });
  };
  const renderNavBar = () => {
    return (
      <React.Fragment>
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
              <div className="col-ms-12 col-md-2">
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
                    name="status"
                    className="form-control"
                    ref={register({ required: false })}
                  >
                    <option value={0}>Tất cả</option>
                    <option value={1}>Đang khám</option>
                    <option value={2}>Tất toán</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="col-ms-12 col-md-2"></div>
          <div className="col-ms-12 col-md-2">
            <div className="btn-group mt-4">
              <button className="btn btn-info">
                TẤT TOÁN TỰ ĐỘNG <i className="fa fa-credit-card"></i>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const renderColumns = () => (
    <TableHeaderSor
      classes={classes}
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      columns={columnListTransaction}
    />
  );
  const renderTable = () => {
    if (validateTransaction()) {
      const tableData: any[] = AppHelper.stableSort(
        memoTransaction.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={index}>
            {columnListTransaction.map((column, idx) => {
              const value = row[column.id];
              if (column.id === '#') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {index + 1}
                  </TableCell>
                );
              } else if (
                column.id === 'birthday' ||
                column.id === 'created_date'
              ) {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : '-'}
                  </TableCell>
                );
              } else if (
                column.id === 'total_money_required' ||
                column.id === 'total_money_hold' ||
                column.id === 'total_payment'
              ) {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {CurrencyService.formatCurrency(value)}
                  </TableCell>
                );
              } else if (column.id === 'status') {
                if (value === 1) {
                  return (
                    <TableCell key={idx} className={classes.red}>
                      {value ? 'Đang khám' : '-'}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={idx} className={classes.Blue}>
                      {value ? 'Tất toán' : '-'}
                    </TableCell>
                  );
                }
              } else if (column.id === 'type') {
                const {
                  patient_code,
                  registered_number,
                  registered_date,
                } = row;
                return (
                  <TableCell key={idx} className={classes.td}>
                    {!_.isEmpty(dataListTransaction) ? (
                      <Tooltip
                        title={'Xem chi tiết'}
                        enterDelay={500}
                        leaveDelay={100}
                      >
                        <Link
                          className="btn btn-info btn-xs"
                          to={{
                            pathname: '/transaction/detail',
                            search: `?patientCode=${patient_code}&registeredCode=${registered_number}&registeredDate=${registered_date}`,
                          }}
                          target="_blank">
                          <i className="fa fa-eye"></i>
                        </Link>
                      </Tooltip>
                    ) : (
                      ''
                    )}
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
            colSpan={columnListTransaction.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderPagination = () => {
    if (validateTransaction()) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 100, 1000]}
          component="div"
          count={memoTransaction.recordsTotal}
          rowsPerPage={filterTransation ? filterTransation.rowsPerPage : 10}
          page={filterTransation ? filterTransation.page : 0}
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
