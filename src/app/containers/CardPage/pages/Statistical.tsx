/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/card/shared/slice';
import { CardFormSaga } from 'store/card/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  selectDataCardStatistical,
  selectDataPrinterHistory,
  selectLoading,
  selectSuccess,
} from 'store/card/shared/selectors';
import { selectIsAuthenticated, selectUser } from 'store/auth/shared/selectors';
import { NotifyService } from 'services/notify.service';
import { CurrencyService } from 'services/currency.service';
import { useSnackbar } from 'notistack';
import { AppHelper, Order } from 'utils/app.helper';
import * as _ from 'lodash';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { CardModel } from 'store/card/shared/Model';
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATE_TIME,
} from 'store/common/constants/common.constant';
import { columns, RESPONSE_CONSTANT } from 'store/card/constants/card.constant';
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
import { useStyles } from 'store/transaction/constants/transaction.constant';
import { Tooltip } from '@material-ui/core';
import moment from 'moment';
import PrintReturnHistory from '../components/PrintReturnHistory';
import { useReactToPrint } from 'react-to-print';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import TableCellColor from 'app/components/TableCellColor';

const useStylesDatepicker = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      maxHeight: '500px',
    },
    textField: {
      width: '100%',
      marginTop: '-10px',
    },
  }),
);

