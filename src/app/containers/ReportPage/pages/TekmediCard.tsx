/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import * as _ from 'lodash';
import * as fromReport from 'store/report/shared/selectors';
import * as fromAuth from 'store/auth/shared/selectors';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/report/shared/slice';
import { ReportFormSaga } from 'store/report/shared/saga';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from '@material-ui/core';
import { AppHelper, Order } from 'utils/app.helper';
import {
  columnListReport,
  RESPONSE_CONSTANT,
} from 'store/report/constants/report.constant';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import { CurrencyService } from 'services/currency.service';
import {
  DialogKeyHistory,
  DialogTitleHistory,
  ReportHistoryStatus,
} from 'store/report/constants/http.constant';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { useReactToPrint } from 'react-to-print';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import {
  useStyles,
  useStylesDatepicker,
} from 'store/transaction/constants/transaction.constant';
import { CardTypes } from 'store/card/constants/card.constant';
import TableHeaderSort from 'app/components/TableHeaderSort';
import AppLoading from 'app/components/Loading';
import DateFnsUtils from '@date-io/date-fns';
import PrintReturnHistory from 'app/containers/CardPage/components/PrintReturnHistory';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import TableCellColor from 'app/components/TableCellColor';

export function TekmediCard() {
  const classes = useStyles();
  const datePickerClasses = useStylesDatepicker();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: ReportFormSaga });
  const dataListHistoryTekmediCard = useSelector(
    fromReport.selectDataListHistoryTekCard,
  );
  const dataPrinterHistory = useSelector(fromReport.selectDataPrintHistory);
  const isAuthenticated: any = useSelector<any>(fromAuth.selectIsAuthenticated);
  const user: any = useSelector<any>(fromAuth.selectUser);
  const loading = useSelector(fromReport.selectLoading);
  const success = useSelector(fromReport.selectSuccessCancel);
  const error = useSelector(fromReport.selectError);
  const [isOpenDisplay, setIsOpenDisplay] = useState<boolean>(false);
  const [isCloseTable, setIsCloseTable] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('tekmedi_card_number');
  const dateUtil = new DateFnsUtils();
  const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);
  const [idPatient, setIdPatient] = useState({});
  let printRef = useRef<HTMLDivElement>(null);
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filterTekmediCard, setFilterTekmediCard] = useState<any>({
    startDate: moment.utc(startDate).startOf('day'),
    endDate: moment.utc(endDate).endOf('day'),
    page: 0,
    rowsPerPage: 10,
    userId: '',
  });
  const reactPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactPrintContent,
    removeAfterPrint: true,
  });

  const memoTekmediCard: any = useMemo(() => {
    const { data = [], recordsTotal } = dataListHistoryTekmediCard;
    return { data, recordsTotal };
  }, [dataListHistoryTekmediCard]);
  const validateTekmediCard = () =>
    dataListHistoryTekmediCard.data &&
    Object.entries(dataListHistoryTekmediCard).length
      ? true
      : false;

  useEffect(() => {
    if (!_.isEmpty(dataPrinterHistory)) {
      handlePrint!();
      dispatch(actions.clearDataprint());
    }
  }, [dataPrinterHistory]);
  useEffect(() => {
    if (isAuthenticated) {
      const initFilter = filterTekmediCard;
      setFilterTekmediCard({
        ...initFilter,
        userId: user.id,
      });
    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (_.get(filterTekmediCard, 'userId')) {
      dispatch(actions.getListHistoryTekmediCard(filterTekmediCard));
    }
  }, [filterTekmediCard]);
  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.HISTORY_CARD.CANCEL_DEAL_SUCCESS) {
        dispatch(actions.getListHistoryTekmediCard(filterTekmediCard));
      } else {
        AppHelper.createDownloadFile({
          file_path: success.data.file_path,
          file_name: success.data.file_name,
        });
      }
      dispatch(actions.clearSuccess());
    }
  }, [success]);
  const setNewFilter = newFilter => {
    setFilterTekmediCard(newFilter);
  };
  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleChangePage = (e: unknown, page: number) => {
    let changePage = Object.assign({}, filterTekmediCard, { page });
    setNewFilter(changePage);
  };
  const handleChangeRowPerPage = e => {
    let changeRowPage = Object.assign({}, filterTekmediCard, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setNewFilter(changeRowPage);
  };
  const handleChangeDateStart = value => {
    setStartDate(new Date(value));
  };
  const handleChangeDateEnd = value => {
    setEndDate(new Date(value));
  };
  const submitSearch = e => {
    e.preventDefault();
    setFilterTekmediCard({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 10,
      userId: user.id,
    });
  };
  const handlePrinterDeal = id => {
    dispatch(actions.getIdPrinterDeal(id));
  };
  const openDialogKeyHistory = (key, id) => {
    setIdPatient(id);
    setOpenConfirmCancel(true);
  };
  const closeDialogControl = key => {
    setOpenConfirmCancel(false);
  };
  const cancelDeal = () => {
    dispatch(actions.postCancelDeal(idPatient));
  };
  const exportFileHistoryCards = () => {
    dispatch(
      actions.exportFileHistoryCard({
        startDate: moment.utc(startDate).startOf('day'),
        endDate: moment.utc(endDate).endOf('day'),
        userId: user.id,
        userName: user.user_name,
      }),
    );
  };
  const handleIsOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const handlerefresh = () => {
    setFilterTekmediCard({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 10,
      userId: user.id,
    });
  };
  const renderNavBar = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <div className="col-md-6">
          <form action="" className="row px-3" onSubmit={submitSearch}>
            <div className="col-ms-12 col-md-5">
              <KeyboardDatePicker
                variant="inline"
                format={DEFAULT_FORMAT_DATE}
                margin="normal"
                label="Từ ngày"
                value={startDate}
                maxDate={new Date()}
                className={datePickerClasses.textField}
                onChange={handleChangeDateStart}
              ></KeyboardDatePicker>
            </div>
            <div className="col-ms-12 col-md-5">
              <KeyboardDatePicker
                variant="inline"
                format={DEFAULT_FORMAT_DATE}
                margin="normal"
                label="Đến ngày"
                value={endDate}
                className={datePickerClasses.textField}
                onChange={handleChangeDateEnd}
              ></KeyboardDatePicker>
            </div>
            <div className="col-ms-12 col-md-2 mt-3">
              <div className="btn-group">
                <button className="btn btn-primary mr-3" type="submit">
                  Tìm kiếm <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-ms-12 col-md-4 mt-3">
          <div className="btn-group">
            <button
              className="btn btn-success"
              onClick={exportFileHistoryCards}
            >
              Xuất File <i className="fa fa-upload"></i>
            </button>
          </div>
        </div>
      </MuiPickersUtilsProvider>
    );
  };
  const renderColumns = () => (
    <TableHeaderSort
      classes={classes}
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      columns={columnListReport}
    />
  );
  const renderTable = () => {
    if (validateTekmediCard()) {
      const tableData: any[] = AppHelper.stableSort(
        memoTekmediCard.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={row.id}>
            {columnListReport.map(column => {
              const value = row[column.id];
              if (column.id === '#') {
                const { page, rowsPerPage } = filterTekmediCard;
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                );
              } else if (column.id === 'type') {
                if (
                  value === CardTypes.REGISTER ||
                  value === CardTypes.LOST ||
                  value === CardTypes.CANCEL
                ) {
                  return (
                    <TableCell key={column.id}>{value ? '' : ''}</TableCell>
                  );
                } else if (value === CardTypes.RECHARGE) {
                  return (
                    <TableCell key={column.id} className={classes.btn}>
                      <Tooltip
                        title={ReportHistoryStatus.PRINTER}
                        enterDelay={500}
                        leaveDelay={100}
                      >
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => handlePrinterDeal(row.id)}
                        >
                          <i className="fa fa-print"></i>
                        </button>
                      </Tooltip>
                      <Tooltip
                        title={ReportHistoryStatus.CANCEL}
                        enterDelay={500}
                        leaveDelay={100}
                      >
                        <button
                          className="btn btn-danger btn-xs ml-1"
                          onClick={() =>
                            openDialogKeyHistory(
                              DialogKeyHistory.CANCEL,
                              row.id,
                            )
                          }
                        >
                          <i className="fa fa-eraser"></i>
                        </button>
                      </Tooltip>
                    </TableCell>
                  );
                } else if (
                  value === CardTypes.RETURN ||
                  value === CardTypes.CARDFEE ||
                  value === CardTypes.LOST
                ) {
                  return (
                    <TableCell key={column.id} className={classes.btn}>
                      <Tooltip
                        title={ReportHistoryStatus.PRINTER}
                        enterDelay={500}
                        leaveDelay={100}
                      >
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => handlePrinterDeal(row.id)}
                        >
                          <i className="fa fa-print"></i>
                        </button>
                      </Tooltip>
                    </TableCell>
                  );
                } else if (value === CardTypes.WITHDRAW) {
                  return <TableCell></TableCell>;
                }
              } else if (column.id === 'birthday' || column.id === 'time') {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : ''}
                  </TableCell>
                );
              } else if (
                column.id === 'before_value' ||
                column.id === 'price' ||
                column.id === 'after_value'
              ) {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {CurrencyService.formatCurrency(value)}
                  </TableCell>
                );
              } else if (column.id === 'manipulation') {
                return <TableCellColor id={column.id} value={value} />;
              }
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value ? value : '-'}
                </TableCell>
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
            colSpan={columnListReport.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderPagination = () => {
    if (validateTekmediCard()) {
      return (
        <TablePagination
          rowsPerPageOptions={[10, 20, 30, 50, 100, 1000]}
          component="div"
          count={memoTekmediCard.recordsTotal}
          rowsPerPage={filterTekmediCard ? filterTekmediCard.rowsPerPage : 10}
          page={filterTekmediCard ? filterTekmediCard.page : 0}
          labelRowsPerPage="Hiển Thị"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowPerPage}
        />
      );
    }
  };
  return (
    <div className="row" style={{ display: isCloseTable ? 'none' : 'block' }}>
      {!_.isEmpty(dataPrinterHistory) && (
        <div className="d-none">
          <PrintReturnHistory card={dataPrinterHistory.result} ref={printRef} />
        </div>
      )}
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
                          onClick={handlerefresh}
                        ></a>
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
                      <div className="row">{renderNavBar()}</div>
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
                      <ModalConfirm
                        title={DialogTitleHistory.CANCEL_TITLE}
                        keyConfirm={DialogKeyHistory.CANCEL}
                        open={openConfirmCancel}
                        onClose={() =>
                          closeDialogControl(DialogKeyHistory.CANCEL)
                        }
                        confirmMethod={cancelDeal}
                      />
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
