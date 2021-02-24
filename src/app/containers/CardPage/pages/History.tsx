/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { AppHelper, Order } from 'utils/app.helper';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/card/shared/slice';
import { CardFormSaga } from 'store/card/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { CardModel } from 'store/card/shared/Model';
import { NotifyService } from 'services/notify.service';
import { CurrencyService } from 'services/currency.service';
import { useSnackbar } from 'notistack';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { Tooltip } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { CardHttp } from 'store/card/services/card.http';
import {
  DEFAULT_FORMAT_DATE,
  DEFAULT_FORMAT_DATE_TIME,
} from 'store/common/constants/common.constant';
import {
  RESPONSE_CONSTANT,
  defaultHistoryCardTypes,
  columnsHistoryCard,
} from 'store/card/constants/card.constant';
import * as _ from 'lodash';
import * as fromCardSelectors from 'store/card/shared/selectors';
import * as CardConst from 'store/card/constants/card.constant';
import TekMultiSelect from 'app/components/MultiSelect';
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
import PrintReturnHistory from 'app/containers/CardPage/components/PrintReturnHistory';
import TableHeaderSort from 'app/components/TableHeaderSort';
import { useStyles } from 'store/transaction/constants/transaction.constant';
import TableCellColor from 'app/components/TableCellColor';

const optionsRows = [10, 15, 20, 50, 100, 1000];

