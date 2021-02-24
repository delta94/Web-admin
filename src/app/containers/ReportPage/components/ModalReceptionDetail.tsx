/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { ReceptionSaga } from 'store/reception/shared/saga';
import { reducer, sliceKey } from 'store/reception/shared/slice';
import { AppHelper, Order } from 'utils/app.helper';
import { columnsListReceptionDetail } from 'store/reception/constants/reception.constant';
import { useSelector } from 'react-redux';
import { selectLoading, selectReasons } from 'store/reception/shared/selectors';
import DateFnsUtils from '@date-io/date-fns';
import { DEFAULT_FORMAT_DATE } from 'store/common/constants/common.constant';
import AppLoading from 'app/components/Loading';
import { useStyles } from 'store/transaction/constants/transaction.constant';

export function ModalReceptionDetail({ open, onClose }) {
  const classes = useStyles();
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: ReceptionSaga });
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<any>('reason');
  const dataListResion: any = useSelector(selectReasons);
  const loading: any = useSelector(selectLoading);
  const dateUtil = new DateFnsUtils();
  const [search, setSearch] = useState<any>('');
  const [filterModal, setFilterModal] = useState<any>({
    page: 0,
    rowsPerPage: 5,
  });
  const handleRequestSort = (e, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const memoDataReceptionDetail = useMemo(() => {
    let data = dataListResion.reception_histories;
    if (search) {
      data = data.filter(
        item =>
          item.reason.toLowerCase().includes(search.toLowerCase()) ||
          item.updated_date.toString().includes(search.toString()) ||
          item.updated_by.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return data;
  }, [dataListResion, search]);

  const validatDataListReson = () =>
    dataListResion.reception_histories &&
    Object.entries(dataListResion.reception_histories).length > 0
      ? true
      : false;
  const indexOfLastPost = (filterModal.page + 1) * filterModal.rowsPerPage;
  const indexOfFirstPost = indexOfLastPost - filterModal.rowsPerPage;
  const currentPost = validatDataListReson()
    ? memoDataReceptionDetail.slice(indexOfFirstPost, indexOfLastPost)
    : null;
  const setNewFilter = newFilter => {
    setFilterModal(newFilter);
  };
  const handleChangePage = (e: unknown, page: number) => {
    let changePage = Object.assign({}, filterModal, { page });
    setNewFilter(changePage);
  };
  const handleChangeSearch = e => {
    setSearch(e.target.value);
    setFilterModal({
      ...filterModal,
      page: 0,
    });
  };
  const handleChangeRowsPerpage = e => {
    let changeRowPage = Object.assign({}, filterModal, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setNewFilter(changeRowPage);
  };
  const renderColumns = () => (
    <TableHeaderSor
      classes={classes}
      onRequesSort={handleRequestSort}
      order={order}
      orderBy={orderBy}
      columns={columnsListReceptionDetail}
    />
  );
  const renderTables = () => {
    if (validatDataListReson()) {
      const tableData: any[] = AppHelper.stableSort(
        currentPost,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, index) => {
        return (
          <TableRow key={index} hover>
            {columnsListReceptionDetail.map((column, idx) => {
              const value = row[column.id];
              if (column.id === '#') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {index + 1}
                  </TableCell>
                );
              } else if (column.id === 'updated_date') {
                return (
                  <TableCell key={idx} className={classes.td}>
                    {value
                      ? dateUtil.format(new Date(value), DEFAULT_FORMAT_DATE)
                      : '-'}
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
            colSpan={columnsListReceptionDetail.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderPagination = () => {
    if (validatDataListReson()) {
      return (
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20]}
          component="div"
          count={
            Object.entries(memoDataReceptionDetail).length > 0
              ? memoDataReceptionDetail.length
              : 0
          }
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
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card card-topline-aqua">
                        <div className="card-head text-center">
                          <header>LỊCH SỬ THAY ĐỔI</header>
                        </div>
                        <div className="card-body">
                          <div className="btn-group mb-3">
                            <label>Search</label>
                            <input
                              type="text"
                              className="form-control
                            "
                              value={search}
                              onChange={handleChangeSearch}
                            />
                          </div>
                          <Paper className={classes.root}>
                            {loading ? <AppLoading loading={true} /> : null}
                            <TableContainer className={classes.container}>
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>{renderColumns()}</TableHead>
                                <TableBody>{renderTables()}</TableBody>
                              </Table>
                            </TableContainer>
                            {renderPagination()}
                          </Paper>
                        </div>
                        <div className="card-footer">
                          <div className="form-group col-md-12 d-flex justify-content-end">
                            <input
                              type="button"
                              onClick={onClose}
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
