/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import TableHeaderSor from 'app/components/TableHeaderSort';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  ButtonToolTip,
  columnsListTransactionDetail, useStyles
} from 'store/transaction/constants/transaction.constant';
import { AppHelper, Order } from 'utils/app.helper';
import {
  selectDataListTransactionDetail,
  selectLoading,
} from 'store/transaction/shared/selectors';
import { actions, reducer, sliceKey } from 'store/transaction/shared/slice';
import * as PatientSlice from 'store/patient/shared/slice';
import { PatientSaga } from 'store/patient/shared/saga';
import { selectDataPatient } from 'store/patient/shared/selectors';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATE_TIME,
} from 'store/common/constants/common.constant';
import { CurrencyService } from 'services/currency.service';
import * as _ from 'lodash';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from 'app/components/Loading';
import ModalTransactionDetail from '../components/ModalTransactionDetail';
import { PaidWaitingFormSaga } from 'store/transaction/shared/saga';

export function TransactionDetail() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: PaidWaitingFormSaga });
  useInjectReducer({
    key: PatientSlice.sliceKey,
    reducer: PatientSlice.reducer,
  });
  useInjectSaga({ key: PatientSlice.sliceKey, saga: PatientSaga });
  const classes = useStyles();
  const activatedRoute = useLocation();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('amount');
  const [requestParams, setRequestParams] = useState<any>({});
  const [isOpenDisplay, setIsOpenDisplay] = useState<boolean>(false);
  const [isCloseTable, setIsCloseTable] = useState<boolean>(false);
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const loading = useSelector(selectLoading);
  const dataPatient = useSelector(selectDataPatient);
  const [
    isOpenModalTransactionDetail,
    setIsOpenModalTransactionDetail,
  ] = useState<boolean>(false);
  const dataListTransactionDetail = useSelector(
    selectDataListTransactionDetail,
  );

  useEffect(() => {
    if (!_.isEmpty(activatedRoute) && activatedRoute.search) {
      const queries: any = AppHelper.getParamsFromUrl(activatedRoute.search);
      if (!_.isEmpty(queries)) {
        setRequestParams(queries);
        dispatch(
          PatientSlice.actions.getPatientWithCode(queries.patientCode),
        );
        dispatch(
          actions.getListTransactionDetail({
            patientCode: queries.patientCode,
            registeredDate: queries.registeredDate,
            registeredCode: queries.registeredCode,
          }),
        );
      }
    } else {
      /**
       * Dispattch actions setError not found queries info params here
        history.push('/transaction');
       */
    }
  }, [activatedRoute]);
