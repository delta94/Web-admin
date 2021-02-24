/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useRef } from 'react';
import * as _ from 'lodash';
import * as TableSelectors from 'store/table/shared/selectors';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/table/shared/slice';
import { TableSaga } from 'store/table/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { NotifyService } from 'services/notify.service';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { tablePatientReceiption } from 'store/table/constants/table.constant';
import { ModalUpdateTable } from '../components/TablePatientReceition/ModalUpdateTable';
import { ModalCreateTable } from '../components/TablePatientReceition/ModalCreateTable';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { AppHelper, Order } from 'utils/app.helper';
import { deviceTypes, tableTypes } from 'store/table/constants/table.constant';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppLoading from 'app/components/Loading';
import TableHeaderSort from 'app/components/TableHeaderSort';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '200px',
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

export function TablePatientReceition() {
  const { enqueueSnackbar } = useSnackbar();
  const notifyController = new NotifyService(enqueueSnackbar);
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: TableSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const tables: any = useSelector<any>(TableSelectors.selectTable);
  const loading: any = useSelector<any>(TableSelectors.selectLoading);
  const error: any = useSelector<any>(TableSelectors.selectError);
  const success: any = useSelector<any>(TableSelectors.selectSuccess);
  const [openCreateTable, setOpenCreateTable] = useState<boolean>(false);
  const [openUpdateTable, setOpenUpdateTable] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');
  const pagiOptions: number[] = [10, 15, 30];
  const [filter, setFilter] = useState<any>(() => ({
    rowsPerPage: _.first(pagiOptions),
    page: 0,
    search: '',
  }));
  const searchRef = useRef<any>(null);

  useEffect(() => {
    dispatch(actions.getTableAll(filter));
  }, []);

  useEffect(() => {
    if (!_.isEmpty(error)) {
      notifyController.setNotifyMessage(error.message).setFailNotify();
      dispatch(actions.clearError());
    }
  }, [error]);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      notifyController.setNotifyMessage(success.message).setSuccessNotify();
      setOpenCreateTable(false);
      setOpenUpdateTable(false);
      dispatch(actions.getTableAll(filter));
      dispatch(actions.clearSuccess());
    }
  }, [success]);

  const updateTable = id => {
    dispatch(actions.getTableWithId(id));
    setOpenUpdateTable(true);
  };

  const createTable = () => {
    setOpenCreateTable(true);
  };

  const deleteTable = () => {
    if (idDelete === '') return;
    dispatch(actions.deleteTable(idDelete));
  };

  const openDeleteTable = table => {
    setOpenDelete(true);
    setIdDelete(table.id);
  };

  const closeDialog = () => {
    setOpenUpdateTable(false);
    setOpenCreateTable(false);
    setOpenDelete(false);
  };

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('tekmedi_card_number');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (e, page) => {
    let changePage = Object.assign({}, filter, { page });
    setFilter(changePage);
    dispatch(actions.getTableAll(changePage));
  };

  const handleChangeRowsPerPage = e => {
    let changeRowPerPage = Object.assign({}, filter, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    dispatch(actions.getTableAll(changeRowPerPage));
  };

  const searchTable = e => {
    let changeSearch = Object.assign({}, filter, {
      search: e.target.value,
    });
    setFilter(changeSearch);
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }
    searchRef.current = setTimeout(() => {
      dispatch(actions.getTableAll(changeSearch));
    }, 500);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <a id="addRow" className="btn btn-info" onClick={createTable}>
              Thêm mới <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="btn-group pl-4">
            <label
              style={{
                alignItems: 'center',
                margin: 0,
                display: 'flex',
              }}
            >
              <span style={{ display: 'block', width: '90px' }}>Tìm:</span>
              <input
                value={filter.search}
                onChange={searchTable}
                type="search"
                placeholder="Tìm bàn tiếp nhận"
                className="form-control form-control-sm"
                aria-controls="titleTable"
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderColumns = () => {
    return (
      <TableHeaderSort
        classes={classes}
        onRequestSort={handleRequestSort}
        order={order}
        orderBy={orderBy}
        columns={tablePatientReceiption}
      />
    );
  };

  const renderTable = () => {
    if (!_.isEmpty(tables) && tables.data.length) {
      const tableData: any[] = AppHelper.stableSort(
        tables.data,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const card = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tablePatientReceiption.map(column => {
              const value = card[column.id];
              if (column.id === 'no') {
                const { page, rowsPerPage } = filter;
                return (
                  <TableCell key={column.id}>
                    {page * rowsPerPage + idx + 1}
                  </TableCell>
                );
              } else if (column.id === 'device_type') {
                const device: any = deviceTypes.find(
                  dev => dev.value === value,
                );
                if (device) {
                  return <TableCell key={column.id}>{device.label}</TableCell>;
                } else {
                  return <TableCell key={column.id}>{value}</TableCell>;
                }
              } else if (column.id === 'type') {
                const table: any = tableTypes.find(tab => tab.value === value);
                if (table) {
                  return <TableCell key={column.id}>{table.label}</TableCell>;
                } else {
                  return <TableCell key={column.id}>{value}</TableCell>;
                }
              } else if (column.id === 'actions') {
                return (
                  <TableCell key={column.id}>
                    <Tooltip title={'Sửa'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => updateTable(row.id)}
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteTable(row)}
                      >
                        <i className="fa fa-trash-o"></i>
                      </button>
                    </Tooltip>
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
            colSpan={tablePatientReceiption.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const renderPagination = () => {
    if (!_.isEmpty(tables)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={tables.recordsTotal}
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
    <div className="row">
      {loading ? <AppLoading loading={true} /> : null}
      {openUpdateTable ? (
        <ModalUpdateTable open={true} onClose={() => closeDialog()} />
      ) : null}
      {openCreateTable ? (
        <ModalCreateTable open={true} onClose={() => closeDialog()} />
      ) : null}
      <ModalConfirm
        title={'Bạn có chắc chắn muốn xoá bàn này?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openDelete}
        onClose={() => closeDialog()}
        confirmMethod={() => deleteTable()}
      />
      <div className="col-md-12">
        <div className="card card-topline-red">
          <div className="card-head"></div>
          <div className="card-body ">
            {renderTableControl()}
            <div className="table-scrollable">
              <Paper className={classes.root}>
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
      </div>
    </div>
  );
}
