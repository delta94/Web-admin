/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo } from 'react';
import * as AuditlogSelector from 'store/auditlog/shared/selectors';
import * as _ from 'lodash';
import * as AuditlogSlice from 'store/auditlog/shared/slice';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { AuditlogSaga } from 'store/auditlog/shared/saga';
import { AppHelper, Order } from 'utils/app.helper';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { auditlogTable } from 'store/auditlog/constants/auditlog.constant';
import { FilterAuditlog } from 'store/auditlog/services/auditlog.http';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
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
import Popover from '@material-ui/core/Popover';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '200px',
    maxWidth: '100vw',
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
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    width: '60vw',
    padding: theme.spacing(1),
    background: '#000',
    color: '#fff',
  },
}));

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

export function AuditLog() {
  useInjectReducer({
    key: AuditlogSlice.sliceKey,
    reducer: AuditlogSlice.reducer,
  });
  useInjectSaga({ key: AuditlogSlice.sliceKey, saga: AuditlogSaga });
  const classes = useStyles();
  const datepickerClass = useStylesDatepicker();
  const auditlogs = useSelector(AuditlogSelector.selectAuditlogs);
  const loading = useSelector(AuditlogSelector.selectLoading);
  const error = useSelector(AuditlogSelector.selectError);
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const [startDate, setStartDate] = useState<Date>(
    dateUtil.addDays(new Date(), -1),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [currentLog, setCurrentLog] = useState<any>('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    json: any,
  ) => {
    setAnchorEl(event.currentTarget);
    setCurrentLog(json);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentLog('');
  };

  const open = Boolean(anchorEl);

  const memoAuditlogs: any = useMemo(() => {
    const { data = [], recordsTotal } = auditlogs;
    return { data, recordsTotal };
  }, [auditlogs]);

  const [filter, setFilter] = useState<FilterAuditlog>({
    startDate: dateUtil.addDays(new Date(), -30),
    endDate: new Date(),
    page: 0,
    rowsPerPage: 10,
    patientCode: '',
  });

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(AuditlogSlice.actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    dispatch(AuditlogSlice.actions.filterAuditLog(filter));
    return () => {
      dispatch(AuditlogSlice.actions.resetAll());
    };
  }, []);

  const changeStartDate = date => {
    setStartDate(new Date(date));
  };

  const changeEndDate = date => {
    setEndDate(new Date(date));
  };

  const handleChangePage = (event: unknown, page: number) => {
    let changePage = Object.assign({}, filter, { page });
    setFilter(changePage);
    dispatch(AuditlogSlice.actions.filterAuditLog(changePage));
  };

  const handleChangeRowsPerPage = event => {
    let changeRowPerPage = Object.assign({}, filter, {
      rowsPerPage: +event.target.value,
      page: 0,
    });
    setFilter(changeRowPerPage);
    dispatch(AuditlogSlice.actions.filterAuditLog(changeRowPerPage));
  };

  const changePatientCode = e => {
    setFilter({
      ...filter,
      patientCode: e.target.value,
    });
  };

  const submitSearch = e => {
    e.preventDefault();
    const newFilter = {
      ..._.cloneDeep(filter),
      startDate,
      endDate,
    };
    setFilter(newFilter);
    dispatch(AuditlogSlice.actions.filterAuditLog(newFilter));
  };

  const validateCardList = () =>
    auditlogs.data && auditlogs.data.length ? true : false;

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('inserted_date');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderNavControl = () => {
    return (
      <React.Fragment>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div className="col-md-8">
            <form className="row px-3" onSubmit={submitSearch}>
              <div className="col-sm-12 col-md-4">
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
              <div className="col-sm-12 col-md-4">
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
              <div className="col-sm-12 col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm theo mã bệnh nhân..."
                  value={filter.patientCode}
                  onChange={changePatientCode}
                />
              </div>
              <div className="col-md-1">
                <div className="btn-group">
                  <button className="btn btn-primary mr-3" type="submit">
                    Tìm kiếm <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
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
        columns={auditlogTable}
      />
    );
  };

  const renderTable = () => {
    if (validateCardList()) {
      const tableData: any[] = AppHelper.stableSort(
        memoAuditlogs.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        return (
          <TableRow key={row.id}>
            {auditlogTable.map(column => {
              const idCol: string = column.id;
              const value: any = row[idCol];
              if (idCol === 'inserted_date' || idCol === 'updated_date') {
                return (
                  <TableCell key={idCol}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : ''}
                  </TableCell>
                );
              } else if (idCol === 'no') {
                return <TableCell key={idCol}>{idx + 1}</TableCell>;
              } else if (
                idCol === 'action_parameters' ||
                idCol === 'request_body' ||
                idCol === 'response_body' ||
                idCol === 'exception'
              ) {
                if (!value || value.length < 120) {
                  return <TableCell key={idCol}>{value}</TableCell>;
                } else {
                  return (
                    <TableCell
                      onMouseEnter={e => handlePopoverOpen(e, value)}
                      onMouseLeave={handlePopoverClose}
                      key={idCol}
                    >
                      {AppHelper.truncate(value, 120)}
                      <i
                        className="fa fa-info-circle ml-2"
                        style={{
                          color: 'rgb(76, 175, 80)',
                          fontSize: '1.4rem',
                        }}
                      ></i>
                    </TableCell>
                  );
                }
              }
              return <TableCell key={idCol}>{value ? value : '-'}</TableCell>;
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
            colSpan={auditlogTable.length}
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
          count={memoAuditlogs.recordsTotal}
          rowsPerPage={filter.rowsPerPage}
          page={filter.page}
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
            <Popover
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <JSONPretty data={currentLog}></JSONPretty>
            </Popover>
          </Paper>
        </div>
      </div>
    </div>
  );
}
