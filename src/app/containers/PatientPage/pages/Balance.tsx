/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import * as fromPatientSelector from 'store/patient/shared/selectors';
import * as _ from 'lodash';
import * as patientSlice from 'store/patient/shared/slice';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { PatientSaga } from 'store/patient/shared/saga';
import { NotifyService } from 'services/notify.service';
import { CurrencyService } from 'services/currency.service';
import { useSnackbar } from 'notistack';
import { AppHelper, Order } from 'utils/app.helper';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { selectIsAuthenticated, selectUser } from 'store/auth/shared/selectors';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { columnsListPatientBalance } from 'store/patient/constants/patient.constant';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import AppLoading from 'app/components/Loading';
import TableHeaderSort from 'app/components/TableHeaderSort';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '80vh',
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

const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: '100%',
      marginTop: '-10px',
    },
  }),
);

export function BalancePage() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({
    key: patientSlice.sliceKey,
    reducer: patientSlice.reducer,
  });
  useInjectSaga({ key: patientSlice.sliceKey, saga: PatientSaga });
  const classes = useStyles();
  const datepickerClass = useStylesDatepicker();
  const listPatientBalance = useSelector(
    fromPatientSelector.selectListPatientBalance,
  );
  const loading = useSelector(fromPatientSelector.selectLoading);
  const error = useSelector(fromPatientSelector.selectError);
  const success = useSelector(fromPatientSelector.selectSuccess);
  const user: any = useSelector<any>(selectUser);
  const isAuthenticated: any = useSelector<any>(selectIsAuthenticated);
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const [startDate, setStartDate] = useState<Date>(
    dateUtil.addDays(new Date(), -30),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());

  const memoPatientBalance: any = useMemo(() => {
    const { data = [], recordsTotal } = listPatientBalance;
    return { data, recordsTotal };
  }, [listPatientBalance]);

  const [filterPatientBalance, setFilterPatientBalance] = useState<any>({
    startDate: dateUtil.addDays(new Date(), -30),
    endDate: new Date(),
    page: 0,
    rowsPerPage: 15,
    userId: '',
  });

  useEffect(() => {
    return () => {
      dispatch(patientSlice.actions.resetAll());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      AppHelper.createDownloadFile({
        file_path: success.data.file_path,
        file_name: success.data.file_name,
      });
      dispatch(patientSlice.actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (isAuthenticated) {
      const initFilter = filterPatientBalance;
      setFilterPatientBalance({
        ...initFilter,
        userId: user.id,
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.get(filterPatientBalance, 'userId')) {
      dispatch(patientSlice.actions.getPatientBalance(filterPatientBalance));
    }
  }, [filterPatientBalance]);

  const changeStartDate = date => {
    setStartDate(new Date(date));
  };

  const changeEndDate = date => {
    setEndDate(new Date(date));
  };

  const handleChangePage = (event: unknown, page: number) => {
    let changePage = Object.assign({}, filterPatientBalance, { page });
    setNewFilter(changePage);
  };

  const handleChangeRowsPerPage = event => {
    let changeRowPerPage = Object.assign({}, filterPatientBalance, {
      rowsPerPage: +event.target.value,
      page: 0,
    });
    setNewFilter(changeRowPerPage);
  };

  const setNewFilter = newFilter => {
    setFilterPatientBalance(newFilter);
  };

  const submitSearch = e => {
    e.preventDefault();
    setFilterPatientBalance({
      ..._.cloneDeep(filterPatientBalance),
      startDate,
      endDate,
    });
  };

  const exportListPatientBalance = () => {
    dispatch(
      patientSlice.actions.exportPatientBalance({
        startDate,
        endDate,
        userName: user.user_name,
        userId: user.id,
      }),
    );
  };

  const validateCardList = () =>
    listPatientBalance.data && listPatientBalance.data.length ? true : false;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('tekmedi_card_number');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderNavControl = () => {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="col-md-6">
            <form className="row px-3" onSubmit={submitSearch}>
              <div className="col-ms-12 col-md-5">
                <KeyboardDatePicker
                  variant="inline"
                  format={DEFAULT_FORMAT_DATE}
                  margin="normal"
                  label="Từ ngày"
                  value={startDate}
                  className={datepickerClass.textField}
                  onChange={changeStartDate}
                />
              </div>
              <div className="col-ms-12 col-md-5">
                <KeyboardDatePicker
                  variant="inline"
                  format={DEFAULT_FORMAT_DATE}
                  margin="normal"
                  label="Đến ngày"
                  value={endDate}
                  className={datepickerClass.textField}
                  onChange={changeEndDate}
                />
              </div>
              <div className="col-md-2">
                <div className="btn-group">
                  <button className="btn btn-primary mr-3" type="submit">
                    Tìm kiếm <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-4">
            <div className="btn-group">
              <a className="btn btn-info" onClick={exportListPatientBalance}>
                Xuất file <i className="fa fa-upload"></i>
              </a>
            </div>
          </div>
        </MuiPickersUtilsProvider>
      </React.Fragment>
    );
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={columnsListPatientBalance}
      />
    );
  };

  const renderTable = () => {
    if (validateCardList()) {
      const tableData: any[] = AppHelper.stableSort(
        memoPatientBalance.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData
        .map(balance => {
          const topupBalance = _.get(balance, 'top_up_amount');
          const topup = topupBalance && !isNaN(topupBalance) ? topupBalance : 0;
          const paymentBalance = _.get(balance, 'payment_amount');
          const payment =
            paymentBalance && !isNaN(paymentBalance) ? paymentBalance : 0;
          return {
            ...balance,
            balance: +topup - payment,
          };
        })
        .map((row, idx) => {
          return (
            <TableRow key={row.id}>
              {columnsListPatientBalance.map(column => {
                const value = row[column.id];
                if (column.id === 'no') {
                  const { page, rowsPerPage } = filterPatientBalance;
                  return (
                    <TableCell key={column.id}>
                      {page * rowsPerPage + idx + 1}
                    </TableCell>
                  );
                } else if (column.id === 'birthday') {
                  return (
                    <TableCell key={column.id}>
                      {value
                        ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                        : ''}
                    </TableCell>
                  );
                } else if (
                  column.id === 'payment_amount' ||
                  column.id === 'top_up_amount' ||
                  column.id === 'balance'
                ) {
                  return (
                    <TableCell key={column.id} align="center">
                      {CurrencyService.formatCurrency(value)}
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={column.id}>{value ? value : '-'}</TableCell>
                );
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
            colSpan={columnsListPatientBalance.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (validateCardList()) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 50, 100, 1000]}
          component="div"
          count={memoPatientBalance.recordsTotal}
          rowsPerPage={
            filterPatientBalance ? filterPatientBalance.rowsPerPage : 10
          }
          page={filterPatientBalance ? filterPatientBalance.page : 0}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">{renderNavControl()}</div>
      <div className="row">
        <div className="col-sm-12 mt-3">
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
    </div>
  );
}
