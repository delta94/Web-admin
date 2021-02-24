/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState, useMemo } from 'react';
import * as _ from 'lodash';
import * as AuthSlice from 'store/auth/shared/slice';
import * as AuthSelector from 'store/auth/shared/selectors';
import { AuthSaga } from 'store/auth/shared/saga';
import {
  useInjectReducer,
  useInjectSaga,
} from 'store/core/@reduxjs/redux-injectors';
import { useSelector, useDispatch } from 'react-redux';
import { sliceKey, reducer, actions } from 'store/setting/shared/slice';
import { SettingSaga } from 'store/setting/shared/saga';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Tooltip } from '@material-ui/core';
import { tableRole } from 'store/setting/constants/setting.constant';
import { ModalRole } from '../components/SystemAccess/ModalRole';
import { ModalUserInRole } from '../components/SystemAccess/ModalUserInRole';
import { ModalAddRole } from '../components/SystemAccess/ModalAddRole';
import { ModalConfirm } from 'app/components/Modal/Confirm';
import { AppHelper, Order } from 'utils/app.helper';
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

export function SystemAccess() {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: SettingSaga });
  useInjectReducer({ key: AuthSlice.sliceKey, reducer: AuthSlice.reducer });
  useInjectSaga({ key: AuthSlice.sliceKey, saga: AuthSaga });
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading: any = useSelector<any>(AuthSelector.selectLoading);
  const roles: any = useSelector<any>(AuthSelector.selectRoles);
  const success: any = useSelector<any>(AuthSelector.selectSuccess);
  const [openModalRole, setOpenModalRole] = useState<boolean>(false);
  const [openModalUserRole, setOpenModalUserRole] = useState<boolean>(false);
  const [openModalAddRole, setOpenModalAddRole] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [idDelete, setIdDelete] = useState<string>('');

  useEffect(() => {
    return () => {
      dispatch(actions.resetAll());
    };
  }, []);

  useEffect(() => {
    if (!_.isEmpty(success)) {
      dispatch(AuthSlice.actions.getListRole());
    }
  }, [success]);

  const useEffectOnMount = (effect: React.EffectCallback) => {
    useEffect(effect, []);
  };

  useEffectOnMount(() => {
    dispatch(AuthSlice.actions.getListUser({}));
    dispatch(AuthSlice.actions.getListRole());
    dispatch(AuthSlice.actions.getListPermission());
  });

  const memoTables: any = useMemo((): any => {
    if (!_.isEmpty(roles)) {
      return roles;
    }
  }, [roles]);

  const handleOpenModalRole = role => {
    setOpenModalRole(true);
    dispatch(AuthSlice.actions.setEditRole(role));
  };

  const handleOpenModalUserRole = role => {
    setOpenModalUserRole(true);
    dispatch(AuthSlice.actions.setEditRole(role));
  };

  const deleteRole = () => {
    if (idDelete === '') return;
    dispatch(AuthSlice.actions.deleteRole(idDelete));
  };

  const openDeleteRole = role => {
    setOpenDelete(true);
    setIdDelete(role.id);
  };

  const addRole = () => setOpenModalAddRole(true);

  const closeDialog = () => {
    setOpenDelete(false);
    setOpenModalRole(false);
    setOpenModalUserRole(false);
    setOpenModalAddRole(false);
  };

  const syncAccess = () => dispatch(AuthSlice.actions.getListRole());

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('code');

  const handleRequestSort = (event, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const renderTableControl = () => {
    return (
      <div className="row">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <div className="btn-group">
            <a id="addRow" className="btn btn-info" onClick={addRole}>
              Thêm mới <i className="fa fa-plus"></i>
            </a>
          </div>
          <div className="btn-group ml-3">
            <button className="btn btn-info" onClick={syncAccess}>
              Đồng bộ <i className="fa fa-refresh"></i>
            </button>
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
        columns={tableRole}
      />
    );
  };

  const renderTable = () => {
    if (memoTables && memoTables.length) {
      const tableData: any[] = AppHelper.stableSort(
        memoTables,
        AppHelper.getComparator(order, orderBy),
      );
      return tableData.map((row, idx) => {
        const role = _.cloneDeep(row);
        return (
          <TableRow key={row.id}>
            {tableRole.map(column => {
              const value = role[column.id];
              if (column.id === 'no') {
                return <TableCell key={column.id}>{idx + 1}</TableCell>;
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
                    <Tooltip
                      title={'Ds nội dung truy cập'}
                      enterDelay={500}
                      leaveDelay={100}
                    >
                      <button
                        className="btn btn-primary btn-sm btn--icon-text btnEdit"
                        onClick={() => handleOpenModalRole(role)}
                      >
                        <i className="zmdi zmdi-flag zmdi-hc-fw" /> Ds nội dung
                        truy cập
                      </button>
                    </Tooltip>
                    <Tooltip
                      title={'Ds người dùng'}
                      enterDelay={500}
                      leaveDelay={100}
                      onClick={() => handleOpenModalUserRole(role)}
                    >
                      <button className="row-function-users btn btn-success btn-sm btn--icon-text btnEdit ml-2">
                        <i className="zmdi zmdi-account zmdi-hc-fw" /> Ds người
                        dùng
                      </button>
                    </Tooltip>
                    <Tooltip title={'Xoá'} enterDelay={500} leaveDelay={100}>
                      <button
                        className="btn btn-danger btn-xs mx-2"
                        onClick={() => openDeleteRole(row)}
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
            colSpan={tableRole.length}
          >
            No matching records found
          </TableCell>
        </TableRow>
      );
    }
  };

  return (
    <div className="row">
      {loading ? <AppLoading loading={true} /> : null}
      {openModalAddRole ? (
        <ModalAddRole open={true} onClose={closeDialog} />
      ) : null}
      {openModalRole ? <ModalRole open={true} onClose={closeDialog} /> : null}
      {openModalUserRole ? (
        <ModalUserInRole open={true} onClose={closeDialog} />
      ) : null}
      <ModalConfirm
        title={'Bạn có chắc chắn muốn xoá quyền truy cập Này?'}
        other={{
          bodyText: '',
        }}
        keyConfirm={''}
        open={openDelete}
        onClose={() => closeDialog()}
        confirmMethod={() => deleteRole()}
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
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