const handleRefresh = () => {
  if (!_.isEmpty(activatedRoute) && activatedRoute.search) {
    const queries: any = AppHelper.getParamsFromUrl(activatedRoute.search);
    if (!_.isEmpty(queries)) {
      setRequestParams(queries);
      dispatch(
        PatientSlice.actions.getPatientWithCode(queries.patientCode),
      );
      dispatch(
        actions.getListTransactionDetail({
          patientCode: queries.patientCode,
          registeredDate: queries.registeredDate,
          registeredCode: queries.registeredCode,
        }),
      );
    }
}
}
  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleIsOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const openModalTransactionDetail = id => {
    dispatch(actions.getListTransactionDetailModal(id.id));
    setIsOpenModalTransactionDetail(true);
  };
  const closeModalTransactionDetail = () => {
    setIsOpenModalTransactionDetail(false);
  };
  const validateTransactionDetail = () =>
    dataListTransactionDetail.result &&
    Object.entries(dataListTransactionDetail).length
      ? true
      : false;
  const renderColumns = () => (
    <React.Fragment>
      <TableHeaderSor
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={columnsListTransactionDetail}
      />
    </React.Fragment>
  );
  const renderNavBar = () => {
    if (_.isEmpty(dataPatient) && _.isEmpty(requestParams)) {
      return null;
    }
    return (
      <form>
        <div className="row">
          <div className="col-ms-12 col-md-2">
            <p>Mã thẻ</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={_.get(dataPatient, 'tekmedi_card_number')}
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col-ms-12 col-md-2">
            <p>Số tiếp nhận</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={_.get(requestParams, 'registeredCode')}
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col=ms-12 col-md-2">
            <p>Mã bệnh nhân</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={_.get(dataPatient, 'code')}
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col-ms-12 col-md-2">
            <p>Tên bệnh nhân</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={_.get(dataPatient, 'full_name')}
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col-ms-12 col-md-2">
            <p>Giới tính</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={_.get(dataPatient, 'gender')}
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col-ms-12 col-md-2">
            <p>Ngày sinh</p>
          </div>
          <div className="col-ms-12 col-md-3">
            <div className="form-group">
              <input
                disabled
                type="text"
                className="form-control"
                defaultValue={
                  _.get(dataPatient, 'birthday')
                    ? dateUtil.format(
                        new Date(_.get(dataPatient, 'birthday')),
                        DEFAULT_FORMAT_DATE,
                      )
                    : ''
                }
              />
            </div>
          </div>
          <div className="col-ms-12 col-md-1"></div>
          <div className="col-12 card card-topline-aqua">
            <div className="title  text-center card-head">
              <header>THÔNG TIN GIAO DỊCH</header>
            </div>
          </div>
        </div>
      </form>
    );
  };
  const renderTable = () => {
    if (validateTransactionDetail()) {
      const tableData: any[] = AppHelper.stableSort(
        dataListTransactionDetail.result,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={index} hover>
            {columnsListTransactionDetail.map((column, idx) => {
              const value = row[column.id];
              if (column.id === '#') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {index + 1}
                  </TableCell>
                );
              } else if (column.id === 'registered_date') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : '-'}
                  </TableCell>
                );
              } else if (column.id === 'amount') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {CurrencyService.formatCurrency(value)}
                  </TableCell>
                );
              } else if (column.id === 'employee') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value ? value.user_name : '-'}
                  </TableCell>
                );
              } else if (column.id === 'created_date') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value
                      ? dateUtil.format(
                          new Date(value),
                          DEFAULT_FORMAT_DATE_TIME,
                        )
                      : '-'}
                  </TableCell>
                );
              } else if (column.id === 'store') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value ? value.description : '-'}
                  </TableCell>
                );
              } else if (column.id === 'function') {
                return (
                  <TableCell key={idx} className={classes.btn}>
                    <Tooltip
                      title={ButtonToolTip.INFOR}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <button
                        className="btn btn-info btn-xs"
                        onClick={() => openModalTransactionDetail(row)}
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
    }
  };
  const renderTableFooter = () => {
    if (validateTransactionDetail()) {
      const total = dataListTransactionDetail.result.filter(
        item => item.type === 1 && item.status === 0,
      );
      return (
        <TableRow>
          <TableCell colSpan={1}></TableCell>
          <TableCell colSpan={6} className={classes.td_total}>
            TỔNG CHI PHÍ TẤT TOÁN
          </TableCell>
          <TableCell colSpan={4} className={classes.td_total}>
            {!_.isEmpty(total)
              ? CurrencyService.formatCurrency(total[0].amount) +
                ' (tổng ' +
                CurrencyService.formatCurrency(total[0].amount) +
                ')'
              : CurrencyService.formatCurrency(0) +
                ' (tổng ' +
                CurrencyService.formatCurrency(0) +
                ')'}
          </TableCell>
        </TableRow>
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
                      <div className="tools">
                        <a className="fa fa-repeat btn-color box-refresh" onClick={handleRefresh}></a>
                        <a
                          className={
                            isOpenDisplay
                              ? 't-collapse btn-color fa fa-chevron-down'
                              : 't-collapse btn-color fa fa-chevron-up'
                          }
                          onClick={handleIsOpenDisplay}
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
                      {!_.isEmpty(requestParams) ? (
                        <>
                          {renderNavBar()}
                          <Paper className={classes.root}>
                            {loading ? <AppLoading loading={true} /> : null}
                            <TableContainer className={classes.container}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>{renderColumns()}</TableHead>
                                <TableBody>{renderTable()}</TableBody>
                                <TableFooter>{renderTableFooter()}</TableFooter>
                              </Table>
                            </TableContainer>
                          </Paper>
                          {isOpenModalTransactionDetail ? (
                            <ModalTransactionDetail
                              open={true}
                              onClose={closeModalTransactionDetail}
                            />
                          ) : null}
                        </>
                      ) : (
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="title  text-center card-head">
                              <header>
                                Không Tìm Thấy Thông Tin Giao Dịch
                              </header>
                            </div>
                          </div>
                          <div className="col-sm-12 py-4">
                            <div className="btn-group d-flex">
                              <Link
                                className="btn btn-primary m-auto"
                                to="/transaction"
                              >
                                <i className="fa fa-long-arrow-left mr-2"></i>
                                Quay Lại Danh Sách Giao Dịch
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
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