export function HistoryPage() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  const cardHttpService = new CardHttp();
  const dateUtil = new DateFnsUtils();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: CardFormSaga });
  const classes = useStyles();
  const loading: any = useSelector<any>(fromCardSelectors.selectLoading);
  const dataCardHistory = useSelector(fromCardSelectors.selectDataCardHistory);
  const dispatch = useDispatch();
  const [patientCode, setPatientCode] = useState('');
  const [patientName, setPatientName] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<any[]>([]);
  const success: any = useSelector(fromCardSelectors.selectSuccess);
  const error: any = useSelector(fromCardSelectors.selectError);
  const [filterCard, setFilterCard] = useState<any>({
    page: 0,
    rowsPerPage: _.first(optionsRows),
    patientCode: '',
    patientName: '',
    types: [],
  });
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [idSelect, setIdSelect] = useState<string>('');
  let printRef = useRef<HTMLDivElement>(null);
  const [openPrintReturn, setOpenPrintReturn] = useState<boolean>(false);
  const [cardInfo, setCardInfo] = useState<any>();
  const [isOpenDisplay, setIsOpenDisplay] = useState(false);
  const [isCloseTable, setIsCloseTable] = useState(false);
  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint!({
    content: reactToPrintContent,
    removeAfterPrint: true,
  });

  useEffect(() => {
    dispatch(actions.getDataCardHistory(filterCard));
  }, [filterCard]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      if (success.key === RESPONSE_CONSTANT.CANCEL_PAYMENT_SUCCESS) {
        dispatch(actions.getDataCardHistory(filterCard));
      }
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  const memoCard: any = useMemo((): any => {
    if (!_.isEmpty(dataCardHistory)) {
      const { data = [], recordsTotal } = dataCardHistory;
      return { data, recordsTotal };
    }
  }, [dataCardHistory]);

  const closeConfirm = () => setIsOpenConfirm(false);
  const openCancelPayment = (id: any) => {
    setIsOpenConfirm(true);
    setIdSelect(id);
  };

  const cancelPayment = () => {
    if (idSelect === '') return;
    dispatch(actions.cancelPayment(idSelect));
  };
  const handleOpenPrintReturn = id => {
    cardHttpService
      .getCardHistoryById(id)
      .then(response => response.data)
      .then(cardInfo => {
        if (AppHelper.checkResponseData(cardInfo)) {
          setCardInfo(cardInfo.result);
          setOpenPrintReturn(true);
          handlePrint!();
        } else {
          dispatch(
            actions.setError({
              id: AppHelper.generateUUID() + Date.now(),
              key: CardConst.RESPONSE_CONSTANT.NOT_FOUND_WITH_ID,
              message: cardInfo.message,
            }),
          );
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('tekmedi_card_number');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={columnsHistoryCard}
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
            {columnsHistoryCard.map(column => {
              const value = card[column.id];
              if (column.id === 'id_card') {
                return (
                  <TableCell key={column.id} className={classes.td}>
                    {value ? value : ''}
                  </TableCell>
                );
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
              } else if (column.id === 'actions') {
                switch (card.type) {
                  case 2:
                    return (
                      <TableCell key={column.id} className={classes.td}>
                        <div className="d-flex justify-content-center">
                          <Tooltip
                            title={'In'}
                            enterDelay={300}
                            leaveDelay={100}
                          >
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={() => handleOpenPrintReturn(card.id)}
                            >
                              <i className="fa fa-print"></i>
                            </button>
                          </Tooltip>
                          <Tooltip
                            title={'Hủy'}
                            enterDelay={300}
                            leaveDelay={100}
                          >
                            <button
                              id="btnCancel"
                              className="btn btn-danger btn-xs ml-2"
                              onClick={() => openCancelPayment(card.id)}
                            >
                              <i className="fa fa-eraser"></i>
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                  case 3:
                    return (
                      <TableCell key={column.id} className={classes.td}>
                        <div className="d-flex justify-content-center">
                          <Tooltip
                            title={'In'}
                            enterDelay={300}
                            leaveDelay={100}
                          >
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={() => handleOpenPrintReturn(card.id)}
                            >
                              <i className="fa fa-print"></i>
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                  case 11:
                    return (
                      <TableCell key={column.id} className={classes.td}>
                        <div className="d-flex justify-content-center">
                          <Tooltip
                            title={'In'}
                            enterDelay={300}
                            leaveDelay={100}
                          >
                            <button
                              className="btn btn-primary btn-xs"
                              onClick={() => handleOpenPrintReturn(card.id)}
                            >
                              <i className="fa fa-print"></i>
                            </button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    );
                }
              } else if (column.id === 'manipulation') {
                return <TableCellColor id={column.id} value={value} />;
              }
              return (
                <TableCell key={column.id} className={classes.td}>
                  {value ? value : ''}
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
            colSpan={columnsHistoryCard.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
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

  const submitSearch = e => {
    e.preventDefault();
    let types: number[] = [];
    if (!_.isEmpty(patientCode) || !_.isEmpty(patientName)) {
      if (selectedTypes.length) {
        types = selectedTypes.map(({ value }) => value);
      }
      const newFilter = {
        ...filterCard,
        types,
        patientCode,
        patientName,
      };
      setFilterCard(newFilter);
    } else {
      dispatch(
        actions.setError({
          id: AppHelper.generateUUID() + Date.now(),
          key: CardConst.RESPONSE_CONSTANT.HISTORY_SEARCH_FAIL,
          message: CardConst.RESPONSE_MESSAGE.HISTORY_SEARCH_FAIL,
        }),
      );
    }
  };

  const handleIsOpenDisplay = () => {
    setIsOpenDisplay(!isOpenDisplay);
  };
  const handleCloseTable = () => {
    setIsCloseTable(!isCloseTable);
  };
  const handleRefresh = () => {
    setFilterCard({
      page: 0,
      rowsPerPage: _.first(optionsRows),
      patientCode: '',
      patientName: '',
      types: [],
    });
  };
  const changePatientCode = e => setPatientCode(e.target.value);

  const changePatientName = e => setPatientName(e.target.value);

  const validateCardList = () =>
    dataCardHistory.data && dataCardHistory.data.length ? true : false;

  const renderPagination = () => {
    if (validateCardList()) {
      return (
        <TablePagination
          rowsPerPageOptions={optionsRows}
          component="div"
          count={memoCard.recordsTotal}
          rowsPerPage={filterCard.rowsPerPage}
          page={filterCard.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };
  const getOptionLabel = option => `${option.label}`;
  const handleToggleOption = selectedOptions =>
    setSelectedTypes(selectedOptions);
  const handleClearOptions = () => setSelectedTypes([]);
  const handleSelectAll = isSelected => {
    if (isSelected) {
      setSelectedTypes(defaultHistoryCardTypes);
    } else {
      handleClearOptions();
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
                      <header>Lịch sử thẻ</header>
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
                      <form onSubmit={submitSearch}>
                        <div className="row">
                          <div className="col-md-2">
                            <input
                              type="text"
                              placeholder="Mã bệnh nhân"
                              className="form-control form-control-sm"
                              aria-controls="chieldRow"
                              id="code"
                              autoComplete="off"
                              style={{ height: '37px' }}
                              value={patientCode}
                              onChange={changePatientCode}
                            />
                          </div>
                          <div className="col-md-2">
                            <input
                              type="text"
                              placeholder="Tên bệnh nhân"
                              className="form-control form-control-sm"
                              aria-controls="chieldRow"
                              id="name"
                              autoComplete="off"
                              style={{ height: '37px' }}
                              value={patientName}
                              onChange={changePatientName}
                            />
                          </div>
                          <div className="col-md-4">
                            <TekMultiSelect
                              items={defaultHistoryCardTypes}
                              getOptionLabel={getOptionLabel}
                              selectedValues={selectedTypes}
                              label=""
                              placeholder="Chọn thao tác"
                              selectAllLabel="Tất cả"
                              onToggleOption={handleToggleOption}
                              onClearOptions={handleClearOptions}
                              onSelectAll={handleSelectAll}
                            />
                          </div>
                          <div className="col-md-3">
                            <div className="btn-group">
                              <button
                                type="submit"
                                id="btnSearch"
                                className="btn btn-primary"
                              >
                                Tìm kiếm <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="table-scrollable">
                        <Paper className={classes.root}>
                          {loading ? <AppLoading loading={true} /> : null}
                          <TableContainer>
                            <Table stickyHeader className={classes.table}>
                              <TableHead>{renderColumns()}</TableHead>
                              <TableBody>{renderTable()}</TableBody>
                            </Table>
                          </TableContainer>
                          {renderPagination()}
                        </Paper>
                      </div>
                      {openPrintReturn && !_.isEmpty(cardInfo) ? (
                        <div className="d-none">
                          <PrintReturnHistory card={cardInfo} ref={printRef} />
                        </div>
                      ) : null}
                      <ModalConfirm
                        title={'Bạn có chắc chắn muốn hủy giao dịch này không?'}
                        other={{
                          bodyText: '',
                        }}
                        keyConfirm={''}
                        open={isOpenConfirm}
                        onClose={() => closeConfirm()}
                        confirmMethod={() => cancelPayment()}
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
