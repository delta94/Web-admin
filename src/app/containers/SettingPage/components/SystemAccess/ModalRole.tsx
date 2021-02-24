/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import * as Settinglice from 'store/setting/shared/slice';
import * as AuthSlice from 'store/auth/shared/slice';
import * as AuthSelector from 'store/auth/shared/selectors';
import { useInjectReducer, useInjectSaga } from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { SettingSaga } from 'store/setting/shared/saga';
import { AuthSaga } from 'store/auth/shared/saga';
import { AppHelper, Order } from 'utils/app.helper';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { tablePermissionInRole } from 'store/setting/constants/setting.constant';
import { Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableHeaderSort from 'app/components/TableHeaderSort';
import Switch from '@material-ui/core/Switch';
import TablePagination from '@material-ui/core/TablePagination';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: '300px',
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


export function ModalRole({ open, onClose }) {
  useInjectReducer({ key: Settinglice.sliceKey, reducer: Settinglice.reducer });
  useInjectSaga({ key: Settinglice.sliceKey, saga: SettingSaga });
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  const dispatch = useDispatch();
  const classes = useStyles();
  const roleEditing = useSelector(AuthSelector.selectRoleEditing);
  const defaultPermissions = useSelector(AuthSelector.selectPermissions);
  const [permissions, setPermissions] = useState<any[]>([]);
  const pagiOptions: number[] = [5, 10, 15, 30];
  const [pagi, setPagi] = useState<any>(() => ({
    rowsPerPage: _.first(pagiOptions),
    page: 0,
  }));
  const [keySearch, setKeySearch] = useState<string>('');
  const [tableSlice, setTableSlice] = useState<any[]>([]);

  useEffect((): any => {
    if (!_.isEmpty(permissions) && permissions.length) {
      if (keySearch === '') {
        AppHelper.setPagiClient(permissions, pagi, setTableSlice);
      } else {
        AppHelper.setSearchPagiClient(permissions, pagi, keySearch, setTableSlice);
      }
    }
  }, [permissions, pagi, keySearch]);

  useEffect(() => {
    return () => {
      dispatch(AuthSlice.actions.clearEditRole());
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(roleEditing) && !_.isEmpty(defaultPermissions)) {
      const formatRoles = AppHelper.compareAndModifyTwoCollections(
        defaultPermissions,
        roleEditing.permissions,
        'id',
        'canActive',
      );
      setPermissions(formatRoles);
    }
  }, [roleEditing, defaultPermissions]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

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
        columns={tablePermissionInRole}
      />
    );
  };

  const changePermission = (e, role) => {
    const updatedRole = Object.assign({}, role, {
      canActive: e.target.checked
    });
    const updateListRole = permissions.map(per => {
      if (per.id === updatedRole.id) {
        return updatedRole
      }
      return per;
    });
    setPermissions(updateListRole);
  }

  const submitEditRole = e => {
    e.preventDefault();
    const listPermit: string[] = permissions.filter(per => per.canActive).map(({ id }) => id);
    dispatch(AuthSlice.actions.updatePermissionInRole({
      roleId: roleEditing.id,
      listPermit
    }));
    onClose();

  }

  const renderTable = () => {
    if (permissions.length) {
      const tableData: any[] = AppHelper.stableSort(
        tableSlice,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const role = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tablePermissionInRole.map(column => {
              const value = role[column.id];
              if (column.id === 'no') {
                const { page, rowsPerPage } = pagi;
                return <TableCell key={column.id}>{page * rowsPerPage + idx + 1}</TableCell>;
              } else if (column.id === 'is_active') {
                if (value) {
                  return (
                    <TableCell key={column.id}>
                      <i
                        style={{ color: '#4caf50', fontSize: '16px' }}
                        className="fa fa-check-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell key={column.id}>
                      <i
                        style={{ color: '#ff0000', fontSize: '16px' }}
                        className="fa fa-times-circle"
                        aria-hidden="true"
                      ></i>
                    </TableCell>
                  );
                }
              } else if (column.id === 'actions') {
                return (
                  <TableCell key={column.id}>
                    <Tooltip title={'Đổi Permission'} enterDelay={500} leaveDelay={100}>
                      <Switch
                        checked={role.canActive}
                        onChange={(e) => changePermission(e, role)}
                        color="primary"
                      />
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
            colSpan={tablePermissionInRole.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  const handleChangePage = (e, page) => {
    let changePage = Object.assign({}, pagi, { page });
    setPagi(changePage);
  };

  const handleChangeRowsPerPage = e => {
    let changeRowPerPage = Object.assign({}, pagi, {
      rowsPerPage: +e.target.value,
      page: 0,
    });
    setPagi(changeRowPerPage);
  };

  const renderPagination = () => {
    if (!_.isEmpty(tableSlice)) {
      return (
        <TablePagination
          rowsPerPageOptions={pagiOptions}
          component="div"
          count={keySearch !== '' ? tableSlice.length : permissions.length}
          rowsPerPage={pagi.rowsPerPage}
          page={pagi.page}
          labelRowsPerPage={'Hiển Thị'}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      );
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={'md'}
      open={open}
      onClose={onClose}
      disableBackdropClick
    >
      <DialogContent>
        <form onSubmit={submitEditRole}>
          <div className="row">
            <h4 className="d-block pb-2">Danh Sách Nội Dung Truy Cập Quyền - { roleEditing ? roleEditing.description : '' }</h4>
            <div className="col-sm-12 p-0">
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
            <div className="col-sm-12 pt-2 d-flex justify-content-end">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
              <button type="submit" className="btn btn-primary ml-3">Lưu</button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
