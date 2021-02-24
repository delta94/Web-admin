import {
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@material-ui/core';
import TableHeaderSor from 'app/components/TableHeaderSort';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { CurrencyService } from 'services/currency.service';
import {
  columnsListModalTransactionDetail,
  useStyles,
} from 'store/transaction/constants/transaction.constant';
import { PaidWaitingFormSaga } from 'store/transaction/shared/saga';
import { selecDataListTransactionDetailModal } from 'store/transaction/shared/selectors';
import { reducer, sliceKey } from 'store/transaction/shared/slice';
import { AppHelper, Order } from 'utils/app.helper';

export default function ModalTransactionDetail({ open, onClose }) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: PaidWaitingFormSaga });
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('service_id');
  const dataListModal = useSelector(selecDataListTransactionDetailModal);
  const [isCheckClickRow, setIsCheckClickRow] = useState<boolean>(false);
  const [filterModal, setFilterModal] = useState<any>({
    page: 0,
    rowsPerPage: 5,
  });
  const [dataTitle, setDataTitle] = useState<any>({
    patient_code: '',
    registered_code: '',
    id: '',
  });
  const classes = useStyles();
  const [keyWord, setKeyWord] = useState<any>('');
  const memoData = useMemo(() => {
    let data = dataListModal.transaction_info_detail;
    if (keyWord) {
      data = data.filter(
        item =>
          item.amount.toString().includes(keyWord.toString()) ||
          item.service_name.toLowerCase().includes(keyWord.toLowerCase()) ||
          item.service_id
            .toString()
            .toLowerCase()
            .includes(keyWord.toString().toLowerCase()),
      );
    }
    return data;
  }, [dataListModal, keyWord]);
  const validateDataModal = () =>
    dataListModal.transaction_info_detail &&
    Object.entries(dataListModal.transaction_info_detail).length
      ? true
      : false;
  const indexOfLastPost = (filterModal.page + 1) * filterModal.rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - filterModal.rowsPerPage;
  const currentPost = validateDataModal()
    ? memoData.slice(indexOfFirstPost, indexOfLastPost)
    : null;
  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const setNewFilter = newFilter => {
    setFilterModal(newFilter);
  };
  const handleChangePage = (e: unknown, page: number) => {
    let changePage = Object.assign({}, filterModal, { page });
    setNewFilter(changePage);
  };
  const handleClickRow = row => {
    setIsCheckClickRow(true);
    setDataTitle({
      patient_code: row.patient_code,
      registered_code: row.registered_code,
      id: row.id,
    });
  };
  const handleChangeRowsPerpage = e => {
    let changeRowPage = Object.assign({}, filterModal, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setNewFilter(changeRowPage);
  };
  const handleChangeSearch = e => {
    setKeyWord(e.target.value);
    setFilterModal({
      ...filterModal,
      page: 0,
    });
  };
  const closeModal = () => {
    setDataTitle({
      patient_code: '',
      registered_code: '',
      id: '',
    });
    setIsCheckClickRow(false);
    onClose();
  };
  const renderColumns = () => (
    <TableHeaderSor
      classes={classes}
      onRequestSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      columns={columnsListModalTransactionDetail}
    />
  );
  const renderTable = () => {
    if (validateDataModal()) {
      const tableData: any[] = AppHelper.stableSort(
        currentPost,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={index} hover onClick={() => handleClickRow(row)}>
            {columnsListModalTransactionDetail.map((column, idx) => {
              const value = row[column.id];
              if (column.id === '#') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {index + 1}
                  </TableCell>
                );
              } else if (column.id === 'amount') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {CurrencyService.formatCurrency(value)}
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
            colSpan={columnsListModalTransactionDetail.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderPagiantion = () => {
    if (validateDataModal()) {
      return (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
          component="div"
          count={Object.entries(memoData).length > 0 ? memoData.length : 0}
          rowsPerPage={filterModal ? filterModal.rowsPerPage : 5}
          page={filterModal ? filterModal.page : 0}
          labelRowsPerPage="Hiển Thị"
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerpage}
        />
      );
    }
  };
  return (
    <Dialog
      fullWidth={true}
      maxWidth={'lg'}
      open={open}
      onClose={onClose}
      disableBackdropClick={true}
      scroll={'body'}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogContent>
        <div className="row">
          <div className="col-md-12">
            <div className="tabbable-line">
              <ul className="nav customtab nav-tabs" role="tablist"></ul>
              <div className="tab-content">
                <div className="tab-pane active fontawesome-demo" id="tab1">
                  {isCheckClickRow ? (
                    <h3>
                      {dataTitle.patient_code} - {dataTitle.registered_code} -{' '}
                      {dataTitle.id.toUpperCase()}
                    </h3>
                  ) : validateDataModal() ? (
                    <h3>
                      {dataListModal.transaction_info_detail[0].patient_code} -{' '}
                      {dataListModal.transaction_info_detail[0].registered_code}{' '}
                      -{' '}
                      {dataListModal.transaction_info_detail[0].id.toUpperCase()}
                    </h3>
                  ) : (
                    ''
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-topline-aqua">
                        <div className="card-head text-center">
                          {validateDataModal() && (
                            <header>
                              THÔNG TIN GIAO DỊCH{' '}
                              {dataListModal.transaction_info_detail[0].type}
                            </header>
                          )}
                        </div>
                        <div className="card-body">
                          <div className="btn-group mb-3">
                            <label>Search</label>
                            <input
                              type="text"
                              className="form-control
                            "
                              value={keyWord}
                              onChange={handleChangeSearch}
                            />
                          </div>
                          <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>{renderColumns()}</TableHead>
                                <TableBody>{renderTable()}</TableBody>
                              </Table>
                            </TableContainer>
                            {renderPagiantion()}
                          </Paper>
                        </div>
                        <div className="card-footer">
                          <div className="form-group col-md-12 d-flex justify-content-end">
                            <input
                              type="button"
                              onClick={() => closeModal()}
                              className="btn btn-secondary"
                              value="Đóng"
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
      </DialogContent>
    </Dialog>
  );
}