export function Statistical() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: CardFormSaga });
  const classes = useStyles();
  const datepickerClass = useStylesDatepicker();
  const dataCards: any = useSelector<any>(selectDataCardStatistical);
  const loading: any = useSelector<any>(selectLoading);
  const user: any = useSelector<any>(selectUser);
  const isAuthenticated: any = useSelector<any>(selectIsAuthenticated);
  const success: any = useSelector(selectSuccess);
  const dataPrinterHistory: any = useSelector(selectDataPrinterHistory);
  const dispatch = useDispatch();
  const dateUtil = new DateFnsUtils();
  const [idPatient, setIdPatient] = useState<any>({});
  const [openConfirmCancel, setOpenConfirmCancel] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date>(
    dateUtil.addDays(new Date(), -30),
  );
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [isOpenDisplay, setIsOpenDisplay] = useState(false);
  const [isCloseTable, setIsCloseTable] = useState(false);
  const [filterCard, setFilterCard] = useState<any>({
    startDate: moment.utc(startDate).startOf('day'),
    endDate: moment.utc(endDate).endOf('day'),
    page: 0,
    rowsPerPage: 15,
    userId: '',
  });
  const printRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isAuthenticated) {
      const initFilter = filterCard;
      setFilterCard({
        ...initFilter,
        userId: user.id,
      });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (_.get(filterCard, 'userId')) {
      dispatch(actions.getCardStatistical(filterCard));
    }
  }, [filterCard]);

  const memoCard: any = useMemo((): any => {
    if (!_.isEmpty(dataCards)) {
      const { data = [], recordsTotal } = dataCards;
      return { data, recordsTotal };
    }
  }, [dataCards]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.EXPORT_CARD_SUCCESS) {
        AppHelper.createDownloadFile({
          file_path: success.data.file_path,
          file_name: success.data.file_name,
        });
      } else if (success.key === RESPONSE_CONSTANT.CANCEL_DEAL_SUCCESS) {
        dispatch(actions.getCardStatistical(filterCard));
      }
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(dataPrinterHistory)) {
      handlePrint!();
      dispatch(actions.clearDataPrint());
    }
  });
  const changeStartDate = date => {
    setStartDate(new Date(date));
  };

  const changeEndDate = date => {
    setEndDate(new Date(date));
  };

  const validateCardList = () =>
    dataCards.data && dataCards.data.length ? true : false;

  const exportListCard = () => {
    const queryParamsExport = {
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      userName: user.user_name,
      userId: user.id,
    };
    dispatch(actions.exportListCard(queryParamsExport));
  };

  const submitSearch = e => {
    e.preventDefault();
    setFilterCard({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 15,
      userId: user.id,
    });
  };
  const handleIsOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('tekmedi_card_number');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleRefresh = () => {
    setFilterCard({
      startDate: moment.utc(startDate).startOf('day'),
      endDate: moment.utc(endDate).endOf('day'),
      page: 0,
      rowsPerPage: 15,
      userId: user.id,
    });
  };

  const cancelDeal = () => {
    dispatch(actions.postCancelDeal(idPatient));
  };
  const reactPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactPrintContent,
    removeAfterPrint: true,
    pageStyle: '{ size: 2.5in 4in}',
  });
  const handlePrinterDeal = id => {
    dispatch(actions.getIdPrinter(id));
  };

  const openDialogKeyHistory = id => {
    setIdPatient(id);
    setOpenConfirmCancel(true);
  };
  const onCloseConfirmCancel = () => {
    setOpenConfirmCancel(false);
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
                  onChange={changeStartDate}
                  className={datepickerClass.textField}
                />
              </div>

              <div className="col-ms-12 col-md-5">
                <KeyboardDatePicker
                  variant="inline"
                  format={DEFAULT_FORMAT_DATE}
                  margin="normal"
                  label="Đến ngày"
                  value={endDate}
                  onChange={changeEndDate}
                  className={datepickerClass.textField}
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
              <a className="btn btn-success" onClick={exportListCard}>
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
        columns={columns}
      />
    );
  };

  const renderTable = () => {
    if (validateCardList()) {
      const tableData: any[] = AppHelper.stableSort(
        memoCard.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const card = new CardModel(row);
        return (
          <TableRow key={row.id}>
            {columns.map(column => {
              const value = card[column.id];
              if (column.id === 'id_card') {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {value ? value : ''}
                  </TableCell>
                );
              } else if (column.id === 'type') {
                if (value === 11 || value === 4 || value === 3) {
                  return (
                    <TableCell key={column.id} className={classes.btn}>
                      <Tooltip
                        title={'In Giao Dịch'}
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
                } else if (value === 2) {
                  return (
                    <TableCell key={column.id} className={classes.btn}>
                      <Tooltip
                        title={'In Giao Dịch'}
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
                        title={'Hủy Giao Dịch'}
                        enterDelay={500}
                        leaveDelay={100}
                      >
                        <button
                          className="btn btn-danger btn-xs ml-1"
                          onClick={() => openDialogKeyHistory(row.id)}
                        >
                          <i className="fa fa-eraser"></i>
                        </button>
                      </Tooltip>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id}>{value ? '' : ''}</TableCell>
                  );
                }
              } else if (column.id === 'birthday') {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : ''}
                  </TableCell>
                );
              } else if (column.id === 'time') {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {value
                      ? dateUtil.format(
                          new Date(value),
                          DEFAULT_FORMAT_DATE_TIME,
                        )
                      : ''}
                  </TableCell>
                );
              } else if (
                column.id === 'price' ||
                column.id === 'before_value' ||
                column.id === 'after_value'
              ) {
                return (
                  <TableCell
                    key={column.id}
                    align="center"
                    className={classes.td}
                  >
                    {CurrencyService.formatCurrency(value)}
                  </TableCell>
                );
              } else if (column.id === 'manipulation') {
                return (
                  <TableCellColor
                    value={value}
                    id={column.id}
                    key={column.id}
                  />
                );
              }
              const { page, rowsPerPage } = filterCard;
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value ? value : page * rowsPerPage + idx + 1}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });
    } else {
      return (
        <TableRow>
          <TableCell className="w-100" align="center" colSpan={columns.length}>
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
          count={memoCard.recordsTotal}
          rowsPerPage={filterCard ? filterCard.rowsPerPage : 10}
          page={filterCard ? filterCard.page : 0}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  const handleChangePage = (event: unknown, page: number) => {
    let changePage = Object.assign({}, filterCard, { page });
    setNewFilterCard(changePage);
  };

  const handleChangeRowsPerPage = event => {
    let changeRowPerPage = Object.assign({}, filterCard, {
      rowsPerPage: +event.target.value,
      page: 0,
    });
    setNewFilterCard(changeRowPerPage);
  };

  const setNewFilterCard = newFilter => {
    setFilterCard(newFilter);
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
                      <div className="row mt-3">{renderNavControl()}</div>
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
                        {!_.isEmpty(dataPrinterHistory) && (
                          <div className="d-none">
                            <PrintReturnHistory
                              card={dataPrinterHistory.result}
                              ref={printRef}
                            />
                          </div>
                        )}
                        <ModalConfirm
                          title={'Bạn có chắc chắn muốn hủy giao dịch này?'}
                          keyConfirm={'CANCEL'}
                          open={openConfirmCancel}
                          onClose={() => onCloseConfirmCancel()}
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
    </div>
  );
}
